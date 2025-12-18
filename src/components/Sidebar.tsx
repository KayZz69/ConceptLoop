import { Category, categories, challenges } from '../data/challenges';

interface SidebarProps {
    selectedCategory: Category | null;
    onSelectCategory: (category: Category | null) => void;
    currentChallengeIndex: number;
    filteredChallengesCount: number;
    completedChallenges: string[];
    isCollapsed: boolean;
}

export function Sidebar({
    selectedCategory,
    onSelectCategory,
    currentChallengeIndex,
    filteredChallengesCount,
    completedChallenges,
    isCollapsed
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
        'JS Basics': '⚡',
        'Conditionals': '🔀',
        'Loops': '🔄',
        'Functions': '📦',
        'Strings': '✨',
        'Arrays': '📊',
        'Objects': '🔮'
    };

    return (
        <aside
            className={`glass-dark flex flex-col h-full border-r border-white/5 transition-all duration-300 overflow-hidden ${isCollapsed ? 'w-0' : 'w-56'
                }`}
        >
            {/* Header - Logo */}
            <div className="px-4 py-4 border-b border-white/5 shrink-0">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-cyan to-accent-purple flex items-center justify-center shadow-glow-cyan shrink-0">
                        <span className="text-dark-900 font-bold text-xs">CL</span>
                    </div>
                    <div className="overflow-hidden whitespace-nowrap">
                        <span className="font-semibold text-sm text-white">ConceptLoop</span>
                        <p className="text-[10px] text-slate-500">Master JavaScript</p>
                    </div>
                </div>
            </div>

            {/* Progress */}
            <div className="px-4 py-3 border-b border-white/5 shrink-0">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Progress</span>
                    <span className="text-xs font-mono text-accent-cyan">
                        {currentChallengeIndex + 1}/{filteredChallengesCount}
                    </span>
                </div>
                <div className="h-1.5 bg-dark-600 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-accent-cyan to-accent-purple rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${((currentChallengeIndex + 1) / filteredChallengesCount) * 100}%` }}
                    />
                </div>
            </div>

            {/* Categories */}
            <div className="flex-1 overflow-y-auto py-3">
                <div className="px-3">
                    <div className="text-[10px] font-medium text-slate-500 uppercase tracking-wider mb-2 px-2">
                        Categories
                    </div>

                    {/* All Challenges */}
                    <button
                        onClick={() => onSelectCategory(null)}
                        className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-medium transition-all mb-1
                            ${selectedCategory === null
                                ? 'bg-gradient-to-r from-accent-cyan/20 to-accent-purple/10 text-white border border-accent-cyan/30 shadow-glow-cyan'
                                : 'text-slate-400 hover:bg-dark-500/50 hover:text-white border border-transparent'
                            }`}
                    >
                        <span className="text-base shrink-0">📚</span>
                        <span className="flex-1 text-left overflow-hidden whitespace-nowrap">All Challenges</span>
                        <span className={`text-[10px] font-mono shrink-0 ${selectedCategory === null ? 'text-accent-cyan' : 'text-slate-500'}`}>
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
                                onClick={() => onSelectCategory(category)}
                                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-medium transition-all mb-1
                                    ${selectedCategory === category
                                        ? 'bg-gradient-to-r from-accent-cyan/20 to-accent-purple/10 text-white border border-accent-cyan/30 shadow-glow-cyan'
                                        : 'text-slate-400 hover:bg-dark-500/50 hover:text-white border border-transparent'
                                    }`}
                            >
                                <span className="text-base shrink-0">{categoryIcons[category]}</span>
                                <span className="flex-1 text-left overflow-hidden whitespace-nowrap">{category}</span>
                                <span className={`text-[10px] font-mono shrink-0 ${isComplete ? 'text-accent-green' :
                                    selectedCategory === category ? 'text-accent-cyan' : 'text-slate-500'
                                    }`}>
                                    {completed}/{total}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Footer */}
            <div className="px-4 py-3 border-t border-white/5 shrink-0">
                <div className="text-[10px] text-slate-600 text-center whitespace-nowrap">
                    <span className="gradient-text font-medium">Learn</span>
                    <span className="text-slate-600"> • </span>
                    <span className="gradient-text font-medium">Practice</span>
                    <span className="text-slate-600"> • </span>
                    <span className="gradient-text font-medium">Master</span>
                </div>
            </div>
        </aside>
    );
}

// Standalone toggle button component (used in App.tsx)
export function SidebarToggle({ isCollapsed, onToggle }: { isCollapsed: boolean; onToggle: () => void }) {
    return (
        <button
            onClick={onToggle}
            className="fixed top-4 left-4 z-50 p-2 rounded-lg glass hover:bg-dark-500/50 transition-colors"
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
