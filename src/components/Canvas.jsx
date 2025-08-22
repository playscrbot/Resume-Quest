import { MOUNTAINS, ORBS, PLATFORMS, TREES, RIVERS, SIGNS } from './Constants';
import { SERVER_RACKS } from './GameObjects';

const ORB_RADIUS = 18;

const drawGround = (ctx, canvas, camX, camY, tier) => {
  ctx.save();

  // Draw ground
  PLATFORMS.forEach(platform => {
    if (platform.type === 'ground') {
      ctx.fillStyle = tier.ground;
        
      // Draw the platform top
      ctx.fillRect(
        platform.x - camX - 1,
        platform.y - camY,
        platform.width + 1,
        platform.height
      );

      // Draw the "ground column" down to bottom of screen
      ctx.fillRect(
        platform.x - camX - 1,
        platform.y - camY + platform.height,
        platform.width + 1,
        canvas.height - (platform.y - camY + platform.height)
      );
    }

    if (platform.type === 'layered') {
      const drawX = platform.x - camX;
      const drawY = platform.y - camY;

      // Platform top
      ctx.fillStyle = tier.platformColor;
      ctx.fillRect(drawX, drawY, platform.width, platform.height);

      // Platform shadow (perspective-aware)
      const shadowHeight = Math.max(3, platform.height / 4);
      ctx.fillStyle = 'rgba(0,0,0,0.15)';
      ctx.beginPath();
      ctx.moveTo(drawX + 3, drawY + platform.height);
      ctx.lineTo(drawX + platform.width + 3, drawY + platform.height);
      ctx.lineTo(drawX + platform.width, drawY + platform.height + shadowHeight);
      ctx.lineTo(drawX, drawY + platform.height + shadowHeight);
      ctx.closePath();
      ctx.fill();

      // Platform ground layer (down to drawX)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height,
        platform.width + 1,
        platform.height
      );
    }

    if (platform.type === 'double-layered') {
      const drawX = platform.x - camX;
      const drawY = platform.y - camY;

      // Platform top
      ctx.fillStyle = tier.platformColor;
      ctx.fillRect(drawX, drawY, platform.width, platform.height);

      // Platform shadow (perspective-aware)
      const shadowHeight = Math.max(3, platform.height / 4);
      ctx.fillStyle = 'rgba(0,0,0,0.15)';
      ctx.beginPath();
      ctx.moveTo(drawX + 3, drawY + platform.height);
      ctx.lineTo(drawX + platform.width + 3, drawY + platform.height);
      ctx.lineTo(drawX + platform.width, drawY + platform.height + shadowHeight);
      ctx.lineTo(drawX, drawY + platform.height + shadowHeight);
      ctx.closePath();
      ctx.fill();

      // Platform ground layer (1st one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height,
        platform.width + 1,
        platform.height
      );

      // Platform ground layer (Down to 1st one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 2 - 1,
        platform.width + 1,
        platform.height + 1
      );
    }

    if (platform.type === 'triple-layered') {
      const drawX = platform.x - camX;
      const drawY = platform.y - camY;

      // Platform top
      ctx.fillStyle = tier.platformColor;
      ctx.fillRect(drawX, drawY, platform.width, platform.height);

      // Platform shadow (perspective-aware)
      const shadowHeight = Math.max(3, platform.height / 4);
      ctx.fillStyle = 'rgba(0,0,0,0.15)';
      ctx.beginPath();
      ctx.moveTo(drawX + 3, drawY + platform.height);
      ctx.lineTo(drawX + platform.width + 3, drawY + platform.height);
      ctx.lineTo(drawX + platform.width, drawY + platform.height + shadowHeight);
      ctx.lineTo(drawX, drawY + platform.height + shadowHeight);
      ctx.closePath();
      ctx.fill();

      // Platform ground layer (1st one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height,
        platform.width + 1,
        platform.height
      );

      // Platform ground layer (Down to 1st one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 2 - 1,
        platform.width + 1,
        platform.height + 1
      );

      // Platform ground layer (Down to 2nd one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 3 - 1,
        platform.width + 1,
        platform.height + 1
      );
    }

    if (platform.type === 'four-layered') {
      const drawX = platform.x - camX;
      const drawY = platform.y - camY;

      // Platform top
      ctx.fillStyle = tier.platformColor;
      ctx.fillRect(drawX, drawY, platform.width, platform.height);

      // Platform shadow (perspective-aware)
      const shadowHeight = Math.max(3, platform.height / 4);
      ctx.fillStyle = 'rgba(0,0,0,0.15)';
      ctx.beginPath();
      ctx.moveTo(drawX + 3, drawY + platform.height);
      ctx.lineTo(drawX + platform.width + 3, drawY + platform.height);
      ctx.lineTo(drawX + platform.width, drawY + platform.height + shadowHeight);
      ctx.lineTo(drawX, drawY + platform.height + shadowHeight);
      ctx.closePath();
      ctx.fill();

      // Platform ground layer (1st one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height,
        platform.width + 1,
        platform.height
      );

      // Platform ground layer (Down to 1st one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 2 - 1,
        platform.width + 1,
        platform.height + 1
      );

      // Platform ground layer (Down to 2nd one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 3 - 1,
        platform.width + 1,
        platform.height + 1
      );

      // Platform ground layer (Down to 3rd one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 4 - 1,
        platform.width + 1,
        platform.height + 1
      );
    }

    if (platform.type === 'five-layered') {
      const drawX = platform.x - camX;
      const drawY = platform.y - camY;

      // Platform top
      ctx.fillStyle = tier.platformColor;
      ctx.fillRect(drawX, drawY, platform.width, platform.height);

      // Platform shadow (perspective-aware)
      const shadowHeight = Math.max(3, platform.height / 4);
      ctx.fillStyle = 'rgba(0,0,0,0.15)';
      ctx.beginPath();
      ctx.moveTo(drawX + 3, drawY + platform.height);
      ctx.lineTo(drawX + platform.width + 3, drawY + platform.height);
      ctx.lineTo(drawX + platform.width, drawY + platform.height + shadowHeight);
      ctx.lineTo(drawX, drawY + platform.height + shadowHeight);
      ctx.closePath();
      ctx.fill();

      // Platform ground layer (1st one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height,
        platform.width + 1,
        platform.height
      );

      // Platform ground layer (Down to 1st one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 2 - 1,
        platform.width + 1,
        platform.height + 1
      );

      // Platform ground layer (Down to 2nd one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 3 - 1,
        platform.width + 1,
        platform.height + 1
      );

      // Platform ground layer (Down to 3rd one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 4 - 1,
        platform.width + 1,
        platform.height + 1
      );

      // Platform ground layer (Down to 4th one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 5 - 1,
        platform.width + 1,
        platform.height + 1
      );
    }

    if (platform.type === 'six-layered') {
      const drawX = platform.x - camX;
      const drawY = platform.y - camY;

      // Platform top
      ctx.fillStyle = tier.platformColor;
      ctx.fillRect(drawX, drawY, platform.width, platform.height);

      // Platform shadow (perspective-aware)
      const shadowHeight = Math.max(3, platform.height / 4);
      ctx.fillStyle = 'rgba(0,0,0,0.15)';
      ctx.beginPath();
      ctx.moveTo(drawX + 3, drawY + platform.height);
      ctx.lineTo(drawX + platform.width + 3, drawY + platform.height);
      ctx.lineTo(drawX + platform.width, drawY + platform.height + shadowHeight);
      ctx.lineTo(drawX, drawY + platform.height + shadowHeight);
      ctx.closePath();
      ctx.fill();

      // Platform ground layer (1st one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height,
        platform.width + 1,
        platform.height
      );

      // Platform ground layer (Down to 1st one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 2 - 1,
        platform.width + 1,
        platform.height + 1
      );

      // Platform ground layer (Down to 2nd one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 3 - 1,
        platform.width + 1,
        platform.height + 1
      );

      // Platform ground layer (Down to 3rd one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 4 - 1,
        platform.width + 1,
        platform.height + 1
      );

      // Platform ground layer (Down to 4th one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 5 - 1,
        platform.width + 1,
        platform.height + 1
      );

      // Platform ground layer (Down to 5th one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 6 - 1,
        platform.width + 1,
        platform.height + 1
      );
    }

    if (platform.type === 'seven-layered') {
      const drawX = platform.x - camX;
      const drawY = platform.y - camY;

      // Platform top
      ctx.fillStyle = tier.platformColor;
      ctx.fillRect(drawX, drawY, platform.width, platform.height);

      // Platform shadow (perspective-aware)
      const shadowHeight = Math.max(3, platform.height / 4);
      ctx.fillStyle = 'rgba(0,0,0,0.15)';
      ctx.beginPath();
      ctx.moveTo(drawX + 3, drawY + platform.height);
      ctx.lineTo(drawX + platform.width + 3, drawY + platform.height);
      ctx.lineTo(drawX + platform.width, drawY + platform.height + shadowHeight);
      ctx.lineTo(drawX, drawY + platform.height + shadowHeight);
      ctx.closePath();
      ctx.fill();

      // Platform ground layer (1st one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height,
        platform.width + 1,
        platform.height
      );

      // Platform ground layer (Down to 1st one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 2 - 1,
        platform.width + 1,
        platform.height + 1
      );

      // Platform ground layer (Down to 2nd one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 3 - 1,
        platform.width + 1,
        platform.height + 1
      );

      // Platform ground layer (Down to 3rd one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 4 - 1,
        platform.width + 1,
        platform.height + 1
      );

      // Platform ground layer (Down to 4th one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 5 - 1,
        platform.width + 1,
        platform.height + 1
      );

      // Platform ground layer (Down to 5th one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 6 - 1,
        platform.width + 1,
        platform.height + 1
      );

      // Platform ground layer (Down to 6th one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 7 - 1,
        platform.width + 1,
        platform.height + 1
      );
    }

    if (platform.type === 'eight-layered') {
      const drawX = platform.x - camX;
      const drawY = platform.y - camY;

      // Platform top
      ctx.fillStyle = tier.platformColor;
      ctx.fillRect(drawX, drawY, platform.width, platform.height);

      // Platform shadow (perspective-aware)
      const shadowHeight = Math.max(3, platform.height / 4);
      ctx.fillStyle = 'rgba(0,0,0,0.15)';
      ctx.beginPath();
      ctx.moveTo(drawX + 3, drawY + platform.height);
      ctx.lineTo(drawX + platform.width + 3, drawY + platform.height);
      ctx.lineTo(drawX + platform.width, drawY + platform.height + shadowHeight);
      ctx.lineTo(drawX, drawY + platform.height + shadowHeight);
      ctx.closePath();
      ctx.fill();

      // Platform ground layer (1st one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height,
        platform.width + 1,
        platform.height
      );

      // Platform ground layer (Down to 1st one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 2 - 1,
        platform.width + 1,
        platform.height + 1
      );

      // Platform ground layer (Down to 2nd one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 3 - 1,
        platform.width + 1,
        platform.height + 1
      );

      // Platform ground layer (Down to 3rd one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 4 - 1,
        platform.width + 1,
        platform.height + 1
      );

      // Platform ground layer (Down to 4th one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 5 - 1,
        platform.width + 1,
        platform.height + 1
      );

      // Platform ground layer (Down to 5th one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 6 - 1,
        platform.width + 1,
        platform.height + 1
      );

      // Platform ground layer (Down to 6th one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 7 - 1,
        platform.width + 1,
        platform.height + 1
      );

      // Platform ground layer (Down to 7th one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 8 - 1,
        platform.width + 1,
        platform.height + 1
      );
    }

    if (platform.type === 'nine-layered') {
      const drawX = platform.x - camX;
      const drawY = platform.y - camY;

      // Platform top
      ctx.fillStyle = tier.platformColor;
      ctx.fillRect(drawX, drawY, platform.width, platform.height);

      // Platform shadow (perspective-aware)
      const shadowHeight = Math.max(3, platform.height / 4);
      ctx.fillStyle = 'rgba(0,0,0,0.15)';
      ctx.beginPath();
      ctx.moveTo(drawX + 3, drawY + platform.height);
      ctx.lineTo(drawX + platform.width + 3, drawY + platform.height);
      ctx.lineTo(drawX + platform.width, drawY + platform.height + shadowHeight);
      ctx.lineTo(drawX, drawY + platform.height + shadowHeight);
      ctx.closePath();
      ctx.fill();

      // Platform ground layer (1st one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height,
        platform.width + 1,
        platform.height
      );

      // Platform ground layer (Down to 1st one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 2 - 1,
        platform.width + 1,
        platform.height + 1
      );

      // Platform ground layer (Down to 2nd one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 3 - 1,
        platform.width + 1,
        platform.height + 1
      );

      // Platform ground layer (Down to 3rd one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 4 - 1,
        platform.width + 1,
        platform.height + 1
      );

      // Platform ground layer (Down to 4th one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 5 - 1,
        platform.width + 1,
        platform.height + 1
      );

      // Platform ground layer (Down to 5th one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 6 - 1,
        platform.width + 1,
        platform.height + 1
      );

      // Platform ground layer (Down to 6th one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 7 - 1,
        platform.width + 1,
        platform.height + 1
      );

      // Platform ground layer (Down to 7th one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 8 - 1,
        platform.width + 1,
        platform.height + 1
      );
    }

    if (platform.type === 'ten-layered') {
      const drawX = platform.x - camX;
      const drawY = platform.y - camY;

      // Platform top
      ctx.fillStyle = tier.platformColor;
      ctx.fillRect(drawX, drawY, platform.width, platform.height);

      // Platform shadow (perspective-aware)
      const shadowHeight = Math.max(3, platform.height / 4);
      ctx.fillStyle = 'rgba(0,0,0,0.15)';
      ctx.beginPath();
      ctx.moveTo(drawX + 3, drawY + platform.height);
      ctx.lineTo(drawX + platform.width + 3, drawY + platform.height);
      ctx.lineTo(drawX + platform.width, drawY + platform.height + shadowHeight);
      ctx.lineTo(drawX, drawY + platform.height + shadowHeight);
      ctx.closePath();
      ctx.fill();

      // Platform ground layer (1st one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height,
        platform.width + 1,
        platform.height
      );

      // Platform ground layer (Down to 1st one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 2 - 1,
        platform.width + 1,
        platform.height + 1
      );

      // Platform ground layer (Down to 2nd one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 3 - 1,
        platform.width + 1,
        platform.height + 1
      );

      // Platform ground layer (Down to 3rd one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 4 - 1,
        platform.width + 1,
        platform.height + 1
      );

      // Platform ground layer (Down to 4th one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 5 - 1,
        platform.width + 1,
        platform.height + 1
      );

      // Platform ground layer (Down to 5th one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 6 - 1,
        platform.width + 1,
        platform.height + 1
      );

      // Platform ground layer (Down to 6th one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 7 - 1,
        platform.width + 1,
        platform.height + 1
      );

      // Platform ground layer (Down to 7th one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 8 - 1,
        platform.width + 1,
        platform.height + 1
      );

      // Platform ground layer (Down to 8th one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 9 - 1,
        platform.width + 1,
        platform.height + 1
      );
    }

    if (platform.type === 'eleven-layered') {
      const drawX = platform.x - camX;
      const drawY = platform.y - camY;

      // Platform top
      ctx.fillStyle = tier.platformColor;
      ctx.fillRect(drawX, drawY, platform.width, platform.height);

      // Platform shadow (perspective-aware)
      const shadowHeight = Math.max(3, platform.height / 4);
      ctx.fillStyle = 'rgba(0,0,0,0.15)';
      ctx.beginPath();
      ctx.moveTo(drawX + 3, drawY + platform.height);
      ctx.lineTo(drawX + platform.width + 3, drawY + platform.height);
      ctx.lineTo(drawX + platform.width, drawY + platform.height + shadowHeight);
      ctx.lineTo(drawX, drawY + platform.height + shadowHeight);
      ctx.closePath();
      ctx.fill();

      // Platform ground layer (1st one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height,
        platform.width + 1,
        platform.height
      );

      // Platform ground layer (Down to 1st one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 2 - 1,
        platform.width + 1,
        platform.height + 1
      );

      // Platform ground layer (Down to 2nd one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 3 - 1,
        platform.width + 1,
        platform.height + 1
      );

      // Platform ground layer (Down to 3rd one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 4 - 1,
        platform.width + 1,
        platform.height + 1
      );

      // Platform ground layer (Down to 4th one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 5 - 1,
        platform.width + 1,
        platform.height + 1
      );

      // Platform ground layer (Down to 5th one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 6 - 1,
        platform.width + 1,
        platform.height + 1
      );

      // Platform ground layer (Down to 6th one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 7 - 1,
        platform.width + 1,
        platform.height + 1
      );

      // Platform ground layer (Down to 7th one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 8 - 1,
        platform.width + 1,
        platform.height + 1
      );

      // Platform ground layer (Down to 8th one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 9 - 1,
        platform.width + 1,
        platform.height + 1
      );

      // Platform ground layer (Down to 9th one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 10 - 1,
        platform.width + 1,
        platform.height + 1
      );
    }

    if (platform.type === 'twelve-layered') {
      const drawX = platform.x - camX;
      const drawY = platform.y - camY;

      // Platform top
      ctx.fillStyle = tier.platformColor;
      ctx.fillRect(drawX, drawY, platform.width, platform.height);

      // Platform shadow (perspective-aware)
      const shadowHeight = Math.max(3, platform.height / 4);
      ctx.fillStyle = 'rgba(0,0,0,0.15)';
      ctx.beginPath();
      ctx.moveTo(drawX + 3, drawY + platform.height);
      ctx.lineTo(drawX + platform.width + 3, drawY + platform.height);
      ctx.lineTo(drawX + platform.width, drawY + platform.height + shadowHeight);
      ctx.lineTo(drawX, drawY + platform.height + shadowHeight);
      ctx.closePath();
      ctx.fill();

      // Platform ground layer (1st one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height,
        platform.width + 1,
        platform.height
      );

      // Platform ground layer (Down to 1st one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 2 - 1,
        platform.width + 1,
        platform.height + 1
      );

      // Platform ground layer (Down to 2nd one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 3 - 1,
        platform.width + 1,
        platform.height + 1
      );

      // Platform ground layer (Down to 3rd one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 4 - 1,
        platform.width + 1,
        platform.height + 1
      );

      // Platform ground layer (Down to 4th one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 5 - 1,
        platform.width + 1,
        platform.height + 1
      );

      // Platform ground layer (Down to 5th one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 6 - 1,
        platform.width + 1,
        platform.height + 1
      );

      // Platform ground layer (Down to 6th one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 7 - 1,
        platform.width + 1,
        platform.height + 1
      );

      // Platform ground layer (Down to 7th one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 8 - 1,
        platform.width + 1,
        platform.height + 1
      );

      // Platform ground layer (Down to 8th one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 9 - 1,
        platform.width + 1,
        platform.height + 1
      );

      // Platform ground layer (Down to 9th one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 10 - 1,
        platform.width + 1,
        platform.height + 1
      );

      // Platform ground layer (Down to 10th one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 11 - 1,
        platform.width + 1,
        platform.height + 1
      );
    }

    if (platform.type === 'thirteen-layered') {
      const drawX = platform.x - camX;
      const drawY = platform.y - camY;

      // Platform top
      ctx.fillStyle = tier.platformColor;
      ctx.fillRect(drawX, drawY, platform.width, platform.height);

      // Platform shadow (perspective-aware)
      const shadowHeight = Math.max(3, platform.height / 4);
      ctx.fillStyle = 'rgba(0,0,0,0.15)';
      ctx.beginPath();
      ctx.moveTo(drawX + 3, drawY + platform.height);
      ctx.lineTo(drawX + platform.width + 3, drawY + platform.height);
      ctx.lineTo(drawX + platform.width, drawY + platform.height + shadowHeight);
      ctx.lineTo(drawX, drawY + platform.height + shadowHeight);
      ctx.closePath();
      ctx.fill();

      // Platform ground layer (1st one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height,
        platform.width + 1,
        platform.height
      );

      // Platform ground layer (Down to 1st one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 2 - 1,
        platform.width + 1,
        platform.height + 1
      );

      // Platform ground layer (Down to 2nd one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 3 - 1,
        platform.width + 1,
        platform.height + 1
      );

      // Platform ground layer (Down to 3rd one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 4 - 1,
        platform.width + 1,
        platform.height + 1
      );

      // Platform ground layer (Down to 4th one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 5 - 1,
        platform.width + 1,
        platform.height + 1
      );

      // Platform ground layer (Down to 5th one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 6 - 1,
        platform.width + 1,
        platform.height + 1
      );

      // Platform ground layer (Down to 6th one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 7 - 1,
        platform.width + 1,
        platform.height + 1
      );

      // Platform ground layer (Down to 7th one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 8 - 1,
        platform.width + 1,
        platform.height + 1
      );

      // Platform ground layer (Down to 8th one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 9 - 1,
        platform.width + 1,
        platform.height + 1
      );

      // Platform ground layer (Down to 9th one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 10 - 1,
        platform.width + 1,
        platform.height + 1
      );

      // Platform ground layer (Down to 10th one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 11 - 1,
        platform.width + 1,
        platform.height + 1
      );

      // Platform ground layer (Down to 11th one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 12 - 1,
        platform.width + 1,
        platform.height + 1
      );
    }

    if (platform.type === 'sixteen-layered') {
      const drawX = platform.x - camX;
      const drawY = platform.y - camY;

      // Platform top
      ctx.fillStyle = tier.platformColor;
      ctx.fillRect(drawX, drawY, platform.width, platform.height);

      // Platform shadow (perspective-aware)
      const shadowHeight = Math.max(3, platform.height / 4);
      ctx.fillStyle = 'rgba(0,0,0,0.15)';
      ctx.beginPath();
      ctx.moveTo(drawX + 3, drawY + platform.height);
      ctx.lineTo(drawX + platform.width + 3, drawY + platform.height);
      ctx.lineTo(drawX + platform.width, drawY + platform.height + shadowHeight);
      ctx.lineTo(drawX, drawY + platform.height + shadowHeight);
      ctx.closePath();
      ctx.fill();

      // Platform ground layer (1st one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height,
        platform.width + 1,
        platform.height
      );

      // Platform ground layer (Down to 1st one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 2 - 1,
        platform.width + 1,
        platform.height + 1
      );

      // Platform ground layer (Down to 2nd one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 3 - 1,
        platform.width + 1,
        platform.height + 1
      );

      // Platform ground layer (Down to 3rd one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 4 - 1,
        platform.width + 1,
        platform.height + 1
      );

      // Platform ground layer (Down to 4th one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 5 - 1,
        platform.width + 1,
        platform.height + 1
      );

      // Platform ground layer (Down to 5th one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 6 - 1,
        platform.width + 1,
        platform.height + 1
      );

      // Platform ground layer (Down to 6th one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 7 - 1,
        platform.width + 1,
        platform.height + 1
      );

      // Platform ground layer (Down to 7th one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 8 - 1,
        platform.width + 1,
        platform.height + 1
      );

      // Platform ground layer (Down to 8th one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 9 - 1,
        platform.width + 1,
        platform.height + 1
      );

      // Platform ground layer (Down to 9th one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 10 - 1,
        platform.width + 1,
        platform.height + 1
      );

      // Platform ground layer (Down to 10th one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 11 - 1,
        platform.width + 1,
        platform.height + 1
      );

      // Platform ground layer (Down to 11th one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 12 - 1,
        platform.width + 1,
        platform.height + 1
      );

      // Platform ground layer (Down to 12th one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 13 - 1,
        platform.width + 1,
        platform.height + 1
      );

      // Platform ground layer (Down to 13th one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 14 - 1,
        platform.width + 1,
        platform.height + 1
      );

      // Platform ground layer (Down to 14th one)
      ctx.fillStyle = tier.ground;
      ctx.fillRect(
        drawX - 1,
        drawY + platform.height * 15 - 1,
        platform.width + 1,
        platform.height + 1
      );
    }

    ctx.restore();
  });
};

