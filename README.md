# Vim Quest

A 2D top-down adventure game that teaches Neovim keybindings through progressive gameplay mechanics. Learn Vim motion keys (hjkl) by navigating through increasingly complex levels.

## 🎮 Play the Game

The game runs directly in your browser. Simply open `index.html` or run the development server.

## 🎯 Game Features

### Level 1: The Basic Plains

Master the fundamental Vim motion keys:
- `h` - Move left
- `j` - Move down
- `k` - Move up
- `l` - Move right

**Objective**: Navigate through various challenges, collect 2 keys to unlock the gate, and reach the golden star!

### Gameplay Phases

1. **Tutorial Introduction** - Learn basic directional movement
2. **Tree Maze** - Practice `k` (up) and `h` (left) movements
3. **Lake Bypass** - Navigate around water obstacles using `l` (right)
4. **Rock Garden** - Focus on `j` (down) movement
5. **Final Gate** - Combine all movements to reach the goal

### Features

✅ **Tile-based grid movement** using Vim keys (hjkl)
✅ **Progressive tutorial system** with helpful hints
✅ **Progress tracking** - moves, time, efficiency rating
✅ **Visual feedback** - particles, animations, effects
✅ **Sound effects** - movement, collection, errors, victory
✅ **Pause menu** - Press ESC to pause
✅ **Help screen** - Press ? for controls reference
✅ **Victory screen** with detailed statistics

## 🎮 Controls

### Movement
- `h` - Move Left (←)
- `j` - Move Down (↓)
- `k` - Move Up (↑)
- `l` - Move Right (→)

### Game Controls
- `ESC` - Pause/Resume
- `R` - Restart Level
- `M` - Main Menu
- `?` - Show Help

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- pnpm (recommended) or npm

### Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm run dev

# Build for production
pnpm run build

# Preview production build
pnpm run preview
```

### Docker Installation (Alternative)

If you prefer using Docker, you can run the application in a container:

```bash
# Build and start the container
docker-compose up

# Or run in detached mode
docker-compose up -d

# Stop the container
docker-compose down
```

The application will be available at `http://localhost:5173`

Docker advantages:
- No need to install Node.js or pnpm locally
- Consistent development environment
- Hot-reload enabled for development

## 🛠️ Tech Stack

- **Game Engine**: Phaser 3
- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **Graphics**: Procedurally generated sprites using Phaser Graphics API
- **Audio**: Web Audio API for sound effects

## 📁 Project Structure

```
nvimWebGame/
├── src/
│   ├── game/
│   │   ├── scenes/         # Game scenes
│   │   │   ├── BootScene.ts
│   │   │   ├── MainMenuScene.ts
│   │   │   ├── Level1Scene.ts
│   │   │   ├── VictoryScene.ts
│   │   │   ├── PauseScene.ts
│   │   │   └── HelpScene.ts
│   │   ├── entities/       # Game entities
│   │   │   └── Player.ts
│   │   ├── utils/          # Utilities
│   │   │   └── SoundManager.ts
│   │   └── config.ts       # Game configuration
│   ├── components/         # React components
│   │   └── PhaserGame.tsx
│   ├── App.tsx
│   └── main.tsx
├── GAME_DESIGN_PLAN.md     # Detailed design document
├── MUSIC_RESOURCES.md      # Audio resources guide
└── README.md
```

## 🎨 Game Design

The game follows a comprehensive design plan that includes:

- **Progressive difficulty** - Each phase introduces and reinforces specific keys
- **Visual learning** - Color-coded UI and clear visual feedback
- **Stat tracking** - Moves, time, key usage, and efficiency metrics
- **Achievement system** - Bronze, Silver, Gold, and Platinum ratings
- **Tutorial system** - Context-sensitive hints and guidance

See [GAME_DESIGN_PLAN.md](./GAME_DESIGN_PLAN.md) for the complete design document.

## 🎵 Audio

The game uses Web Audio API to generate simple sound effects:
- Movement sounds - Subtle beeps for each move
- Collection sounds - Pleasant chimes for picking up keys
- Error sounds - Low tones for invalid moves
- Victory sounds - Ascending musical notes for completing the level

## 🎯 Scoring System

- **Bronze**: Complete the level (any time/moves)
- **Silver**: Complete in < 90 moves
- **Gold**: Complete in < 70 moves (optimal path)
- **Platinum**: Complete in < 10 minutes AND < 70 moves

## 🔮 Future Levels (Planned)

- **Level 2**: Word movements (`w`, `b`)
- **Level 3**: Line mastery (`0`, `$`, `^`)
- **Level 4**: Search & find (`f`, `t`)
- **Level 5**: Combo master (`gg`, `G`, `{number}G`)
- **Level 6**: Visual mode (`v`, `V`)
- **Level 7**: Insert & change (`i`, `a`, `o`, `c`, `d`)
- **Level 8**: Advanced motions (`%`, `*`, `n`, `N`)

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## 🎓 Learning Resources

New to Vim? Check out these resources:
- [Vim Adventures](https://vim-adventures.com/) - Another Vim learning game
- [OpenVim Tutorial](https://www.openvim.com/) - Interactive Vim tutorial
- [Vim Cheat Sheet](https://vim.rtorr.com/) - Quick reference guide

## 💡 Acknowledgments

- Design inspired by classic top-down adventure games
- Built with [Phaser 3](https://phaser.io/) - A fast, robust game framework
- Graphics procedurally generated (no external assets needed)
- Sound effects generated using Web Audio API

---

**Happy Vimming! 🚀**

*Master Vim keybindings one level at a time.*
