# Music Resources for Vim Quest

## Overview
This document lists free, open-source music resources suitable for the Neovim practice game. While GPL-licensed music is rare (GPL is typically used for software), **CC0 (Public Domain)** and **CC-BY (Creative Commons Attribution)** licenses are even better for game development.

---

## 🎵 Recommended Music Sources

### 1. **FreePD.com** (CC0 - Public Domain) ⭐ BEST OPTION
- **License**: CC0 1.0 Universal Public Domain
- **URL**: https://freepd.com/
- **Advantages**:
  - No attribution required
  - Truly public domain
  - High-quality recordings
- **Best for**: Background loops, ambient music
- **Usage**: Download MP3/WAV, use freely without credit

**Recommended Tracks for Vim Quest**:
- Search for "ambient", "calm", "peaceful", "background"
- Look for tracks 2-4 minutes that loop well

---

### 2. **OpenGameArt.org - CC0 Music** ⭐ GAME-FOCUSED
- **License**: CC0 (Public Domain)
- **URL**: https://opengameart.org/content/cc0-music-0
- **Collections**:
  - CC0 - Calm / Relaxing Music
  - Ambient Relaxing Loop
  - Ambient/loading screen game music Pack
  - EmptyCity: Background Music

**Specific Recommendations**:
1. **"Ambient Relaxing Loop"** - Seamless ambient pad, perfect for Level 1
   - URL: https://opengameart.org/content/ambient-relaxing-loop
   - License: CC0

2. **"CC0 - Calm / Relaxing Music"** - Multiple calm tracks
   - URL: https://opengameart.org/content/cc0-calm-relaxing-music
   - License: CC0

3. **Dark Ambience Loop** (GPL 2.0 option if needed)
   - URL: https://opengameart.org/content/dark-ambience-loop
   - License: GPL 2.0
   - Note: This is one of the few GPL-licensed music tracks available

---

### 3. **Kevin MacLeod - Incompetech** (CC-BY 4.0) ⭐ PROFESSIONAL QUALITY
- **License**: Creative Commons Attribution 4.0
- **URL**: https://incompetech.com/music/royalty-free/
- **Advantages**:
  - Huge library (1000+ tracks)
  - Professional quality
  - Categorized by mood/genre
  - Searchable database
- **Attribution Required**:
  ```
  "Track Title" Kevin MacLeod (incompetech.com)
  Licensed under Creative Commons: By Attribution 4.0
  https://creativecommons.org/licenses/by/4.0/
  ```

**Recommended Tracks for Vim Quest**:
1. **"Carefree"** - Light, mellow background music
2. **"Wallpaper"** - Calm, ambient
3. **"Anamalie"** - Peaceful electronic
4. **"Deliberate Thought"** - Contemplative, programming-friendly
5. **"Floating Cities"** - Ambient, ethereal

**Browse by mood**:
- Ambient: https://incompetech.com/music/royalty-free/music.html?keywords=ambient
- Calm: https://incompetech.com/music/royalty-free/music.html?keywords=calm

---

### 4. **Free Music Archive** (Various CC Licenses)
- **License**: CC-BY, CC-BY-SA, CC0 (varies by track)
- **URL**: https://freemusicarchive.org/genre/Ambient/
- **Advantages**:
  - Curated collections
  - Filter by license
  - High-quality independent artists
- **Usage**: Check individual track licenses

---

### 5. **itch.io Music Assets** (CC Licenses)
- **License**: Various Creative Commons
- **URL**: https://itch.io/game-assets/assets-cc0/tag-music
- **Filter by**: CC0, CC-BY
- **Advantages**: Game-specific music, often loopable

---

## 🎮 Music Strategy for Vim Quest

### Level 1: "The Basic Plains"
**Mood**: Calm, encouraging, non-distracting
**Tempo**: Slow (60-80 BPM)
**Style**: Ambient, minimal instrumentation

**Recommended approach**:
1. Use a single looping track (2-4 minutes)
2. Ensure seamless loop (no audible break)
3. Keep volume low (background music, not foreground)
4. Fade in at level start, fade out at completion

**Top picks**:
- FreePD: Search "peaceful" or "ambient"
- Kevin MacLeod: "Wallpaper", "Deliberate Thought"
- OpenGameArt: "Ambient Relaxing Loop"

---

### Future Levels Music Themes

