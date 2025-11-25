import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { gsap } from "gsap";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useAuthStore } from "../../store/useAuthStore";
import { supabase } from "../../lib/supabase";

export default function AuthenticationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(
    location.pathname === "/auth/sign-up"
  );
  const { signIn, continueAsGuest } = useAuthStore();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    bundesland: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [gdprConsent, setGdprConsent] = useState(false);
  const [termsConsent, setTermsConsent] = useState(false);

  const containerRef = useRef(null);
  const panelRef = useRef(null);
  const leftPanelRef = useRef(null);
  const rightPanelRef = useRef(null);

  const bundeslaender = [
    "Baden-Württemberg",
    "Bayern",
    "Berlin",
    "Brandenburg",
    "Bremen",
    "Hamburg",
    "Hessen",
    "Mecklenburg-Vorpommern",
    "Niedersachsen",
    "Nordrhein-Westfalen",
    "Rheinland-Pfalz",
    "Saarland",
    "Sachsen",
    "Sachsen-Anhalt",
    "Schleswig-Holstein",
    "Thüringen",
  ];

  useEffect(() => {
    // Set initial mode based on URL
    setIsSignUp(location.pathname === "/auth/sign-up");
  }, [location.pathname]);

  useEffect(() => {
    // Initial animation
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    );

    // Set initial panel position only for desktop
    if (window.innerWidth >= 1024 && panelRef.current) {
      gsap.set(panelRef.current, {
        x: isSignUp ? "0%" : "100%",
      });
    }
  }, [isSignUp]);

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setError("");
    setFormData({
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      bundesland: "",
    });
    setGdprConsent(false);
    setTermsConsent(false);

    // Only animate on desktop
    if (
      window.innerWidth >= 1024 &&
      panelRef.current &&
      leftPanelRef.current &&
      rightPanelRef.current
    ) {
      // Panel sliding animation
      gsap.to(panelRef.current, {
        x: isSignUp ? "100%" : "0%",
        duration: 0.6,
        ease: "power2.inOut",
      });

      // Content fade animation
      gsap.to([leftPanelRef.current, rightPanelRef.current], {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          gsap.to([leftPanelRef.current, rightPanelRef.current], {
            opacity: 1,
            duration: 0.3,
            delay: 0.3,
          });
        },
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "password") {
      calculatePasswordStrength(value);
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    setPasswordStrength(strength);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isSignUp) {
        if (formData.password !== formData.confirmPassword) {
          throw new Error("Die Passwörter stimmen nicht überein");
        }
        if (formData.password.length < 6) {
          throw new Error("Das Passwort muss mindestens 6 Zeichen lang sein");
        }
        if (!formData.bundesland) {
          throw new Error("Bitte wähle dein Bundesland aus");
        }
        if (!gdprConsent) {
          throw new Error("Bitte akzeptiere die Datenschutzerklärung");
        }
        if (!termsConsent) {
          throw new Error("Bitte akzeptiere die Nutzungsbedingungen");
        }

        // Real Supabase sign up
        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.fullName,
              bundesland: formData.bundesland,
            },
          },
        });

        if (error) throw error;

        if (data.user) {
          // Create profile in database
          const { error: profileError } = await supabase
            .from("profiles")
            .insert([
              {
                id: data.user.id,
                email: data.user.email,
                full_name: formData.fullName,
                bundesland: formData.bundesland,
              },
            ]);

          if (profileError) {
            console.error("Profile creation error:", profileError);
          }

          // Sign in to our store
          signIn({
            id: data.user.id,
            email: data.user.email,
            fullName: formData.fullName,
            bundesland: formData.bundesland,
            createdAt: data.user.created_at,
          });

          navigate("/dashboard");
        }
      } else {
        // Real Supabase sign in
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) throw error;

        if (data.user) {
          // Get user profile from database
          const { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", data.user.id)
            .single();

          if (profileError) {
            console.error("Profile fetch error:", profileError);
            // Use metadata as fallback
            signIn({
              id: data.user.id,
              email: data.user.email,
              fullName:
                data.user.user_metadata.full_name ||
                data.user.email?.split("@")[0] ||
                "User",
              bundesland: data.user.user_metadata.bundesland || "Berlin",
              createdAt: data.user.created_at,
            });
          } else {
            // Use profile data from database
            signIn({
              id: profile.id,
              email: profile.email,
              fullName: profile.full_name,
              bundesland: profile.bundesland,
              createdAt: profile.created_at,
            });
          }

          navigate("/dashboard");
        }
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError("");

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;
      // User will be redirected to Google, then back to /auth/callback
    } catch (error) {
      console.error("Google sign in error:", error);
      setError("Google-Anmeldung fehlgeschlagen. Bitte versuche es erneut.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 dark:from-dark-bg-primary dark:via-dark-bg-secondary dark:to-dark-bg-tertiary">
      {/* Back Button - Fixed Position - White on mobile gradient, purple on desktop */}
      <Link
        to="/"
        className="fixed top-4 left-4 md:top-6 md:left-6 z-50 lg:bg-purple-600 lg:text-white bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-lg font-bold text-sm lg:hover:bg-purple-700 hover:bg-white/30 transition-colors shadow-lg border border-white/30 lg:border-transparent"
      >
        ← Zurück
      </Link>

      {/* Besty Logo - Top Right - White on mobile, changes on desktop */}
      <div className="fixed top-4 right-4 md:top-6 md:right-6 z-50">
        <div className="w-24 h-10 sm:w-28 sm:h-12 md:w-32 md:h-14">
          <svg
            viewBox="0 0 229.4 94.9"
            className="w-full h-full drop-shadow-lg"
          >
            {/* Mobile: Always white, Desktop: Purple on sign-up, white on sign-in */}
            <text
              x="0"
              y="74.5"
              className="lg:hidden"
              fill="#ffffff"
              fontFamily="AglonemaRegular, Aglonema, sans-serif"
              fontSize="93.3"
              fontWeight="normal"
            >
              Besty
            </text>
            <text
              x="0"
              y="74.5"
              className="hidden lg:block"
              fill={isSignUp ? "#7c3aed" : "#ffffff"}
              fontFamily="AglonemaRegular, Aglonema, sans-serif"
              fontSize="93.3"
              fontWeight="normal"
            >
              Besty
            </text>
          </svg>
        </div>
      </div>

      {/* Main Container */}
      <div ref={containerRef} className="relative w-full min-h-screen">
        {/* Desktop Layout - Sliding Overlay Panel */}
        <div
          ref={panelRef}
          className="hidden lg:block absolute top-0 left-0 w-1/2 h-full bg-gradient-to-br from-purple-600 to-indigo-600 z-10 flex-col justify-center items-center p-12 text-white text-center"
        >
          <div className="flex flex-col justify-center items-center h-full">
            <h2 className="text-3xl font-black mb-5 text-white">
              {!isSignUp ? "Neu hier?" : "Hast du bereits ein Konto?"}
            </h2>
            <p className="text-white/90 mb-6 text-base leading-relaxed font-medium max-w-md">
              {!isSignUp
                ? "Erstelle ein Konto und beginne deine Lernreise"
                : "Melde dich an und setze dein Lernen fort"}
            </p>
            <button
              onClick={toggleMode}
              className="px-6 py-2.5 border-2 border-white text-white rounded-full hover:bg-white hover:text-purple-600 transition-all duration-300 font-bold uppercase tracking-wide shadow-lg hover:shadow-xl text-sm"
            >
              {!isSignUp ? "Registrieren" : "Anmelden"}
            </button>
          </div>
        </div>

        {/* Desktop Layout - Left Panel - Sign In Form */}
        <div
          ref={leftPanelRef}
          className="hidden lg:block absolute top-0 left-0 w-1/2 h-full flex-col justify-center items-center p-8 bg-white dark:bg-dark-bg-secondary"
        >
          <div className="flex flex-col justify-center items-center h-full">
            <h2 className="text-2xl xl:text-3xl text-gray-800 dark:text-dark-text-primary leading-relaxed max-w-2xl font-bold mb-6 text-center">
              Anmelden
            </h2>

            <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
              {error && !isSignUp && (
                <div className="bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-500/30 rounded-lg p-3 text-rose-700 dark:text-rose-300 text-sm font-medium">
                  {error}
                </div>
              )}

              {/* Google Sign In Button */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 px-4 py-2.5 bg-white dark:bg-white/10 border-2 border-gray-300 dark:border-gray-600 rounded-lg font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/20 hover:border-purple-400 dark:hover:border-purple-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Mit Google anmelden
              </button>

              {/* Divider */}
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white dark:bg-dark-bg-secondary text-gray-500 dark:text-gray-400 font-medium">
                    oder mit E-Mail
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <input
                  type="email"
                  name="email"
                  placeholder="E-Mail-Adresse"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2.5 bg-white dark:bg-white/5 border-2 border-purple-200 dark:border-purple-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-dark-text-primary font-medium text-sm"
                />

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Passwort"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2.5 bg-white dark:bg-white/5 border-2 border-purple-200 dark:border-purple-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-dark-text-primary font-medium text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || isSignUp}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2.5 rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all font-bold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 text-sm"
              >
                {loading && !isSignUp ? "Anmeldung läuft..." : "Anmelden"}
              </button>

              {/* Continue without account */}
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={() => {
                    continueAsGuest();
                    navigate("/dashboard");
                  }}
                  className="block w-full py-2 text-center text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors text-sm"
                >
                  Ohne Konto fortfahren →
                </button>
                <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-500 text-center">
                  ⚠️ Dein Fortschritt wird nicht gespeichert
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Desktop Layout - Right Panel - Sign Up Form */}
        <div
          ref={rightPanelRef}
          className="hidden lg:block absolute top-0 right-0 w-1/2 h-full flex-col justify-center items-center p-8 bg-white dark:bg-dark-bg-secondary overflow-y-auto"
        >
          <div className="flex flex-col justify-center items-center min-h-full py-6">
            <h2 className="text-2xl xl:text-3xl text-gray-800 dark:text-dark-text-primary leading-relaxed max-w-2xl font-bold mb-5 text-center">
              Konto erstellen
            </h2>

            <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-3">
              {error && isSignUp && (
                <div className="bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-500/30 rounded-lg p-3 text-rose-700 dark:text-rose-300 text-sm font-medium">
                  {error}
                </div>
              )}

              {/* Google Sign In Button */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 px-4 py-2.5 bg-white dark:bg-white/10 border-2 border-gray-300 dark:border-gray-600 rounded-lg font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/20 hover:border-purple-400 dark:hover:border-purple-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Mit Google anmelden
              </button>

              {/* Divider */}
              <div className="relative my-3">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white dark:bg-dark-bg-secondary text-gray-500 dark:text-gray-400 font-medium">
                    oder mit E-Mail
                  </span>
                </div>
              </div>

              <input
                type="text"
                name="fullName"
                placeholder="Vollständiger Name"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 bg-white dark:bg-white/5 border-2 border-purple-200 dark:border-purple-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-dark-text-primary font-medium text-sm"
              />

              <input
                type="email"
                name="email"
                placeholder="E-Mail-Adresse"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 bg-white dark:bg-white/5 border-2 border-purple-200 dark:border-purple-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-dark-text-primary font-medium text-sm"
              />

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Passwort (min. 6 Zeichen)"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 bg-white dark:bg-white/5 border-2 border-purple-200 dark:border-purple-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-dark-text-primary font-medium text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {formData.password && (
                <div className="space-y-0.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600 dark:text-gray-400 font-medium text-xs">
                      Passwortstärke
                    </span>
                    <span
                      className={`font-bold ${
                        passwordStrength >= 75
                          ? "text-green-600"
                          : passwordStrength >= 50
                            ? "text-yellow-600"
                            : "text-red-600"
                      }`}
                    >
                      {passwordStrength >= 75
                        ? "Stark"
                        : passwordStrength >= 50
                          ? "Mittel"
                          : "Schwach"}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
                    <div
                      className={`h-1 rounded-full transition-all duration-300 ${
                        passwordStrength >= 75
                          ? "bg-green-500"
                          : passwordStrength >= 50
                            ? "bg-yellow-500"
                            : "bg-red-500"
                      }`}
                      style={{ width: `${passwordStrength}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Passwort bestätigen"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 bg-white dark:bg-white/5 border-2 border-purple-200 dark:border-purple-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-dark-text-primary font-medium text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              <select
                name="bundesland"
                value={formData.bundesland}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 bg-white dark:bg-white/5 border-2 border-purple-200 dark:border-purple-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-dark-text-primary font-medium appearance-none cursor-pointer text-sm"
              >
                <option value="">Bundesland auswählen</option>
                {bundeslaender.map((land) => (
                  <option key={land} value={land}>
                    {land}
                  </option>
                ))}
              </select>

              <div className="space-y-2 text-xs">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={gdprConsent}
                    onChange={(e) => setGdprConsent(e.target.checked)}
                    className="w-3.5 h-3.5 mt-0.5 border-2 border-purple-300 dark:border-purple-500/30 rounded focus:ring-2 focus:ring-purple-200 text-purple-600 cursor-pointer"
                    required
                  />
                  <span className="text-gray-700 dark:text-dark-text-secondary text-xs leading-tight">
                    Ich akzeptiere die{" "}
                    <Link
                      to="/privacy"
                      className="text-purple-600 dark:text-purple-400 hover:underline font-semibold"
                    >
                      Datenschutzerklärung
                    </Link>
                  </span>
                </label>

                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={termsConsent}
                    onChange={(e) => setTermsConsent(e.target.checked)}
                    className="w-3.5 h-3.5 mt-0.5 border-2 border-purple-300 dark:border-purple-500/30 rounded focus:ring-2 focus:ring-purple-200 text-purple-600 cursor-pointer"
                    required
                  />
                  <span className="text-gray-700 dark:text-dark-text-secondary text-xs leading-tight">
                    Ich akzeptiere die{" "}
                    <Link
                      to="/terms"
                      className="text-purple-600 dark:text-purple-400 hover:underline font-semibold"
                    >
                      Nutzungsbedingungen
                    </Link>
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading || !isSignUp}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2.5 rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all font-bold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 text-sm"
              >
                {loading && isSignUp
                  ? "Registrierung läuft..."
                  : "Konto erstellen"}
              </button>

              {/* Continue without account */}
              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={() => {
                    continueAsGuest();
                    navigate("/dashboard");
                  }}
                  className="block w-full py-2 text-center text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors text-sm"
                >
                  Ohne Konto fortfahren →
                </button>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-500 text-center">
                  ⚠️ Dein Fortschritt wird nicht gespeichert
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Mobile & Tablet Layout - App-Style Experience */}
        <div className="lg:hidden min-h-screen relative overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-800">
            {/* Floating Orbs */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-purple-400/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-400/20 rounded-full blur-3xl animate-pulse delay-500"></div>
          </div>

          {/* Content Container */}
          <div className="relative z-10 min-h-screen flex flex-col">
            {/* Top Section - Lottie Animation & Logo */}
            <div className="flex-shrink-0 pt-8 pb-6 px-6">
              <div className="max-w-md mx-auto text-center">
                {/* Lottie Animation */}
                <div className="mb-4 animate-fade-in">
                  <div className="w-48 h-48 md:w-56 md:h-56 mx-auto relative">
                    <DotLottieReact
                      src="https://lottie.host/e625cdca-0dac-4776-a55e-0b437f54c0a7/diw9hO8Z3c.lottie"
                      loop
                      autoplay
                      className="w-full h-full object-contain opacity-90"
                    />
                  </div>
                  
                  <p className="text-white text-lg md:text-xl font-bold mt-3">
                    {isSignUp 
                      ? "Beginne deine Lernreise" 
                      : "Willkommen zurück!"}
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Sheet - Form Container */}
            <div className="flex-1 bg-white dark:bg-gray-900 rounded-t-[2.5rem] shadow-2xl overflow-hidden animate-slide-up">
              <div className="max-w-md mx-auto px-6 py-8">
                {/* Mode Toggle Pills */}
                <div className="flex gap-2 mb-8 p-1.5 bg-gray-100 dark:bg-gray-800 rounded-2xl">
                  <button
                    type="button"
                    onClick={() => isSignUp && toggleMode()}
                    className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                      !isSignUp
                        ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                    }`}
                  >
                    Anmelden
                  </button>
                  <button
                    type="button"
                    onClick={() => !isSignUp && toggleMode()}
                    className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                      isSignUp
                        ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                    }`}
                  >
                    Registrieren
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {error && (
                    <div className="bg-rose-50 dark:bg-rose-900/20 border-l-4 border-rose-500 rounded-xl p-4 text-rose-700 dark:text-rose-300 text-sm font-medium animate-shake">
                      {error}
                    </div>
                  )}

                  {/* Google Sign In Button */}
                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-3 px-5 py-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-750 hover:border-purple-300 dark:hover:border-purple-500 hover:shadow-lg active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="w-6 h-6" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    <span>Mit Google anmelden</span>
                  </button>

                  {/* Divider */}
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t-2 border-gray-200 dark:border-gray-700"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400 font-semibold">
                        oder mit E-Mail
                      </span>
                    </div>
                  </div>

                {isSignUp && (
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Vollständiger Name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900 dark:text-gray-100 font-medium transition-all duration-200"
                  />
                )}

                <input
                  type="email"
                  name="email"
                  placeholder="E-Mail-Adresse"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900 dark:text-gray-100 font-medium transition-all duration-200"
                />

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Passwort"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900 dark:text-gray-100 font-medium transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-1"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                {isSignUp && formData.password && (
                  <div className="space-y-2 px-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-gray-500 dark:text-gray-400">
                        Passwortstärke
                      </span>
                      <span
                        className={`${
                          passwordStrength >= 75
                            ? "text-green-600 dark:text-green-400"
                            : passwordStrength >= 50
                              ? "text-yellow-600 dark:text-yellow-400"
                              : "text-red-600 dark:text-red-400"
                        }`}
                      >
                        {passwordStrength >= 75
                          ? "Stark"
                          : passwordStrength >= 50
                            ? "Mittel"
                            : "Schwach"}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          passwordStrength >= 75
                            ? "bg-gradient-to-r from-green-500 to-emerald-500"
                            : passwordStrength >= 50
                              ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                              : "bg-gradient-to-r from-red-500 to-rose-500"
                        }`}
                        style={{ width: `${passwordStrength}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {isSignUp && (
                  <>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Passwort bestätigen"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                        className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900 dark:text-gray-100 font-medium transition-all duration-200"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-1"
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>

                    <select
                      name="bundesland"
                      value={formData.bundesland}
                      onChange={handleInputChange}
                      required
                      className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900 dark:text-gray-100 font-medium appearance-none cursor-pointer transition-all duration-200"
                    >
                      <option value="">Bundesland auswählen</option>
                      {bundeslaender.map((land) => (
                        <option key={land} value={land}>
                          {land}
                        </option>
                      ))}
                    </select>

                    <div className="space-y-4 pt-2">
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={gdprConsent}
                          onChange={(e) => setGdprConsent(e.target.checked)}
                          className="w-5 h-5 mt-0.5 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 text-purple-600 cursor-pointer transition-all"
                          required
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300 leading-snug">
                          Ich akzeptiere die{" "}
                          <Link
                            to="/privacy"
                            className="text-purple-600 dark:text-purple-400 hover:underline font-semibold"
                          >
                            Datenschutzerklärung
                          </Link>
                        </span>
                      </label>

                      <label className="flex items-start gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={termsConsent}
                          onChange={(e) => setTermsConsent(e.target.checked)}
                          className="w-5 h-5 mt-0.5 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 text-purple-600 cursor-pointer transition-all"
                          required
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300 leading-snug">
                          Ich akzeptiere die{" "}
                          <Link
                            to="/terms"
                            className="text-purple-600 dark:text-purple-400 hover:underline font-semibold"
                          >
                            Nutzungsbedingungen
                          </Link>
                        </span>
                      </label>
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-600 via-purple-600 to-indigo-600 text-white py-4 rounded-2xl hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 font-bold text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
                >
                  {loading
                    ? isSignUp
                      ? "Registrierung läuft..."
                      : "Anmeldung läuft..."
                    : isSignUp
                      ? "Konto erstellen"
                      : "Anmelden"}
                </button>

                {/* Continue without account */}
                <div className="mt-6 pt-6 border-t-2 border-gray-200 dark:border-gray-800">
                  <button
                    type="button"
                    onClick={() => {
                      continueAsGuest();
                      navigate("/dashboard");
                    }}
                    className="block w-full py-3 text-center text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 font-semibold transition-all duration-200 hover:scale-105 active:scale-95"
                  >
                    Ohne Konto fortfahren →
                  </button>
                  <p className="mt-2 text-xs text-gray-500 dark:text-gray-500 text-center font-medium">
                    ⚠️ Dein Fortschritt wird nicht gespeichert
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
