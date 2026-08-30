import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // eYRC Brand Colors
        brand: {
          primary: "#6366F1",    // Indigo - trust, tech
          secondary: "#10B981",  // Emerald - success, progress
          accent: "#F59E0B",     // Amber - warnings, XP, achievements
          danger: "#EF4444",     // Red - blockers, deadlines, at-risk
        },
        // Dark Mode Palette
        dark: {
          bg: "#0F172A",        // Slate 900 - base background
          surface: "#1E293B",   // Slate 800 - cards, panels
          surfaceElevated: "#334155", // Slate 700 - elevated surfaces
          border: "#334155",    // Slate 700 - borders
          textPrimary: "#F8FAFC",   // Slate 50
          textSecondary: "#94A3B8", // Slate 400
          textMuted: "#64748B",     // Slate 500
        },
        // Light Mode Palette (for completeness)
        light: {
          bg: "#F8FAFC",        // Slate 50
          surface: "#FFFFFF",   // White
          surfaceElevated: "#F1F5F9", // Slate 100
          border: "#E2E8F0",    // Slate 200
          textPrimary: "#0F172A",   // Slate 900
          textSecondary: "#475569", // Slate 600
          textMuted: "#94A3B8",     // Slate 400
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
        display: ["var(--font-clash-display)", "var(--font-geist-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(3.5rem, 6vw, 6rem)", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(2.5rem, 4.5vw, 4rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(2rem, 3.5vw, 3rem)", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        "display-sm": ["clamp(1.5rem, 2.5vw, 2.25rem)", { lineHeight: "1.2", letterSpacing: "-0.005em" }],
        "heading-xl": ["1.875rem", { lineHeight: "1.3", letterSpacing: "-0.01em" }],
        "heading-lg": ["1.5rem", { lineHeight: "1.35", letterSpacing: "-0.005em" }],
        "heading-md": ["1.25rem", { lineHeight: "1.4" }],
        "heading-sm": ["1.125rem", { lineHeight: "1.4" }],
        "body-lg": ["1.125rem", { lineHeight: "1.7" }],
        "body": ["1rem", { lineHeight: "1.6" }],
        "body-sm": ["0.875rem", { lineHeight: "1.5" }],
        "caption": ["0.75rem", { lineHeight: "1.5", letterSpacing: "0.02em" }],
        "overline": ["0.625rem", { lineHeight: "1.5", letterSpacing: "0.15em", textTransform: "uppercase" }],
      },
      spacing: {
        "space-4xl": "8rem",    // 128px
        "space-5xl": "10rem",   // 160px
        "space-6xl": "12rem",   // 192px
      },
      borderRadius: {
        "radius-xs": "0.25rem",   // 4px
        "radius-sm": "0.5rem",    // 8px
        "radius-md": "0.75rem",   // 12px
        "radius-lg": "1rem",      // 16px
        "radius-xl": "1.5rem",    // 24px
        "radius-2xl": "2rem",     // 32px
        "radius-full": "9999px",
      },
      boxShadow: {
        "shadow-sm": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        "shadow": "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        "shadow-md": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        "shadow-lg": "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        "shadow-xl": "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
        "shadow-2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
        // Premium shadows with brand tint
        "shadow-brand": "0 20px 40px -12px rgb(99 102 241 / 0.25)",
        "shadow-brand-lg": "0 32px 64px -16px rgb(99 102 241 / 0.3)",
        "shadow-glow": "0 0 40px -10px rgb(99 102 241 / 0.4)",
        "shadow-glow-emerald": "0 0 40px -10px rgb(16 185 129 / 0.4)",
        "shadow-glow-amber": "0 0 40px -10px rgb(245 158 11 / 0.4)",
        // Double-bezel shadows
        "shadow-inner-glow": "inset 0 1px 1px 0 rgb(255 255 255 / 0.15)",
        "shadow-card": "0 2px 8px 0 rgb(0 0 0 / 0.2), 0 1px 2px 0 rgb(0 0 0 / 0.1)",
        "shadow-card-hover": "0 12px 32px 0 rgb(0 0 0 / 0.3), 0 4px 8px 0 rgb(0 0 0 / 0.15)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "mesh-gradient": "radial-gradient(ellipse at 20% 20%, rgb(99 102 241 / 0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgb(16 185 129 / 0.1) 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, rgb(245 158 11 / 0.08) 0%, transparent 60%)",
        "mesh-gradient-dark": "radial-gradient(ellipse at 10% 10%, rgb(99 102 241 / 0.2) 0%, transparent 50%), radial-gradient(ellipse at 90% 90%, rgb(16 185 129 / 0.15) 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, rgb(245 158 11 / 0.1) 0%, transparent 60%)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "fade-in-up": "fadeInUp 0.8s ease-out forwards",
        "fade-in-down": "fadeInDown 0.8s ease-out forwards",
        "slide-in-right": "slideInRight 0.6s ease-out forwards",
        "slide-in-left": "slideInLeft 0.6s ease-out forwards",
        "scale-in": "scaleIn 0.5s ease-out forwards",
        "pulse-soft": "pulseSoft 3s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "spin-slow": "spin 3s linear infinite",
        "shimmer": "shimmer 2s ease-in-out infinite",
        "marquee": "marquee 30s linear infinite",
        "marquee-reverse": "marqueeReverse 30s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInDown: {
          "0%": { opacity: "0", transform: "translateY(-24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(24px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-24px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        marqueeReverse: {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      transitionDuration: {
        "0": "0ms",
        "75": "75ms",
        "150": "150ms",
        "200": "200ms",
        "300": "300ms",
        "500": "500ms",
        "700": "700ms",
        "1000": "1000ms",
      },
      transitionTimingFunction: {
        "spring": "cubic-bezier(0.32, 0.72, 0, 1)",
        "spring-soft": "cubic-bezier(0.16, 1, 0.3, 1)",
        "ease-out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "ease-in-expo": "cubic-bezier(0.87, 0, 0.13, 1)",
      },
      backdropBlur: {
        "xs": "2px",
        "3xl": "64px",
      },
      zIndex: {
        "layer-base": "0",
        "layer-dropdown": "10",
        "layer-sticky": "20",
        "layer-modal": "30",
        "layer-popover": "40",
        "layer-tooltip": "50",
        "layer-grain": "60",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};

export default config;