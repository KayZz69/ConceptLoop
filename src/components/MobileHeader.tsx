interface MobileHeaderProps {
    onMenuToggle: () => void;
    isMenuOpen: boolean;
    theme?: 'dark' | 'light';
}

export function MobileHeader({ onMenuToggle, isMenuOpen, theme = 'dark' }: MobileHeaderProps) {
    return (
        <header className={`md:hidden fixed top-0 left-0 right-0 z-40 border-b px-4 py-3 flex items-center justify-between ${theme === 'dark'
                ? 'glass-dark border-white/5'
                : 'glass border-[color:var(--color-border)] shadow-[0_6px_16px_rgba(32,27,43,0.08)]'
            }`}>
            {/* Hamburger Menu Button */}
            <button
                onClick={onMenuToggle}
                className={`p-2 -ml-2 rounded-lg transition-colors touch-target ${theme === 'dark' ? 'hover:bg-dark-500/50' : 'hover:bg-[var(--color-bg-glass-light)]'
                    }`}
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
                <svg
                    className={`w-6 h-6 ${theme === 'dark' ? 'text-slate-300' : 'text-[color:var(--color-text-secondary)]'
                        }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    {isMenuOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                </svg>
            </button>

            {/* App Logo - Center */}
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-cyan to-accent-purple flex items-center justify-center shadow-glow-cyan">
                    <span className="text-dark-900 font-bold text-xs">CL</span>
                </div>
                <span className={`font-display font-semibold text-sm ${theme === 'dark' ? 'text-white' : 'text-slate-900'
                    }`}>ConceptLoop</span>
            </div>

            {/* Spacer to balance the layout */}
            <div className="w-10"></div>
        </header>
    );
}
