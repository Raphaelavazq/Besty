# Data Storage Plan

## Content Architecture

B1 Bestie DTZ stores educational content in a structured, scalable format optimized for German language learning and DTZ exam preparation.

## Current Storage Structure

### Local File System

```
public/
├── data/                     # JSON metadata files
│   ├── content.json         # Main content index
│   ├── sections.json        # Course sections
│   ├── themes.json          # Learning themes
│   ├── tests.json          # Test definitions
│   └── synchronized-tests.json
├── audio/                    # Audio assets
│   └── hoeren/              # Listening exercises
│       ├── Track_001.mp3
│       ├── Track_002.mp3
│       └── ...
└── assets/                   # Images and static files
```

## Content Model

### Lesson Structure

```json
{
  "id": "lesson-001",
  "title": "Familie & Freunde",
  "description": "Grundlagen der Familie und Freundschaft",
  "level": "B1",
  "type": "hoeren",
  "duration": 1800,
  "metadata": {
    "difficulty": "beginner",
    "topics": ["familie", "freunde", "beziehungen"],
    "skills": ["listening", "vocabulary"],
    "created": "2024-01-15T10:00:00Z",
    "updated": "2024-01-20T14:30:00Z"
  },
  "content": {
    "audio": {
      "main": "/audio/hoeren/lesson-001-main.mp3",
      "exercises": [
        "/audio/hoeren/lesson-001-ex1.mp3",
        "/audio/hoeren/lesson-001-ex2.mp3"
      ]
    },
    "transcripts": {
      "main": "/transcripts/lesson-001-main.vtt",
      "exercises": [
        "/transcripts/lesson-001-ex1.vtt",
        "/transcripts/lesson-001-ex2.vtt"
      ]
    },
    "questions": [
      {
        "id": "q1",
        "type": "multiple-choice",
        "question": "Was ist das Hauptthema des Gesprächs?",
        "options": ["Familie", "Arbeit", "Hobby", "Reisen"],
        "correct": 0,
        "explanation": "Das Gespräch handelt hauptsächlich von Familie."
      }
    ]
  }
}
```

### Section Hierarchy

```json
{
  "sections": [
    {
      "id": "hoeren",
      "title": "Hörverstehen",
      "description": "Listening comprehension exercises",
      "parts": [
        {
          "id": "teil-1",
          "title": "Teil 1 - Kurze Gespräche",
          "lessons": ["lesson-001", "lesson-002", "lesson-003"]
        },
        {
          "id": "teil-2",
          "title": "Teil 2 - Längere Gespräche",
          "lessons": ["lesson-004", "lesson-005", "lesson-006"]
        }
      ]
    }
  ]
}
```

### Theme Organization

```json
{
  "themes": [
    {
      "id": "familie-freunde",
      "name": "Familie & Freunde",
      "icon": "users",
      "color": "from-purple-500 to-pink-500",
      "description": "Grundlagen zwischenmenschlicher Beziehungen",
      "lessons": ["lesson-001", "lesson-015", "lesson-028"],
      "exerciseCount": 12,
      "difficulty": "beginner",
      "estimatedTime": 180
    }
  ]
}
```

## Audio Asset Management

### File Format Standards

- **Format**: MP3 (for broad compatibility)
- **Quality**: 128kbps (balance of quality/size)
- **Sample Rate**: 44.1kHz
- **Channels**: Mono (for voice content)

### Naming Convention

```
/audio/{section}/{lesson-id}-{part}.mp3

Examples:
/audio/hoeren/lesson-001-main.mp3
/audio/hoeren/lesson-001-ex1.mp3
/audio/sprechen/lesson-045-sample.mp3
```

### Size Optimization

- **Compression**: Use high-quality MP3 encoding
- **Duration**: Limit individual files to 5 minutes max
- **Chunking**: Split long content into manageable segments
- **Lazy Loading**: Load audio files on demand

## Content Delivery Strategy

### Current: Static Hosting

**Advantages:**

- Simple deployment
- Fast loading for small files
- No backend complexity
- Cost-effective

**Limitations:**

- No user-specific content
- Limited analytics
- Manual content updates

### Future: CDN + Backend Hybrid

#### Phase 1: CDN Migration

```
CDN Structure:
├── content.domain.com/
│   ├── audio/
│   │   ├── compressed/
│   │   └── original/
│   ├── transcripts/
│   └── metadata/
```

#### Phase 2: Backend API

```javascript
// API Endpoints
GET /api/lessons              // List all lessons
GET /api/lessons/:id          // Get specific lesson
GET /api/lessons/:id/audio    // Get audio URL (signed)
POST /api/progress            // Save user progress
GET /api/recommendations      // Personalized content
```

## User Data Storage

### Client-Side Storage (Current)

```javascript
// Local Storage Schema
{
  "user": {
    "id": "generated-uuid",
    "level": "B1",
    "preferences": {
      "language": "de",
      "audioSpeed": 1.0,
      "subtitles": true
    }
  },
  "progress": {
    "lesson-001": {
      "completed": true,
      "score": 85,
      "timeSpent": 1200,
      "lastAccessed": "2024-01-20T15:30:00Z"
    }
  },
  "bookmarks": [
    {
      "lessonId": "lesson-003",
      "timestamp": 45,
      "note": "Important grammar point",
      "created": "2024-01-20T16:00:00Z"
    }
  ]
}
```

