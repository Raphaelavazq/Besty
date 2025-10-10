# Backend Development Guide

## Architecture Overview

B1 Bestie DTZ is currently a client-side application built with React and deployed as a static site. This guide outlines the backend architecture strategy for future expansion.

## Current State: Static Site

### Technology Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **State**: Zustand store
- **Deployment**: Vercel (static hosting)
- **Data**: JSON files + Local Storage

### Benefits of Current Approach

- **Fast deployment**: No server setup required
- **Low cost**: Free hosting on Vercel
- **High availability**: CDN distribution
- **Simple development**: No backend complexity
- **Quick iteration**: Direct file-based content management

### Limitations

- No user authentication
- No progress synchronization across devices
- No personalized content recommendations
- Limited analytics capabilities
- Manual content management

## Proposed Backend Architecture

### Phase 1: Serverless API Layer

#### Technology Selection

```javascript
// Recommended stack
{
  "runtime": "Node.js 18+",
  "framework": "Next.js API routes",
  "database": "Supabase (PostgreSQL)",
  "authentication": "Supabase Auth",
  "storage": "Supabase Storage",
  "deployment": "Vercel"
}
```

#### API Structure

```
api/
├── auth/
│   ├── login.js
│   ├── register.js
│   └── refresh.js
├── content/
│   ├── lessons.js
│   ├── sections.js
│   └── themes.js
├── user/
│   ├── progress.js
│   ├── bookmarks.js
│   └── preferences.js
└── admin/
    ├── content.js
    └── analytics.js
```

### Phase 2: Full Backend Service

#### Microservices Architecture

```yaml
services:
  auth-service:
    description: User authentication and authorization
    technology: Node.js + Passport.js
    database: PostgreSQL (users, sessions)

  content-service:
    description: Content management and delivery
    technology: Node.js + Express
    database: PostgreSQL (lessons, progress)
    storage: AWS S3 (audio files)

  analytics-service:
    description: User behavior and performance tracking
    technology: Node.js + ClickHouse
    database: ClickHouse (events, metrics)

  notification-service:
    description: Email and push notifications
    technology: Node.js + SendGrid
    queue: Redis (job processing)
```

## Database Design

### User Management

```sql
-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    display_name VARCHAR(100),
    level VARCHAR(10) DEFAULT 'B1',
    is_premium BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    last_login TIMESTAMP
);

-- User preferences
CREATE TABLE user_preferences (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    key VARCHAR(50) NOT NULL,
    value JSONB NOT NULL,
    PRIMARY KEY (user_id, key)
);

-- Example preferences
INSERT INTO user_preferences VALUES
    ('user-uuid', 'audio_speed', '1.0'),
    ('user-uuid', 'subtitles_enabled', 'true'),
    ('user-uuid', 'notification_settings', '{"email": true, "push": false}');
```

### Content Management

```sql
-- Lessons
CREATE TABLE lessons (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    level VARCHAR(10) NOT NULL,
    section_id VARCHAR(50) NOT NULL,
    theme_id VARCHAR(50),
    difficulty INTEGER DEFAULT 1,
    estimated_duration INTEGER, -- in seconds
    audio_url VARCHAR(500),
    transcript_url VARCHAR(500),
    metadata JSONB,
    is_published BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Questions for each lesson
CREATE TABLE lesson_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lesson_id VARCHAR(50) REFERENCES lessons(id) ON DELETE CASCADE,
    question_text TEXT NOT NULL,
    question_type VARCHAR(20) NOT NULL, -- multiple_choice, true_false, text_input
    options JSONB, -- for multiple choice questions
    correct_answer JSONB NOT NULL,
    explanation TEXT,
    points INTEGER DEFAULT 1,
    order_index INTEGER NOT NULL
);

-- Sections (Hören, Sprechen, etc.)
CREATE TABLE sections (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    color VARCHAR(50),
    order_index INTEGER NOT NULL
);

-- Themes (Familie, Arbeit, etc.)
CREATE TABLE themes (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    color VARCHAR(100),
    section_id VARCHAR(50) REFERENCES sections(id),
    is_featured BOOLEAN DEFAULT FALSE
);
```

### Progress Tracking

