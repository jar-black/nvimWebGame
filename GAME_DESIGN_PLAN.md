# Neovim Practice Game - Design Document

## Game Concept: "Vim Quest" (Working Title)

A 2D top-down adventure game that teaches Neovim keybindings through progressive gameplay mechanics. Players navigate through increasingly complex levels, where Vim commands become their movement and action controls.

---

## 🎨 Art Assets (Free & Open Source)

### Recommended Asset Pack: **Kenney.nl - Top-down Shooter**
- **License**: CC0 (Public Domain)
- **URL**: https://www.kenney.nl/assets/top-down-shooter
- **Contents**: 580+ assets including:
  - Top-down character sprites
  - Tiles (grass, stone, water, etc.)
  - Objects (trees, rocks, crates)
  - Effects (explosions, particles)
  - UI elements

### Alternative Asset Sources:
1. **OpenGameArt.org** - GPL-licensed assets available
   - Search for "top-down" with GPL 3.0 filter

2. **Kenney.nl - Additional Packs** (all CC0):
   - "Kenney 16x16" - Retro pixel art style
   - "Micro Roguelike" - Dungeon tileset

3. **itch.io** - CC0 tagged assets
   - 1Bit top-down RPG packs

---

## 📋 Level 1: "The Basic Plains"

### Learning Objectives
Master the fundamental Vim motion keys:
- `h` - Move left
- `j` - Move down
- `k` - Move up
- `l` - Move right

### Level Design

#### Map Layout (30x20 tiles, approximately 480x320 pixels)
```
┌────────────────────────────────┐
│  🌲    Start    🌲             │
│              [Player]          │
│  🌲                     🌲     │
│         ╔═══════╗              │
│         ║ Lake  ║    Key 1 🔑  │
│  Tree   ║ (h→)  ║              │
│  Maze   ╚═══════╝              │
│  (k↑)                          │
│         ┌─────┐       🌲       │
│         │Rocks│                │
│  🔑     │(j↓) │       Gate 🚪  │
│ Key 2   └─────┘       (locked) │
│                                │
│         ╔═════╗                │
│  🌲     ║Path ║       🌲       │
│         ║(l→) ║                │
│         ╚═════╝      Goal ⭐   │
│                                │
└────────────────────────────────┘
```

### Game Progression (~10 minutes)

#### Phase 1: Tutorial Introduction (2 min)
**Objective**: Learn basic directional movement

1. **Popup Tutorial** (non-intrusive text overlay):
   ```
   Welcome to Vim Quest!

   Use these keys to move:
   h ← | j ↓ | k ↑ | l →

   Navigate to the glowing marker →
   ```

2. **Simple Path**:
   - Player spawns at start position
   - Must navigate to first waypoint (5 tiles right, 3 tiles down)
   - Path is clear with no obstacles
   - Visual indicators (glowing tiles) show the way

#### Phase 2: The Tree Maze (2 min)
**Focus**: Practice `k` (up) and `h` (left)

- **Challenge**: Navigate through a forest with trees blocking paths
- **Layout**: Winding path that requires multiple `k` movements
- **Reward**: Collect Key 1 (🔑) at the end
- **Hint System**: After 30 seconds of no progress, show subtle directional hints

#### Phase 3: The Rock Garden (2 min)
**Focus**: Practice `j` (down) movement

