/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Manrope', 'Segoe UI', 'sans-serif'],
                display: ['Space Grotesk', 'Segoe UI', 'sans-serif'],
                mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
            },
            colors: {
                // Premium dark palette
                dark: {
                    900: '#0b0a0d',
                    800: '#121017',
                    700: '#1a1722',
                    600: '#231f2c',
                    500: '#2c2736',
                },
                // Accent colors - vibrant neon
                accent: {
                    cyan: 'rgb(var(--color-accent-cyan) / <alpha-value>)',
                    purple: 'rgb(var(--color-accent-purple) / <alpha-value>)',
                    pink: 'rgb(var(--color-accent-pink) / <alpha-value>)',
                    green: 'rgb(var(--color-accent-green) / <alpha-value>)',
                    amber: 'rgb(var(--color-accent-amber) / <alpha-value>)',
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
                'glow-cyan': '0 0 20px rgba(172, 236, 247, 0.35)',
                'glow-purple': '0 0 20px rgba(218, 196, 247, 0.35)',
                'glow-green': '0 0 15px rgba(214, 246, 221, 0.45)',
            },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'glow': 'glow 2s ease-in-out infinite alternate',
            },
            keyframes: {
                glow: {
                    '0%': { boxShadow: '0 0 6px rgba(172, 236, 247, 0.25)' },
                    '100%': { boxShadow: '0 0 22px rgba(218, 196, 247, 0.45)' },
                },
            },
        },
    },
    plugins: [],
}