```sql
-- User lesson progress
CREATE TABLE lesson_progress (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    lesson_id VARCHAR(50) REFERENCES lessons(id) ON DELETE CASCADE,
    status VARCHAR(20) DEFAULT 'not_started', -- not_started, in_progress, completed
    score INTEGER,
    max_score INTEGER,
    time_spent INTEGER DEFAULT 0, -- in seconds
    attempts INTEGER DEFAULT 0,
    first_started_at TIMESTAMP,
    last_accessed_at TIMESTAMP DEFAULT NOW(),
    completed_at TIMESTAMP,
    PRIMARY KEY (user_id, lesson_id)
);

-- User question attempts
CREATE TABLE question_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    question_id UUID REFERENCES lesson_questions(id) ON DELETE CASCADE,
    user_answer JSONB NOT NULL,
    is_correct BOOLEAN NOT NULL,
    attempted_at TIMESTAMP DEFAULT NOW()
);

-- User bookmarks
CREATE TABLE bookmarks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    lesson_id VARCHAR(50) REFERENCES lessons(id) ON DELETE CASCADE,
    audio_timestamp INTEGER, -- timestamp in audio file
    note TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);
```

### Analytics Schema

```sql
-- User events tracking
CREATE TABLE user_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    session_id VARCHAR(100),
    event_type VARCHAR(50) NOT NULL,
    event_data JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Daily aggregated metrics
CREATE TABLE daily_metrics (
    date DATE NOT NULL,
    metric_name VARCHAR(50) NOT NULL,
    metric_value NUMERIC NOT NULL,
    dimensions JSONB,
    PRIMARY KEY (date, metric_name, dimensions)
);
```

## API Endpoints

### Authentication

```javascript
// POST /api/auth/register
{
  "email": "user@example.com",
  "password": "securePassword123",
  "displayName": "Max Mustermann"
}

// POST /api/auth/login
{
  "email": "user@example.com",
  "password": "securePassword123"
}

// Response
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "displayName": "Max Mustermann",
    "level": "B1",
    "isPremium": false
  },
  "accessToken": "jwt-token",
  "refreshToken": "refresh-token"
}
```

### Content API

```javascript
// GET /api/lessons?section=hoeren&theme=familie&level=B1
{
  "lessons": [
    {
      "id": "lesson-001",
      "title": "Familie & Freunde",
      "description": "Grundlagen der Familie und Freundschaft",
      "level": "B1",
      "difficulty": 2,
      "estimatedDuration": 1800,
      "audioUrl": "https://cdn.example.com/audio/lesson-001.mp3",
      "userProgress": {
        "status": "in_progress",
        "score": 75,
        "timeSpent": 900
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "hasNext": true
  }
}

// GET /api/lessons/:id
{
  "lesson": {
    "id": "lesson-001",
    "title": "Familie & Freunde",
    "description": "...",
    "audioUrl": "signed-url-with-expiration",
    "transcriptUrl": "signed-url-with-expiration",
    "questions": [
      {
        "id": "q1",
        "type": "multiple_choice",
        "question": "Was ist das Hauptthema des Gesprächs?",
        "options": ["Familie", "Arbeit", "Hobby", "Reisen"],
        "points": 2
      }
    ]
  }
}
```

### Progress API

```javascript
// POST /api/progress/lesson/:lessonId
{
  "status": "completed",
  "score": 85,
  "timeSpent": 1200,
  "answers": [
    {
      "questionId": "q1",
      "answer": 0,
      "isCorrect": true
    }
  ]
}

// GET /api/progress/dashboard
{
  "overview": {
    "totalLessonsCompleted": 45,
    "currentStreak": 7,
    "averageScore": 82,
    "timeSpentThisWeek": 3600
  },
  "recentActivity": [
    {
      "lessonId": "lesson-045",
      "title": "Im Restaurant",
      "completedAt": "2024-01-20T15:30:00Z",
      "score": 90
    }
  ],
  "recommendations": [
    {
      "lessonId": "lesson-046",
      "reason": "Next in sequence",
      "priority": "high"
    }
  ]
}
```

### User Management

```javascript
// GET /api/user/profile
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "displayName": "Max Mustermann",
    "level": "B1",
    "isPremium": false,
    "joinedAt": "2024-01-01T00:00:00Z"
  },
  "preferences": {
    "audioSpeed": 1.0,
    "subtitlesEnabled": true,
    "notificationSettings": {
      "email": true,
      "push": false,
      "dailyReminder": true
    }
  }
}

// PUT /api/user/preferences
{
  "audioSpeed": 1.2,
  "subtitlesEnabled": false,
  "notificationSettings": {
    "email": true,
    "push": true,
    "dailyReminder": true,
    "reminderTime": "19:00"
  }
}
```

## Authentication & Security

### JWT Token Strategy

