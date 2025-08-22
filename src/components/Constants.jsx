const GROUND_Y = 350;

const WORLD_WIDTH = 2000;
const WORLD_WIDTH2 = 100;
const WORLD_WIDTH3 = 500;
const WORLD_WIDTH4 = 300;
const WORLD_WIDTH5 = 1000;

export const TREES = [
  { x: 25, y: GROUND_Y - 151, width: 150, height: 150 },
  { x: -50, y: GROUND_Y - 151, width: 150, height: 150 },
  { x: 8480, y: GROUND_Y - 101, width: 150, height: 150 },
  { x: 8550, y: GROUND_Y - 101, width: 150, height: 150 },
  { x: 20400, y: GROUND_Y - 50, width: 150, height: 150 },
  { x: 20540, y: GROUND_Y - 50, width: 150, height: 150 },
];

export const MOUNTAINS = [
  { x: 400, y: GROUND_Y - 400, width: 1500, height: 500 },
  { x: 3500, y: GROUND_Y - 500, width: 4000, height: 750 },
];

export const PLATFORMS = [
  // Ground
  { x: 0, y: GROUND_Y, width: WORLD_WIDTH, height: 40, color: '#4a3728', type: 'ground' },
  { x: 2150, y: GROUND_Y, width: WORLD_WIDTH2, height: 40, color: '#4a3728', type: 'ground' },
  { x: 2250, y: GROUND_Y - 50, width: WORLD_WIDTH2, height: 40, color: '#4a3728', type: 'ground' },
  { x: 2350, y: GROUND_Y - 100, width: WORLD_WIDTH3, height: 40, color: '#4a3728', type: 'ground' },
  { x: 3000, y: GROUND_Y +30, width: WORLD_WIDTH4, height: 40, color: '#4a3728', type: 'ground' },
  { x: 3700, y: GROUND_Y - 100, width: WORLD_WIDTH4, height: 40, color: '#4a3728', type: 'ground' },
  { x: 5000, y: GROUND_Y - 100, width: WORLD_WIDTH3, height: 40, color: '#4a3728', type: 'ground' },
  { x: 7000, y: GROUND_Y - 600, width: WORLD_WIDTH3, height: 40, color: '#4a3728', type: 'ground' },
  { x: 10000, y: GROUND_Y, width: WORLD_WIDTH3, height: 40, color: '#4a3728', type: 'ground' },
  { x: 18000, y: GROUND_Y + 100, width: WORLD_WIDTH5, height: 40, color: '#4a3728', type: 'ground' },
  { x: 19700, y: GROUND_Y + 100, width: WORLD_WIDTH5, height: 40, color: '#4a3728', type: 'ground' },

  // Platforms
  { x: 300, y: 300, width: 100, height: 20, type: 'platform' },
  { x: 450, y: 250, width: 150, height: 20, type: 'platform' },
  { x: 700, y: 200, width: 100, height: 20, type: 'platform' },
  { x: 900, y: 150, width: 150, height: 20, type: 'platform' },
  { x: 1200, y: 250, width: 200, height: 20, type: 'platform' },
  { x: 1500, y: 180, width: 120, height: 20, type: 'platform' },
  { x: 1700, y: 280, width: 80, height: 20, type: 'platform' },
  { x: 3400, y: 300, width: 200, height: 20, type: 'platform' },
  { x: 4100, y: 200, width: 100, height: 20, type: 'platform' },
  { x: 4300, y: 300, width: 100, height: 20, type: 'platform' },
  { x: 4500, y: 150, width: 100, height: 20, type: 'platform' },
  { x: 4700, y: 100, width: 100, height: 20, type: 'platform' },
  { x: 4900, y: 150, width: 50, height: 20, type: 'platform' },
  { x: 7800, y: GROUND_Y - 250, width: 100, height: 20, type: 'platform' },
  { x: 8050, y: GROUND_Y - 350, width: 100, height: 20, type: 'platform' },
  { x: 8250, y: GROUND_Y + 150, width: 100, height: 20, type: 'platform' },
  { x: 9650, y: GROUND_Y - 200, width: 100, height: 20, type: 'platform' },
  { x: 9500, y: GROUND_Y, width: 100, height: 20, type: 'platform' },
  { x: 10700, y: GROUND_Y, width: 200, height: 20, type: 'platform' },
  { x: 11900, y: GROUND_Y - 150, width: 200, height: 20, type: 'platform' },
  { x: 13000, y: GROUND_Y + 50, width: 200, height: 20, type: 'platform' },
  { x: 13800, y: GROUND_Y - 500, width: 100, height: 20, type: 'platform' },
  { x: 14450, y: GROUND_Y - 300, width: 100, height: 20, type: 'platform' },
  { x: 14700, y: GROUND_Y - 370, width: 100, height: 20, type: 'platform' },
  { x: 16300, y: GROUND_Y - 300, width: 100, height: 20, type: 'platform' },
  { x: 16650, y: GROUND_Y - 350, width: 140, height: 20, type: 'platform' },
  { x: 17150, y: GROUND_Y - 600, width: 100, height: 20, type: 'platform' },
  { x: 17300, y: GROUND_Y - 500, width: 200, height: 20, type: 'platform' },
  { x: 18600, y: GROUND_Y - 50, width: 100, height: 20, type: 'platform' },
  { x: 18800, y: GROUND_Y - 200, width: 200, height: 20, type: 'platform' },
  { x: 19000, y: GROUND_Y - 250, width: 100, height: 20, type: 'platform' },
  { x: 19600, y: GROUND_Y - 250, width: 100, height: 20, type: 'platform' },
  { x: 19700, y: GROUND_Y - 200, width: 200, height: 20, type: 'platform' },
  { x: 20000, y: GROUND_Y - 50, width: 100, height: 20, type: 'platform' },
  { x: 18600, y: GROUND_Y - 350, width: 100, height: 20, type: 'platform' },
  { x: 20000, y: GROUND_Y - 350, width: 100, height: 20, type: 'platform' },

  // Layered platforms
  { x: 5725, y: GROUND_Y - 300, width: 50, height: 25, type: 'layered' },
  { x: 5700, y: GROUND_Y - 150, width: 100, height: 25, type: 'layered' },
  { x: 6200, y: GROUND_Y - 450, width: 100, height: 25, type: 'layered' },
  { x: 13500, y: GROUND_Y - 100, width: 100, height: 20, type: 'layered' },
  { x: 13600, y: GROUND_Y - 100, width: 100, height: 20, type: 'layered' },
  { x: 13700, y: GROUND_Y - 40, width: 100, height: 20, type: 'layered' },
  { x: 13800, y: GROUND_Y - 40, width: 100, height: 20, type: 'layered' },

  // Double Layered Platforms
  { x: 5450, y: GROUND_Y - 400, width: 200, height: 25, type: 'double-layered' },
  { x: 5700, y: GROUND_Y - 550, width: 300, height: 25, type: 'double-layered' },
  { x: 7950, y: GROUND_Y - 100, width: 200, height: 25, type: 'double-layered' },
  { x: 8200, y: GROUND_Y - 600, width: 200, height: 25, type: 'double-layered' },
  { x: 8950, y: GROUND_Y - 400, width: 100, height: 20, type: 'double-layered' },
  { x: 11700, y: GROUND_Y - 500, width: 100, height: 20, type: 'double-layered' },
  { x: 11800, y: GROUND_Y - 500, width: 100, height: 20, type: 'double-layered' },
  { x: 11900, y: GROUND_Y + 100, width: 100, height: 20, type: 'double-layered' },
  { x: 12500, y: GROUND_Y - 500, width: 100, height: 20, type: 'double-layered' },
  { x: 12600, y: GROUND_Y - 500, width: 100, height: 20, type: 'double-layered' },
  { x: 12700, y: GROUND_Y - 500, width: 100, height: 20, type: 'double-layered' },
  { x: 12800, y: GROUND_Y - 500, width: 100, height: 20, type: 'double-layered' },
  { x: 12900, y: GROUND_Y - 500, width: 100, height: 20, type: 'double-layered' },
  { x: 13025, y: GROUND_Y - 250, width: 100, height: 20, type: 'double-layered' },
  { x: 13125, y: GROUND_Y - 275, width: 100, height: 20, type: 'double-layered' },
  { x: 14000, y: GROUND_Y - 800, width: 100, height: 20, type: 'double-layered' },
  { x: 14100, y: GROUND_Y - 800, width: 100, height: 20, type: 'double-layered' },
  { x: 14500, y: GROUND_Y - 700, width: 100, height: 20, type: 'double-layered' },
  { x: 14500, y: GROUND_Y - 550, width: 100, height: 20, type: 'double-layered' },
  { x: 14600, y: GROUND_Y - 550, width: 100, height: 20, type: 'double-layered' },
  { x: 14700, y: GROUND_Y - 550, width: 100, height: 20, type: 'double-layered' },
  { x: 15000, y: GROUND_Y - 450, width: 100, height: 20, type: 'double-layered' },
  { x: 15100, y: GROUND_Y - 450, width: 100, height: 20, type: 'double-layered' },
  { x: 16350, y: GROUND_Y - 600, width: 100, height: 20, type: 'double-layered' },
  { x: 16450, y: GROUND_Y - 600, width: 100, height: 20, type: 'double-layered' },
  { x: 16650, y: GROUND_Y - 660, width: 100, height: 20, type: 'double-layered' },
  { x: 16750, y: GROUND_Y - 660, width: 100, height: 20, type: 'double-layered' },
  { x: 18900, y: GROUND_Y - 250, width: 100, height: 20, type: 'double-layered' },
  { x: 19700, y: GROUND_Y - 250, width: 100, height: 20, type: 'double-layered' },
  { x: 18500, y: GROUND_Y - 350, width: 100, height: 20, type: 'double-layered' },
  { x: 20100, y: GROUND_Y - 350, width: 100, height: 20, type: 'double-layered' },
  { x: 19250, y: GROUND_Y + 50, width: 200, height: 20, type: 'double-layered' },

  // Triple Layered Platforms
  { x: 5900, y: GROUND_Y - 350, width: 200, height: 25, type: 'triple-layered' },
  { x: 9000, y: GROUND_Y - 150, width: 100, height: 20, type: 'triple-layered' },
  { x: 10800, y: GROUND_Y - 80, width: 100, height: 20, type: 'triple-layered' },
  { x: 11000, y: GROUND_Y - 230, width: 100, height: 20, type: 'triple-layered' },
  { x: 11050, y: GROUND_Y - 300, width: 100, height: 20, type: 'triple-layered' },
  { x: 13250, y: GROUND_Y - 500, width: 100, height: 20, type: 'triple-layered' },
  { x: 13400, y: GROUND_Y - 300, width: 100, height: 20, type: 'triple-layered' },
  { x: 13500, y: GROUND_Y - 300, width: 100, height: 20, type: 'triple-layered' },
  { x: 15300, y: GROUND_Y - 100, width: 100, height: 20, type: 'triple-layered' },
  { x: 15400, y: GROUND_Y - 100, width: 100, height: 20, type: 'triple-layered' },
  { x: 15500, y: GROUND_Y - 100, width: 100, height: 20, type: 'triple-layered' },
  { x: 16850, y: GROUND_Y - 250, width: 100, height: 20, type: 'triple-layered' },
  { x: 16950, y: GROUND_Y - 250, width: 100, height: 20, type: 'triple-layered' },
  { x: 19100, y: GROUND_Y - 100, width: 100, height: 20, type: 'triple-layered' },
  { x: 19500, y: GROUND_Y - 100, width: 100, height: 20, type: 'triple-layered' },

  // Four Layered Platforms
  { x: 14000, y: 440, width: 100, height: 20, type: 'four-layered' },
  { x: 14100, y: 440, width: 100, height: 20, type: 'four-layered' },
  { x: 15600, y: 440, width: 100, height: 20, type: 'four-layered' },
  { x: 15700, y: 440, width: 100, height: 20, type: 'four-layered' },
  { x: 15800, y: 440, width: 100, height: 20, type: 'four-layered' },
  { x: 8500, y: GROUND_Y + 50, width: 100, height: 20, type: 'four-layered' },
  { x: 12700, y: GROUND_Y + 200, width: 100, height: 20, type: 'four-layered' },
  { x: 12800, y: GROUND_Y + 200, width: 100, height: 20, type: 'four-layered' },
  { x: 12300, y: GROUND_Y - 100, width: 100, height: 20, type: 'four-layered' },
  { x: 12400, y: GROUND_Y - 100, width: 100, height: 20, type: 'four-layered' },
  { x: 13300, y: GROUND_Y - 100, width: 100, height: 20, type: 'four-layered' },
  { x: 13400, y: GROUND_Y - 100, width: 100, height: 20, type: 'four-layered' },
  { x: 14000, y: GROUND_Y - 650, width: 100, height: 20, type: 'four-layered' },
  { x: 14100, y: GROUND_Y - 650, width: 100, height: 20, type: 'four-layered' },
  { x: 15300, y: GROUND_Y - 350, width: 100, height: 20, type: 'four-layered' },
  { x: 15400, y: GROUND_Y - 350, width: 100, height: 20, type: 'four-layered' },
  { x: 16000, y: GROUND_Y - 450, width: 100, height: 20, type: 'four-layered' },
  { x: 16100, y: GROUND_Y - 450, width: 100, height: 20, type: 'four-layered' },
  { x: 19300, y: GROUND_Y - 300, width: 100, height: 20, type: 'four-layered' },

  // Five Layered Platforms
  { x: 8300, y: GROUND_Y - 400, width: 400, height: 25, type: 'five-layered' },
  { x: 7750, y: GROUND_Y - 100, width: 200, height: 25, type: 'five-layered' },
  { x: 14450, y: GROUND_Y - 100, width: 100, height: 20, type: 'five-layered' },
  { x: 14550, y: GROUND_Y - 100, width: 100, height: 20, type: 'five-layered' },
  { x: 14650, y: GROUND_Y - 100, width: 100, height: 20, type: 'five-layered' },
  { x: 14700, y: GROUND_Y - 100, width: 100, height: 20, type: 'five-layered' },
  { x: 15300, y: GROUND_Y - 600, width: 100, height: 20, type: 'five-layered' },
  { x: 15400, y: GROUND_Y - 600, width: 100, height: 20, type: 'five-layered' },
  { x: 15500, y: GROUND_Y - 600, width: 100, height: 20, type: 'five-layered' },
  { x: 15600, y: GROUND_Y - 600, width: 100, height: 20, type: 'five-layered' },
  { x: 15800, y: GROUND_Y - 600, width: 100, height: 20, type: 'five-layered' },
  { x: 16550, y: GROUND_Y - 660, width: 100, height: 20, type: 'five-layered' },

  // Six Layered Platforms
  { x: 9100, y: GROUND_Y - 210, width: 100, height: 20, type: 'six-layered' },
  { x: 13600, y: GROUND_Y - 360, width: 100, height: 20, type: 'six-layered' },
  { x: 13700, y: GROUND_Y - 360, width: 100, height: 20, type: 'six-layered' },
  { x: 14000, y: GROUND_Y - 400, width: 100, height: 20, type: 'six-layered' },
  { x: 14100, y: GROUND_Y - 400, width: 100, height: 20, type: 'six-layered' },
  { x: 14200, y: GROUND_Y - 400, width: 100, height: 20, type: 'six-layered' },
  { x: 15900, y: GROUND_Y - 250, width: 100, height: 20, type: 'six-layered' },
  { x: 16000, y: GROUND_Y - 250, width: 100, height: 20, type: 'six-layered' },
  { x: 16100, y: GROUND_Y - 250, width: 100, height: 20, type: 'six-layered' },
  { x: 16200, y: GROUND_Y - 250, width: 100, height: 20, type: 'six-layered' },
  { x: 16300, y: GROUND_Y - 250, width: 100, height: 20, type: 'six-layered' },
  { x: 16400, y: GROUND_Y - 250, width: 100, height: 20, type: 'six-layered' },
  { x: 17200, y: GROUND_Y - 350, width: 100, height: 20, type: 'six-layered' },
  { x: 17300, y: GROUND_Y - 350, width: 100, height: 20, type: 'six-layered' },
  { x: 17400, y: GROUND_Y - 350, width: 100, height: 20, type: 'six-layered' },

  // Seven Layered Platforms
  { x: 8600, y: GROUND_Y + 50, width: 200, height: 20, type: 'seven-layered' },
  { x: 12300, y: GROUND_Y + 150, width: 100, height: 20, type: 'seven-layered' },
  { x: 12400, y: GROUND_Y + 150, width: 100, height: 20, type: 'seven-layered' },
  { x: 12700, y: GROUND_Y - 160, width: 100, height: 20, type: 'seven-layered' },
  { x: 16850, y: GROUND_Y - 660, width: 100, height: 20, type: 'seven-layered' },
  { x: 16950, y: GROUND_Y - 660, width: 100, height: 20, type: 'seven-layered' },

  // Eight Layered Platforms
  { x: 8800, y: GROUND_Y, width: 100, height: 20, type: 'eight-layered' },
  { x: 16650, y: GROUND_Y - 100, width: 100, height: 20, type: 'eight-layered' },
  { x: 16750, y: GROUND_Y - 100, width: 100, height: 20, type: 'eight-layered' },
  { x: 16850, y: GROUND_Y - 100, width: 100, height: 20, type: 'eight-layered' },
  { x: 16950, y: GROUND_Y - 100, width: 100, height: 20, type: 'eight-layered' },
  { x: 17050, y: GROUND_Y - 100, width: 100, height: 20, type: 'eight-layered' },
  { x: 17150, y: GROUND_Y - 100, width: 100, height: 20, type: 'eight-layered' },

  // Nine Layered Platforms
  { x: 11100, y: GROUND_Y - 50, width: 100, height: 20, type: 'nine-layered' },
  { x: 11200, y: GROUND_Y - 50, width: 100, height: 20, type: 'nine-layered' },
  { x: 11600, y: GROUND_Y - 50, width: 100, height: 20, type: 'nine-layered' },
  { x: 11700, y: GROUND_Y - 50, width: 100, height: 20, type: 'nine-layered' },

  // Ten Layered Platforms
  { x: 9200, y: GROUND_Y - 270, width: 100, height: 20, type: 'ten-layered' },
  { x: 12200, y: GROUND_Y + 200, width: 100, height: 20, type: 'ten-layered' },
  { x: 12500, y: GROUND_Y + 200, width: 100, height: 20, type: 'ten-layered' },
  { x: 12600, y: GROUND_Y + 200, width: 100, height: 20, type: 'ten-layered' },
  { x: 12800, y: GROUND_Y - 200, width: 100, height: 20, type: 'ten-layered' },

  // Eleven Layered Platforms
  { x: 17500, y: GROUND_Y - 350, width: 100, height: 20, type: 'eleven-layered' },
  { x: 17600, y: GROUND_Y - 430, width: 100, height: 20, type: 'eleven-layered' },
  { x: 17700, y: GROUND_Y - 430, width: 100, height: 20, type: 'eleven-layered' },

  // Twelve Layered Platforms
  { x: 15700, y: GROUND_Y - 600, width: 100, height: 20, type: 'twelve-layered' },

  // Thirteen Layered Platforms
  { x: 9300, y: GROUND_Y - 330, width: 100, height: 20, type: 'thirteen-layered' },
  { x: 12100, y: GROUND_Y + 200, width: 100, height: 20, type: 'thirteen-layered' },
  { x: 14900, y: GROUND_Y - 240, width: 100, height: 20, type: 'thirteen-layered' },
  { x: 15000, y: GROUND_Y - 240, width: 100, height: 20, type: 'thirteen-layered' },
  { x: 15100, y: GROUND_Y - 240, width: 100, height: 20, type: 'thirteen-layered' },
  { x: 14300, y: GROUND_Y - 800, width: 100, height: 20, type: 'thirteen-layered' },

  // Sixteen Layered Platforms
  { x: 11300, y: GROUND_Y - 190, width: 100, height: 20, type: 'sixteen-layered' },
  { x: 11400, y: GROUND_Y - 190, width: 100, height: 20, type: 'sixteen-layered' },
  { x: 11500, y: GROUND_Y - 190, width: 100, height: 20, type: 'sixteen-layered' },

  // Moving Platforms (Makes platform move - horizontal)
  { id: 'moving-platform-1', x: 6500, y: GROUND_Y - 400, width: 150, height: 20, type: 'moving-h', speed: 1, distance: 100, startX: 6500, prevX: 6500, prevY: GROUND_Y - 400, direction: 1, color: '#3a5fcd' },
  { id: 'moving-platform-2', x: 7800, y: GROUND_Y - 500, width: 150, height: 20, type: 'moving-h', speed: 1, distance: 100, startX: 7800, prevX: 7800, prevY: GROUND_Y - 500, direction: 1, color: '#3a5fcd' },

  // Moving Platforms (Makes platform move - vertical)
  { x: 6800, y: GROUND_Y - 550, width: 100, height: 20, type: 'moving-v', speed: 1.5, distance: 100, startY: GROUND_Y - 450 },

  // Circular Platforms
  { x: 12100, y: GROUND_Y - 400, width: 120, height: 20, type: 'moving-c', speed: 0.02, radius: 100, angle: 0, centerX: 12100, centerY: GROUND_Y - 400, color: '#3a8b8d' },

  // Bouncy Platforms (Makes player bounce)

  // Sliding Platforms (Makes player frictionless)

  // Fragile Platforms (Disappear after being touched)
];