const drawPlatform = (ctx, tier, camX, camY) => {
  PLATFORMS.forEach(platform => {
    const drawX = platform.x - camX;
    const drawY = platform.y - camY;

    ctx.save();

    // Platform base
    ctx.fillStyle = tier.platformColor;
    ctx.fillRect(drawX - 1, drawY, platform.width + 1, platform.height);

    // Platform shadow (perspective-aware)
    const shadowHeight = Math.max(3, platform.height / 4);
    ctx.fillStyle = 'rgba(0,0,0,0.15)';
    ctx.beginPath();
    ctx.moveTo(drawX + 3, drawY + platform.height);
    ctx.lineTo(drawX + platform.width + 3, drawY + platform.height);
    ctx.lineTo(drawX + platform.width, drawY + platform.height + shadowHeight);
    ctx.lineTo(drawX, drawY + platform.height + shadowHeight);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  });
};

const drawPlayer = (ctx, player, camX, camY) => {
  ctx.save();

  // Draw player
  ctx.fillStyle = '#FFD700';
  ctx.fillRect(
    player.current.x - camX,
    player.current.y - camY,
    player.current.width,
    player.current.height
  );
            
  // Player eyes (simple face)
  ctx.fillStyle = '#000';
  const eyeOffset = player.current.facing === 'right' ? 15 : 5;
  ctx.beginPath();
  ctx.arc(
    player.current.x - camX + eyeOffset,
    player.current.y - camY + 15,
    3, 0, Math.PI * 2
  );
  ctx.arc(
    player.current.x - camX + eyeOffset + 10,
    player.current.y - camY + 15,
    3, 0, Math.PI * 2
  );
  ctx.fill();

  ctx.restore();
};

