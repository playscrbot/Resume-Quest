# 🎮 Interactive Platformer Resume

![Platformer Resume Game](public/assets/banner.png) 
*A visually stunning platformer game that doubles as an interactive resume!*

---

## ✨ Features
- 🌄 **Dynamic Environments** – Travel through **6 unique regions** (Mountain, Snow, Volcanic, Cyberpunk, Industrial and finally Golden Cave)  
- 🎯 **Skill Collection System** – Collect orbs to unlock professional skills and achievements  
- 🏆 **Progressive Unlocks** – Background evolves as you collect more skills  
- 🎨 **Pixel-Perfect Visuals** – Hand-crafted environments with animated elements  
- 🎵 **Immersive Audio** – Region-based background music + sound effects  
- 📱 **Mobile Friendly** – Touch controls with vibration feedback
- 💼 **Resume Integration** – Find the treasure chest to unlock the **full resume document model**

---

## 🎯 How to Play

### Desktop Controls:
- `← →` / `A D` – Move left/right  
- `Space` / `↑` – Jump (with **wall jump**)  
- Jump near signs – Interact with **information points**  

### Mobile Controls:
- On-screen arrows – Move and jump  
- **Haptic feedback** on jump  

### Objectives:
- Explore a **20,000+ pixel world**  
- Collect all **skill orbs** (colorful spheres)  
- Discover **informational signs**  
- Find the **treasure chest** to unlock resume  
- Watch as the **world changes** with your progress  

---

## 🏔️ Regions

| Region       | Start | End   | Features                                |
|--------------|-------|-------|-----------------------------------------|
| Mountain     | 0     | 3000  | Basic terrain, rivers, trees            |
| Snow         | 1000  | 6200  | Igloos, snowmen, pine trees             |
| Volcanic     | 5500  | 10500 | Crystals, floating rocks, prison        |
| Cyberpunk    | 9000  | 15000 | Neon signs, elevators, high-tech vibes  |
| Industrial   | 13000 | 18000 | Factories, machinery, industrial zones  |
| Golden Cave  | 16000 | 20700 | Treasure, ruins, mystical elements      |

---

## 🛠️ Technical Implementation

### Architecture:
- **React-based** with hooks for state management  
- **Canvas rendering** for performance  
- Custom **physics engine** with collision detection  
- Modular design for **easy expansion**  

### Key Components:
- `GameCanvas` – Main game component with game loop  
- `ModalInfo` – Interactive information displays  
- `ResumeModal` – Full resume modal  
- Custom **drawing modules** for environments + objects  

### Performance Features:
- Debounced **resize handling**  
- Throttled **audio playback**  
- **Efficient rendering** – only redraw when needed  
- **Region-based drawing** – render only what’s visible  

---

## 🎨 Customization

### Adding New Regions:
1. Update `REGION_BOUNDARIES` constant  
2. Create drawing function in module  
3. Add case to region switch in `drawGame`  

### Adding New Skills:
- Add entry to `ORBS` array with `label`, `content`, and `position`  
- Skill automatically appears in **progress tracker**  

### Modifying Physics:
Adjust constants:  
```js
GRAVITY      // Fall speed acceleration  
FRICTION     // Ground movement resistance  
PLAYER_SPEED // Horizontal movement speed  
JUMP_FORCE   // Jump height
```

---

## 📦 Installation

```bash
# Clone the repository
git clone <your-repo>

# Install dependencies
npm install
yarn install

# Remove package-lock json
❌ package-lock.json
✅ yarn lock

# Start development server
yarn start
```

---

## 🌟 Special Features
- **Coyote Time** – Grace period for jumps after leaving platforms  
- **Jump Buffering** – Input forgiveness for smoother play  
- **Wall Jumping** – Extra mobility  
- **Dynamic Difficulty** – Environment evolves with progress  
- **Interactive Elements** – Conveyor belts, elevators, moving platforms  

---

## 🎵 Audio
- Region-based **background music**  
- SFX for **jumps, landings, interactions**  
- Throttled playback to prevent **audio spam**  

---

## 📱 Mobile Optimization
- Touch-friendly controls  
- Performance-optimized for mobile devices  
- Haptic feedback on jump  
- Responsive design for all screen sizes  

---

Crafted with ❤️ using React and JavaScript..
This interactive resume showcases both technical skills and creative design in a fun, engaging format!

=== ⭐ Star this repo if you enjoyed the game! ⭐ ===