# Einbürgerungstest Translations

This directory contains translations of the 460 BAMF Einbürgerungstest questions in multiple languages.

## Available Languages

- **English** (en)
- **Portuguese (Portugal)** (pt-PT)
- **Arabic** (ar)
- **Turkish** (tr)
- **Russian** (ru)
- **Spanish** (es)
- **French** (fr)
- **Italian** (it)
- **Polish** (pl)
- **Ukrainian** (uk)

## Translation Process

All translations are generated using **DeepL API** (Free tier), which provides high-quality translations specifically optimized for German text.

### How to Generate Translations

1. **Sign up for DeepL Free API** (no credit card required):
   - Visit: https://www.deepl.com/pro-api
   - Click "Sign up for free"
   - Verify your email
   - Get your API key from the dashboard

2. **Set your API key**:

   ```bash
   export DEEPL_API_KEY="your-api-key-here"
   ```

3. **Run the translation script**:

   ```bash
   npm run translate
   ```

4. **Wait for completion** (approximately 30-45 minutes for all 460 questions × 10 languages)

## File Format

Each translation file (`questions-{lang}.json`) has the same structure as the original `questions.json`:

```json
{
  "metadata": { ... },
  "categories": [ ... ],
  "bundeslaender": [ ... ],
  "language": "pt-PT",
  "languageName": "Portuguese (Portugal)",
  "translatedAt": "2025-11-22T...",
  "questions": [
    {
      "id": 1,
      "category": "Politik in der Demokratie",
      "question": "...",
      "options": ["...", "...", "...", "..."],
      "correctAnswer": 2,
      "imageUrl": null,
      "bundesland": null,
      "tags": ["democracy"]
    }
  ]
}
```

## DeepL Free Tier Limits

- **500,000 characters/month** (more than enough)
- Estimated usage for all translations:
  - 460 questions × ~200 chars average = ~92,000 characters per language
  - 10 languages × 92,000 = ~920,000 characters total
  - Can translate all languages **once every 2 months** on free tier
  - Or do 5 languages per month

## Usage in App

To use translations in the application:

```javascript
import questionsDE from "/data/einbuergerungstest/questions.json";
import questionsPT from "/data/einbuergerungstest/translations/questions-pt-PT.json";
import questionsEN from "/data/einbuergerungstest/translations/questions-en.json";

// Load based on user's language preference
const questions =
  userLanguage === "pt-PT" ? questionsPT.questions : questionsDE.questions;
```

## Updating Translations

When the original German questions are updated:

1. Update `questions.json`
2. Re-run `npm run translate` with your DeepL API key
3. Updated translations will overwrite existing files
4. Check git diff to review changes

## Translation Quality

DeepL is specifically optimized for German translations and provides:

- **Context-aware translations** (understands political/legal terminology)
- **Consistent terminology** across all questions
- **Preservation of formatting** (lists, punctuation)
- **High accuracy** for German → target language pairs

## Support

- DeepL API Documentation: https://www.deepl.com/docs-api
- DeepL Support: https://support.deepl.com/

## Cost

- **Current cost: €0/month** (Free tier)
- If usage exceeds 500k chars/month, upgrade to DeepL API Pro (~€5/month for 1M characters)