const drawSignposts = (ctx, camX, camY) => {
  // Draw signs
  SIGNS.forEach(sign => {
    ctx.save();

    // Sign post
    ctx.fillStyle = '#fff';
    ctx.fillRect(
      sign.x - camX + sign.width/2 - 6,
      sign.y - camY,
      12,
      sign.height
    );
                
    // Sign board
    ctx.fillStyle = '#8B4513';
    ctx.beginPath();
    ctx.roundRect(
      sign.x - camX,
      sign.y - camY,
      sign.width,
      30,
      5
    );
    ctx.fill();

    // Board border
    ctx.strokeStyle = '#f9f1ecff';
    ctx.lineWidth = 3;
    ctx.stroke();
                
    // Sign text
    ctx.font = 'bold 16px "Segoe UI", Arial'; // More modern font
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.fillText(
      sign.label,
      sign.x - camX + sign.width/2,
      sign.y - camY + 20
    );

    ctx.restore();
  });
};

const drawRivers = (ctx, camX, camY) => {
  RIVERS.forEach(river => {
    const drawX = river.x - camX;
    const drawY = river.y - camY;

    ctx.save();
    
    // Base river color
    ctx.fillStyle = river.color;
    ctx.fillRect(drawX, drawY, river.width, river.height);
    
    // River surface animation
    const waveHeight = 3;
    ctx.beginPath();
    ctx.moveTo(drawX, drawY);
    for (let x = 0; x < river.width; x += 20) {
      const waveOffset = Math.sin((x / river.width) * Math.PI * 2) * waveHeight;
      ctx.lineTo(drawX + x, drawY + waveOffset);
    }
    ctx.lineTo(drawX + river.width, drawY);
    ctx.closePath();
    ctx.fillStyle = river.surfaceColor;
    ctx.fill();
    
    // Special effects per tier
    switch(river.tier) {
      case 1: // Ice cracks
        ctx.strokeStyle = 'rgba(255,255,255,0.7)';
        for (let i = 0; i < 5; i++) {
          const crackX = drawX + Math.random() * river.width;
          ctx.beginPath();
          ctx.moveTo(crackX, drawY);
          ctx.lineTo(crackX + 20, drawY + river.height);
          ctx.stroke();
        }
        break;
        
      case 2: // Lava bubbles
        ctx.fillStyle = 'rgba(255,200,0,0.7)';
        for (let i = 0; i < 10; i++) {
          ctx.beginPath();
          ctx.arc(
            drawX + Math.random() * river.width,
            drawY + Math.random() * river.height,
            2 + Math.random() * 3,
            0, Math.PI * 2
          );
          ctx.fill();
        }
        break;

      case 3: // Neon sparkles
        ctx.fillStyle = 'rgba(255,0,255,0.8)';
        for (let i = 0; i < 20; i++) {
          ctx.fillRect(
            drawX + Math.random() * river.width,
            drawY + Math.random() * river.height,
            1 + Math.random() * 2,
            1 + Math.random() * 2
          );
        }
        break;
        
      case 4: // Slime bubbles
        ctx.fillStyle = 'rgba(100,255,100,0.4)';
        for (let i = 0; i < 15; i++) {
          ctx.beginPath();
          ctx.arc(
            drawX + Math.random() * river.width,
            drawY + Math.random() * river.height,
            1 + Math.random() * 4,
            0, Math.PI * 2
          );
          ctx.fill();
        }
        break;
        
      case 5: // Golden sparkles
        ctx.fillStyle = 'rgba(255,255,255,0.8)';
        for (let i = 0; i < 20; i++) {
          ctx.fillRect(
            drawX + Math.random() * river.width,
            drawY + Math.random() * river.height,
            1 + Math.random() * 2,
            1 + Math.random() * 2
          );
        }
        break;
    }

    ctx.restore();
  });
};

