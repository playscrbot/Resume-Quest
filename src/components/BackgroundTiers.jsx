const BACKGROUND_TIERS = [
  { // Tier 0 (0% collected)
    sky: '#87CEEB',
    ground: '#4a3728',
    elements: '#E0F7FA',
    platformColor: '#16bf5aff', // For Platforms
    text: 'Beginner'
  },
  { // Tier 1 (25% collected)
    sky: '#87CEEB', // Blue night
    ground: '#5b82b2ff',
    elements: '#2285d1ff',  // Blue servers
    platformColor: '#bceafcff', // Ice Blue
    text: 'Intermediate'
  },
  { // Tier 2 (50% collected)
    sky: '#38353fff',       // Purple dawn
    ground: '#e14b19ff',
    elements: '#4cc9f0',  // Cyan terminals
    platformColor: '#ff9100', // Lava
    text: 'Rookie'
  },
  { // Tier 3 (75% collected)
    sky: '#2e2e50ff',  // Dark Night
    ground: '#051a48ff',
    elements: '#7209b7',  // Purple clouds
    elements2: '#333344', // Server Racks
    platformColor: '#ff006e', // Neon Red
    text: 'Graduate'
  },
  { // Tier 4 (100% collected)
    sky: '#6d7332ff', // Golden hour
    ground: '#bcb6b6ff',
    elements: '#ff006e', // Celebration sparks
    platformColor: '#626161ff', // Lava
    text: 'Intern Level'
  },
  { // Tier 5 (200% collected)
    sky: '#e7b904ff', // Golden hour
    ground: '#D4AF37',
    elements: '#ff006e', // Celebration sparks
    platformColor: '#DAA520', // Lava
    text: 'Game Developer'
  },
];

export default BACKGROUND_TIERS;