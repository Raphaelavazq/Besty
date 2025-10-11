import { useEffect, useState, useRef } from 'react';
import Lottie from 'lottie-react';

/**
 * Enhanced Lottie component with accessibility and performance optimizations
 */
export const LottieAnimation = ({
  animationData,
  loop = true,
  autoplay = true,
  speed = 1,
  className = '',
  width,
  height,
  onComplete,
  onLoopComplete,
  respectReducedMotion = true,
  fallback = null,
  ...props
}) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(autoplay);
  const lottieRef = useRef();

  // Check for reduced motion preference
  useEffect(() => {
    if (!respectReducedMotion) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [respectReducedMotion]);

  // Control animation based on reduced motion preference
  useEffect(() => {
    if (prefersReducedMotion && respectReducedMotion) {
      setShouldAnimate(false);
      if (lottieRef.current) {
        lottieRef.current.pause();
      }
    } else {
      setShouldAnimate(autoplay);
      if (lottieRef.current && autoplay) {
        lottieRef.current.play();
      }
    }
  }, [prefersReducedMotion, respectReducedMotion, autoplay]);

  // Don't render animation if reduced motion is preferred
  if (prefersReducedMotion && respectReducedMotion) {
    return fallback || null;
  }

  const lottieOptions = {
    animationData,
    loop: shouldAnimate ? loop : false,
    autoplay: shouldAnimate,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    },
    ...props
  };

  const style = {
    width: width,
    height: height,
    ...(speed !== 1 && { '--lottie-speed': speed })
  };

  return (
    <div className={`lottie-container ${className}`} style={style}>
      <Lottie
        lottieRef={lottieRef}
        onComplete={onComplete}
        onLoopComplete={onLoopComplete}
        className="w-full h-full"
        {...lottieOptions}
      />
    </div>
  );
};

/**
 * Loading animation component
 */
export const LoadingAnimation = ({ 
  size = 'md', 
  message = 'Laden...', 
  className = '' 
}) => {
  const sizes = {
    sm: { width: 40, height: 40 },
    md: { width: 60, height: 60 },
    lg: { width: 80, height: 80 }
  };

  // Simple loading animation data (can be replaced with actual Lottie file)
  const loadingData = {
    v: "5.5.7",
    fr: 60,
    ip: 0,
    op: 120,
    w: 100,
    h: 100,
    nm: "Loading",
    ddd: 0,
    assets: [],
    layers: [
      {
        ddd: 0,
        ind: 1,
        ty: 4,
        nm: "Circle",
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: { a: 1, k: [{ i: { x: [0.667], y: [1] }, o: { x: [0.333], y: [0] }, t: 0, s: [0] }, { t: 120, s: [360] }], ix: 10 },
          p: { a: 0, k: [50, 50, 0], ix: 2 },
          a: { a: 0, k: [0, 0, 0], ix: 1 },
          s: { a: 0, k: [100, 100, 100], ix: 6 }
        },
        ao: 0,
        shapes: [
          {
            ty: "gr",
            it: [
              {
                d: 1,
                ty: "el",
                s: { a: 0, k: [60, 60], ix: 2 },
                p: { a: 0, k: [0, 0], ix: 3 },
                nm: "Ellipse"
              },
              {
                ty: "st",
                c: { a: 0, k: [0.459, 0.212, 0.906, 1], ix: 3 },
                o: { a: 0, k: 100, ix: 4 },
                w: { a: 0, k: 8, ix: 5 },
                lc: 2,
                lj: 1,
                ml: 4,
                bm: 0,
                nm: "Stroke"
              },
              {
                ty: "tm",
                s: { a: 0, k: 0, ix: 1 },
                e: { a: 1, k: [{ i: { x: [0.667], y: [1] }, o: { x: [0.333], y: [0] }, t: 0, s: [0] }, { i: { x: [0.667], y: [1] }, o: { x: [0.333], y: [0] }, t: 60, s: [100] }, { t: 120, s: [0] }], ix: 2 },
                o: { a: 0, k: 0, ix: 3 },
                m: 1,
                nm: "Trim Paths"
              }
            ],
            nm: "Ellipse",
            np: 3,
            cix: 2,
            bm: 0,
            ix: 1,
            mn: "ADBE Vector Group",
            hd: false
          }
        ],
        ip: 0,
        op: 120,
        st: 0,
        bm: 0
      }
    ],
    markers: []
  };

  return (
    <div className={`flex flex-col items-center justify-center space-y-3 ${className}`}>
      <LottieAnimation
        animationData={loadingData}
        loop={true}
        autoplay={true}
        width={sizes[size].width}
        height={sizes[size].height}
        fallback={
          <div 
            className="animate-spin rounded-full border-4 border-purple-200 border-t-purple-600"
            style={sizes[size]}
          />
        }
      />
      {message && (
        <p className="text-sm text-gray-600 font-medium">{message}</p>
      )}
    </div>
  );
};

/**
 * Success animation component
 */