// Draw mountains
const drawMountains = (ctx, camX, camY, tier) => {
  const palettes = [
    { // Tier 0 - Blue Mountains
      base: '#3a5a78',
      mid: '#5b82b2', 
      top: '#94b3d1',
      highlight: '#e0f2fe'
    },
    { // Tier 1 - Snow Peaks
      base: '#496990ff',
      mid: '#4e739bff',
      top: '#6f9fcfff',
      highlight: '#ffffff'
    },
    { // Tier 2 - Volcano
      base: '#7f1d1d',
      mid: '#b91c1c',
      top: '#dc2626',
      highlight: '#f97316'
    },
    { // Tier 3 - Cyberpunk
      base: '#7c1f5cff',
      mid: '#911570ff',
      top: '#b70949ff',
      highlight: '#fcbcd8ff'
    },
    { // Tier 4 - Purple
      base: '#4d6407ff',
      mid: '#6da821ff',
      top: '#d2f65cff',
      highlight: '#cef393ff'
    },  
    { // Tier 5 - Golden
      base: '#854d0e',
      mid: '#ca8a04',
      top: '#eab308',
      highlight: '#fef08a'
    }
  ];

  const palette = palettes[tier] || palettes[0];

  MOUNTAINS.forEach(mountain => {
    const {x, y, width, height} = mountain;
    const drawX = x - camX;
    const drawY = y - camY;
    const peakX = drawX + width/2;

    ctx.save();
    
    // Main mountain shape
    ctx.beginPath();
    ctx.moveTo(drawX, drawY + height);
    
    // Left slope with slight curve
    ctx.quadraticCurveTo(
      drawX + width*0.3, drawY + height*0.3,
      peakX, drawY
    );
    
    // Right slope with slight curve
    ctx.quadraticCurveTo(
      drawX + width*0.7, drawY + height*0.3,
      drawX + width, drawY + height
    );
    
    ctx.closePath();
    
    // Base to peak gradient
    const gradient = ctx.createLinearGradient(
      drawX, drawY + height,
      peakX, drawY
    );
    gradient.addColorStop(0, palette.base);
    gradient.addColorStop(0.5, palette.mid);
    gradient.addColorStop(1, palette.top);
    
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Highlight on the peak
    if (tier === 2) {
      // Special glowing effect for volcano
      ctx.beginPath();
      ctx.arc(peakX, drawY, width*0.12, 0, Math.PI*2);
      const glowGradient = ctx.createRadialGradient(
        peakX, drawY, 0,
        peakX, drawY, width*0.1
      );
      glowGradient.addColorStop(0, palette.highlight);
      glowGradient.addColorStop(1, 'transparent');
      ctx.fillStyle = glowGradient;
      ctx.fill();
    } else {
      // Regular peak highlight
      ctx.beginPath();
      ctx.moveTo(peakX - width*0.05, drawY + height*0.08);
      ctx.lineTo(peakX + width*0.05, drawY + height*0.08);
      ctx.lineTo(peakX, drawY - height*0.02);
      ctx.closePath();
      ctx.fillStyle = palette.highlight;
      ctx.fill();
    }

    ctx.restore();
  });
};

