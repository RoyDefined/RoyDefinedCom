/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,ts}'],
    theme: {
        extend: {
            keyframes: {
                'fade-in-up': {
                    '0%': {
                        opacity: 0,
                        transform: 'translate3d(0, 100%, 0)',
                    },
                    '100%': {
                        opacity: 1,
                        transform: 'translate3d(0, 0, 0)',
                    },
                },
            },
            animation: {
                fadeInUp: 'fade-in-up 1s ease-in-out 0.25s 1',
            },
        },
    },
    plugins: [],
    darkMode: 'class',
};
