const GROUND_Y = 350;

// Forest Area (With Mountain at middle)

// Snow Area (With Mountain at middle)
export const IGLOOS = [
  { x: 2650, y: GROUND_Y + 50, size: 180, baseColor: '#E6F3FF', tilt: 0 },
];

export const WOODEN_CRATES = [
  { x: 3125, y: GROUND_Y - 20, size: 50 },
  { x: 3180, y: GROUND_Y - 20, size: 50 },
  { x: 3070, y: GROUND_Y - 20, size: 50 },
  { x: 3100, y: GROUND_Y - 72, size: 50 },
  { x: 3155, y: GROUND_Y - 72, size: 50 },
];

export const PINE_TREES = [
  { x: 3750, y: GROUND_Y - 100, height: 180 },
  { x: 3800, y: GROUND_Y - 100, height: 150 },
];

// Volcano (Magma River)
export const PRISON = [
  { x: 7320, y: GROUND_Y - 690, width: 300, height: 180 },
];

export const TANK_WAGONS = [
  { x: 8000, y: GROUND_Y - 150, width: 300, height: 150 },
];

export const CRYSTALS = [
  { x: 8230, y: GROUND_Y - 600, size: 15 },
  { x: 8250, y: GROUND_Y - 600, size: 15 },
  { x: 8270, y: GROUND_Y - 600, size: 15 },
  { x: 8290, y: GROUND_Y - 600, size: 15 },
  { x: 8310, y: GROUND_Y - 600, size: 15 },
  { x: 8330, y: GROUND_Y - 600, size: 15 },
  { x: 8350, y: GROUND_Y - 600, size: 15 },
  { x: 8370, y: GROUND_Y - 600, size: 15 },
  { x: 8980, y: GROUND_Y - 400, size: 15 },
  { x: 9000, y: GROUND_Y - 400, size: 15 },
  { x: 9020, y: GROUND_Y - 400, size: 15 },
  { x: 9030, y: GROUND_Y - 150, size: 15 },
  { x: 9050, y: GROUND_Y - 150, size: 15 },
  { x: 9070, y: GROUND_Y - 150, size: 15 },
  { x: 9130, y: GROUND_Y - 210, size: 15 },
  { x: 9150, y: GROUND_Y - 210, size: 15 },
  { x: 9170, y: GROUND_Y - 210, size: 15 },
  { x: 9230, y: GROUND_Y - 270, size: 15 },
  { x: 9250, y: GROUND_Y - 270, size: 15 },
  { x: 9270, y: GROUND_Y - 270, size: 15 },
  { x: 9330, y: GROUND_Y - 330, size: 15 },
  { x: 9350, y: GROUND_Y - 330, size: 15 },
  { x: 9370, y: GROUND_Y - 330, size: 15 },
];

export const FLOATING_ROCK_RINGS = [
  {
    x: 8550, y: GROUND_Y - 450,
    mainWidth: 240, mainHeight: 80,
    cracks: [
      { x1: -30, y1: 5, x2: -10, y2: 35 },
      { x1: 20, y1: 5, x2: 35, y2: 40 }
    ],
    glowSpots: [
      { x: -60, y: 20, rx: 5, ry: 7 },
      { x: 55, y: 25, rx: 4, ry: 6 }
    ],
    pieces: [
      { x: -50, y: -60, w: 30, h: 20, glow: [{ offsetX: 0, offsetY: 0, rx: 4, ry: 5 }] },
      { x: 40, y: -55, w: 35, h: 25, glow: [{ offsetX: 0, offsetY: 0, rx: 3, ry: 4 }] },
      { x: -70, y: -20, w: 20, h: 15 },
      { x: 65, y: -25, w: 18, h: 15 }
    ]
  }
];

