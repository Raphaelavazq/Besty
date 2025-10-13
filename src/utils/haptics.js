/**
 * Haptic feedback utility for mobile touch interactions
 * Progressive enhancement - fails gracefully on unsupported devices
 */

/**
 * Trigger haptic feedback (vibration)
 * @param {number} duration - Vibration duration in milliseconds (default: 10ms)
 */
export const triggerHaptic = (duration = 10) => {
  // Check if vibration API is supported
  if ("vibrate" in navigator) {
    try {
      navigator.vibrate(duration);
    } catch (error) {
      // Silently fail - haptic feedback is optional enhancement
      console.debug("Haptic feedback not available:", error);
    }
  }
};

/**
 * Trigger success haptic pattern (double tap)
 */
export const triggerSuccessHaptic = () => {
  if ("vibrate" in navigator) {
    try {
      navigator.vibrate([10, 50, 10]); // vibrate-pause-vibrate pattern
    } catch (error) {
      console.debug("Haptic feedback not available:", error);
    }
  }
};

/**
 * Trigger error haptic pattern (longer single vibration)
 */
export const triggerErrorHaptic = () => {
  if ("vibrate" in navigator) {
    try {
      navigator.vibrate(30); // Longer vibration for errors
    } catch (error) {
      console.debug("Haptic feedback not available:", error);
    }
  }
};
