#!/bin/bash
# Start development environment
# Usage: ./start.sh

echo "🚀 Starting B1 Bestie Development Environment..."
echo ""

# Kill any existing processes
echo "📋 Cleaning up..."
pkill -9 -f 'node.*index.js' 2>/dev/null || true
pkill -9 -f 'vite' 2>/dev/null || true
sleep 1

# Get the absolute path to the project root
PROJECT_ROOT="$(cd "$(dirname "$0")" && pwd)"

# Start backend server in background
echo "🔧 Starting backend server..."
(cd "$PROJECT_ROOT/server" && npm install > /dev/null 2>&1 && node index.js) > /tmp/backend.log 2>&1 &
BACKEND_PID=$!

echo "✅ Backend PID: $BACKEND_PID"
sleep 2

# Start Vite in background from project root
echo "🔧 Starting Vite dev server..."
(cd "$PROJECT_ROOT" && npx vite --host 127.0.0.1 --port 3003) > /tmp/vite.log 2>&1 &
VITE_PID=$!

echo "✅ Vite PID: $VITE_PID"
sleep 3

echo ""
echo "============================================================"
echo "✅ Development servers started!"
echo "============================================================"
echo "📡 Frontend: http://127.0.0.1:3003/"
echo "📡 Backend:  http://localhost:3001/"
echo ""
echo "Backend PID: $BACKEND_PID  (logs: /tmp/backend.log)"
echo "Vite PID:    $VITE_PID  (logs: /tmp/vite.log)"
echo ""
echo "To stop servers: pkill -9 node"
echo "To view logs:"
echo "  tail -f /tmp/backend.log"
echo "  tail -f /tmp/vite.log"
echo "============================================================"
