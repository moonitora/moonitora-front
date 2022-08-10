module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['inter', 'san-serif'],
        'roboto': ['roboto', 'serif'],
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'moonitora-cyan': '#2EC4B6',
        'moonitora-orange': '#FF9F1C'
      }
    },
  },
  plugins: [],
}