/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#F8F9FC",
        "canvas-warm": "#FAF7F2",
        surface: "#FFFFFF",
        ink: "#0F172A",
        "ink-muted": "#475569",
        "ink-faint": "#94A3B8",
        navy: {
          DEFAULT: "#0F2042",
          deep: "#08132B",
          rich: "#1E3A8A",
          soft: "#EEF2FF",
        },
        azure: {
          DEFAULT: "#1D4ED8",
          light: "#3B82F6",
          soft: "#EFF6FF",
        },
        emerald: {
          DEFAULT: "#0F766E",
          deep: "#044E42",
          bright: "#10B981",
          soft: "#F0FDF4",
        },
        terracotta: {
          DEFAULT: "#C2410C",
          deep: "#9A3412",
          soft: "#FFF7ED",
        },
        amber: {
          DEFAULT: "#B45309",
          soft: "#FFFBEB",
        },
        vermilion: {
          DEFAULT: "#BE123C",
          soft: "#FFF1F2",
        },
        line: "#E2E8F0",
        "line-faint": "#F1F5F9",
      },
      fontFamily: {
        sans: ["'DM Sans'", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      borderRadius: {
        card: "16px",
        xl: "20px",
        "2xl": "24px",
      },
      boxShadow: {
        glass: "0 8px 30px 0 rgba(15, 32, 66, 0.06)",
        "glass-hover": "0 14px 40px 0 rgba(15, 32, 66, 0.12)",
        glow: "0 0 25px rgba(29, 78, 216, 0.2)",
        "glow-emerald": "0 0 25px rgba(16, 185, 129, 0.2)",
        "glow-terracotta": "0 0 25px rgba(194, 65, 12, 0.2)",
        subtle: "0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
    },
  },
  plugins: [],
};
