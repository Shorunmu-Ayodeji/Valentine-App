/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Cormorant Garamond", "serif"],
        sans: ["Manrope", "sans-serif"]
      },
      keyframes: {
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "20%": { transform: "translateX(-8px)" },
          "40%": { transform: "translateX(8px)" },
          "60%": { transform: "translateX(-5px)" },
          "80%": { transform: "translateX(5px)" }
        },
        heartbeat: {
          "0%": { transform: "scale(0.95)", opacity: "0.1" },
          "25%": { transform: "scale(1)", opacity: "0.2" },
          "45%": { transform: "scale(0.97)", opacity: "0.12" },
          "70%": { transform: "scale(1.04)", opacity: "0.22" },
          "100%": { transform: "scale(0.95)", opacity: "0.1" }
        },
        cinematicZoom: {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "25%": { opacity: "1" },
          "75%": { opacity: "1" },
          "100%": { transform: "scale(1.3)", opacity: "0" }
        },
        fadeRise: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        flickerGlow: {
          "0%, 100%": { opacity: "0.8", filter: "drop-shadow(0 0 10px rgba(239, 68, 68, 0.35))" },
          "50%": { opacity: "1", filter: "drop-shadow(0 0 24px rgba(239, 68, 68, 0.65))" }
        },
        flashRed: {
          "0%": { backgroundColor: "rgba(0, 0, 0, 1)" },
          "50%": { backgroundColor: "rgba(127, 29, 29, 0.35)" },
          "100%": { backgroundColor: "rgba(0, 0, 0, 1)" }
        },
        slowFloat: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" }
        }
      },
      animation: {
        shake: "shake 0.42s ease-in-out",
        heartbeat: "heartbeat 2.2s ease-in-out infinite",
        cinematicZoom: "cinematicZoom 3s ease-in-out forwards",
        fadeRise: "fadeRise 1s ease forwards",
        flickerGlow: "flickerGlow 2s ease-in-out infinite",
        flashRed: "flashRed 0.45s ease-in-out",
        slowFloat: "slowFloat 5s ease-in-out infinite"
      }
    }
  },
  plugins: []
};