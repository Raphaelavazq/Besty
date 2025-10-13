/**
 * Hören Engine Hook
 * Manages state for both Übung and Prüfung modes
 */

import { useState, useCallback, useEffect } from "react";
import { scoreTest } from "./scoring";

/**
 * Custom hook for managing Hören test/practice state
 * @param {string} mode - 'uebung' or 'pruefung'
 * @param {Array} items - Array of questions/exercises
 * @param {number} timeLimit - Optional time limit in seconds (Prüfung: 1500)
 * @returns {Array} [state, actions]
 */
export function useHoerenEngine(mode, items, timeLimit = null) {
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(timeLimit);
  const [replayRequested, setReplayRequested] = useState(false);

  // Timer for Prüfung mode
  useEffect(() => {
    if (
      mode === "pruefung" &&
      timeRemaining &&
      timeRemaining > 0 &&
      !isComplete
    ) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (!prev || prev <= 1) {
            setIsComplete(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [mode, timeRemaining, isComplete]);

  const submitAnswer = useCallback(
    (itemNo, answer) => {
      setAnswers((prev) => ({ ...prev, [itemNo]: answer }));

      // In Übung mode, show immediate feedback
      if (mode === "uebung") {
        setShowFeedback(true);
      }
    },
    [mode]
  );

  const nextItem = useCallback(() => {
    setShowFeedback(false);
    setReplayRequested(false);

    if (currentItemIndex < items.length - 1) {
      setCurrentItemIndex((prev) => prev + 1);
    } else {
      setIsComplete(true);
    }
  }, [currentItemIndex, items.length]);

  const previousItem = useCallback(() => {
    if (currentItemIndex > 0 && mode === "uebung") {
      setCurrentItemIndex((prev) => prev - 1);
      setShowFeedback(false);
    }
  }, [currentItemIndex, mode]);

  const replayTrack = useCallback(() => {
    if (mode === "uebung") {
      setReplayRequested(true);
    }
  }, [mode]);

  const calculateScore = useCallback(() => {
    return scoreTest(items, answers);
  }, [items, answers]);

  const resetEngine = useCallback(() => {
    setCurrentItemIndex(0);
    setAnswers({});
    setShowFeedback(false);
    setIsComplete(false);
    setTimeRemaining(timeLimit);
    setReplayRequested(false);
  }, [timeLimit]);

  const state = {
    mode,
    currentTeil: 0, // Will be set by parent component
    currentItemIndex,
    items,
    answers,
    showFeedback,
    isComplete,
    timeRemaining,
    replayRequested,
  };

  const actions = {
    submitAnswer,
    nextItem,
    previousItem,
    replayTrack,
    calculateScore,
    resetEngine,
  };

  return [state, actions];
}