export const CONVEYOR_BELTS = [
  { x: 9000, y: GROUND_Y + 100, width: 420, height: 30, direction: 'right', speed: 1.5, isOn: false, friction: 0.5, color: '#ff4500' },
  { x: 16000, y: GROUND_Y + 180, width: 2100, height: 30, direction: 'right', speed: 1.5, isOn: false, friction: 0.5, color: '#4b8a08' },
  { x: 17350, y: GROUND_Y, width: 500, height: 30, direction: 'right', speed: 1.5, isOn: false, friction: 0.5, color: '#4b8a08' },
];

export const SERVER_RACKS = [
  { x: 5240, y: GROUND_Y - 250, width: 80, height: 160, count: 8, status: [true, false, true, false, false, true, true, false] },
  { x: 5320, y: GROUND_Y - 250, width: 80, height: 160, count: 8, status: [true, false, true, false, false, true, true, false] },
  { x: 5400, y: GROUND_Y - 250, width: 80, height: 160, count: 8, status: [true, false, true, false, false, true, true, false] }
];

// Neon City
export const BROKEN_BRIDGE = [
  { x: 9800, y: GROUND_Y, width: 200, height: 30, hasRailing: true, isOn: false },
];

export const MAINTENANCE_HATCHES = [
  { x: 11250, y: GROUND_Y - 400, width: 150, height: 100, baseColor: '#2a2a35', accentColor: '#00f7ff', label: "PANEL-42", bolts: 4, danger: false },
  { x: 11400, y: GROUND_Y - 400, width: 100, height: 100, baseColor: '#3a1a2a', accentColor: '#ff00aa', label: "PANEL-17", bolts: 6, danger: false },
  { x: 11500, y: GROUND_Y - 400, width: 200, height: 100,  baseColor: '#1a3a2a', accentColor: '#00ff88', label: "PANEL-09", bolts: 8, danger: false },
];

export const NEON_BUILDINGS = [
  { x: 10100, y: GROUND_Y - 250, width: 250, height: 250, color: '#0ff' },
  { x: 10340, y: GROUND_Y - 380, width: 120, height: 380, color: '#f0f' },
  { x: 12520, y: GROUND_Y - 650, width: 130, height: 150, color: '#0cf' },
  { x: 12650, y: GROUND_Y - 850, width: 150, height: 380, color: '#ff0' },
  { x: 12800, y: GROUND_Y - 750, width: 180, height: 250, color: '#0f8' },

  { x: 12120, y: GROUND_Y - 40, width: 60, height: 240, color: '#aaff00ff' },
  { x: 12190, y: GROUND_Y + 20, width: 90, height: 180, color: '#00fbffff' },
  { x: 12310, y: GROUND_Y + 70, width: 70, height: 80, color: '#8c00ffff' },
  { x: 12380, y: GROUND_Y + 50, width: 110, height: 100, color: '#ff0088ff' },

  { x: 12720, y: GROUND_Y - 240, width: 60, height: 80, color: '#aaff00ff' },
  { x: 12805, y: GROUND_Y - 270, width: 90, height: 80, color: '#00fbffff' },
  { x: 13050, y: GROUND_Y - 330, width: 70, height: 80, color: '#8c00ffff' },
  { x: 13140, y: GROUND_Y - 350, width: 80, height: 80, color: '#ff0088ff' },

  { x: 13420, y: GROUND_Y - 380, width: 80, height: 80, color: '#fd4' },
  { x: 13500, y: GROUND_Y - 360, width: 70, height: 60, color: '#f13' },
  { x: 13620, y: GROUND_Y - 500, width: 150, height: 150, color: '#f4f' },
];

export const ANIMATED_NEON_SIGNS = [
  { id: 0, x: 10350, y: GROUND_Y - 360, width: 360, height: 120, color: '#0ff0ff', text: ["WELCOME TO", "MY CITY"] },
];

export const CABLE_JUNCTION_BOXES = [
  { x: 11900, y: GROUND_Y - 270, width: 60, height: 80, cableCount: 5, cableGlow: '#0ff' },
];

export const PHONE_BOOTHS = [
  { x: 12000, y: GROUND_Y - 250, width: 90, height: 100, glow: '#f0f', screenGlow: '#0ff' }
];