| Level | Theme | Mood | Suggested Tracks |
|-------|-------|------|------------------|
| Level 1 | Basic Plains | Calm, welcoming | Ambient, peaceful |
| Level 2 | Forest Path | Natural, flowing | Light acoustic |
| Level 3 | Mountain Climb | Focused, steady | Minimal beats |
| Level 4 | Cave System | Mysterious | Dark ambient |
| Level 5 | Sky Temple | Ethereal | Atmospheric pads |
| Level 6 | Tech Lab | Focused, modern | Electronic ambient |
| Level 7 | Time Trial | Energetic | Upbeat but not distracting |
| Level 8 | Final Challenge | Epic, motivating | Orchestral ambient |

---

## 🔊 Audio Implementation (Phaser 3)

### Basic Implementation
```javascript
// In Level scene preload
preload() {
  this.load.audio('bgm_level1', 'assets/audio/level1_ambient.mp3');
}

// In create method
create() {
  this.bgMusic = this.sound.add('bgm_level1', {
    loop: true,
    volume: 0.3  // 30% volume - keep it subtle
  });

  // Fade in over 2 seconds
  this.bgMusic.play();
  this.tweens.add({
    targets: this.bgMusic,
    volume: 0.3,
    duration: 2000,
    ease: 'Linear'
  });
}

// On level complete
levelComplete() {
  // Fade out over 1 second
  this.tweens.add({
    targets: this.bgMusic,
    volume: 0,
    duration: 1000,
    ease: 'Linear',
    onComplete: () => {
      this.bgMusic.stop();
    }
  });
}
```

### Advanced Features
```javascript
// User controls (settings menu)
class AudioSettings {
  constructor(scene) {
    this.scene = scene;
    this.bgmVolume = 0.3;  // Default 30%
    this.sfxVolume = 0.5;  // Default 50%
    this.enabled = true;
  }

  setBGMVolume(value) {
    // value: 0.0 to 1.0
    this.bgmVolume = value;
    if (this.scene.bgMusic) {
      this.scene.bgMusic.setVolume(value);
    }
  }

  toggleMute() {
    this.enabled = !this.enabled;
    this.scene.sound.mute = !this.enabled;
  }
}
```

---

## 📋 Music Selection Checklist

When choosing music for the game:
- [ ] **Loopable**: No awkward breaks when repeating
- [ ] **Length**: 2-4 minutes minimum (avoid short loops that get annoying)
- [ ] **Tempo**: 60-90 BPM for calm levels, 100-120 for action levels
- [ ] **Complexity**: Not too busy - should fade to background during gameplay
- [ ] **Mood**: Matches level theme and difficulty
- [ ] **License**: Verified CC0 or CC-BY (check attribution requirements)
- [ ] **Format**: MP3 or OGG (web-friendly formats)
- [ ] **File size**: Under 5MB per track (for fast loading)

---

## 🎼 Recommended Starting Pack

For quick prototyping, download these tracks first:

1. **Level 1 BGM**:
   - Source: FreePD.com
   - Search: "peaceful" or "calm"
   - Pick: 2-3 minute ambient track

2. **Menu Music**:
   - Source: Kevin MacLeod
   - Track: "Wallpaper" or "Carefree"
   - Remember: Add attribution to credits

3. **Victory Jingle** (short, 5-10 seconds):
   - Source: OpenGameArt CC0 sound effects
   - Style: Uplifting, positive

4. **Sound Effects**:
   - Movement: Subtle "whoosh" or "step"
   - Collect: Gentle "ding" or "chime"
   - Error: Soft "boop" (non-harsh)
   - Victory: Fanfare or success sound

---

## 📄 License Comparison

| License | Attribution | Modifications | Commercial Use | Best For |
|---------|-------------|---------------|----------------|----------|
| **CC0** | Not required | Allowed | Allowed | Easy integration |
| **CC-BY** | Required | Allowed | Allowed | Professional tracks |
| **CC-BY-SA** | Required | Allowed (share-alike) | Allowed | Community projects |
| **GPL 2.0/3.0** | Required | Allowed (copyleft) | Allowed | Open source games |

**Recommendation**: Use **CC0** for simplicity, or **CC-BY** for access to higher-quality music (just add credits screen).

---

## 🎯 Next Steps

1. **Browse FreePD.com** for CC0 ambient tracks
2. **Download 2-3 options** for Level 1
3. **Test in-game** with placeholder integration
4. **User feedback**: Is the music distracting or helpful?
5. **Adjust volume** in code (default to 20-30%)
6. **Add mute/volume controls** to settings menu

---

## 📚 Additional Resources

- **Music Theory for Games**: https://www.gamedeveloper.com/audio/a-composer-s-guide-to-game-music
- **Audio Implementation Tips**: https://phaser.io/examples/v3/category/audio
- **Looping Audio Tutorial**: https://phaser.io/examples/v3/view/audio/web-audio/loop

---

**Last Updated**: 2025-11-04
**Status**: Ready for implementation
