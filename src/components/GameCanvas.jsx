import React, { useCallback, useEffect, useRef, useState } from 'react';

import ModalInfo from './ModalInfo';
import ResumeModal from './ResumeModal';
import SOUNDS from './Sounds';

import checkCollision from './Collision';

import { BROKEN_BRIDGE, ELEVATOR, CONVEYOR_BELTS, WALL_TERMINALS } from './GameObjects';
import { ORBS, SIGNS, PLATFORMS } from './Constants';
import BACKGROUND_TIERS from './BackgroundTiers';

import * as CanvasData from './Canvas';
import * as ObjectData from './ObjectCanvas';

// Helper function to debounce a function
const debounce = (func, delay) => {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
};

// Helper function to throttle a function
function throttle(fn, limit) {
  let lastCall = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      fn(...args);
    }
  };
};

const REGION_BOUNDARIES = {
  MOUNTAIN: { start: 0, end: 3000 },
  SNOW: { start: 1000, end: 6200 },
  VOLCANIC: { start: 5500, end: 10500 },
  CYBERPUNK: { start: 9000, end: 15000 },
  INDUSTRIAL: { start: 13000, end: 18000 },
  GOLDEN_CAVE: { start: 16000, end: 20700 }
};

// Game Constants
const GROUND_Y = 350;
const ORB_RADIUS = 18;

// Player Constants
const GRAVITY = 0.5;
const FRICTION = 0.85;
const AIR_RESISTANCE = 0.95;
const PLAYER_SPEED = 5;
const JUMP_FORCE = -12;
const WALL_JUMP_FORCE_X = 8;
const WALL_JUMP_FORCE_Y = -10;

