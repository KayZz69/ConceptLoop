import { Category, categories, challenges } from '../data/challenges';

interface SidebarProps {
    selectedCategory: Category | null;
    onSelectCategory: (category: Category | null) => void;
    currentChallengeIndex: number;
    filteredChallengesCount: number;
    completedChallenges: string[];
    isCollapsed: boolean;
    // Mobile-specific props
    isMobileOpen?: boolean;
    onMobileClose?: () => void;
    // Theme props
    theme: 'dark' | 'light';
    onThemeToggle: () => void;
}

export function Sidebar({
    selectedCategory,
    onSelectCategory,
    currentChallengeIndex,
    filteredChallengesCount,
    completedChallenges,
    isCollapsed,
    isMobileOpen = false,
    onMobileClose,
    theme,
    onThemeToggle
}: SidebarProps) {
    // Count challenges per category
    const getChallengeCount = (category: Category): number => {
        return challenges.filter(c => c.category === category).length;
    };

    const getCompletedCount = (category: Category): number => {
        return challenges.filter(c => c.category === category && completedChallenges.includes(c.id)).length;
    };

    const totalCompleted = completedChallenges.length;
    const totalChallenges = challenges.length;

    // Category icons
    const categoryIcons: Record<Category, string> = {
        'Variables': 'V',
        'Booleans': 'B',
        'Operators': 'Op',
        'Strings': 'Str',
        'Conditionals': 'If',
        'Functions I': 'Fn',
        'Arrays': 'Arr',
        'Objects': 'Obj',
        'Loops': 'Loop'
    };

    // Handle category selection (close mobile menu on selection)
    const handleCategorySelect = (category: Category | null) => {
        onSelectCategory(category);
        if (onMobileClose) {
            onMobileClose();
        }
    };

    // Sidebar content (shared between mobile and desktop)
    const sidebarContent = (
        <>
            {/* Header - Logo */}
            <div className={`px-4 py-4 border-b shrink-0 ${theme === 'dark' ? 'border-white/5' : 'border-[color:var(--color-border)]'
                }`}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-cyan to-accent-purple flex items-center justify-center shadow-glow-cyan shrink-0">
                            <span className="text-dark-900 font-bold text-xs">CL</span>
                        </div>
                        <div className="overflow-hidden whitespace-nowrap">
                            <span className={`font-display font-semibold text-sm ${theme === 'dark' ? 'text-white' : 'text-slate-900'
                                }`}>ConceptLoop</span>
                            <p className="text-[10px] text-[color:var(--color-text-muted)]">Master JavaScript</p>
                        </div>
                    </div>
                    {/* Mobile close button */}
                    {isMobileOpen && onMobileClose && (
                        <button
                            onClick={onMobileClose}
                            className={`md:hidden p-2 -mr-2 rounded-lg transition-colors ${theme === 'dark' ? 'hover:bg-dark-500/50' : 'hover:bg-[var(--color-bg-glass-light)]'
                                }`}
                            aria-label="Close menu"
                        >
                            <svg className={`w-5 h-5 ${theme === 'dark' ? 'text-slate-400' : 'text-[color:var(--color-text-secondary)]'
                                }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>
            </div>

            {/* Progress */}
            <div className={`px-4 py-3 border-b shrink-0 ${theme === 'dark' ? 'border-white/5' : 'border-[color:var(--color-border)]'
                }`}>
                <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-medium uppercase tracking-wider text-[color:var(--color-text-muted)]">Progress</span>
                    <span className="text-xs font-mono text-accent-cyan">
                        {currentChallengeIndex + 1}/{filteredChallengesCount}
                    </span>
                </div>
                <div className={`h-1.5 rounded-full overflow-hidden ${theme === 'dark' ? 'bg-dark-600' : 'bg-[var(--color-bg-tertiary)]'
                    }`}>
                    <div
                        className="h-full bg-gradient-to-r from-accent-cyan to-accent-purple rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${((currentChallengeIndex + 1) / filteredChallengesCount) * 100}%` }}
                    />
                </div>
            </div>

            {/* Categories */}
            <div className="flex-1 overflow-y-auto py-3 scrollbar-hide">
                <div className="px-3">
                    <div className="text-[10px] font-medium uppercase tracking-wider mb-2 px-2 text-[color:var(--color-text-muted)]">
                        Categories
                    </div>

                    {/* All Challenges */}
                    <button
                        onClick={() => handleCategorySelect(null)}
                        className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-medium transition-all mb-1 min-h-[44px]
                            ${selectedCategory === null
                                ? theme === 'dark'
                                    ? 'bg-gradient-to-r from-accent-cyan/20 to-accent-purple/10 text-white border border-accent-cyan/30 shadow-glow-cyan'
                                    : 'bg-gradient-to-r from-accent-cyan/25 to-accent-purple/15 text-slate-900 border border-accent-cyan/30 shadow-glow-cyan'
                                : theme === 'dark'
                                    ? 'text-slate-400 hover:bg-dark-500/50 hover:text-white border border-transparent'
                                    : 'text-[color:var(--color-text-secondary)] hover:bg-[var(--color-bg-glass-light)] hover:text-[color:var(--color-text-primary)] border border-transparent'
                            }`}
                    >
                        <span className="text-base shrink-0">All</span>
                        <span className="flex-1 text-left overflow-hidden whitespace-nowrap">All Items</span>
                        <span className={`text-[10px] font-mono shrink-0 ${selectedCategory === null ? 'text-accent-cyan' : 'text-[color:var(--color-text-muted)]'}`}>
                            {totalCompleted}/{totalChallenges}
                        </span>
                    </button>

                    {/* Category List */}
                    {categories.map((category) => {
                        const completed = getCompletedCount(category);
                        const total = getChallengeCount(category);
                        const isComplete = completed === total;

                        return (
                            <button
                                key={category}
                                onClick={() => handleCategorySelect(category)}
                                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-medium transition-all mb-1 min-h-[44px]
                                    ${selectedCategory === category
                                        ? theme === 'dark'
                                            ? 'bg-gradient-to-r from-accent-cyan/20 to-accent-purple/10 text-white border border-accent-cyan/30 shadow-glow-cyan'
                                            : 'bg-gradient-to-r from-accent-cyan/25 to-accent-purple/15 text-slate-900 border border-accent-cyan/30 shadow-glow-cyan'
                                        : theme === 'dark'
                                            ? 'text-slate-400 hover:bg-dark-500/50 hover:text-white border border-transparent'
                                            : 'text-[color:var(--color-text-secondary)] hover:bg-[var(--color-bg-glass-light)] hover:text-[color:var(--color-text-primary)] border border-transparent'
                                    }`}
                            >
                                <span className="text-base shrink-0">{categoryIcons[category]}</span>
                                <span className="flex-1 text-left overflow-hidden whitespace-nowrap">{category}</span>
                                <span className={`text-[10px] font-mono shrink-0 ${isComplete ? 'text-accent-green' :
                                    selectedCategory === category ? 'text-accent-cyan' : 'text-[color:var(--color-text-muted)]'
                                    }`}>
                                    {completed}/{total}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Footer with Theme Toggle */}
            <div className={`px-4 py-3 border-t shrink-0 ${theme === 'dark' ? 'border-white/5' : 'border-[color:var(--color-border)]'
                }`}>
                <div className="flex items-center justify-between">
                    <div className="text-[10px] whitespace-nowrap text-[color:var(--color-text-dim)]">
                        <span className="gradient-text font-medium">Learn</span>
                        <span className="text-[color:var(--color-text-dim)]"> • </span>
                        <span className="gradient-text font-medium">Practice</span>
                        <span className="text-[color:var(--color-text-dim)]"> • </span>
                        <span className="gradient-text font-medium">Master</span>
                    </div>
                    {/* Theme Toggle Button */}
                    <button
                        onClick={onThemeToggle}
                        className="theme-toggle"
                        title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                    >
                        {theme === 'dark' ? (
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="text-accent-amber">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        ) : (
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="text-accent-purple">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>
        </>
    );

    return (
        <>
            {/* Desktop Sidebar - persistent */}
            <aside
                className={`hidden md:flex flex-col h-full border-r transition-all duration-300 overflow-hidden ${theme === 'dark'
                    ? 'glass-dark border-white/5'
                    : 'glass-light border-[color:var(--color-border)]'
                    } ${isCollapsed ? 'w-0' : 'w-56'}`}
            >
                {sidebarContent}
            </aside>

            {/* Mobile Sidebar - slide-over modal */}
            {isMobileOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="md:hidden fixed inset-0 z-40 backdrop-overlay"
                        onClick={onMobileClose}
                    />
                    {/* Sidebar */}
                    <aside className={`md:hidden fixed top-0 left-0 bottom-0 z-50 w-72 flex flex-col animate-slideInFromLeft ${theme === 'dark' ? 'glass-dark' : 'glass-light shadow-[0_16px_40px_rgba(32,27,43,0.18)]'
                        }`}>
                        {sidebarContent}
                    </aside>
                </>
            )}
        </>
    );
}

// Standalone toggle button component (used in App.tsx) - desktop only
export function SidebarToggle({ isCollapsed, onToggle }: { isCollapsed: boolean; onToggle: () => void }) {
    return (
        <button
            onClick={onToggle}
            className="hidden md:block fixed top-4 left-4 z-50 p-2 rounded-lg glass hover:bg-[var(--color-bg-glass-light)] transition-colors"
            title={isCollapsed ? 'Open sidebar' : 'Close sidebar'}
        >
            <svg
                className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isCollapsed ? '' : 'rotate-180'}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                {isCollapsed ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                )}
            </svg>
        </button>
    );
}
