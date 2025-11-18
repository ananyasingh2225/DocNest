export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // primary: "#3B82F6",
        primary: "#BCD4E6",
        secondary: "#A78BFA",
        olive: {
          DEFAULT: "#055c9d", // Olive green base
          // light: "#808000", // Optional lighter shade
          // dark: "#556B2F", // Optional darker shade
        },
      },
      gridTemplateColumns: {
        auto: "repeat(auto-fill, minmax(200px, 1fr))",
      },
    },
  },
  plugins: [],
};
