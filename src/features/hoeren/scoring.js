/**
 * Pure scoring functions for DTZ Hören
 * No side effects, easily testable
 */

/**
 * Score a single item
 * @param {Object} item - HoerenItem or UebungExercise
 * @param {string} userAnswer - User's selected answer
 * @returns {Object} { correct: boolean, points: number }
 */
export function scoreItem(item, userAnswer) {
  if (!userAnswer) {
    return { correct: false, points: 0 };
  }

  const isCorrect = userAnswer.toLowerCase() === item.correct.toLowerCase();

  return {
    correct: isCorrect,
    points: isCorrect ? 1 : 0,
  };
}

/**
 * Score entire test (20 items)
 * DTZ passing: 60% = 12/20 correct
 * @param {Array} items - Array of HoerenItem or UebungExercise
 * @param {Object} answers - Record of answers by item number
 * @returns {Object} { total, correct, percentage, passed }
 */
export function scoreTest(items, answers) {
  const results = items.map((item) => {
    const itemNo = item.no || parseInt(item.id?.split("_").pop() || "0");
    return scoreItem(item, answers[itemNo]);
  });

  const correct = results.filter((r) => r.correct).length;
  const total = items.length;
  const percentage = Math.round((correct / total) * 100);
  const passed = percentage >= 60;

  return {
    total,
    correct,
    percentage,
    passed,
  };
}

/**
 * Calculate level based on score
 * DTZ: 60-69% = B1, 70%+ = very good B1
 */
export function calculateLevel(percentage) {
  if (percentage >= 90) return "Sehr gut (B1)";
  if (percentage >= 70) return "Gut (B1)";
  if (percentage >= 60) return "Bestanden (B1)";
  return "Nicht bestanden";
}

/**
 * Get feedback message based on score
 */
export function getFeedbackMessage(score) {
  const { percentage, passed } = score;

  if (!passed) {
    return "Weiter üben! Du schaffst das!";
  }

  if (percentage >= 90) {
    return "Ausgezeichnet! Perfekte Leistung!";
  }

  if (percentage >= 70) {
    return "Sehr gut! Du bist gut vorbereitet!";
  }

  return "Bestanden! Weiter so!";
}
