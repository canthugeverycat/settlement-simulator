const config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        black: '#313639',
        'jet-black': 'black',
        'dark-teal': '#10191f',
        grey: '#6E6E6E',
        'light-grey': '#B4B4B4',
        lilac: '#E0A1FE',
        indigo: '#9370FF',
        primary: '#578A8C',
        secondary: '#2E1A31',
        success: '#16A34A',
        error: '#E53431',
        info: '#EEB958',
      },
      boxShadow: {
        'up-lg':
          '0 -10px 15px -3px rgba(0, 0, 0, 0.1), 0 -4px 6px -4px rgba(0, 0, 0, 0.1)',
      },
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
        bebas: ['Bebas Neue', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
