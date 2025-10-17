#!/bin/bash
# dev-start.sh - Professional dev environment startup script for B1 Bestie
# Usage: ./dev-start.sh

set -e  # Exit on error

echo "🚀 Starting B1 Bestie Development Environment..."
echo ""

# Kill any existing processes
echo "📋 Cleaning up existing processes..."
pkill -9 -f 'node.*server.js' 2>/dev/null || true
pkill -9 -f 'vite' 2>/dev/null || true
sleep 2
echo "✅ Cleanup complete"
echo ""

# Start backend
echo "🔧 Starting backend on port 3001..."
cd backend
node server.js > /tmp/backend.log 2>&1 &
BACKEND_PID=$!
cd ..
echo "   Backend PID: $BACKEND_PID"

# Wait for backend to be ready
echo "⏳ Waiting for backend health check..."
for i in {1..15}; do
  if curl -s http://localhost:3001/health > /dev/null 2>&1; then
    echo "✅ Backend ready!"
    break
  fi
  if [ $i -eq 15 ]; then
    echo "❌ Backend failed to start!"
    kill $BACKEND_PID 2>/dev/null || true
    exit 1
  fi
  sleep 1
done
echo ""

# Start frontend (in foreground - this terminal will show Vite output)
echo "🎨 Starting frontend on port 3003..."
echo "   📺 Vite will open in this terminal"
echo "   ⚠️  Press Ctrl+C to stop both servers"
echo ""

# Trap Ctrl+C to cleanup both processes
trap "echo ''; echo '🛑 Stopping servers...'; kill $BACKEND_PID 2>/dev/null || true; echo '✅ Servers stopped'; exit 0" INT TERM

# Run Vite in foreground (no & operator)
npm run dev

# This line only executes if Vite exits normally
kill $BACKEND_PID 2>/dev/null || true
echo "🛑 Servers stopped"