export const ELEVATOR = [
  { x: 12120, y: GROUND_Y - 500, width: 80, height: 100, speed: 0.02, radius: 100, angle: 0, centerX: 12120, centerY: GROUND_Y - 500 },
];

export const VENDING_MACHINES = [
  { x: 11150, y: 180, width: 60, height: 120 },
  { x: 11210, y: 215, width: 65, height: 85 },
  { x: 11630, y: 180, width: 60, height: 120 },
  { x: 11690, y: 215, width: 65, height: 85 },
  { x: 13270, y: GROUND_Y - 600, width: 65, height: 100 },
];

export const LIGHT_POSTS = [
  { x: 12320, y: 250, height: 70, benchWidth: 60, benchHeight: 20, color: "#ffd27f", bench: true },
];

export const CYBER_FACTORY = [
  { x: 12520, y: 390, width: 360, height: 160 },
];

export const DATA_TOWERS = [
  { x: 13010, y: 340, width: 50, height: 60 },
  { x: 13060, y: 280, width: 50, height: 120 },
  { x: 13110, y: 220, width: 80, height: 180 },
  { x: 13330, y: 190, width: 50, height: 60 },
  { x: 13380, y: 190, width: 80, height: 80 },
  { x: 13460, y: 150, width: 90, height: 110 },
];

export const WALL_TERMINALS = [
  { x: 13600, y: 160, width: 60, height: 90 },
];

export const NEON_TUBES = [
  { x1: 13000, y1: 540, x2: 13000, y2: 600, color: '#ff00cc', thickness: 15, seed: Math.random() },
  { x1: 12880, y1: 540, x2: 13000, y2: 540, color: '#00ffff', thickness: 15, seed: Math.random() },
];

export const BILLBOARDS = [
  { x: 12450, y: 0, width: 200, height: 100, color1: '#00ff88', color2: '#0088ff', colorGlow: '#00ff88', message: 'HELLO SUMMER🌴', fontSize: 21 },
];

export const ATM_UNITS = [
  { x: 11920, y: 340, width: 60, height: 120, state: 'idle', interactionRadius: 100, screenColor: '#00ffee', trimColor: '#00d0ff', bodyTop: '#242830', bodyBottom: '#14171b', isNear: false, _receipts: [], _lastReceiptSpawn: 0, },
];

export const DRONE_STATIONS = [
  { x: 14020, y: GROUND_Y - 920, width: 60, height: 120, color: '#33ffcc', id: 1 },
  { x: 14090, y: GROUND_Y - 880, width: 60, height: 80, color: '#ff66ff', id: 2 },
  { x: 14305, y: GROUND_Y - 860, width: 90, height: 60, color: '#0088ff', id: 3 },
  { x: 14505, y: GROUND_Y - 860, width: 90, height: 160, color: '#defb00ff', id: 4 },
  { x: 14010, y: GROUND_Y - 720, width: 70, height: 70, color: '#7058b9ff', id: 5 },
  { x: 14085, y: GROUND_Y - 700, width: 100, height: 50, color: '#ff66a8ff', id: 6 },
  { x: 14505, y: GROUND_Y - 620, width: 100, height: 70, color: '#00ff44ff', id: 7 },
  { x: 14615, y: GROUND_Y - 690, width: 90, height: 140, color: '#ff6f00ff', id: 8 },
  { x: 14715, y: GROUND_Y - 650, width: 70, height: 100, color: '#ff0000ff', id: 9 },
];

export const POWER_PANELS = [
  { x: 14010, y: GROUND_Y - 520, width: 150, height: 120, color: '#ffaa00', id: 1 },
  { x: 14165, y: GROUND_Y - 490, width: 130, height: 90, color: '#ff00aaff', id: 2 },
];

// Industrial Area
export const JUNCTION_TOWERS = [
  { x: 15000, y: GROUND_Y - 600, width: 60, height: 200 },
  { x: 15068, y: GROUND_Y - 650, width: 60, height: 200 },
  { x: 15136, y: GROUND_Y - 575, width: 60, height: 150 },
];