export const RIVERS = [
  // Tier 1 - Ice River
  {
    x: 1900,
    y: 570,  // Just below ground level
    width: 300,
    height: 500,
    tier: 1,
    damage: false,
    slipFactor: 0.5,
    color: '#a8d8ea',
    surfaceColor: 'rgba(200,240,255,0.7)'
  },
  {
    x: 2700,
    y: 570,  // Just below ground level
    width: 300,
    height: 500,
    tier: 1,
    damage: false,
    slipFactor: 0.5,
    color: '#a8d8ea',
    surfaceColor: 'rgba(200,240,255,0.7)'
  },
  {
    x: 3200,
    y: 570,  // Just below ground level
    width: 500,
    height: 500,
    tier: 1,
    damage: false,
    slipFactor: 0.5,
    color: '#a8d8ea',
    surfaceColor: 'rgba(200,240,255,0.7)'
  },
  // Tier 2 - Lava River
  {
    x: 4000,
    y: 370,
    width: 1000,
    height: 500,
    tier: 2,
    damage: true,
    damageAmount: 1,
    interval: 60,
    color: '#ff4500',
    surfaceColor: 'rgba(255,100,0,0.6)'
  },
  {
    x: 5400,
    y: 370,
    width: 2000,
    height: 500,
    tier: 2,
    damage: true,
    damageAmount: 1,
    interval: 60,
    color: '#ff4500',
    surfaceColor: 'rgba(255,100,0,0.6)'
  },
  {
    x: 7500,
    y: GROUND_Y + 250,
    width: 2500,
    height: 300,
    tier: 4,
    damage: true,
    damageAmount: 0.5,
    slowFactor: 0.7,
    color: '#ff4500',
    surfaceColor: 'rgba(255,100,0,0.6)'
  },
  // Tier 4 - Green Slime River
  {
    x: 10500,
    y: GROUND_Y + 250,
    width: 7500,
    height: 240,
    tier: 4,
    damage: true,
    damageAmount: 0.5,
    slowFactor: 0.7,
    color: '#4b8a08',
    surfaceColor: 'rgba(150,255,150,0.5)'
  },
  
  // Tier 5 - Golden River
  {
    x: 19000,
    y: GROUND_Y + 250,
    width: 700,
    height: 240,
    tier: 5,
    bonus: true,
    points: 10,
    pointInterval: 120,
    color: '#ffd700',
    surfaceColor: 'rgba(255,255,200,0.7)'
  }
];

