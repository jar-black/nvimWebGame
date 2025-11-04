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

#### ✅ Selected: Web-based (Browser Game)
**Framework**: Phaser 3 (HTML5 game engine)
- **Pros**:
  - Instant accessibility (no downloads)
  - Cross-platform (works on any modern browser)
  - Easy to share (just send a link)
  - Great tilemap and sprite support
  - Active community and documentation
- **Tech**: JavaScript/TypeScript, HTML5 Canvas
- **Deploy**: GitHub Pages (free hosting), Itch.io, Netlify
- **Browser Support**: Chrome, Firefox, Safari, Edge (desktop focus)

**Why browser-based for this project**:
1. **Vim users are developers** - already have browsers open
2. **No installation friction** - practice during breaks
3. **Easy updates** - push changes instantly
4. **Shareable** - send link to friends/coworkers
5. **Desktop-optimized** - keyboard is the primary input (computers, not mobile)

#### Alternative Options (Not Selected)

**Option 2: Desktop Application**
- Framework: Godot Engine
- Pros: Better performance, offline play
- Cons: Requires download, harder to share

**Option 3: Terminal-based**
- Framework: ncurses (C/C++) or blessed (Node.js)
- Pros: True Vim aesthetic, lightweight
- Cons: Limited graphics, harder for beginners

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

## 🖥️ Browser & Desktop Optimization

### Target Platform: Desktop Browsers
**Primary audience**: Developers and Vim users on computers

**Supported browsers** (desktop versions):
- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Not optimized for**:
- Mobile browsers (touch controls incompatible with Vim key learning)
- Tablets (no physical keyboard)
- Old browsers (IE11, etc.)

### Browser-Specific Features

#### 1. Keyboard Focus Management
```javascript
// Ensure game always captures keyboard input
window.addEventListener('load', () => {
  const gameCanvas = document.getElementById('game-canvas');
  gameCanvas.focus();

  // Prevent tab from leaving game area
  gameCanvas.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
    }
  });

  // Refocus on click
  gameCanvas.addEventListener('blur', () => {
    gameCanvas.focus();
  });
});
```

#### 2. Prevent Browser Shortcuts
```javascript
// Disable browser shortcuts that conflict with Vim keys
document.addEventListener('keydown', (e) => {
  // Prevent Ctrl+H (history) on some browsers
  if (e.ctrlKey && e.key === 'h') {
    e.preventDefault();
  }

  // Prevent spacebar from scrolling page
  if (e.key === ' ' && e.target === document.body) {
    e.preventDefault();
  }
});
```

#### 3. Fullscreen API
```javascript
// Optional fullscreen mode for distraction-free practice
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

// Bind to F11 or custom button
// Note: Must be triggered by user action (button click)
```

#### 4. Web Storage for Progress
```javascript
// Save progress locally in browser
class SaveSystem {
  static save(data) {
    localStorage.setItem('vimquest_save', JSON.stringify(data));
  }

  static load() {
    const data = localStorage.getItem('vimquest_save');
    return data ? JSON.parse(data) : null;
  }

  // Track completed levels, best times, etc.
}
```

### Desktop-Focused Accessibility

#### Screen Size Optimization
**Minimum resolution**: 1280x720
**Recommended**: 1920x1080
**Maximum**: Scales to 4K (3840x2160)

```javascript
// Responsive canvas sizing for desktop
function resizeCanvas() {
  const maxWidth = 1920;
  const maxHeight = 1080;
  const aspectRatio = 16 / 9;

  let width = window.innerWidth;
  let height = window.innerHeight;

  // Maintain aspect ratio
  if (width / height > aspectRatio) {
    width = height * aspectRatio;
  } else {
    height = width / aspectRatio;
  }

  // Cap at max size
  width = Math.min(width, maxWidth);
  height = Math.min(height, maxHeight);

  game.scale.resize(width, height);
}
```

