#!/bin/bash
# Professional development server startup script
# Ensures clean process management and non-interactive mode

echo "🧹 Cleaning up old processes..."
killall -9 node npm 2>/dev/null
sleep 1

echo "🚀 Starting Backend Server (port 3001)..."
cd /Users/rafaela/Desktop/Besty/backend
node server.js > /tmp/backend.log 2>&1 &
BACKEND_PID=$!
echo "   Backend PID: $BACKEND_PID"

sleep 2

# Verify backend health
BACKEND_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3001/health)
if [ "$BACKEND_STATUS" = "200" ]; then
  echo "   ✅ Backend healthy (HTTP $BACKEND_STATUS)"
else
  echo "   ❌ Backend failed (HTTP $BACKEND_STATUS)"
  exit 1
fi

echo ""
echo "🎨 Starting Frontend Server (port 3003)..."
cd /Users/rafaela/Desktop/Besty

# Force non-interactive mode with CI environment variable
export CI=true
npm run dev > /tmp/vite.log 2>&1 &
VITE_PID=$!
echo "   Vite PID: $VITE_PID"

echo ""
echo "⏳ Waiting for Vite to initialize..."
sleep 4

# Verify Vite responding
VITE_STATUS=$(curl -s -o /dev/null -w "%{http_code}" -m 5 http://127.0.0.1:3003/ 2>/dev/null)
if [ "$VITE_STATUS" = "200" ]; then
  echo "   ✅ Vite healthy (HTTP $VITE_STATUS)"
else
  echo "   ⚠️  Vite status: HTTP $VITE_STATUS (checking logs...)"
  echo ""
  tail -n 10 /tmp/vite.log
fi

echo ""
echo "============================================"
echo "🎯 Development Environment Ready"
echo "============================================"
echo "Backend:  http://localhost:3001"
echo "Frontend: http://127.0.0.1:3003"
echo ""
echo "Logs:"
echo "  Backend: tail -f /tmp/backend.log"
echo "  Vite:    tail -f /tmp/vite.log"
echo ""
echo "Stop servers:"
echo "  kill $BACKEND_PID $VITE_PID"
echo "============================================"
