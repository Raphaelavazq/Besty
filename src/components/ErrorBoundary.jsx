/**
 * ErrorBoundary Component
 * Catches React errors and displays a user-friendly fallback UI
 * Following design system standards from #DESIGN_SYSTEM.md
 */

import React from "react";
import { AlertCircle, Home, RotateCcw } from "lucide-react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details for debugging
    console.error("🚨 React Error Boundary caught an error:", error, errorInfo);

    // Store error info in state
    this.setState({
      errorInfo,
    });

    // You could send error to logging service here
    // Example: logErrorToService(error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = "/dashboard";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-purple-50 dark:from-red-950/20 dark:via-orange-950/20 dark:to-purple-950/20 flex items-center justify-center p-6">
          <div className="bg-white/80 dark:bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-xl border border-red-100 dark:border-red-500/30 max-w-2xl w-full">
            {/* Icon */}
            <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-orange-500 dark:from-red-600 dark:to-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <AlertCircle className="w-10 h-10 text-white" />
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl font-black text-center mb-4 bg-gradient-to-r from-red-600 to-orange-600 dark:from-red-400 dark:to-orange-400 bg-clip-text text-transparent">
              Oops! Etwas ist schief gelaufen
            </h1>

            {/* Description */}
            <p className="text-gray-600 dark:text-dark-text-secondary text-lg text-center mb-8">
              Die App hat einen unerwarteten Fehler festgestellt. Das tut uns
              leid! Bitte versuche eine der folgenden Optionen:
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={this.handleReload}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-500 dark:to-indigo-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
              >
                <RotateCcw className="w-5 h-5" />
                Seite neu laden
              </button>

              <button
                onClick={this.handleGoHome}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-white dark:bg-white/10 text-purple-600 dark:text-purple-400 font-bold rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200 border-2 border-purple-200 dark:border-purple-500/30"
              >
                <Home className="w-5 h-5" />
                Zum Dashboard
              </button>
            </div>

            {/* Error Details (collapsed by default) */}
            {process.env.NODE_ENV === "development" && this.state.error && (
              <details className="mt-6 bg-red-50 rounded-2xl p-4 border border-red-200">
                <summary className="cursor-pointer font-semibold text-red-700 mb-2">
                  🔍 Entwickler-Info (nur in Dev-Modus sichtbar)
                </summary>
                <div className="mt-4 space-y-2">
                  <div>
                    <span className="font-semibold text-red-800">Error:</span>
                    <pre className="mt-1 text-xs text-red-700 bg-red-100 p-2 rounded overflow-x-auto">
                      {this.state.error.toString()}
                    </pre>
                  </div>
                  {this.state.errorInfo && (
                    <div>
                      <span className="font-semibold text-red-800">
                        Component Stack:
                      </span>
                      <pre className="mt-1 text-xs text-red-700 bg-red-100 p-2 rounded overflow-x-auto max-h-64">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </div>
                  )}
                </div>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