#### Keyboard-Only Navigation
**All UI must be keyboard accessible**:
- Main menu: Arrow keys + Enter (or hjkl + o)
- Settings: Tab between options (or jk to navigate)
- Pause menu: Esc to open, hjkl to navigate
- No mouse required (but supported for convenience)

#### Visual Accessibility

**Font sizes** (optimized for desktop viewing distance):
- Headings: 24-32px
- Body text: 16-18px
- HUD elements: 14-16px
- Minimum: 12px (for non-critical info)

**High contrast mode**:
```javascript
const themes = {
  normal: {
    bg: '#7cb342',
    fg: '#37474f',
    player: '#ff6f00'
  },
  highContrast: {
    bg: '#ffffff',
    fg: '#000000',
    player: '#ff0000'
  },
  darkMode: {
    bg: '#1e1e1e',
    fg: '#d4d4d4',
    player: '#4ec9b0'
  }
};
```

**Colorblind modes**:
- Deuteranopia (red-green)
- Protanopia (red-green)
- Tritanopia (blue-yellow)
- Use patterns/shapes in addition to color

#### Performance Optimization

**Target framerate**: 60 FPS on desktop
**Optimization techniques**:
- Sprite atlases for fewer draw calls
- Object pooling for particles
- Tilemap culling (only render visible tiles)
- Throttle non-critical updates

```javascript
// Performance monitoring
const stats = {
  fps: 60,
  drawCalls: 0,
  entities: 0
};

// Show FPS counter (dev mode only)
if (DEBUG_MODE) {
  this.add.text(10, 10, () => `FPS: ${Math.round(stats.fps)}`, {
    font: '12px monospace',
    fill: '#ffffff'
  });
}
```

### Browser Audio Handling

#### Audio Context Management
```javascript
// Handle browser autoplay policies
class AudioManager {
  constructor(scene) {
    this.scene = scene;
    this.unlocked = false;
  }

  async unlock() {
    // Modern browsers require user interaction before playing audio
    if (!this.unlocked) {
      await this.scene.sound.unlock();
      this.unlocked = true;
    }
  }

  // Call on first user input (key press or click)
  init() {
    const unlockAudio = () => {
      this.unlock();
      document.removeEventListener('keydown', unlockAudio);
      document.removeEventListener('click', unlockAudio);
    };

    document.addEventListener('keydown', unlockAudio);
    document.addEventListener('click', unlockAudio);
  }
}
```

### Desktop UX Enhancements

#### 1. Custom Cursor
```css
/* Vim-style cursor when hovering game */
#game-canvas {
  cursor: crosshair; /* or custom cursor image */
}

#game-canvas.menu-mode {
  cursor: pointer;
}
```

#### 2. Loading Screen
```html
<!-- index.html -->
<div id="loading-screen">
  <div class="vim-logo">VIM QUEST</div>
  <div class="loading-bar">
    <div class="progress"></div>
  </div>
  <p>Loading assets... <span id="load-percent">0%</span></p>
</div>

<style>
#loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #1e1e1e;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Courier New', monospace;
  color: #4ec9b0;
}
</style>
```

#### 3. Settings Panel
**Desktop-specific settings**:
- [ ] Audio volume (BGM, SFX separate)
- [ ] Visual theme (Normal, High Contrast, Dark, Colorblind modes)
- [ ] Screen size (Windowed, Fullscreen)
- [ ] Show FPS counter
- [ ] Tutorial hints (On/Off)
- [ ] Key press display (On/Off)
- [ ] Particle effects quality (Low/Medium/High)

#### 4. Keyboard Shortcuts Reference
**Accessible via `?` key**:
```
╔════════════════════════════════════╗
║      VIM QUEST - CONTROLS         ║
╠════════════════════════════════════╣
║ Movement:                          ║
║   h - Move Left                    ║
║   j - Move Down                    ║
║   k - Move Up                      ║
║   l - Move Right                   ║
║                                    ║
║ Game Controls:                     ║
║   Esc - Pause Menu                 ║
║   R - Restart Level                ║
║   ? - Show This Help               ║
║   M - Toggle Music                 ║
║                                    ║
║ Advanced (Later Levels):           ║
║   (coming soon...)                 ║
╚════════════════════════════════════╝
```