export const TRANSFORMER_BOXES = [
  { x: 14460, y: GROUND_Y - 170, width: 120, height: 70, color: '#55584d' }, // muted olive-gray
];

export const SERVICE_SHEDS = [
  { x: 14600, y: GROUND_Y - 200, width: 200, height: 100 },
];

export const CABLE_REELS = [
  { x: 14950, y: GROUND_Y - 275, radius: 35, cableColor: '#2b2b2b' },
];

export const MAINTENANCE_LOCKERS = [
  { x: 15060, y: 20, width: 60, height: 90, color: '#555555' },
  { x: 15120, y: -10, width: 70, height: 120, color: '#666666' },
];

export const INDUSTRY_BUILDINGS = [
  { x: 15350, y: GROUND_Y - 800, width: 300, height: 200, color: '#7a7d6f' }, // Main factory building
];

export const SMOKESTACKS = [
  { x: 15700, y: GROUND_Y - 700, width: 90, height: 180, color: '#555' },
  { x: 15800, y: GROUND_Y - 800, width: 90, height: 200, color: '#666' },
];

export const HIGH_VOLTAGE_FENCES = [
  { x: 15310, y: GROUND_Y - 420, width: 180, height: 90 },
];

export const INDUSTRIAL_LIGHT_POLES = [
  { x: 15320, y: GROUND_Y - 80, height: 100 },
  { x: 15580, y: GROUND_Y - 80, height: 100 },
  { x: 16020, y: GROUND_Y - 450, height: 200 },
  { x: 16180, y: GROUND_Y - 450, height: 200 },
];

export const COOLING_FANS = [
  { x: 17230, y: GROUND_Y - 450, size: 80, speed: 0.015 },
  { x: 17350, y: GROUND_Y - 450, size: 80, speed: -0.02 }, // opposite spin for variation
  { x: 17470, y: GROUND_Y - 450, size: 80, speed: 0.05 },
];

export const FUEL_PUMP_STATIONS = [
  { x: 16065, y: GROUND_Y - 565, width: 70, height: 110, bodyColor: '#4c4036' },
];

export const PUMP_HOUSES = [
  { x: 16370, y: GROUND_Y - 680, width: 120, height: 90, color: '#5c5c5c' },
];

export const OIL_DRUM_STACKS = [
  { x: 16570, y: GROUND_Y - 710, rows: 1, cols: 3 },
];

export const OIL_STATIONS = [
  { x: 16730, y: GROUND_Y - 750, width: 300, height: 100 },
];

export const MONORAIL = {
  track: {
    x: 14200,          // world start X of the beam
    y: 440,          // world Y (top of beam)
    length: 1400,    // beam length
    beamWidth: 22,   // top slab thickness
    beamDepth: 14,   // underside depth (for shading)
    pylonSpacing: 160,
    pylonWidth: 20,
    pylonHeight: 120,
  },
  train: {
    head: 0,          // animated head position along the track (in px from track.x)
    speed: 1.6,       // px per frame (scale with your timeScale if you use it)
    numCars: 6,
    carWidth: 96,
    carHeight: 36,
    gap: 8,
    bodyColor: '#6b6f68',   // muted industrial
    windowBand: '#2a2b2a',
    windowLit: '#c9c9a3',
    skirtColor: '#565a53',  // wraps the beam
    headLightColor: '#d8e6ff'
  }
};

export const TICKET_COUNTER = {
  x: 14000,
  y: 450,
  width: 160,
  height: 90,
  wallColor: '#7b7b6a',
  roofColor: '#4b4b41',
  frameColor: '#3a3a33',
  signBg: '#565648',
  signText: 'TICKETS',
  windowFrame: '#2d2d27',
  windowGlass: '#a1b3b0',
  shutterColor: '#4c4c45'
};

export const EXIT_BOOTHS = [
  { x: 15600, y: 380, width: 100, height: 80, color: '#555', barrierColor: '#cc0000' },
];

export const MOBILE_CRANES = [
  { x: 16875, y: 30, width: 140, height: 90, color: '#c2b280', boomLength: 160 },
];

