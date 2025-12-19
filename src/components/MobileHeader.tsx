interface MobileHeaderProps {
    onMenuToggle: () => void;
    isMenuOpen: boolean;
}

export function MobileHeader({ onMenuToggle, isMenuOpen }: MobileHeaderProps) {
    return (
        <header className="md:hidden fixed top-0 left-0 right-0 z-40 glass-dark border-b border-white/5 px-4 py-3 flex items-center justify-between">
            {/* Hamburger Menu Button */}
            <button
                onClick={onMenuToggle}
                className="p-2 -ml-2 rounded-lg hover:bg-dark-500/50 transition-colors touch-target"
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
                <svg
                    className="w-6 h-6 text-slate-300"
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
                <span className="font-semibold text-sm text-white">ConceptLoop</span>
            </div>

            {/* Spacer to balance the layout */}
            <div className="w-10"></div>
        </header>
    );
}
