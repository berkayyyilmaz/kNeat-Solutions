module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF7B47",
        secondary: "#0D5C63",
        fgray: "#737373",
        lightGray: "#FAFAFA",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"], // Montserrat fontu
      },
      fontSize: {
        h1: "3rem",
        h2: "2.5rem",
        h3: "2rem",
        h4: "1.5rem",
        h5: "1.25rem",
        h6: "1.125rem",
      },
      fontWeight: {
        h1: "700",
        h2: "600",
        h3: "500",
        h5: "700",
        h6: "700",
      },
      lineHeight: {
        h1: "1.2",
        h2: "1.3",
        h3: "1.4",
        h5: "24px",
        h6: "20px",
      },
      keyframes: {
        fadeInUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        fadeOut: {
          "0%": {
            opacity: "1",
            transform: "scale(1)",
          },
          "100%": {
            opacity: "0",
            transform: "scale(0.95)",
          },
        },
      },
      animation: {
        fadeInUp: "fadeInUp 0.4s ease-out",
        fadeOut: "fadeOut 0.3s ease-in",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