export const PIPE_BRIDGES = [
  { x: 16696, y: 200, length: 500, height: 60 },
];

export const CHEMICAL_TANK = [
  { x: 17640, y: GROUND_Y - 510, radius: 40, height: 90, color: '#888888' },
  { x: 17740, y: GROUND_Y - 550, radius: 50, height: 140, color: '#888888' },
];

export const CONTROL_CONTAINERS = [
  { x: 17300, y: GROUND_Y - 580, width: 200, height: 90, color: '#4d4d4d' },
];

export const MAINTENANCE_CARTS = [
  { x: 16660, y: GROUND_Y - 400, width: 120, height: 40, color: '#555555' },
];

export const TOOL_BENCHES = [
  { x: 15920, y: GROUND_Y - 280, width: 350, height: 50, color: '#444' },
  { x: 1800, y: 950, width: 180, height: 55, color: '#555' }
];

// Golden River
export const TREASURE_CHEST = [
  { x: 19250, y: GROUND_Y - 400, width: 200, height: 120, color: '#FFD700', lidOpenAngle: 0, sparkleIntensity: 0, isOpen: false, openProgress: 0 },
];

export const PILLARS = [
  { x: 18500, y: -60, width: 60, height: 100 },
  { x: 18530, y: -50, width: 80, height: 70 },
  { x: 18580, y: -80, width: 50, height: 80 },
  { x: 20080, y: -60, width: 60, height: 80 },
  { x: 20100, y: -50, width: 80, height: 90 },
  { x: 20150, y: -80, width: 50, height: 80 },
];

export const GUARDIAN_STATUES = [
  { x: 18950, y: GROUND_Y - 350, size: 90, weapon: "sword" },
  { x: 19750, y: GROUND_Y - 350, size: 90, weapon: "spear" },
];

export const FOUNTAINS = [
  { x: 19290, y: GROUND_Y - 500, width: 120, height: 180, tierCount: 3, waterColor: '#7EC8E3', baseColor: '#A9A9A9' },
];

export const GLOW_DECORATIONS = [
  { x: 19120, y: 225, size: 25, type: "mushroom", color: "#ff33cc", glowColor: "rgba(255,51,204,0.5)", glowRadius: 10 },
  { x: 19150, y: 225, size: 25, type: "mushroom", color: "#ff33cc", glowColor: "rgba(255,51,204,0.5)", glowRadius: 10 },
  { x: 19175, y: 225, size: 25, type: "mushroom", color: "#ff33cc", glowColor: "rgba(255,51,204,0.5)", glowRadius: 10 },
  { x: 19520, y: 225, size: 25, type: "mushroom", color: "#ff33cc", glowColor: "rgba(255,51,204,0.5)", glowRadius: 10 },
  { x: 19550, y: 225, size: 25, type: "mushroom", color: "#ff33cc", glowColor: "rgba(255,51,204,0.5)", glowRadius: 10 },
  { x: 19575, y: 225, size: 25, type: "mushroom", color: "#ff33cc", glowColor: "rgba(255,51,204,0.5)", glowRadius: 10 },
];

export const ENGRAVED_WALLS = [
  { id: 3, x: 18200, y: 200, width: 300, height: 180, style: 'runes', glowColor: '#043b68ff' },
];

export const TORCHES = [
  { x: 18850, y: 350, scale: 1 },
  { x: 18900, y: 350, scale: 1 },
  { x: 19800, y: 350, scale: 0.9 },
  { x: 19850, y: 350, scale: 0.9 }
];

export const OBELISKS = [
  { id: 1, x: 19310,  y: GROUND_Y - 360, width: 80,  height: 80, state: 'intact', tilt: 0.04, tipGlowColor: '#ffd870', engrave: true, sand: true, message: "In every resume, lies an architecture of progress.." },
];

export const WATERFALLS = [
  { x: 19200, y: GROUND_Y - 1250, width: 300, height: 1500, basinWidth: 100, basinHeight: 30 },
];