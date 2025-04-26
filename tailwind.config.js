/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter-Regular"],
        "font-inter-bold": ["Inter-Bold"],
        "font-inter-medium": ["Inter-Medium"],
        "font-inter-extrabold": ["Inter-ExtraBold"],
        "font-inter-regular": ["Inter-Regular"],
        "font-inter-semibold": ["Inter-SemiBold"],
      },
    },
  },
  plugins: [],
};
