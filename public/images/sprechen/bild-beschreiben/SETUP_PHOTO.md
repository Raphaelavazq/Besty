# 📸 How to Add Your Photo

## Step 1: Save the Photo

1. Save the photo you sent me (girl studying at desk) as: **`1.jpg`**
2. Move it to this directory: `/Users/rafaela/Desktop/Besty/public/images/sprechen/bild-beschreiben/1.jpg`

## Step 2: Quick Terminal Command

```bash
# If you have the photo on your Desktop:
mv ~/Desktop/learning-girl.jpg /Users/rafaela/Desktop/Besty/public/images/sprechen/bild-beschreiben/1.jpg

# Or just drag and drop the file into the folder!
```

## Step 3: Test It

1. Go to: `http://127.0.0.1:3003/tests/sprechen/bild-beschreiben`
2. Click on **"Übung 1 - Lernen und Bildung"**
3. You should see:
   - ✅ Your photo of the girl studying
   - ✅ The German transcription text
   - ✅ **Play button** to hear the text read aloud (OpenAI TTS)
   - ✅ Recording button for students
   - ✅ Additional questions

## 📁 For Future Exercises

When you add more exercises:

1. **Save photos as**: `2.jpg`, `3.jpg`, `4.jpg`, etc.
2. **Add data** in `BildBeschreibenDetail.jsx`:

```javascript
const exerciseData = {
  1: { /* existing */ },
  2: {
    id: 2,
    title: "Freizeit zu Hause",
    imageUrl: "/images/sprechen/bild-beschreiben/2.jpg",
    transcription: "Your German text here...",
    // ... etc
  }
};
```

## 🎤 TTS Voice

The text will be read by **OpenAI's "nova" voice** - it's natural-sounding and perfect for German!

If you want to try a different voice, edit line 151 in `BildBeschreibenDetail.jsx`:
- `nova` - Warm feminine (current)
- `alloy` - Neutral
- `echo` - Clear male
- `shimmer` - Upbeat feminine

## ✅ What Works Now

- ✅ Image display
- ✅ German transcription
- ✅ TTS playback (click "Beispielantwort anhören")
- ✅ Recording interface (placeholder - you can enhance later)
- ✅ Additional questions
- ✅ Responsive design
- ✅ Back navigation

Enjoy! 🎉
