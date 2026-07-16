/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ['./index.html', './src/**/*.{html,js,ts,vue}'],
    theme: {
        // Responsive convention (mobile-first):
        //   (no prefix) — mobile  < 768px
        //   md:          — tablet   768px+  (iPad)
        //   lg:          — desktop 1024px+
        //   xl:          — wide    1280px+
        screens: {
            md: '768px',
            lg: '1024px',
            xl: '1280px',
            '2xl': '1536px',
        },
        extend: {
            colors: {
                primary: '#191c1f',
                'primary-dark': '#191c1f',
                success: '#067647',
                danger: '#d63c31',
                warning: '#e6a23c',
                info: '#344054',
                gray: {
                    50: '#F9FAFB',
                    100: '#F2F4F7',
                    200: '#EAECF0',
                    300: '#D0D5DD',
                    400: '#98A2B3',
                    500: '#667085',
                    600: '#475467',
                    700: '#344054',
                    800: '#1D2939',
                    900: '#101828',
                },
                'bg-1': '#F5F5F5',
                'bg-2': '#FCFCFD',
            },
            fontFamily: {
                sans: ['Onest', 'sans-serif'],
                onest: ['Onest', 'sans-serif'],
            },
            borderRadius: {
                card: '12px',
                button: '8px',
                input: '8px',
            },
            boxShadow: {
                card: '0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)',
            },
        },
    },
    plugins: [],
}