// Tech Skill Orbs (Edit here with the skills you know alongside some nice description)
export const ORBS = [
  { x: 750, y: 150, color: '#61DAFB', label: 'React', 
    content: 'Built 5+ React apps with hooks, context, and custom libraries' },
  { x: 17600, y: GROUND_Y - 50, color: '#539E43', label: 'Mathematics',
    content: 'Foundational knowledge of linear algebra, calculus, and discrete math' },
  { x: 9200, y: GROUND_Y + 50, color: '#fb0f0fff', label: 'Computer Science', 
    content: 'Proficient in data structures, algorithms, and design patterns' },
  { x: 4150, y: GROUND_Y - 200, color: '#c6c631ff', label: 'Game dev', 
    content: 'ES6 expert: closures, promises, generators, and performance patterns' },
  { x: 14500, y: GROUND_Y - 350, color: '#764ABC', label: 'Machine Learning', 
    content: 'Deep learning, reinforcement learning, and natural language processing' }
];

// Signposts (Edit the sentences here, according to your profile)
export const SIGNS = [
    { x: 150, y: GROUND_Y - 50, width: 100, height: 60, label: 'About Me', 
        content: 
          <>
            <h2 style={{ textAlign: 'center' }}>👋 Hello there</h2>
            <p>I'm <strong>Shiva</strong>, who loves building immerse gaming experiences with React & creative UI.</p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '5px', justifyContent: 'center', textAlign: 'center' }}>
              <span style={{ background: '#61DBFB', color: 'black', padding: '5px 10px', borderRadius: '20px', fontSize: '12px' }}>Game Developer</span>
              <span style={{ background: '#61DBFB', color: 'black', padding: '5px 10px', borderRadius: '20px', fontSize: '12px' }}>React Enthusiast</span>
            </div>
          </>
    },
    { x: 1850, y: GROUND_Y - 50, width: 120, height: 60, label: 'My Education',
        content: 
          <>
            <h2>📚 About My Education</h2>
            <p>After completing my school, I literally lost any interest towards college, since I had to face <strong style={{ color: '#388e3c', textShadow: '0 0 2px rgba(56,142,60,0.3)' }}>the real world</strong>.</p>
            <p>So I took my time and built my own <strong style={{ color: '#388e3c', textShadow: '0 0 2px rgba(56,142,60,0.3)' }}>curriculum</strong> around JS, C++, and Python for game development. Still learning every day.</p>
          </>
    },
    { x: 3475, y: 250, width: 140, height: 60, label: 'Past Experience',
        content: 
          <>
            <h2>💼 About my experience..</h2>
            <p>It's been 4+ years when I started coding, and now I've been crafting interactive web games, apps, and game-dev tooling systems.</p>
            <p>Contributing something to people who admire building things, but don't know where to start.</p>
          </>
    },
    { x: 5000, y: GROUND_Y - 150, width: 150, height: 60, label: 'My Achievements',
        content: 
          <>
            <h2 style={{ background: 'linear-gradient(to right, #ffd600, #ffab00)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block' }}>🏆 And Coming to my Career Highlights</h2>
            <ul style={{ listStyleType: 'none', padding: '0', margin: '0' }}>
              <li style={{ background: 'rgba(255,214,0,0.1)', padding: '8px', borderRadius: '4px', marginBottom: '8px', borderLeft: '3px solid #ffd600' }}>I've Built 15+ interactive web experiences</li>
              <li style={{ background: 'rgba(255,214,0,0.1)', padding: '8px', borderRadius: '4px', marginBottom: '8px', borderLeft: '3px solid #ffd600' }}>Made a React App that can be played in various platforms</li>
              <li style={{ background: 'rgba(255,214,0,0.1)', padding: '8px', borderRadius: '4px', marginBottom: '8px', borderLeft: '3px solid #ffd600' }}>Developed a 2D game engine from scratch</li>
              <li style={{ background: 'rgba(255,214,0,0.1)', padding: '8px', borderRadius: '4px', marginBottom: '8px', borderLeft: '3px solid #ffd600' }}>And worked on various game-dev tooling systems</li>
            </ul>
          </>
    },
    { x: 7000, y: GROUND_Y - 650, width: 110, height: 60, label: 'My Projects',
        content: 
          <>
            <h2>🎮 Okay, Let me show you some of my work...</h2>
            <p>I love building stuff that's playable, not just viewable to skip off the next time.</p>
            <ul style={{ listStyleType: 'none', padding: '0', margin: '0' }}>
              <li>🧩 Emojilator – A Match-3 game</li>
              <li>🕹️ Coin Collector – Pure canvas fun</li>
              <li>🌌 Tic Tac Toe – An AI Powered one</li>
              <li>📜 This Platformer Resume – You’re inside!</li>
            </ul>
          </>
    },
    { x: 8675, y: GROUND_Y, width: 90, height: 60, label: 'My Skills',
        content: 
          <>
            <h2>🧠 So what can I do?</h2>
            <p>Well, it's something you're already looking at, when you were collecting the glowing orbs..</p>
            <p>I hope you enjoy collecting them.</p>
          </>
    },
    { x: 10000, y: GROUND_Y - 50, width: 140, height: 60, label: 'Problem Solving',
        content: 
          <>
            <h2>🧩 How I Solve Problems</h2>
            <p>Well, I break <strong style={{ color: '#c486d2ff', textShadow: '0 0 2px rgba(56,142,60,0.3)' }}>complex challenges</strong> into small, playful steps—just like levels in a game.</p>
            <p>And Debugging? I treat it like a <strong style={{ color: '#c486d2ff', textShadow: '0 0 2px rgba(56,142,60,0.3)' }}>boss fight</strong>. I keep trying new moves until I find the winning combo.</p>
          </>
    },
    { x: 11740, y: GROUND_Y - 550, width: 120, height: 60, label: 'Why Games?',
        content: 
          <>
            <h2>🎮 And Why I Chose Games</h2>
            <p>Because games are more than code snippets — they’re <strong style={{ color: '#6b6ba1ff', textShadow: '0 0 2px rgba(56,142,60,0.3)' }}>experiences</strong> that can teach, entertain, and connect people like nothing else.</p>
            <p>I build games because I love seeing people <strong style={{ color: '#6b6ba5ff' }}>smile, think, or feel wowed</strong> by something they just experienced.</p>
          </>
    },
    { x: 13730, y: GROUND_Y - 90, width: 140, height: 60, label: 'My Architecture',
        content: 
          <>
            <h2>🏛️ Okay but, How I Structure Things</h2>
            <ul style={{ listStyleType: 'none', padding: '0', margin: '0' }}>
              <li>🎮 <b>ECS (Entity Component System)</b> for game state & behavior</li>
              <li>🧵 <b>Decoupled loops</b>: React UI ←→ game loop (requestAnimationFrame)</li>
              <li>🪝 <b>Custom hooks</b> for input, collisions, audio, timers</li>
              <li>🚌 <b>Event bus</b> to avoid prop drilling hell</li>
              <li>🧪 <b>Testing pyramid</b>: logic in pure functions, snapshot UI</li>
            </ul>
        </>
    },
    { x: 15390, y: GROUND_Y - 150, width: 120, height: 60, label: 'Certifications',
        content: 
          <>
            <h2>📜 Just so you know...</h2>
            <p>You see, I'm a certified <strong style={{ color: '#649a8dff' }}>Programming Techniques Master</strong>, having scored RANK 10 at the state level. The Certificate was provided by Bharathidasan University.</p>
            <p>And also I am a <strong style={{ color: '#649a8dff' }}>national rank holder</strong> at the NFLAT Examination 2016-17, so you can say I'm an expert in Math.</p>
          </>
    },
    { x: 16305, y: GROUND_Y - 350, width: 90, height: 60, label: 'My Stats',
        content: 
          <>
            <h2>📈 Curious about numbers?</h2>
            <ul style={{ listStyleType: 'none', padding: '0', margin: '0' }}>
              <li>🚀 20+ mini projects completed</li>
              <li>🕹️ 5 full-fledged playable games</li>
              <li>🧠 1 personal engine in the works</li>
            </ul>
            <p>And I still feel like I’m just getting started.</p>
          </>
    },
    { x: 18000, y: GROUND_Y + 50, width: 110, height: 60, label: 'Contact Me',
        content: 
          <>
            <h2>📬 Oops! We’ve reached the end!</h2>
            <p>Too bad, <strong style={{ color: '#70a203ff' }}>We still have a few more things to talk about</strong>. Maybe if you're willing, You will find it out if you decode this Hieroglyph.</p>
            <p>And, I hope you enjoyed this little <strong style={{ color: '#70a203ff' }}>adventure</strong>. Have fun exploring! 😁</p>
          </>
    },
    { x: 20500, y: GROUND_Y + 50, width: 90, height: 60, label: 'The End',
        content: 
          <>
            <h2>🚩 And That's It!</h2>
            <p>Thanks for taking your time to visit here.</p>
            <p><strong style={{ color: '#04bb97ff' }}>Have a good day</strong> 😁</p>
          </>
    },
];