```javascript
// Token structure
{
  "header": {
    "alg": "HS256",
    "typ": "JWT"
  },
  "payload": {
    "sub": "user-uuid",
    "email": "user@example.com",
    "level": "B1",
    "iat": 1640995200,
    "exp": 1640998800
  }
}

// Refresh token flow
const refreshAccessToken = async (refreshToken) => {
  const decoded = jwt.verify(refreshToken, REFRESH_SECRET);
  const newAccessToken = generateAccessToken(decoded.sub);
  return newAccessToken;
};
```

### API Security Middleware

```javascript
// Rate limiting
const rateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP",
});

// Authentication middleware
const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, ACCESS_SECRET);
    req.user = await User.findById(decoded.sub);
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

// Input validation
const validateLesson = [
  body("title").isLength({ min: 3, max: 255 }),
  body("description").optional().isLength({ max: 1000 }),
  body("level").isIn(["A1", "A2", "B1", "B2", "C1", "C2"]),
  body("difficulty").isInt({ min: 1, max: 5 }),
];
```

## Content Management System

### Admin API

```javascript
// POST /api/admin/lessons
{
  "title": "Neue Lektion: Am Bahnhof",
  "description": "Gespräche und Situationen am Bahnhof",
  "level": "B1",
  "sectionId": "hoeren",
  "themeId": "transport",
  "difficulty": 3,
  "estimatedDuration": 2400,
  "questions": [
    {
      "type": "multiple_choice",
      "question": "Wo findet das Gespräch statt?",
      "options": ["Bahnhof", "Flughafen", "Bus", "Auto"],
      "correctAnswer": 0,
      "explanation": "Das Gespräch findet am Bahnhof statt.",
      "points": 2
    }
  ]
}

// File upload for audio
// POST /api/admin/lessons/:id/audio
// Content-Type: multipart/form-data
// Body: audio file + metadata
```

### Content Workflow

```javascript
// Content status management
const CONTENT_STATUS = {
  DRAFT: "draft",
  REVIEW: "review",
  APPROVED: "approved",
  PUBLISHED: "published",
  ARCHIVED: "archived",
};

// Workflow transitions
const updateContentStatus = async (lessonId, newStatus, userId) => {
  const lesson = await Lesson.findById(lessonId);
  const user = await User.findById(userId);

  // Check permissions
  if (!canTransitionStatus(lesson.status, newStatus, user.role)) {
    throw new Error("Unauthorized status transition");
  }

  await Lesson.update(lessonId, {
    status: newStatus,
    updatedBy: userId,
    updatedAt: new Date(),
  });

  // Log the change
  await AuditLog.create({
    action: "status_change",
    entityType: "lesson",
    entityId: lessonId,
    oldValue: lesson.status,
    newValue: newStatus,
    userId: userId,
  });
};
```

## File Storage Strategy

### Audio File Management

```javascript
// Upload to cloud storage
const uploadAudio = async (file, lessonId) => {
  const fileName = `lessons/${lessonId}/audio.mp3`;

  // Upload to S3/Supabase Storage
  const { data, error } = await supabase.storage
    .from("audio-files")
    .upload(fileName, file, {
      contentType: "audio/mpeg",
      cacheControl: "3600",
    });

  if (error) throw error;

  // Generate signed URL for access
  const { signedURL } = await supabase.storage
    .from("audio-files")
    .createSignedUrl(fileName, 3600); // 1 hour expiry

  return signedURL;
};

// Audio processing pipeline
const processAudio = async (audioFile) => {
  // 1. Validate file format
  const isValid = await validateAudioFile(audioFile);
  if (!isValid) throw new Error("Invalid audio format");

  // 2. Compress if needed
  const compressed = await compressAudio(audioFile, {
    bitrate: "128k",
    format: "mp3",
  });

  // 3. Generate waveform data
  const waveform = await generateWaveform(compressed);

  // 4. Extract metadata
  const metadata = await extractAudioMetadata(compressed);

  return { compressed, waveform, metadata };
};
```

### CDN Integration

```javascript
// CloudFlare/AWS CloudFront setup
const CDN_CONFIG = {
  domain: "cdn.b1bestie.com",
  origins: {
    audio: "s3-bucket.amazonaws.com",
    images: "supabase-storage-url",
    static: "vercel-app-domain",
  },
  caching: {
    audio: "7d", // Cache audio files for 7 days
    images: "30d", // Cache images for 30 days
    api: "5m", // Cache API responses for 5 minutes
  },
};
```

## Performance Optimization

### Database Optimization