function GameCanvas() {
  const canvasRef = useRef();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768 || window.innerHeight < 500 || /Android|iPhone|iPad/i.test(navigator.userAgent)); // Mobile detection
  
  const [showModal, setShowModal] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [activeModal, setActiveModal] = useState(null);

  const collectedOrbs = useRef([]);
  const [showInfo, setShowInfo] = useState(null);

  const cameraOffset = useRef({ x: 0, y: 0 });
  const gameLoopRef = useRef();

  // Player state
  const player = useRef({ x: 50, y: 50, width: 30, height: 50, velocityX: 0, velocityY: 0, isJumping: false, onGround: false, onWall: false, facing: 'right', lastWallSide: null, coyoteTime: 0, jumpBuffer: 0, lastSafeX: 50, lastSafeY: 50 });

  const keys = useRef({ left: false, right: false, jump: false, jumpPressed: false });

  // Treasure Chest
  const chestState = useRef({ openProgress: 0, resumeCollected: false });

  // Sounds
  const playBGM = throttle(() => SOUNDS.bgMusic.play(), 300);
  const playJump = throttle(() => SOUNDS.jump.play(), 300);
  const playLand = throttle(() => SOUNDS.land.play(), 300);
  const playSelect = throttle(() => SOUNDS.select.play(), 300);

  let startTime = Date.now();

  const getCurrentTier = () => {
    const progress = collectedOrbs.current.length / ORBS.length;
    return Math.min(
      Math.floor(progress * BACKGROUND_TIERS.length),
      BACKGROUND_TIERS.length - 1
    );
  };

  const getCurrentRegion = (camX) => {
    if (camX >= REGION_BOUNDARIES.GOLDEN_CAVE.start && camX < REGION_BOUNDARIES.GOLDEN_CAVE.end) {
      return 'GOLDEN_CAVE';
    } else if (camX >= REGION_BOUNDARIES.INDUSTRIAL.start && camX < REGION_BOUNDARIES.INDUSTRIAL.end) {
      return 'INDUSTRIAL';
    } else if (camX >= REGION_BOUNDARIES.CYBERPUNK.start && camX < REGION_BOUNDARIES.CYBERPUNK.end) {
      return 'CYBERPUNK';
    } else if (camX >= REGION_BOUNDARIES.VOLCANIC.start && camX < REGION_BOUNDARIES.VOLCANIC.end) {
      return 'VOLCANIC';
    } else if (camX >= REGION_BOUNDARIES.SNOW.start && camX < REGION_BOUNDARIES.SNOW.end) {
      return 'SNOW';
    } else {
      return 'MOUNTAIN';
    }
  };

  // Handle orb collection
  const checkOrbCollision = useCallback(() => {
    ORBS.forEach((orb, index) => {
      if (collectedOrbs.current.includes(index)) return;
      
      const dx = player.current.x - orb.x;
      const dy = player.current.y - orb.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
        
      if (distance < ORB_RADIUS + 15) {
        collectedOrbs.current = [...collectedOrbs.current, index];
        setShowInfo(orb.content);
        setTimeout(() => setShowInfo(null), 3000);
      }
    });
  }, [collectedOrbs]);

  const update = useCallback((timeScale = 1) => {
      const p = player.current;
      const k = keys.current;

      // === Player movement ===
      if (k.left) {
        p.velocityX = Math.max(p.velocityX - 0.5 * timeScale, -PLAYER_SPEED);
        p.facing = 'left';
      } else if (k.right) {
        p.velocityX = Math.min(p.velocityX + 0.5 * timeScale, PLAYER_SPEED);
        p.facing = 'right';
      } else {
        // Apply friction
        p.velocityX *= p.onGround ? FRICTION : AIR_RESISTANCE;
        if (Math.abs(p.velocityX) < 0.1) p.velocityX = 0;
      }

      // Apply Velocity
      p.x += p.velocityX * timeScale;
      p.y += p.velocityY * timeScale;

      // World boundaries
      p.x = Math.max(0, p.x);

      // Gravity
      if (!p.onGround) {
        p.velocityY += GRAVITY * timeScale;
      }

      // Reset collision states
      p.onGround = false;
      p.onWall = false;
      p.lastWallSide = null;


      // === ELEVATOR UPDATES ===
      ELEVATOR.forEach(elevator => {
        elevator.angle += elevator.speed;
        elevator.x = elevator.centerX + Math.cos(elevator.angle) * elevator.radius;
        elevator.y = elevator.centerY + Math.sin(elevator.angle) * elevator.radius;
      });

      // === Platform collisions ===
      PLATFORMS.forEach(platform => {
        const now = Date.now();

        if (platform.type === 'moving-h') {
          // Horizontal movement (sin wave for smooth back-and-forth)
          platform.x = platform.startX + Math.sin(now * 0.001 * platform.speed) * platform.distance;
        }
  
        if (platform.type === 'moving-v') {
          // Vertical movement
          platform.y = platform.startY + Math.sin(now * 0.001 * platform.speed) * platform.distance;
        }
  
        if (platform.type === 'moving-c') {
          // Circular movement
          platform.angle += platform.speed;
          platform.x = platform.centerX + Math.cos(platform.angle) * platform.radius;
          platform.y = platform.centerY + Math.sin(platform.angle) * platform.radius;
        }

        if (checkCollision(p, platform)) {
          // Calculate overlap on each side
          const overlapX = Math.min(
            p.x + p.width - platform.x,
            platform.x + platform.width - p.x
          );
                    
          const overlapY = Math.min(
            p.y + p.height - platform.y,
            platform.y + platform.height - p.y
          );

          // Resolve collision on the smallest overlap axis
          if (overlapX < overlapY) {
            // Horizontal collision (wall)
            if (p.x < platform.x) {
              p.x = platform.x - p.width;
              p.lastWallSide = 'left';
            } else {
              p.x = platform.x + platform.width;
              p.lastWallSide = 'right';
            }
                        
            p.velocityX = 0;            
            p.onWall = true;
          } else {
            // Vertical collision (floor/ceiling)
            if (p.y < platform.y) {
              // Landing on platform
              p.y = platform.y - p.height;
              p.velocityY = 0;
              p.onGround = true;
              p.isJumping = false;
            } else {
              // Hitting ceiling
              p.y = platform.y + platform.height;
              p.velocityY = 0;
            }
          }
        }
      });

      // === Belt Collision ===
      CONVEYOR_BELTS.forEach(belt => {
        const px = p.x + p.width / 2;
        const py = p.y + p.height;

        const isAbove = (
          px >= belt.x &&
          px <= belt.x + belt.width &&
          py >= belt.y &&
          py <= belt.y + belt.height
        );

        if (isAbove && p.velocityY >= 0) {
          belt.isOn = true;

          // Align player to sit on belt
          p.y = belt.y - p.height;
          p.velocityY = 0;
          p.onGround = true;
          p.isJumping = false;

          // Optional: Move player in belt direction
          const beltSpeed = belt.direction === 'right' ? belt.speed : -belt.speed;
          p.x += beltSpeed * belt.friction * timeScale; // friction adjusts how strong belt grip is
        } else {
          belt.isOn = false;
        }
      });

      // === Bridge Collision ===
      BROKEN_BRIDGE.forEach(bridge => {
        const px = p.x + p.width / 2;
        const py = p.y + p.height;

        const isAbove = (
          px >= bridge.x &&
          px <= bridge.x + bridge.width &&
          py >= bridge.y &&
          py <= bridge.y + bridge.height
        );

        if (isAbove && p.velocityY >= 0) {
          bridge.isOn = true;

          p.y = bridge.y - p.height;
          p.velocityY = 0;
          p.onGround = true;
          p.isJumping = false;
        } else {
          bridge.isOn = false;
        }
      });

      // === Ground collision ===
      PLATFORMS.forEach(platform => {
        if (checkCollision(p, platform)) {    
          if (platform.type === 'ground' || platform.color === '#4a3728') {
            const overlapX = Math.min(
              p.x + p.width - platform.x,
              platform.x + platform.width - p.x
            );
            const overlapY = Math.min(
              p.y + p.height - platform.y,
              platform.y + platform.height - p.y
            );

            if (overlapY < overlapX && p.y < platform.y) {
              p.y = platform.y - p.height;
              p.velocityY = 0;
              p.onGround = true;
            }
          }
        }
      });

      // === Sign interactions ===
      SIGNS.forEach(sign => {
        if (checkCollision(p, sign)) {
          if (k.jumpPressed) {
            setActiveModal(sign.content);
            setShowModal(true);
            playSelect();
          }
        }
      });

      // === WALL TERMINAL INTERACTION ===
      WALL_TERMINALS.forEach(terminal => {
        const dx = p.x + p.width / 2 - (terminal.x + terminal.width / 2);
        const dy = p.y + p.height / 2 - (terminal.y + terminal.height / 2);
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Interaction radius
        terminal.isNear = distance < 120;

        // Optional: terminal 'accessed' state on jump or interact key
        if (terminal.isNear - 100 && k.jumpPressed && !terminal.isAccessed) {
          terminal.isAccessed = true;
          terminal.accessStartTime = Date.now();
        }

        // Reset after some time if accessed
        if (terminal.isAccessed && Date.now() - terminal.accessStartTime > 3000) {
          terminal.isAccessed = false;
        }
      });

      // === Treasure Chest Interaction ===
      const chestX = 19300;
      const chestY = 340;
      const chestWidth = 100;
      const chestHeight = 60;

      // Calculate distance to chest
      const dx = p.x + p.width / 2 - (chestX + chestWidth / 2);
      const dy = p.y + p.height / 2 - (chestY + chestHeight / 2);
      const distanceToChest = Math.sqrt(dx * dx + dy * dy);

      // Check if player is near the chest (within 150 pixels)
      const isNearChest = distanceToChest < 150;

      // Update openProgress based on proximity
      if (isNearChest && !chestState.current.resumeCollected) {
        // Open the chest when player is nearby
        chestState.current.openProgress = Math.min(chestState.current.openProgress + 0.02 * timeScale, 1);
      } else {
        // Close the chest when player moves away
        chestState.current.openProgress = Math.max(chestState.current.openProgress - 0.03 * timeScale, 0);
      }

      // Check if player can collect resume
      if (isNearChest && k.jumpPressed && chestState.current.openProgress > 0.7 && !chestState.current.resumeCollected) {
        // Collect the resume
        chestState.current.resumeCollected = true;
  
        console.log("Resume collected!");
        setShowResumeModal(true);
      } else {
        // Player can't collect resume
        chestState.current.resumeCollected = false;
      }

      // === Jump mechanics ===

      // Update facing direction
      if (p.velocityX > 0) p.facing = 'right';
      if (p.velocityX < 0) p.facing = 'left';
      
      if (p.onGround) {
        p.coyoteTime = 5; // frames of coyote time
      } else if (p.coyoteTime > 0) {
        p.coyoteTime--;
      }

      if (k.jumpPressed) {
        p.jumpBuffer = 5; // frames of jump buffer
      } else if (p.jumpBuffer > 0) {
        p.jumpBuffer--;
      }

      if (p.jumpBuffer > 0 && (p.coyoteTime > 0 || p.onWall)) {
        if (p.onWall) {
          // Wall jump
          p.velocityX = p.lastWallSide === 'left' ? WALL_JUMP_FORCE_X : -WALL_JUMP_FORCE_X;
          p.velocityY = WALL_JUMP_FORCE_Y;
          p.onWall = false;
        } else {
          // Normal jump
          p.velocityY = JUMP_FORCE;
          p.onGround = false;
          p.isJumping = true;
        }      
        p.jumpBuffer = 0;
        p.coyoteTime = 0;
        SOUNDS.jump.play();
        k.jumpPressed = false;
      }

      // === Death and Respawn ===
      const DEATH_ZONE = GROUND_Y + 500; // Adjust based on your level design

      // Update last safe position when on ground
      if (p.onGround) {
        p.lastSafeX = p.x;
        p.lastSafeY = p.y;
      }

      if (p.y - cameraOffset.current.y > DEATH_ZONE) {
        // Respawn at last safe position
        p.x = Math.max(50, p.lastSafeX || 50); // Minimum 50px from left
        p.y = GROUND_Y - 800; // canvas top
        p.velocityY = 0;
        p.velocityX = 0;
      }

      if (checkCollision(p, PLATFORMS)) {
        shouldRedraw.current = true;
      }

      // === Update camera position (center on player with some lookahead) ===
      const isLandscape = window.innerWidth > window.innerHeight;
      const horizontalLookahead = p.facing === 'right' ? 100 : -100;

      // Vertical offset adapts to orientation
      let verticalOffset;
      if (isLandscape) {
        // In landscape → less lift, keep player closer to true center
        verticalOffset = window.innerHeight * 0.15; // ~15% of screen height
      } else {
        // In portrait → more lift, so player isn't at bottom
        verticalOffset = window.innerHeight * 0.25; // ~25% of screen height
      }
      
      const targetX = p.x - window.innerWidth / 2 + horizontalLookahead;
      const targetY = p.y - window.innerHeight / 2 - verticalOffset;

      cameraOffset.current = {
        x: cameraOffset.current.x + (targetX - cameraOffset.current.x) * 0.1,
        y: cameraOffset.current.y + (targetY - cameraOffset.current.y) * 0.1
      };
  }, [cameraOffset]);

  const drawMountainRegion = useCallback((ctx, camX, camY, tierIndex) => {
    CanvasData.drawMountains(ctx, camX, camY, tierIndex);
    CanvasData.drawRivers(ctx, camX, camY);
    CanvasData.drawTrees(ctx, camX, camY, tierIndex);
  });

  const drawSnowRegion = useCallback((ctx, camX, camY, tierIndex) => {
    if (camX >= REGION_BOUNDARIES.SNOW.start && camX <= REGION_BOUNDARIES.SNOW.end) {
      CanvasData.drawMountains(ctx, camX, camY, tierIndex);
      CanvasData.drawRivers(ctx, camX, camY);
      ObjectData.drawIgloos(ctx, camX, camY);
      ObjectData.drawWoodenCrates(ctx, camX, camY);
      CanvasData.drawTrees(ctx, camX, camY, tierIndex);
      ObjectData.drawSnowHouse(ctx, 3910, GROUND_Y - 100, 120, 100, camX, camY);
      ObjectData.drawPineTree(ctx, camX, camY);
      ObjectData.drawSnowDude(ctx, camX, camY, 3860, GROUND_Y - 105, 40, '#5A6E8C', '#E6F3FF');
      ObjectData.drawSnowDude(ctx, camX, camY, 3830, GROUND_Y - 105, 40, '#7C5E4A', '#E6F3FF');
      ObjectData.drawSledDog(ctx, camX, camY, 3880, GROUND_Y - 110, 1, '#C4C4C4');
      ObjectData.drawSledDog(ctx, camX, camY, 3910, GROUND_Y - 110, 1, '#A08E7E');
      CanvasData.drawServerRacks(ctx, camX, camY);
    }
  });

  const drawVolcanicRegion = useCallback((ctx, camX, camY, tierIndex) => {
    if (camX >= REGION_BOUNDARIES.VOLCANIC.start && camX <= REGION_BOUNDARIES.VOLCANIC.end) {
      CanvasData.drawMountains(ctx, camX, camY, tierIndex);
      CanvasData.drawRivers(ctx, camX, camY);
      CanvasData.drawTrees(ctx, camX, camY, tierIndex);
      ObjectData.drawConveyorBelt(ctx, camX, camY);
      ObjectData.drawPrison(ctx, camX, camY);
      ObjectData.drawTankWagon(ctx, camX, camY);
      ObjectData.drawPurpleCrystalField(ctx, camX, camY);
      ObjectData.drawFloatingRockRings(ctx, camX, camY);
    }
  });

  const drawCyberpunkRegion = useCallback((ctx, camX, camY, elapsedTime) => {
    if (camX >= REGION_BOUNDARIES.CYBERPUNK.start && camX <= REGION_BOUNDARIES.CYBERPUNK.end) {
      CanvasData.drawRivers(ctx, camX, camY);
      ObjectData.drawConveyorBelt(ctx, camX, camY);
      ObjectData.drawSteelBridge(ctx, camX, camY);
      ObjectData.drawCyberpunkBuilding(ctx, camX, camY);
      ObjectData.AnimatedNeonSign(ctx, camX, camY, elapsedTime);
      ObjectData.drawMaintenanceHatches(ctx, camX, camY);
      ObjectData.drawCableJunctionBoxes(ctx, camX, camY);
      ObjectData.drawPhoneBooths(ctx, camX, camY);
      ObjectData.drawCyberpunkElevatorDoor(ctx, camX, camY);
      ObjectData.drawVendingMachine(ctx, camX, camY);
      ObjectData.drawLightPosts(ctx, camX, camY);
      ObjectData.drawCyberpunkFactory(ctx, camX, camY);
      ObjectData.drawDataTower(ctx, camX, camY);
      ObjectData.drawWallTerminal(ctx, camX, camY);
      ObjectData.drawNeonTubes(ctx, camX, camY);
      ObjectData.drawDigitalBillboard(ctx, camX, camY);
      ObjectData.drawATMUnits(ctx, camX, camY);
      ObjectData.drawDroneStations(ctx, camX, camY);
      ObjectData.drawPowerPanels(ctx, camX, camY);
    }
  });

  const drawIndustrialRegion = useCallback((ctx, camX, camY, tierIndex) => {
    if (camX >= REGION_BOUNDARIES.INDUSTRIAL.start && camX <= REGION_BOUNDARIES.INDUSTRIAL.end) {
      CanvasData.drawRivers(ctx, camX, camY);
      ObjectData.drawConveyorBelt(ctx, camX, camY);
      CanvasData.drawTrees(ctx, camX, camY, tierIndex);
      ObjectData.drawJunctionTowers(ctx, camX, camY);
      ObjectData.drawTransformerBoxes(ctx, camX, camY);
      ObjectData.drawServiceSheds(ctx, camX, camY);
      ObjectData.drawCableReels(ctx, camX, camY);
      ObjectData.drawMaintenanceLockers(ctx, camX, camY);
      ObjectData.drawIndustryBuildings(ctx, camX, camY);
      ObjectData.drawSmokestacks(ctx, camX, camY);
      ObjectData.drawCoolingFans(ctx, camX, camY);
      ObjectData.drawHighVoltageFences(ctx, camX, camY);
      ObjectData.drawIndustrialLightPoles(ctx, camX, camY);
      ObjectData.drawFuelPumpStations(ctx, camX, camY);
      ObjectData.drawPumpHouses(ctx, camX, camY);
      ObjectData.drawOilDrumStacks(ctx, camX, camY);
      ObjectData.drawOilStations(ctx, camX, camY);
      ObjectData.drawMaintenanceCarts(ctx, camX, camY);
      ObjectData.drawToolBenches(ctx, camX, camY);
      ObjectData.drawMonorail(ctx, camX, camY);
      ObjectData.drawTicketCounter(ctx, camX, camY);
      ObjectData.drawExitBooths(ctx, camX, camY);
      ObjectData.drawMobileCranes(ctx, camX, camY);
      ObjectData.drawPipeBridges(ctx, camX, camY);
      ObjectData.drawChemicalTanks(ctx, camX, camY);
      ObjectData.drawControlContainers(ctx, camX, camY);
    }
  });

  const drawGoldenCave = useCallback((ctx, camX, camY, tierIndex, chestState) => {
    const playerX = player.current.x;
    const playerY = player.current.y;

    if (camX >= REGION_BOUNDARIES.GOLDEN_CAVE.start && camX <= REGION_BOUNDARIES.GOLDEN_CAVE.end) {
      CanvasData.drawRivers(ctx, camX, camY);
      ObjectData.drawConveyorBelt(ctx, camX, camY);
      CanvasData.drawTrees(ctx, camX, camY, tierIndex);
      ObjectData.drawStonePillars(ctx, camX, camY);
      ObjectData.drawGuardianStatues(ctx, camX, camY);
      ObjectData.drawEngravedWalls(ctx, camX, camY);
      ObjectData.drawTorches(ctx, camX, camY);
      ObjectData.drawCaveWaterfall(ctx, camX, camY);
      ObjectData.drawObelisks(ctx, camX, camY, playerX, playerY);
      ObjectData.drawGlowDecorations(ctx, camX, camY);
      ObjectData.drawTreasureChest(ctx, camX, camY, chestState.current.openProgress, chestState.current.resumeCollected); 
    }
  });

  const drawGame = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const camX = cameraOffset.current.x;
    const camY = cameraOffset.current.y;

    ctx.save();

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const tierIndex = getCurrentTier();
    const tier = BACKGROUND_TIERS[getCurrentTier()];

    const currentRegion = getCurrentRegion(camX);
    const elapsedTime = Date.now() - startTime;

    // Draw sky gradient
    const skyGradient = ctx.createLinearGradient(0, 0, 0, GROUND_Y);
    skyGradient.addColorStop(0, tier.sky);
    skyGradient.addColorStop(1, tier.sky);
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, canvas.width, GROUND_Y - camY);

    // Cover the unleft side of the canvas
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, GROUND_Y - camY - 1, canvas.width, canvas.height - GROUND_Y + camY + 1);

    // Draw Regions based on current camera position
    switch(currentRegion) {
      case 'MOUNTAIN':
        drawMountainRegion(ctx, camX, camY, tierIndex);
        break;
      case 'SNOW':
        drawSnowRegion(ctx, camX, camY, tierIndex);
        break;
      case 'VOLCANIC':
        drawVolcanicRegion(ctx, camX, camY, tierIndex);
        break;
      case 'CYBERPUNK':
        drawVolcanicRegion(ctx, camX, camY, tierIndex);
        drawCyberpunkRegion(ctx, camX, camY, tierIndex, elapsedTime);
        break;
      case 'INDUSTRIAL':
        drawCyberpunkRegion(ctx, camX, camY, tierIndex, elapsedTime);
        drawIndustrialRegion(ctx, camX, camY, tierIndex);
        break;
      case 'GOLDEN_CAVE':
        drawIndustrialRegion(ctx, camX, camY, tierIndex);
        drawGoldenCave(ctx, camX, camY, tierIndex, chestState);
        break;
      default:
        drawMountainRegion(ctx, camX, camY, tierIndex);
    };

    // Draw Player and Collectibles
    CanvasData.drawOrbs(ctx, cameraOffset, collectedOrbs);
    CanvasData.drawSignposts(ctx, camX, camY);
    CanvasData.drawPlayer(ctx, player, camX, camY);

    // Draw Ground and Platforms
    CanvasData.drawGround(ctx, canvas, camX, camY, tier);
    CanvasData.drawPlatform(ctx, tier, camX, camY);

    ctx.restore();
  }, [cameraOffset, collectedOrbs, getCurrentTier]);

  useEffect(() => {
    function handleResize() {
      const canvas = canvasRef.current;
      const dpr = window.devicePixelRatio || 1;

      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      
      const ctx = canvas.getContext('2d');
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      setIsMobile(window.innerWidth < 768 || window.innerHeight < 500);
    }

    // Create debounced version (100ms delay)
    const debouncedResize = debounce(handleResize, 100);

    handleResize();
    window.addEventListener('resize', debouncedResize); // For continuous resizing

    return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('resize', debouncedResize);
        cancelAnimationFrame(gameLoopRef.current);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'ArrowLeft' || e.code === 'KeyA') keys.current.left = true;
      if (e.code === 'ArrowRight' || e.code === 'KeyD') keys.current.right = true;
      if ((e.code === 'Space' || e.code === 'ArrowUp') && !keys.current.jump) {
        keys.current.jump = true;
        keys.current.jumpPressed = true;
      }
    };

    const handleKeyUp = (e) => {
      if (e.code === 'ArrowLeft' || e.code === 'KeyA') keys.current.left = false;
      if (e.code === 'ArrowRight' || e.code === 'KeyD') keys.current.right = false;
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        keys.current.jump = false;
        keys.current.jumpPressed = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    // Initialize BGM
    playBGM();

    const gameLoop = () => {
      checkOrbCollision();
      update();
      drawGame();

      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoopRef.current = requestAnimationFrame(gameLoop);

    return () => {
      cancelAnimationFrame(gameLoopRef.current);
      
      // Stop All Music Instances
      SOUNDS.bgMusic.stop();
      SOUNDS.jump.stop();
      SOUNDS.land.stop();
      SOUNDS.select.stop();
    }
  }, [checkOrbCollision, update, drawGame]);

  const handleMobileMove = useCallback((dir) => {
    if (dir === 'left') {
      keys.current.left = true;
      keys.current.right = false;
    } else if (dir === 'right') {
      keys.current.right = true;
      keys.current.left = false;
    }
  });

  const stopMobileMove = () => {
    keys.current.left = false;
    keys.current.right = false;
  };

  const handleJump = () => {
    keys.current.jump = true;
    keys.current.jumpPressed = true;
    setTimeout(() => keys.current.jumpPressed = false, 200);
    if (navigator.vibrate) navigator.vibrate?.(50); // Mobile vibration
  };

  return (
    <>
      <canvas aria-label="Interactive Platformer Resume" ref={canvasRef} style={{ display: 'block', width: '100vw', height: '100vh' }} />
      {/* Progress Tracker (Top-Right) */}
      <div className="skills-tracker">
        <div className="progress">
          {collectedOrbs.current.length}/{ORBS.length} Skills Collected
        </div>
        <div className="skills-grid">
          {ORBS.map((orb, index) => (
            <div 
              key={index}
              className={`skill-orb ${collectedOrbs.current.includes(index) ? 'collected' : ''}`}
              style={{ backgroundColor: orb.color }}
              title={orb.label}
            />
          ))}
        </div>
      </div>
      <div className="level-tracker">
        <div className="level-bar">
          <div style={{ 
            width: `${(collectedOrbs.current.length / ORBS.length) * 100}%`,
            background: `linear-gradient(to right, ${BACKGROUND_TIERS[0].sky}, ${BACKGROUND_TIERS[BACKGROUND_TIERS.length-1].sky})`
          }} />
        </div>
        <div className="level-title">
          {BACKGROUND_TIERS[getCurrentTier()].text}
        </div>
      </div>
      {isMobile && (
        <div style={{ position: 'fixed', bottom: 20, left: 0, right: 0, display: 'flex', justifyContent: 'space-between', padding: '0 20px', touchAction: 'manipulation', zIndex: 100 }}>
          <button style={{ padding: '15px 25px', fontSize: '20px', backgroundColor: 'rgba(0,0,0,0.3)', border: 'none', borderRadius: '10px', color: 'white' }} onTouchStart={() => handleMobileMove('left')} onTouchEnd={stopMobileMove}>⬅</button>
          <button style={{ padding: '15px 25px', fontSize: '20px', backgroundColor: 'rgba(0,0,0,0.3)', border: 'none', borderRadius: '10px', color: 'white' }} onTouchStart={handleJump}>⬆</button>
          <button style={{ padding: '15px 25px', fontSize: '20px', backgroundColor: 'rgba(0,0,0,0.3)', border: 'none', borderRadius: '10px', color: 'white' }} onTouchStart={() => handleMobileMove('right')} onTouchEnd={stopMobileMove}>➡</button>
        </div>
      )}
      {showModal && (
        <ModalInfo onClose={() => setShowModal(false)}>
          {activeModal}
        </ModalInfo>
      )}
      {/* Info Popup */}
      {showInfo && (
        <div className="skill-info">
          <div className="skill-title">{ORBS.find(o => o.content === showInfo)?.label}</div>
          {showInfo}
        </div>
      )}
      {showResumeModal && <ResumeModal isOpen={showResumeModal} onClose={() => setShowResumeModal(false)} />}
    </>
  );
};

export default React.memo(GameCanvas);