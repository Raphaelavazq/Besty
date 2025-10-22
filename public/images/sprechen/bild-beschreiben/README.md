# Bild Beschreiben - Image Storage

## 📁 Directory Structure

```
public/images/sprechen/bild-beschreiben/
├── 1.jpg     # Lernen und Bildung
├── 2.jpg     # Freizeit zu Hause
├── 3.jpg     # Familie und Freizeit
├── ...
└── 113.jpg   # Last exercise
```

## 📸 How to Add Images

1. **Save images** in this folder with numbers: `1.jpg`, `2.jpg`, etc.
2. **Image format**: JPG, PNG, or WebP
3. **Recommended size**: 800x600px or larger
4. **File size**: Keep under 500KB for fast loading

## 🔗 Usage in Code

Images are referenced as:

```jsx
<img src="/images/sprechen/bild-beschreiben/1.jpg" alt="Lernen und Bildung" />
```

## ✅ Current Status

- ✅ Exercise 1: "Lernen und Bildung" - Photo provided by user
- ⬜ Exercise 2-113: Awaiting photos

## 💡 Where to Get Photos

1. **Royalty-free sources**:
   - Unsplash (unsplash.com)
   - Pexels (pexels.com)
   - Pixabay (pixabay.com)

2. **AI-generated**:
   - DALL-E, Midjourney, Stable Diffusion

3. **Licensed content**:
   - Purchase from stock photo sites

## 🛠️ Content workflow (recommended)

1. Add image files to `public/images/sprechen/bild-beschreiben/`.
2. Run the scanner to regenerate the manifest:

```bash
npm run scan-images
```

3. Validate the manifest:

```bash
npm run validate-images
```

4. Start dev server:

```bash
./start-dev.sh
```

Notes:

- Use per-theme subfolders in the future (e.g. `lernen-bildung/1.jpg`) — update `scripts/scan-bild-beschreiben.js` mapping accordingly.
- Provide `alt` text and credits by editing `data/bild-beschreiben.json` after scanning.
