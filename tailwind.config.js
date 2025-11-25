/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "system-ui",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      colors: {
        brand: {
          50: "#F5F2FF",
          100: "#E9E1FF",
          500: "#7A36E8",
          600: "#6417E0",
          700: "#5413BF",
        },
        accent: {
          100: "#D5EEF1",
          600: "#17838E",
        },
        ink: "#0F172A",
        text: "#1F2937",
        muted: "#64748B",
        line: "#E5E7EB",
        surface: "#FFFFFF",
        canvas: "#F8FAFC",
        success: "#16A34A",
        "success-tint": "#DCFCE7",
        warning: "#D97706",
        "warning-tint": "#FEF3C7",
        error: "#DC2626",
        "error-tint": "#FEE2E2",
        info: "#2563EB",
        "info-tint": "#DBEAFE",
        // Dark mode colors
        dark: {
          bg: {
            primary: "#0A0118",
            secondary: "#1A0F2E",
            tertiary: "#290675",
          },
          text: {
            primary: "#F9F5FF",
            secondary: "#C4B5FD",
            muted: "#60597F",
          },
          border: {
            light: "rgba(139, 92, 246, 0.2)",
            medium: "rgba(139, 92, 246, 0.3)",
            strong: "rgba(139, 92, 246, 0.5)",
          },
        },
      },
      borderRadius: {
        xs: "6px",
        sm: "10px",
        md: "14px",
        lg: "20px",
      },
      spacing: {
        1: "4px",
        2: "8px",
        3: "12px",
        4: "16px",
        5: "20px",
        6: "24px",
        8: "32px",
        10: "40px",
      },
      fontSize: {
        xs: "12px",
        sm: "14px",
        base: "16px",
        lg: "20px",
        xl: "24px",
        "2xl": "32px",
        "3xl": "40px",
        "4xl": "56px",
      },
      transitionDuration: {
        enter: "150ms",
        exit: "250ms",
      },
      transitionTimingFunction: {
        enter: "cubic-bezier(0, 0, 0.2, 1)",
        exit: "cubic-bezier(0.4, 0, 1, 1)",
      },
      boxShadow: {
        "elevation-0": "none",
        "elevation-2":
          "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        "elevation-4":
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        "elevation-8":
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        "elevation-16":
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'shake': 'shake 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(5px)' },
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-hide": {
          /* IE and Edge */
          "-ms-overflow-style": "none",
          /* Firefox */
          "scrollbar-width": "none",
          /* Safari and Chrome */
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
      });
    },
  ],
};
