import { useState, useEffect, useRef } from "react";
import { Clock, AlertTriangle, CheckCircle } from "lucide-react";

export default function Countdown({
  durationSeconds,
  onTimeUp,
  onWarning,
  examMode = true,
  testId,
  autoStart = false,
}) {
  const [timeRemaining, setTimeRemaining] = useState(durationSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const workerRef = useRef(null);
  const storageKey = `timer-${testId}`;

  // Initialize Web Worker
  useEffect(() => {
    try {
      workerRef.current = new Worker(
        new URL("../workers/timer.js", import.meta.url),
        { type: "module" }
      );

      workerRef.current.onmessage = (e) => {
        const { type, timeRemaining, message } = e.data;

        switch (type) {
          case "tick":
            setTimeRemaining(timeRemaining);

            // Save to localStorage every 5 seconds in exam mode
            if (examMode && timeRemaining % 5 === 0) {
              localStorage.setItem(storageKey, timeRemaining.toString());
            }
            break;

          case "warning":
            setShowWarning(true);
            if (onWarning) {
              onWarning(timeRemaining, message);
            }

            // Hide warning after 3 seconds
            setTimeout(() => setShowWarning(false), 3000);
            break;

          case "finished":
            setIsRunning(false);
            setTimeRemaining(0);

            // Clear stored time
            if (examMode) {
              localStorage.removeItem(storageKey);
            }

            if (onTimeUp) {
              onTimeUp();
            }
            break;

          case "started":
          case "resumed":
            setIsRunning(true);
            break;

          case "paused":
          case "stopped":
            setIsRunning(false);
            break;
        }
      };

      workerRef.current.onerror = (error) => {
        console.error("Timer worker error:", error);
        // Fallback to regular timer if worker fails
      };
    } catch (error) {
      console.warn("Web Worker not supported, using fallback timer");
      // Could implement fallback setInterval timer here
    }

    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
      }
    };
  }, []);

  // Restore saved time on mount (exam mode only)
  useEffect(() => {
    if (examMode && testId) {
      const savedTime = localStorage.getItem(storageKey);
      if (savedTime && !isNaN(parseInt(savedTime))) {
        const restored = parseInt(savedTime);
        setTimeRemaining(restored);

        if (workerRef.current) {
          workerRef.current.postMessage({
            command: "setTime",
            payload: { seconds: restored },
          });
        }
      }
    }

    // Auto-start if requested
    if (autoStart && !isRunning) {
      start();
    }
  }, [examMode, testId, autoStart]);

  const start = () => {
    if (workerRef.current && !isRunning) {
      workerRef.current.postMessage({
        command: "start",
        payload: { seconds: timeRemaining },
      });
    }
  };

  const pause = () => {
    if (workerRef.current && isRunning) {
      workerRef.current.postMessage({ command: "pause" });
    }
  };

  const resume = () => {
    if (workerRef.current && !isRunning && timeRemaining > 0) {
      workerRef.current.postMessage({ command: "resume" });
    }
  };

  const stop = () => {
    if (workerRef.current) {
      workerRef.current.postMessage({ command: "stop" });
    }

    setTimeRemaining(durationSeconds);
    setIsRunning(false);

    if (examMode) {
      localStorage.removeItem(storageKey);
    }
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  const getTimeColor = () => {
    if (timeRemaining <= 60) return "text-red-600"; // Last minute
    if (timeRemaining <= 300) return "text-orange-600"; // Last 5 minutes
    return "text-slate-700";
  };

  const getProgressPercentage = () => {
    return ((durationSeconds - timeRemaining) / durationSeconds) * 100;
  };

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-xl p-4 shadow-lg border border-white/50">
      {/* Warning Banner */}
      {showWarning && (
        <div className="mb-3 p-2 bg-orange-100 border border-orange-200 rounded-lg flex items-center gap-2">
          <AlertTriangle size={16} className="text-orange-600" />
          <span className="text-sm font-medium text-orange-800">
            {timeRemaining <= 60
              ? "⚠️ Letzte Minute!"
              : "⏰ 5 Minuten verbleibend"}
          </span>
        </div>
      )}

      {/* Timer Display */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center">
            {timeRemaining === 0 ? (
              <CheckCircle size={20} className="text-white" />
            ) : (
              <Clock size={20} className="text-white" />
            )}
          </div>

          <div>
            <div className={`text-2xl font-bold ${getTimeColor()}`}>
              {formatTime(timeRemaining)}
            </div>
            <div className="text-xs text-slate-500">
              {examMode ? "Prüfungszeit" : "Übungszeit"}
            </div>
          </div>
        </div>

        {/* Controls (only in practice mode) */}
        {!examMode && (
          <div className="flex items-center gap-2">
            {!isRunning ? (
              <button
                onClick={
                  timeRemaining === 0
                    ? stop
                    : timeRemaining === durationSeconds
                      ? start
                      : resume
                }
                className="px-3 py-1.5 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition-colors"
              >
                {timeRemaining === 0
                  ? "Reset"
                  : timeRemaining === durationSeconds
                    ? "Start"
                    : "Resume"}
              </button>
            ) : (
              <button
                onClick={pause}
                className="px-3 py-1.5 bg-orange-500 text-white text-sm rounded-lg hover:bg-orange-600 transition-colors"
              >
                Pause
              </button>
            )}

            <button
              onClick={stop}
              className="px-3 py-1.5 bg-gray-500 text-white text-sm rounded-lg hover:bg-gray-600 transition-colors"
            >
              Stop
            </button>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="mt-3">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              timeRemaining <= 60
                ? "bg-red-500"
                : timeRemaining <= 300
                  ? "bg-orange-500"
                  : "bg-gradient-to-r from-purple-500 to-indigo-600"
            }`}
            style={{ width: `${getProgressPercentage()}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-slate-500 mt-1">
          <span>Start</span>
          <span>{Math.round(getProgressPercentage())}% abgeschlossen</span>
          <span>Ende</span>
        </div>
      </div>

      {/* Status */}
      {examMode && (
        <div className="mt-2 text-xs text-slate-500 text-center">
          {isRunning ? "⏱️ Timer läuft" : "⏸️ Timer pausiert"}
        </div>
      )}
    </div>
  );
}
