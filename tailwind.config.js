/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
                mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
            },
            colors: {
                // Premium dark palette
                dark: {
                    900: '#0a0a0f',
                    800: '#0f0f18',
                    700: '#161625',
                    600: '#1e1e32',
                    500: '#2a2a45',
                },
                // Accent colors - vibrant neon
                accent: {
                    cyan: '#00d4ff',
                    purple: '#a855f7',
                    pink: '#f472b6',
                    green: '#34d399',
                    amber: '#fbbf24',
                },
                // Slate shades (preserved)
                slate: {
                    50: '#f8fafc',
                    100: '#f1f5f9',
                    200: '#e2e8f0',
                    300: '#cbd5e1',
                    400: '#94a3b8',
                    500: '#64748b',
                    600: '#475569',
                    700: '#334155',
                    800: '#1e293b',
                    900: '#0f172a',
                    950: '#020617',
                },
            },
            borderRadius: {
                sm: '0.25rem',
            },
            backdropBlur: {
                xs: '2px',
            },
            boxShadow: {
                'glow-cyan': '0 0 20px rgba(0, 212, 255, 0.3)',
                'glow-purple': '0 0 20px rgba(168, 85, 247, 0.3)',
                'glow-green': '0 0 15px rgba(52, 211, 153, 0.4)',
            },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'glow': 'glow 2s ease-in-out infinite alternate',
            },
            keyframes: {
                glow: {
                    '0%': { boxShadow: '0 0 5px rgba(0, 212, 255, 0.2)' },
                    '100%': { boxShadow: '0 0 20px rgba(0, 212, 255, 0.5)' },
                },
            },
        },
    },
    plugins: [],
}