export const SuccessAnimation = ({ 
  size = 'md', 
  message = 'Erfolg!', 
  className = '',
  onComplete 
}) => {
  const sizes = {
    sm: { width: 40, height: 40 },
    md: { width: 60, height: 60 },
    lg: { width: 80, height: 80 }
  };

  // Simple checkmark animation data
  const successData = {
    v: "5.5.7",
    fr: 60,
    ip: 0,
    op: 60,
    w: 100,
    h: 100,
    nm: "Success",
    ddd: 0,
    assets: [],
    layers: [
      {
        ddd: 0,
        ind: 1,
        ty: 4,
        nm: "Check",
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: { a: 0, k: 0, ix: 10 },
          p: { a: 0, k: [50, 50, 0], ix: 2 },
          a: { a: 0, k: [0, 0, 0], ix: 1 },
          s: { a: 1, k: [{ i: { x: [0.667], y: [1] }, o: { x: [0.333], y: [0] }, t: 0, s: [0, 0, 100] }, { t: 30, s: [120, 120, 100] }, { t: 60, s: [100, 100, 100] }], ix: 6 }
        },
        ao: 0,
        shapes: [
          {
            ty: "gr",
            it: [
              {
                ind: 0,
                ty: "sh",
                ix: 1,
                ks: {
                  a: 0,
                  k: {
                    i: [[0, 0], [0, 0], [0, 0]],
                    o: [[0, 0], [0, 0], [0, 0]],
                    v: [[-15, 0], [-5, 10], [15, -10]],
                    c: false
                  },
                  ix: 2
                },
                nm: "Path"
              },
              {
                ty: "st",
                c: { a: 0, k: [0.086, 0.639, 0.294, 1], ix: 3 },
                o: { a: 0, k: 100, ix: 4 },
                w: { a: 0, k: 6, ix: 5 },
                lc: 2,
                lj: 1,
                ml: 4,
                bm: 0,
                nm: "Stroke"
              },
              {
                ty: "tm",
                s: { a: 0, k: 0, ix: 1 },
                e: { a: 1, k: [{ i: { x: [0.667], y: [1] }, o: { x: [0.333], y: [0] }, t: 20, s: [0] }, { t: 50, s: [100] }], ix: 2 },
                o: { a: 0, k: 0, ix: 3 },
                m: 1,
                nm: "Trim Paths"
              }
            ],
            nm: "Check",
            np: 3,
            cix: 2,
            bm: 0,
            ix: 1,
            mn: "ADBE Vector Group",
            hd: false
          }
        ],
        ip: 0,
        op: 60,
        st: 0,
        bm: 0
      }
    ],
    markers: []
  };

  return (
    <div className={`flex flex-col items-center justify-center space-y-3 ${className}`}>
      <div className="relative">
        <div className="absolute inset-0 bg-green-100 rounded-full opacity-50 animate-ping" style={sizes[size]} />
        <LottieAnimation
          animationData={successData}
          loop={false}
          autoplay={true}
          width={sizes[size].width}
          height={sizes[size].height}
          onComplete={onComplete}
          fallback={
            <div 
              className="bg-green-100 rounded-full flex items-center justify-center"
              style={sizes[size]}
            >
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          }
        />
      </div>
      {message && (
        <p className="text-sm text-green-600 font-medium">{message}</p>
      )}
    </div>
  );
};

/**
 * Empty state animation component
 */
export const EmptyStateAnimation = ({ 
  size = 'lg', 
  title = 'Nichts gefunden', 
  description = 'Hier ist noch nichts vorhanden.',
  className = '' 
}) => {
  const sizes = {
    sm: { width: 80, height: 80 },
    md: { width: 120, height: 120 },
    lg: { width: 160, height: 160 }
  };

  return (
    <div className={`flex flex-col items-center justify-center text-center space-y-4 ${className}`}>
      <div className="relative">
        <LottieAnimation
          animationData={null} // Would use actual empty state animation
          loop={true}
          autoplay={true}
          width={sizes[size].width}
          height={sizes[size].height}
          fallback={
            <div 
              className="bg-gray-100 rounded-full flex items-center justify-center"
              style={sizes[size]}
            >
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
          }
        />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500 max-w-sm">{description}</p>
      </div>
    </div>
  );
};

/**
 * Floating action animation component
 */
export const FloatingActionAnimation = ({ 
  children, 
  className = '',
  delay = 0 
}) => {
  return (
    <div 
      className={`animate-float ${className}`}
      style={{ 
        animationDelay: `${delay}ms`,
        animationDuration: '3s',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'ease-in-out'
      }}
    >
      {children}
    </div>
  );
};

/**
 * Pulse animation component for attention
 */
export const PulseAnimation = ({ 
  children, 
  className = '',
  color = 'purple',
  intensity = 'medium' 
}) => {
  const intensityClasses = {
    low: 'animate-pulse',
    medium: 'animate-bounce',
    high: 'animate-ping'
  };

  const colorClasses = {
    purple: 'shadow-purple-200',
    blue: 'shadow-blue-200',
    green: 'shadow-green-200',
    red: 'shadow-red-200'
  };

  return (
    <div className={`relative ${className}`}>
      <div className={`absolute inset-0 rounded-full ${colorClasses[color]} ${intensityClasses[intensity]} opacity-75`} />
      <div className="relative">
        {children}
      </div>
    </div>
  );
};