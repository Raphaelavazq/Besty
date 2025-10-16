/**
 * Session Manager for AI Dialogue Trainer
 * Generates and manages session IDs for backend protection
 */

/**
 * Generates a unique session ID for tracking conversations
 * Format: session_{timestamp}_{random}
 */
export function generateSessionId() {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  return `session_${timestamp}_${random}`;
}

/**
 * Stores session ID in sessionStorage to persist across page reloads
 */
export function saveSessionId(scenarioId, sessionId) {
  try {
    sessionStorage.setItem(`dialogue_session_${scenarioId}`, sessionId);
  } catch (error) {
    console.warn("Could not save session ID:", error);
  }
}

/**
 * Retrieves session ID from sessionStorage
 */
export function getSessionId(scenarioId) {
  try {
    return sessionStorage.getItem(`dialogue_session_${scenarioId}`);
  } catch (error) {
    console.warn("Could not retrieve session ID:", error);
    return null;
  }
}

/**
 * Clears session ID when conversation ends
 */
export function clearSessionId(scenarioId) {
  try {
    sessionStorage.removeItem(`dialogue_session_${scenarioId}`);
  } catch (error) {
    console.warn("Could not clear session ID:", error);
  }
}

/**
 * Gets or creates a session ID for a scenario
 */
export function getOrCreateSessionId(scenarioId) {
  let sessionId = getSessionId(scenarioId);

  if (!sessionId) {
    sessionId = generateSessionId();
    saveSessionId(scenarioId, sessionId);
  }

  return sessionId;
}
