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
                'primary-blue': '#3776AB',
                'dark-bg': '#303030',
                'light-gray': '#888888',
                'python-yellow': '#FFD43B',
            },
            fontFamily: {
                poppins: ['Poppins', 'sans-serif'],
            },
            animation: {
                'typewriter': 'typewriter 2s steps(8, end) forwards',
                'cursor': 'blink 0.7s step-end infinite',
                'fadeIn': 'fadeIn 1.5s ease-out forwards',
                'slideUp': 'slideUp 1s ease-out forwards',
            },
            keyframes: {
                typewriter: {
                    'from': {width: '0'},
                    'to': {width: '100%'}
                },
                blink: {
                    'from, to': {opacity: '1'},
                    '50%': {opacity: '0'}
                },
                fadeIn: {
                    'from': {opacity: '0'},
                    'to': {opacity: '1'}
                },
                slideUp: {
                    'from': {
                        opacity: '0',
                        transform: 'translateY(20px)'
                    },
                    'to': {
                        opacity: '1',
                        transform: 'translateY(0)'
                    }
                }
            }
        },
    },
    plugins: [],
}