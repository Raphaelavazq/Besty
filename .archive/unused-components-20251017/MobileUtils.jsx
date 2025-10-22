import { useState, useEffect } from "react";

/**
 * Mobile-optimized button component with proper touch targets and feedback
 */
export const TouchButton = ({
  children,
  onClick,
  className = "",
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  ...props
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const baseClasses =
    "relative inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 touch-manipulation select-none";

  const sizeClasses = {
    sm: "min-h-[40px] px-3 py-2 text-sm",
    md: "min-h-[44px] px-4 py-3 text-base",
    lg: "min-h-[52px] px-6 py-4 text-lg",
  };

  const variantClasses = {
    primary:
      "bg-purple-600 text-white hover:bg-purple-700 active:bg-purple-800 disabled:bg-gray-300",
    secondary:
      "bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300 disabled:bg-gray-50",
    outline:
      "border-2 border-purple-600 text-purple-600 hover:bg-purple-50 active:bg-purple-100 disabled:border-gray-300 disabled:text-gray-300",
    ghost:
      "text-gray-700 hover:bg-gray-100 active:bg-gray-200 disabled:text-gray-300",
  };

  const pressedClasses = isPressed ? "scale-95" : "scale-100";

  const handleTouchStart = () => setIsPressed(true);
  const handleTouchEnd = () => setIsPressed(false);
  const handleMouseDown = () => setIsPressed(true);
  const handleMouseUp = () => setIsPressed(false);
  const handleMouseLeave = () => setIsPressed(false);

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${pressedClasses} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <span className={loading ? "invisible" : "visible"}>{children}</span>
    </button>
  );
};

/**
 * Mobile-optimized card component with proper touch interactions
 */
export const TouchCard = ({
  children,
  onClick,
  className = "",
  hover = true,
  disabled = false,
  ...props
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const baseClasses =
    "relative rounded-2xl transition-all duration-200 touch-manipulation select-none";
  const interactiveClasses =
    onClick && !disabled
      ? `cursor-pointer ${hover ? "hover:shadow-md hover:-translate-y-1" : ""} active:scale-98`
      : "";
  const pressedClasses =
    isPressed && onClick && !disabled ? "scale-98 shadow-sm" : "";
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

  const handleTouchStart = () => {
    if (onClick && !disabled) setIsPressed(true);
  };

  const handleTouchEnd = () => setIsPressed(false);

  const handleMouseDown = () => {
    if (onClick && !disabled) setIsPressed(true);
  };

  const handleMouseUp = () => setIsPressed(false);
  const handleMouseLeave = () => setIsPressed(false);

  const handleClick = (e) => {
    if (onClick && !disabled) {
      onClick(e);
    }
  };

  return (
    <div
      className={`${baseClasses} ${interactiveClasses} ${pressedClasses} ${disabledClasses} ${className}`}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </div>
  );
};

/**
 * Hook to detect mobile device and orientation
 */
export const useDeviceInfo = () => {
  const [deviceInfo, setDeviceInfo] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    orientation: "portrait",
    screenSize: "md",
  });

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isTouchDevice =
        "ontouchstart" in window || navigator.maxTouchPoints > 0;

      const isMobile = width < 768 && isTouchDevice;
      const isTablet = width >= 768 && width < 1024 && isTouchDevice;
      const isDesktop = width >= 1024 || !isTouchDevice;

      const orientation = width > height ? "landscape" : "portrait";

      let screenSize = "sm";
      if (width >= 768) screenSize = "md";
      if (width >= 1024) screenSize = "lg";
      if (width >= 1280) screenSize = "xl";

      setDeviceInfo({
        isMobile,
        isTablet,
        isDesktop,
        orientation,
        screenSize,
      });
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);
    window.addEventListener("orientationchange", checkDevice);

    return () => {
      window.removeEventListener("resize", checkDevice);
      window.removeEventListener("orientationchange", checkDevice);
    };
  }, []);

  return deviceInfo;
};

/**
 * Hook for safe area insets (iPhone notch handling)
 */
export const useSafeArea = () => {
  const [safeArea, setSafeArea] = useState({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  });

  useEffect(() => {
    const updateSafeArea = () => {
      const style = getComputedStyle(document.documentElement);
      setSafeArea({
        top: parseInt(style.getPropertyValue("--safe-area-inset-top") || "0"),
        bottom: parseInt(
          style.getPropertyValue("--safe-area-inset-bottom") || "0"
        ),
        left: parseInt(style.getPropertyValue("--safe-area-inset-left") || "0"),
        right: parseInt(
          style.getPropertyValue("--safe-area-inset-right") || "0"
        ),
      });
    };

    updateSafeArea();
    window.addEventListener("resize", updateSafeArea);
    window.addEventListener("orientationchange", updateSafeArea);

    return () => {
      window.removeEventListener("resize", updateSafeArea);
      window.removeEventListener("orientationchange", updateSafeArea);
    };
  }, []);

  return safeArea;
};

/**
 * Swipe gesture hook for mobile interactions
 */
export const useSwipeGesture = ({
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  threshold = 50,
}) => {
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const [touchEnd, setTouchEnd] = useState({ x: 0, y: 0 });

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    setTouchEnd({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = () => {
    const deltaX = touchStart.x - touchEnd.x;
    const deltaY = touchStart.y - touchEnd.y;
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);

    // Determine if it's a horizontal or vertical swipe
    if (absDeltaX > absDeltaY && absDeltaX > threshold) {
      // Horizontal swipe
      if (deltaX > 0 && onSwipeLeft) {
        onSwipeLeft();
      } else if (deltaX < 0 && onSwipeRight) {
        onSwipeRight();
      }
    } else if (absDeltaY > absDeltaX && absDeltaY > threshold) {
      // Vertical swipe
      if (deltaY > 0 && onSwipeUp) {
        onSwipeUp();
      } else if (deltaY < 0 && onSwipeDown) {
        onSwipeDown();
      }
    }
  };

  return {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
  };
};

/**
 * Responsive grid utility
 */
export const ResponsiveGrid = ({ children, className = "", ...props }) => {
  const deviceInfo = useDeviceInfo();

  const gridClasses = deviceInfo.isMobile
    ? "grid grid-cols-1 gap-4"
    : deviceInfo.isTablet
      ? "grid grid-cols-2 gap-6"
      : "grid grid-cols-3 gap-8";

  return (
    <div className={`${gridClasses} ${className}`} {...props}>
      {children}
    </div>
  );
};

/**
 * Mobile-optimized input component
 */
export const TouchInput = ({ label, error, className = "", ...props }) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        className={`w-full min-h-[44px] px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors text-base ${
          error ? "border-red-500 focus:ring-red-500 focus:border-red-500" : ""
        } ${className}`}
        {...props}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};