```sql
-- Indexes for common queries
CREATE INDEX idx_lessons_section_level ON lessons(section_id, level);
CREATE INDEX idx_lessons_theme_published ON lessons(theme_id, is_published);
CREATE INDEX idx_progress_user_status ON lesson_progress(user_id, status);
CREATE INDEX idx_progress_lesson_completed ON lesson_progress(lesson_id, completed_at);

-- Partial indexes for active users
CREATE INDEX idx_active_users ON users(last_login)
WHERE last_login > NOW() - INTERVAL '30 days';
```

### Caching Strategy

```javascript
// Redis caching
const cache = {
  // Cache user sessions
  session: {
    key: (userId) => `session:${userId}`,
    ttl: 3600, // 1 hour
  },

  // Cache lesson data
  lesson: {
    key: (lessonId) => `lesson:${lessonId}`,
    ttl: 1800, // 30 minutes
  },

  // Cache user progress
  progress: {
    key: (userId) => `progress:${userId}`,
    ttl: 300, // 5 minutes
  },
};

// Cache middleware
const cacheMiddleware = (cacheKey, ttl) => {
  return async (req, res, next) => {
    const key = cacheKey(req.params);
    const cached = await redis.get(key);

    if (cached) {
      return res.json(JSON.parse(cached));
    }

    // Store response in cache
    const originalSend = res.json;
    res.json = function (data) {
      redis.setex(key, ttl, JSON.stringify(data));
      originalSend.call(this, data);
    };

    next();
  };
};
```

## Monitoring & Analytics

### Application Metrics

```javascript
// Custom metrics collection
const metrics = {
  // User engagement
  trackUserAction: (userId, action, metadata) => {
    analytics.track({
      userId,
      event: action,
      properties: {
        ...metadata,
        timestamp: new Date(),
        source: "web-app",
      },
    });
  },

  // Performance monitoring
  trackAPIResponse: (endpoint, duration, statusCode) => {
    prometheus
      .histogram("api_response_time", {
        endpoint,
        statusCode,
      })
      .observe(duration);
  },

  // Error tracking
  trackError: (error, context) => {
    sentry.captureException(error, {
      tags: {
        component: context.component,
        userId: context.userId,
      },
    });
  },
};
```

### Health Checks

```javascript
// Health check endpoints
app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date(),
    version: process.env.APP_VERSION,
    uptime: process.uptime(),
  });
});

app.get("/health/detailed", async (req, res) => {
  const checks = await Promise.allSettled([
    checkDatabase(),
    checkRedis(),
    checkStorageService(),
    checkExternalAPIs(),
  ]);

  const status = checks.every((check) => check.status === "fulfilled")
    ? "healthy"
    : "degraded";

  res.json({
    status,
    checks: checks.map((check, i) => ({
      name: ["database", "redis", "storage", "external"][i],
      status: check.status,
      duration: check.value?.duration,
      error: check.reason?.message,
    })),
  });
});
```

## Deployment Strategy

### Environment Configuration

```javascript
// Environment variables
const config = {
  development: {
    database: {
      host: "localhost",
      port: 5432,
      name: "b1bestie_dev",
    },
    redis: {
      host: "localhost",
      port: 6379,
    },
    storage: {
      provider: "local",
      path: "./uploads",
    },
  },

  production: {
    database: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      name: process.env.DB_NAME,
      ssl: true,
    },
    redis: {
      url: process.env.REDIS_URL,
    },
    storage: {
      provider: "supabase",
      url: process.env.SUPABASE_URL,
      key: process.env.SUPABASE_ANON_KEY,
    },
  },
};
```

### CI/CD Pipeline

```yaml
# .github/workflows/backend.yml
name: Backend Deployment

on:
  push:
    branches: [main]
    paths: ["backend/**"]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "18"
      - run: npm ci
      - run: npm test
      - run: npm run test:integration

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## Migration Strategy

### Phase 1: API Foundation (Month 1-2)

- Set up basic authentication
- Implement user registration/login
- Create basic progress tracking API
- Migrate user data from localStorage

### Phase 2: Content Management (Month 3-4)

- Build admin panel for content management
- Implement audio file upload system
- Create content versioning system
- Migrate existing content to database

### Phase 3: Advanced Features (Month 5-6)

- Add recommendation system
- Implement advanced analytics
- Create notification system
- Add offline synchronization

### Phase 4: Scale & Optimize (Month 7+)

- Performance optimization
- Advanced caching strategies
- Multi-language support
- Advanced admin features