### Server-Side Storage (Future)

```sql
-- User table
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  level VARCHAR(10),
  preferences JSONB,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

-- Progress tracking
CREATE TABLE lesson_progress (
  user_id UUID REFERENCES users(id),
  lesson_id VARCHAR(50),
  completed BOOLEAN DEFAULT FALSE,
  score INTEGER,
  time_spent INTEGER,
  last_accessed TIMESTAMP,
  PRIMARY KEY (user_id, lesson_id)
);

-- Bookmarks
CREATE TABLE bookmarks (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  lesson_id VARCHAR(50),
  timestamp INTEGER,
  note TEXT,
  created_at TIMESTAMP
);
```

## Content Versioning

### Version Control Strategy

```json
{
  "content": {
    "version": "2.1.0",
    "compatibilityVersion": "2.0.0",
    "lastUpdated": "2024-01-20T10:00:00Z",
    "changes": [
      {
        "type": "lesson-update",
        "lessonId": "lesson-001",
        "changes": ["audio-quality-improvement", "transcript-correction"]
      }
    ]
  }
}
```

### Update Mechanism

```javascript
// Check for content updates
const checkForUpdates = async () => {
  const currentVersion = localStorage.getItem("contentVersion");
  const latestVersion = await fetch("/api/version").then((r) => r.json());

  if (semver.gt(latestVersion.version, currentVersion)) {
    // Trigger content update
    await updateContent(latestVersion);
  }
};
```

## Backup & Recovery

### Current Backup Strategy

- **Git repository**: Source content versioned
- **Build artifacts**: Deployed content backed up
- **User data**: Local storage (user responsibility)

### Future Backup Strategy

```javascript
// Automated backups
{
  "database": {
    "frequency": "daily",
    "retention": "90 days",
    "location": "encrypted cloud storage"
  },
  "audio_assets": {
    "frequency": "weekly",
    "retention": "1 year",
    "redundancy": "multi-region"
  },
  "user_data": {
    "frequency": "real-time",
    "retention": "indefinite",
    "privacy": "encrypted at rest"
  }
}
```

## Performance Optimization

### Audio Loading Strategy

```javascript
// Progressive audio loading
const loadAudio = async (lessonId) => {
  // 1. Load metadata first
  const metadata = await fetchLessonMetadata(lessonId);

  // 2. Preload first 10 seconds for immediate playback
  const preview = await fetchAudioSegment(lessonId, 0, 10);

  // 3. Load remaining audio in background
  const fullAudio = fetchAudioSegment(lessonId, 10);

  return { metadata, preview, fullAudio };
};
```

### Caching Strategy

```javascript
// Service Worker caching
const CACHE_STRATEGY = {
  metadata: "stale-while-revalidate", // Always fresh when possible
  audio: "cache-first", // Cache aggressively
  ui: "network-first", // Fresh UI, fallback to cache
};
```

## Content Management

### Current Workflow

1. Content creation (manual)
2. File organization (manual)
3. JSON metadata generation (manual)
4. Quality review
5. Git commit and deploy

### Future CMS Integration

```javascript
// Headless CMS structure
{
  "contentTypes": {
    "lesson": {
      "fields": ["title", "description", "level", "audio", "transcript", "questions"],
      "workflows": ["draft", "review", "published"],
      "permissions": ["editor", "reviewer", "admin"]
    }
  }
}
```

## Analytics & Monitoring

### Content Usage Tracking

```javascript
// Anonymous usage analytics
{
  "events": [
    {
      "type": "lesson-started",
      "lessonId": "lesson-001",
      "timestamp": "2024-01-20T15:00:00Z",
      "metadata": {
        "userLevel": "B1",
        "deviceType": "mobile",
        "referrer": "dashboard"
      }
    }
  ]
}
```

### Performance Monitoring

- **Page load times**: Monitor content loading speed
- **Audio buffering**: Track playback quality
- **Error rates**: Monitor failed content requests
- **User engagement**: Track completion rates

## Security Considerations

### Access Control

- **Public content**: No authentication required
- **User progress**: Encrypted local storage
- **Admin content**: Authentication required (future)

### Data Privacy

- **No PII**: Avoid collecting personal information
- **Anonymous usage**: Track patterns, not individuals
- **GDPR compliance**: Right to deletion support

### Content Integrity

```javascript
// Content validation
const validateContent = (content) => {
  return {
    hasValidStructure: validateSchema(content),
    hasValidAudio: validateAudioFiles(content.audio),
    hasValidTranscripts: validateTranscripts(content.transcripts),
    passesSecurityScan: scanForMaliciousContent(content),
  };
};
```

## Migration Strategy

### Phase 1: Current State Optimization

- Optimize existing file structure
- Implement better caching
- Add content validation

### Phase 2: CDN Migration

- Move audio files to CDN
- Implement signed URLs for content
- Add geographic distribution

### Phase 3: Backend Integration

- User authentication system
- Progress synchronization
- Personalized recommendations
- Advanced analytics

### Phase 4: Advanced Features

- Offline content support
- Multi-language support
- Adaptive difficulty
- Social features