### Browser Deployment Checklist

- [ ] **Manifest.json** for PWA support (optional)
- [ ] **Favicon** and app icons (multiple sizes)
- [ ] **Open Graph tags** for social sharing
- [ ] **Service Worker** for offline play (optional)
- [ ] **HTTPS** required for some features (gamepad, fullscreen)
- [ ] **Responsive meta tags** in HTML
- [ ] **Analytics** (optional, privacy-respecting)

### Example HTML Structure
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>Vim Quest - Learn Neovim Through Gameplay</title>

  <!-- Open Graph for sharing -->
  <meta property="og:title" content="Vim Quest - Learn Neovim">
  <meta property="og:description" content="Master Vim keybindings through a fun 2D adventure game">
  <meta property="og:type" content="website">

  <!-- Favicon -->
  <link rel="icon" type="image/png" href="favicon.png">

  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      background: #1e1e1e;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      font-family: 'Courier New', monospace;
      overflow: hidden; /* Prevent scrollbars during gameplay */
    }

    #game-container {
      position: relative;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    }

    /* Prevent text selection during gameplay */
    canvas {
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      user-select: none;
    }
  </style>
</head>
<body>
  <div id="game-container">
    <div id="loading-screen">
      <!-- Loading content here -->
    </div>
  </div>

  <script src="phaser.min.js"></script>
  <script src="game.js"></script>
</body>
</html>
```

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
- [ ] Integrate background music (see [MUSIC_RESOURCES.md](./MUSIC_RESOURCES.md))
- [ ] Implement sound effects
- [ ] Create victory/defeat screens
- [ ] Add stats display
- [ ] Optimize performance

### Phase 4: Testing & Deployment (Week 7-8)
- [ ] Playtesting with users
- [ ] Balance difficulty
- [ ] Fix bugs
- [ ] Deploy to web (GitHub Pages recommended)
- [ ] Add browser-specific features (fullscreen, local storage)
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
2. **Download Assets**:
   - Visual: Kenney's top-down shooter pack (CC0)
   - Audio: Background music from FreePD.com or Kevin MacLeod (see MUSIC_RESOURCES.md)
3. **Set Up Browser Project**:
   - Create HTML/CSS structure
   - Install Phaser 3 via CDN or npm
   - Set up basic file structure
4. **Start Prototyping**:
   - Build basic hjkl movement system
   - Test in Chrome/Firefox
   - Implement keyboard focus management
5. **Deploy Early**: Set up GitHub Pages for continuous testing

---

## 🔗 Resource Links

### Visual Assets
- **Kenney Assets (Primary)**: https://www.kenney.nl/assets/top-down-shooter
- **OpenGameArt**: https://opengameart.org/ (filter by CC0/GPL)

### Audio Assets
- **Music Resources**: See [MUSIC_RESOURCES.md](./MUSIC_RESOURCES.md) for full list
- **FreePD (CC0 Music)**: https://freepd.com/
- **Kevin MacLeod (CC-BY)**: https://incompetech.com/music/royalty-free/
- **OpenGameArt Music**: https://opengameart.org/content/cc0-music-0

### Development
- **Phaser 3 Docs**: https://photonstorm.github.io/phaser3-docs/
- **Phaser Examples**: https://phaser.io/examples
- **Vim Commands Reference**: https://vim.rtorr.com/

### Deployment
- **GitHub Pages**: https://pages.github.com/
- **Netlify**: https://www.netlify.com/
- **itch.io**: https://itch.io/ (for game hosting)

---

**Version**: 1.1
**Last Updated**: 2025-11-04
**Status**: Planning Phase
**Platform**: Browser-based (Desktop computers)
**Music**: CC0/CC-BY (see MUSIC_RESOURCES.md)