const drawTrees = (ctx, camX, camY, tier) => {
  // Tree colors based on tier
  const treeStyles = [
    { // Tier 0 - Default green forest
      trunkColor: '#5E2D04',
      trunkShade: '#3A1D02',
      leavesColor: '#4F7942',
      leavesShade: '#3A5F0B'
    },
    { // Tier 1 - Snowy
      trunkColor: '#3A2D04',
      trunkShade: '#2A2003',
      leavesColor: '#E0F7FA',
      leavesShade: '#B8D8DC'
    },
    { // Tier 2 - Lava zone (dead trees)
      trunkColor: '#333333',
      trunkShade: '#1A1A1A',
      leavesColor: '#e14b19',
      leavesShade: '#a83712'
    },
    {
      // Tier 3 - Cyberpunk theme
      trunkColor: '#7c1f5c',
      trunkShade: '#911570',
      leavesColor: '#b70949',
      leavesShade: '#fcbcd8'
    },
    { // Tier 4 - Purple theme
      trunkColor: '#3d1a68',
      trunkShade: '#2a1147',
      leavesColor: '#9d4edd',
      leavesShade: '#7b3cad'
    },
    { // Tier 4 - Golden theme
      trunkColor: '#8B8000',
      trunkShade: '#5A5300',
      leavesColor: '#FFD700',
      leavesShade: '#D4B000'
    }
  ];
  
  const style = treeStyles[tier] || treeStyles[0];

  TREES.forEach(tree => {
    const drawX = tree.x - camX;
    const drawY = tree.y - camY;
    const treeWidth = tree.width;
    const treeHeight = tree.height;

    ctx.save();

    // Draw trunk with more realistic shape
    ctx.fillStyle = style.trunkShade;
    ctx.beginPath();
    ctx.moveTo(drawX + treeWidth/2 - 8, drawY + treeHeight);
    ctx.bezierCurveTo(
      drawX + treeWidth/2 - 6, drawY + treeHeight * 0.6,
      drawX + treeWidth/2 - 6, drawY + treeHeight * 0.4,
      drawX + treeWidth/2 - 4, drawY + treeHeight * 0.3
    );
    ctx.bezierCurveTo(
      drawX + treeWidth/2 - 2, drawY + treeHeight * 0.4,
      drawX + treeWidth/2 + 2, drawY + treeHeight * 0.4,
      drawX + treeWidth/2 + 4, drawY + treeHeight * 0.3
    );
    ctx.bezierCurveTo(
      drawX + treeWidth/2 + 6, drawY + treeHeight * 0.4,
      drawX + treeWidth/2 + 6, drawY + treeHeight * 0.6,
      drawX + treeWidth/2 + 8, drawY + treeHeight
    );
    ctx.closePath();
    ctx.fill();

    // Trunk highlight
    ctx.fillStyle = style.trunkColor;
    ctx.beginPath();
    ctx.moveTo(drawX + treeWidth/2 - 6, drawY + treeHeight);
    ctx.bezierCurveTo(
      drawX + treeWidth/2 - 4, drawY + treeHeight * 0.6,
      drawX + treeWidth/2 - 4, drawY + treeHeight * 0.4,
      drawX + treeWidth/2 - 2, drawY + treeHeight * 0.3
    );
    ctx.bezierCurveTo(
      drawX + treeWidth/2, drawY + treeHeight * 0.35,
      drawX + treeWidth/2, drawY + treeHeight * 0.35,
      drawX + treeWidth/2 + 2, drawY + treeHeight * 0.3
    );
    ctx.bezierCurveTo(
      drawX + treeWidth/2 + 4, drawY + treeHeight * 0.4,
      drawX + treeWidth/2 + 4, drawY + treeHeight * 0.6,
      drawX + treeWidth/2 + 6, drawY + treeHeight
    );
    ctx.closePath();
    ctx.fill();

    // Draw leaves in multiple layers for depth
    const drawLeafCluster = (x, y, size) => {
      ctx.fillStyle = style.leavesShade;
      ctx.beginPath();
      ctx.ellipse(x, y, size, size * 1.2, 0, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = style.leavesColor;
      ctx.beginPath();
      ctx.ellipse(x - size * 0.2, y - size * 0.2, size * 0.8, size, 0, 0, Math.PI * 2);
      ctx.fill();
    };

    // Bottom leaf clusters
    drawLeafCluster(drawX + treeWidth/2 - treeWidth * 0.3, drawY + treeHeight * 0.3, treeWidth * 0.3);
    drawLeafCluster(drawX + treeWidth/2 + treeWidth * 0.3, drawY + treeHeight * 0.3, treeWidth * 0.3);
    
    // Top leaf clusters
    drawLeafCluster(drawX + treeWidth/2, drawY + treeHeight * 0.15, treeWidth * 0.35);
    
    // Snow on leaves for snowy tier
    if (tier === 1) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.beginPath();
      ctx.ellipse(
        drawX + treeWidth/2 - treeWidth * 0.25, 
        drawY + treeHeight * 0.25, 
        treeWidth * 0.15, 
        treeWidth * 0.1, 
        0, 0, Math.PI * 2
      );
      ctx.ellipse(
        drawX + treeWidth/2 + treeWidth * 0.2, 
        drawY + treeHeight * 0.2, 
        treeWidth * 0.12, 
        treeWidth * 0.08, 
        0, 0, Math.PI * 2
      );
      ctx.ellipse(
        drawX + treeWidth/2, 
        drawY + treeHeight * 0.1, 
        treeWidth * 0.1, 
        treeWidth * 0.07, 
        0, 0, Math.PI * 2
      );
      ctx.fill();
    }

    ctx.restore();
  });
};

