/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                canvas: '#FAFAF8',
                charcoal: '#2B2320',
                'charcoal-light': '#4A3F3B',
                'charcoal-muted': '#8C7B76',
                accent: '#C4622D',
                'accent-light': '#E8A87C',
                cream: '#F5F0EB',
                'cream-dark': '#EDE8E3',
            },
            fontFamily: {
                fraunces: ['var(--font-fraunces)', 'Georgia', 'serif'],
                inter: ['var(--font-inter)', 'sans-serif'],
            },
            screens: {
                xs: '375px',
                sm: '640px',
                md: '768px',
                lg: '1024px',
                xl: '1280px',
                '2xl': '1536px',
            },
            spacing: {
                '18': '4.5rem',
                '22': '5.5rem',
                '26': '6.5rem',
                '30': '7.5rem',
                '34': '8.5rem',
                '38': '9.5rem',
            },
            fontSize: {
                'display-xl': ['clamp(3rem, 10vw, 9rem)', { lineHeight: '0.92', letterSpacing: '-0.04em' }],
                'display-lg': ['clamp(2.5rem, 7vw, 7rem)', { lineHeight: '0.94', letterSpacing: '-0.03em' }],
                'display-md': ['clamp(2rem, 5vw, 5rem)', { lineHeight: '1', letterSpacing: '-0.025em' }],
                'display-sm': ['clamp(1.5rem, 3.5vw, 3.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
                'body-lg': ['clamp(1rem, 1.5vw, 1.25rem)', { lineHeight: '1.65' }],
                'body-md': ['clamp(0.875rem, 1.2vw, 1.125rem)', { lineHeight: '1.7' }],
                'label': ['clamp(0.625rem, 0.9vw, 0.75rem)', { lineHeight: '1.4', letterSpacing: '0.15em' }],
            },
            animation: {
                'grain': 'grain 0.8s steps(2) infinite',
                'float': 'float 6s ease-in-out infinite',
                'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
            },
            keyframes: {
                grain: {
                    '0%, 100%': { transform: 'translate(0, 0)' },
                    '10%': { transform: 'translate(-2%, -3%)' },
                    '20%': { transform: 'translate(-4%, 2%)' },
                    '30%': { transform: 'translate(2%, -4%)' },
                    '40%': { transform: 'translate(-1%, 3%)' },
                    '50%': { transform: 'translate(-3%, 1%)' },
                    '60%': { transform: 'translate(3%, -1%)' },
                    '70%': { transform: 'translate(1%, 4%)' },
                    '80%': { transform: 'translate(-2%, 2%)' },
                    '90%': { transform: 'translate(4%, -2%)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-12px)' },
                },
                'pulse-soft': {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.6' },
                },
            },
        },
    },
    plugins: [],
}