- **Challenge**: Navigate downward through scattered rocks
- **Mechanic**: Can only move down (`j`) and sideways (`h`/`l`) - no going back up
- **Objective**: Collect Key 2 at bottom
- **Learning**: Emphasizes planning ahead (Vim's "think before you move" philosophy)

#### Phase 4: The Lake Bypass (2 min)
**Focus**: Practice `l` (right) movement

- **Challenge**: Navigate around a large lake obstacle
- **Mechanic**: Water tiles damage player, must go right then down then right
- **Teaches**: Composing movements (`l l l j j l l`)

#### Phase 5: The Final Gate (2 min)
**Objective**: Reach the goal

- **Requirement**: Must have both keys collected
- **Challenge**: Combined movement using all four directions
- **Endpoint**: Reach the star to complete level
- **Victory Screen**: Shows stats and introduces next concept

---

## 🎮 Core Game Mechanics

### Movement System
```javascript
// Key mappings
'h' -> moveLeft()   // -1 x
'j' -> moveDown()   // +1 y
'k' -> moveUp()     // -1 y
'l' -> moveRight()  // +1 x
```

### Tile Types
1. **Walkable**: Grass, path tiles
2. **Blocking**: Trees, rocks, walls
3. **Hazard**: Water (reduces health), lava
4. **Interactive**: Keys, doors, chests
5. **Goal**: Level completion trigger

### Visual Feedback
- **Movement Trail**: Brief particle effect showing last position
- **Invalid Move**: Subtle red flash when hitting obstacle
- **Key Press Display**: Show pressed key in corner (reinforces learning)
- **Combo Counter**: Displays continuous movement count

### Progression Tracking
- **Movement Counter**: Total moves taken
- **Optimal Path**: Compare against optimal solution
- **Time Spent**: Track completion time
- **Mistakes**: Count invalid key presses

---

## 🎯 Future Level Progression Plan

### Level 2: "Word Movements"
- Teach `w` (word forward), `b` (word backward)
- Mechanic: Player can "jump" to next platform/object
- Puzzle: Navigate platforms using word jumps

### Level 3: "Line Mastery"
- Teach `0` (line start), `$` (line end), `^` (first non-blank)
- Mechanic: Teleport to edges of rooms/corridors
- Puzzle: Multi-room navigation

### Level 4: "Search & Find"
- Teach `f` (find character forward), `t` (till character)
- Mechanic: Target-based movement system
- Puzzle: Find and collect items using character search

### Level 5: "Combo Master"
- Teach `gg` (file start), `G` (file end), `{number}G`
- Mechanic: Floor/level teleportation
- Puzzle: Multi-floor dungeon navigation

### Level 6: "Visual Mode"
- Teach `v` (visual), `V` (visual line), selection movement
- Mechanic: Select and activate multiple switches
- Puzzle: Pattern-based switch activation

### Level 7: "Insert & Change"
- Teach `i`, `a`, `o`, `O`, `c`, `d`
- Mechanic: Modify environment (place/remove blocks)
- Puzzle: Terraform environment to create paths

### Level 8: "Advanced Motions"
- Teach `%` (bracket matching), `*` (search word), `n/N`
- Mechanic: Portal pairs, teleportation
- Puzzle: Complex portal-based navigation

---

## 🛠️ Technical Implementation

### Technology Stack Options

#### Option 1: Web-based (Recommended for accessibility)
**Framework**: Phaser 3 (HTML5 game engine)
- **Pros**: Cross-platform, easy deployment, good tilemap support
- **Tech**: JavaScript/TypeScript, HTML5 Canvas
- **Deploy**: GitHub Pages, Itch.io, or standalone

#### Option 2: Desktop Application
**Framework**: Godot Engine
- **Pros**: Excellent 2D support, open-source, GDScript easy to learn
- **Deploy**: Linux, Windows, Mac, Web (HTML5 export)

#### Option 3: Terminal-based
**Framework**: ncurses (C/C++) or blessed (Node.js)
- **Pros**: True Vim feel, lightweight
- **Cons**: More limited graphics

### File Structure (Phaser Example)
```
nvimWebGame/
├── assets/
│   ├── sprites/
│   │   ├── player.png
│   │   ├── tiles.png
│   │   └── objects.png
│   ├── audio/
│   │   ├── movement.wav
│   │   └── collect.wav
│   └── fonts/
├── src/
│   ├── scenes/
│   │   ├── MainMenu.js
│   │   ├── Level1.js
│   │   ├── Tutorial.js
│   │   └── Victory.js
│   ├── entities/
│   │   ├── Player.js
│   │   └── Collectible.js
│   ├── utils/
│   │   ├── InputHandler.js
│   │   ├── ProgressTracker.js
│   │   └── TutorialSystem.js
│   └── main.js
├── index.html
└── package.json
```

### Key Systems to Implement

#### 1. Input Handler
```javascript
class VimInputHandler {
  constructor(player) {
    this.player = player;
    this.setupKeys();
  }

  setupKeys() {
    // Only enable Vim keys, disable arrow keys
    this.keys = {
      h: () => this.player.moveLeft(),
      j: () => this.player.moveDown(),
      k: () => this.player.moveUp(),
      l: () => this.player.moveRight()
    };
  }

  handleInput(key) {
    if (this.keys[key]) {
      this.keys[key]();
      this.trackInput(key);
    }
  }
}
```

#### 2. Tutorial System
```javascript
class TutorialSystem {
  showHint(message, keys, position) {
    // Display popup with key hints
    // Auto-dismiss after successful action
  }

  checkProgress() {
    // Track which keys have been used
    // Provide encouragement/hints
  }
}
```

#### 3. Progress Tracker
```javascript
class ProgressTracker {
  constructor() {
    this.stats = {
      moves: 0,
      time: 0,
      keysUsed: { h: 0, j: 0, k: 0, l: 0 },
      mistakes: 0
    };
  }

  calculateScore() {
    // Compare against optimal path
    // Award stars/badges
  }
}
```

---

## 🎨 Visual Design Guidelines

### Color Palette
- **Grass**: #7cb342 (light green)
- **Path**: #d4c5a9 (sandy)
- **Water**: #42a5f5 (blue)
- **Player**: #ff6f00 (orange - high visibility)
- **Keys**: #ffd600 (gold)
- **UI**: #37474f (dark slate)

### UI Elements
1. **HUD** (Top):
   - Keys collected: 🔑 x 2/2
   - Move counter: 45 moves
   - Timer: 3:42

2. **Key Display** (Bottom-right):
   - Shows last pressed key
   - Displays hjkl diagram with highlighted active key

3. **Tutorial Overlay** (Center):
   - Semi-transparent box
   - Clear, large text
   - Vim-style color scheme

### Animation Details
- **Player**: 4-frame walk cycle (8 FPS)
- **Collectibles**: Gentle bob animation (sin wave)
- **Water**: Tile offset animation for wave effect
- **Particle Effects**:
  - Collect item: Gold sparkles
  - Movement: Dust trail
  - Invalid move: Red flash

---

## 📊 Level 1 Detailed Stats

### Estimated Completion Time: 10 minutes

| Phase | Time | Primary Keys | Moves Required | Learning Objective |
|-------|------|--------------|----------------|-------------------|
| Tutorial | 2 min | h,j,k,l | 10-15 | Basic movement |
| Tree Maze | 2 min | k,h | 15-20 | Up & left combos |
| Rock Garden | 2 min | j,h,l | 15-20 | Down movement |
| Lake Bypass | 2 min | l,j | 10-15 | Right movement |
| Final Gate | 2 min | All | 15-20 | Combined movement |
| **Total** | **10 min** | **All** | **65-90** | **Core Vim motion** |

### Success Metrics
- **Bronze**: Complete level (any time)
- **Silver**: Complete in < 90 moves
- **Gold**: Complete in < 70 moves (optimal path)
- **Platinum**: Complete in < 10 minutes AND < 70 moves

---

## 🚀 Implementation Phases

### Phase 1: Prototype (Week 1-2)
- [ ] Set up Phaser project
- [ ] Import Kenney asset pack
- [ ] Create basic tilemap (20x15 simple version)
- [ ] Implement hjkl movement
- [ ] Add collision detection

### Phase 2: Level 1 Complete (Week 3-4)
- [ ] Build full Level 1 map (30x20)
- [ ] Implement all obstacles (trees, water, rocks)
- [ ] Add collectibles (keys)
- [ ] Create tutorial system
- [ ] Add progress tracking

### Phase 3: Polish (Week 5-6)
- [ ] Add animations and particles
- [ ] Implement sound effects
- [ ] Create victory/defeat screens
- [ ] Add stats display
- [ ] Optimize performance

### Phase 4: Testing & Deployment (Week 7-8)
- [ ] Playtesting with users
- [ ] Balance difficulty
- [ ] Fix bugs
- [ ] Deploy to web
- [ ] Create documentation

---

## 💡 Additional Features to Consider

### Quality of Life
- **Undo**: `u` key to undo last move (limited uses)
- **Restart**: `R` to restart level
- **Pause**: `:q` or `Esc` to pause (Vim humor!)
- **Save**: Auto-save progress

### Engagement
- **Achievements**: "Move Master", "Speed Runner", "Key Collector"
- **Leaderboard**: Compare times with others
- **Daily Challenge**: Random generated mini-level
- **Hint System**: Cost moves but provide solution preview

### Accessibility
- **Colorblind Mode**: Alternative color schemes
- **Text Size**: Adjustable UI
- **Key Remapping**: Optional (but discouraged)
- **Visual Indicators**: Strong movement feedback

### Educational
- **Vim Cheat Sheet**: In-game reference (press `?`)
- **Command History**: Show last 5 commands used
- **Tips**: Display Vim tips between levels
- **Practice Mode**: Sandbox with all keys unlocked

---

## 📝 Next Steps

1. **Review & Approve**: Confirm this plan meets your vision
2. **Choose Tech Stack**: Decide on Phaser 3 (web) vs Godot
3. **Download Assets**: Get Kenney's top-down shooter pack
4. **Set Up Project**: Initialize git repo and project structure
5. **Start Prototyping**: Build basic movement system first

---

## 🔗 Resource Links

- **Kenney Assets**: https://www.kenney.nl/assets/top-down-shooter
- **Phaser 3 Docs**: https://photonstorm.github.io/phaser3-docs/
- **OpenGameArt**: https://opengameart.org/ (filter by CC0/GPL)
- **Vim Commands**: https://vim.rtorr.com/ (reference for mechanics)

---

**Version**: 1.0
**Last Updated**: 2025-11-04
**Status**: Planning Phase
