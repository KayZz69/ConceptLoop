export type MobileTab = 'task' | 'code' | 'run';

interface MobileTabBarProps {
    activeTab: MobileTab;
    onTabChange: (tab: MobileTab) => void;
    theme?: 'dark' | 'light';
}

export function MobileTabBar({ activeTab, onTabChange, theme = 'dark' }: MobileTabBarProps) {
    const tabs: { id: MobileTab; label: string; icon: React.ReactNode }[] = [
        {
            id: 'task',
            label: 'Task',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            ),
        },
        {
            id: 'code',
            label: 'Code',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
            ),
        },
        {
            id: 'run',
            label: 'Run',
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                </svg>
            ),
        },
    ];

    return (
        <nav className={`md:hidden fixed bottom-0 left-0 right-0 z-40 border-t safe-area-bottom ${theme === 'dark' ? 'glass-dark border-white/5' : 'glass border-[color:var(--color-border)] shadow-[0_-8px_24px_rgba(32,27,43,0.12)]'
            }`}>
            <div className="flex">
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    const isRun = tab.id === 'run';

                    return (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            className={`flex-1 flex flex-col items-center justify-center py-2 min-h-[56px] transition-all touch-target
                                ${isActive
                                    ? isRun
                                        ? 'text-accent-green'
                                        : 'text-accent-cyan'
                                    : theme === 'dark' ? 'text-slate-500 hover:text-slate-300' : 'text-[color:var(--color-text-muted)] hover:text-[color:var(--color-text-primary)]'
                                }`}
                        >
                            <div className={`mb-1 ${isRun && isActive ? 'scale-110' : ''} transition-transform`}>
                                {tab.icon}
                            </div>
                            <span className={`text-[10px] font-medium ${isActive ? 'opacity-100' : 'opacity-70'}`}>
                                {tab.label}
                            </span>
                            {/* Active indicator line */}
                            {isActive && (
                                <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full
                                    ${isRun ? 'bg-accent-green' : 'bg-accent-cyan'}`}
                                />
                            )}
                        </button>
                    );
                })}
            </div>
        </nav>
    );
}