const drawServerRacks = (ctx, camX, camY) => {
  SERVER_RACKS.forEach(rack => {
    const drawX = rack.x - camX;
    const drawY = rack.y - camY;

    ctx.save();

    // Rack frame with rounded rect (fallback to box if unsupported)
    ctx.fillStyle = '#1e1e1e';
    ctx.strokeStyle = '#444';
    ctx.lineWidth = 2;

    if (ctx.roundRect) {
      ctx.beginPath();
      ctx.roundRect(drawX, drawY, rack.width, rack.height, 6);
      ctx.fill();
      ctx.stroke();
    } else {
      ctx.fillRect(drawX, drawY, rack.width, rack.height);
      ctx.strokeRect(drawX, drawY, rack.width, rack.height);
    }

    // Server dimensions
    const padding = 6;
    const serverCount = rack.count;
    const statusArray = rack.status;
    const innerHeight = rack.height - padding * 2;
    const serverHeight = innerHeight / serverCount - 4;

    for (let i = 0; i < serverCount; i++) {
      const serverY = drawY + padding + i * (serverHeight + 4);
      const serverX = drawX + padding;

      // Server body gradient
      const gradient = ctx.createLinearGradient(serverX, serverY, serverX + rack.width - padding * 2, serverY + serverHeight);
      gradient.addColorStop(0, '#2e2e2e');
      gradient.addColorStop(1, '#3a3a3a');
      ctx.fillStyle = gradient;
      ctx.fillRect(serverX, serverY, rack.width - padding * 2, serverHeight);

      // Outline
      ctx.strokeStyle = '#555';
      ctx.strokeRect(serverX, serverY, rack.width - padding * 2, serverHeight);

      // Status light
      const lightX = serverX + rack.width - padding * 2 - 10;
      const lightY = serverY + serverHeight / 2;
      const isOn = statusArray[i] ?? false;

      ctx.beginPath();
      ctx.arc(lightX, lightY, 3, 0, Math.PI * 2);
      ctx.fillStyle = isOn ? '#0f0' : '#f00';
      ctx.shadowColor = isOn ? '#0f0' : '#f00';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    ctx.restore();
  });
};

const drawHexagon = (ctx, x, y, radius, color) => {
  ctx.save();

  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI / 3) - Math.PI / 6;
    ctx.lineTo(x + radius * Math.cos(angle), y + radius * Math.sin(angle));
  }
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
    
  // Hexagon glow
  ctx.shadowColor = color;
  ctx.shadowBlur = 15;
  ctx.fill();
  ctx.shadowBlur = 0;

  ctx.restore();
};

const drawOrbs = (ctx, cameraOffset, collectedOrbs) => {
  ctx.save();

  // Draw orbs (hexagons)
  ORBS.forEach((orb, index) => {
    if (!collectedOrbs.current.includes(index)) {
      drawHexagon(
        ctx,
        orb.x - cameraOffset.current.x,
        orb.y - cameraOffset.current.y,
        ORB_RADIUS,
        orb.color
      );
        
      // Label
      ctx.font = '12px Arial';
      ctx.fillStyle = '#fff';
      ctx.textAlign = 'center';
      ctx.fillText(orb.label, orb.x - cameraOffset.current.x, orb.y - cameraOffset.current.y + 30);
    }
  });

  ctx.restore();
};

export { drawGround, drawRivers, drawPlatform, drawPlayer, drawSignposts, drawTrees, drawMountains, drawServerRacks, drawOrbs };