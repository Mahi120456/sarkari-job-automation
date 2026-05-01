export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#E65100',
        secondary: '#0D47A1',
        accent: '#FFD600',
        success: '#1B5E20',
        background: '#FAFAFA',
        card: '#FFFFFF',
        text: '#212121',
        subtext: '#757575',
        category: {
          naukri: '#FF6600',
          exam: '#1565C0',
          admit: '#6A1B9A',
          result: '#2E7D32',
          yojana: '#00695C',
          update: '#C62828'
        }
      },
      fontFamily: {
        headline: ['"Tiro Devanagari Hindi"', 'serif'],
        body: ['"Noto Sans Devanagari"', 'sans-serif'],
        english: ['"Plus Jakarta Sans"', 'sans-serif']
      },
      keyframes: {
        ticker: { '0%': { transform: 'translateX(100%)' }, '100%': { transform: 'translateX(-100%)' } },
        fadeUp: { '0%': { opacity: '0', transform: 'translateY(16px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } }
      },
      animation: {
        ticker: 'ticker 28s linear infinite',
        fadeUp: 'fadeUp .6s ease forwards'
      }
    }
  },
  plugins: []
};
