import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { challenges, Category } from './data/challenges';
import { Sidebar, SidebarToggle } from './components/Sidebar';
import { MobileHeader } from './components/MobileHeader';
import { MobileTabBar, MobileTab } from './components/MobileTabBar';
import { LessonView } from './components/LessonView';
import { ProblemCard } from './components/ProblemCard';
import { Editor } from './components/Editor';
import { Console } from './components/Console';
import { runCode, TestResult } from './utils/runCode';

export default function App() {
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
    const [code, setCode] = useState('');
    // Ref to always have the current code value (avoids stale closures)
    const codeRef = useRef(code);
    const [results, setResults] = useState<TestResult[]>([]);
    const [hasRun, setHasRun] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const [completedChallenges, setCompletedChallenges] = useState<string[]>(() => {
        const saved = localStorage.getItem('conceptLoop_completed');
        return saved ? JSON.parse(saved) : [];
    });
    const [showSolution, setShowSolution] = useState(false);
    const [failedAttempts, setFailedAttempts] = useState(0);

    // Lesson phase state - true = show lesson, false = show challenge
    const [isLessonPhase, setIsLessonPhase] = useState(true);

    // Sidebar collapse state (desktop)
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    // Mobile-specific state
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeMobileTab, setActiveMobileTab] = useState<MobileTab>('task');

    // Theme state with localStorage persistence
    const [theme, setTheme] = useState<'dark' | 'light'>(() => {
        const saved = localStorage.getItem('conceptLoop_theme');
        return (saved === 'light' || saved === 'dark') ? saved : 'light';
    });

    // Apply theme to document
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('conceptLoop_theme', theme);
    }, [theme]);

    const toggleTheme = useCallback(() => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    }, []);

    // Load saved code for current challenge
    const getSavedCode = (challengeId: string): string | null => {
        return localStorage.getItem(`conceptLoop_code_${challengeId}`);
    };

    // Save code for current challenge
    const saveCode = (challengeId: string, codeToSave: string) => {
        localStorage.setItem(`conceptLoop_code_${challengeId}`, codeToSave);
    };

    // Persist completed challenges
    useEffect(() => {
        localStorage.setItem('conceptLoop_completed', JSON.stringify(completedChallenges));
    }, [completedChallenges]);

    // Filter challenges by category
    const filteredChallenges = useMemo(() => {
        if (selectedCategory === null) {
            return challenges;
        }
        return challenges.filter(c => c.category === selectedCategory);
    }, [selectedCategory]);

    const currentChallenge = filteredChallenges[currentChallengeIndex];

    // Reset to first challenge when category changes
    useEffect(() => {
        setCurrentChallengeIndex(0);
    }, [selectedCategory]);

    // Reset when challenge changes
    useEffect(() => {
        if (currentChallenge) {
            const savedCode = getSavedCode(currentChallenge.id);
            setCode(savedCode || currentChallenge.starterCode);
            setResults([]);
            setHasRun(false);
            setShowSolution(false);
            setFailedAttempts(0);
            setIsLessonPhase(true);
            setActiveMobileTab('task'); // Reset mobile tab on challenge change
        }
    }, [currentChallenge?.id]);

    // Auto-save code as user types
    useEffect(() => {
        if (currentChallenge && code !== currentChallenge.starterCode) {
            saveCode(currentChallenge.id, code);
        }
    }, [code, currentChallenge]);

    const markCompleted = useCallback((challengeId: string) => {
        setCompletedChallenges(prev => {
            if (prev.includes(challengeId)) return prev;
            return [...prev, challengeId];
        });
    }, []);

    const advanceChallenge = useCallback(() => {
        setCurrentChallengeIndex(prev => {
            if (prev < filteredChallenges.length - 1) {
                return prev + 1;
            }
            return prev;
        });
    }, [filteredChallenges.length]);

    // Handle lesson complete - transition to challenge phase or advance for lesson-only items
    const handleLessonComplete = useCallback(() => {
        if (!currentChallenge) return;
        if (currentChallenge.type === 'lesson') {
            markCompleted(currentChallenge.id);
            advanceChallenge();
            return;
        }
        setIsLessonPhase(false);
    }, [advanceChallenge, currentChallenge, markCompleted]);

    // Keep codeRef in sync with code state
    useEffect(() => {
        codeRef.current = code;
    }, [code]);

    // Handle code execution
    const handleRun = useCallback(() => {
        if (!currentChallenge || currentChallenge.type === 'lesson') return;

        setIsRunning(true);

        // Use ref to always get the CURRENT code value (fixes stale closure bug)
        const currentCode = codeRef.current;

        // Small delay (300ms) provides visual feedback that code is "running",
        // preventing the UI from feeling instantaneous/glitchy for fast executions.
        setTimeout(() => {
            const testResults = runCode(
                currentCode,
                currentChallenge.functionName,
                currentChallenge.testCases
            );
            setResults(testResults);
            setHasRun(true);
            setIsRunning(false);

            // Auto-switch to Run tab on mobile after execution completes.
            // This UX pattern ensures users immediately see their test results
            // without manually switching tabs.
            setActiveMobileTab('run');

            const allPassed = testResults.length > 0 && testResults.every(r => r.passed);
            if (allPassed) {
                markCompleted(currentChallenge.id);
                setFailedAttempts(0);
            } else {
                setFailedAttempts(prev => prev + 1);
            }
        }, 300);
    }, [currentChallenge, markCompleted]); // No longer depends on `code` - uses codeRef instead

    // Handle code reset
    const handleReset = useCallback(() => {
        if (!currentChallenge) return;
        setCode(currentChallenge.starterCode);
        setResults([]);
        setHasRun(false);
    }, [currentChallenge]);

    // Navigation handlers
    const handlePrevious = useCallback(() => {
        if (currentChallengeIndex > 0) {
            setCurrentChallengeIndex(prev => prev - 1);
        }
    }, [currentChallengeIndex]);

    const handleNext = useCallback(() => {
        advanceChallenge();
    }, [advanceChallenge]);

    // Keyboard shortcut for running code
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                e.preventDefault();
                if (!isLessonPhase) {
                    handleRun();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleRun, isLessonPhase]);

    // Close mobile menu on window resize to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMobileMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Guard against no challenges in category
    if (!currentChallenge) {
        return (
            <div className="h-screen flex items-center justify-center bg-[var(--color-bg-primary)]">
                <div className="text-[color:var(--color-text-muted)]">No challenges found</div>
            </div>
        );
    }

    return (
        <div className="h-screen flex flex-col md:flex-row overflow-hidden bg-transparent">
            {/* Mobile Header */}
            <MobileHeader
                onMenuToggle={() => setIsMobileMenuOpen(prev => !prev)}
                isMenuOpen={isMobileMenuOpen}
                theme={theme}
            />

            {/* Desktop Sidebar Toggle Button */}
            <SidebarToggle
                isCollapsed={isSidebarCollapsed}
                onToggle={() => setIsSidebarCollapsed(prev => !prev)}
            />

            {/* Sidebar (desktop persistent / mobile slide-over) */}
            <Sidebar
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                currentChallengeIndex={currentChallengeIndex}
                filteredChallengesCount={filteredChallenges.length}
                completedChallenges={completedChallenges}
                isCollapsed={isSidebarCollapsed}
                isMobileOpen={isMobileMenuOpen}
                onMobileClose={() => setIsMobileMenuOpen(false)}
                theme={theme}
                onThemeToggle={toggleTheme}
            />

            {/* Main Content - with mobile header offset, min-h-0 needed for nested flexbox scrolling */}
            <div className="flex-1 flex flex-col min-w-0 min-h-0 pt-14 md:pt-0">
                {isLessonPhase ? (
                    /* LESSON PHASE: Vertical stack lesson view */
                    <div className="flex-1 flex flex-col min-w-0 min-h-0 bg-transparent">
                        <LessonView
                            challenge={currentChallenge}
                            onLessonComplete={handleLessonComplete}
                            currentIndex={currentChallengeIndex}
                            totalChallenges={filteredChallenges.length}
                            theme={theme}
                            itemType={currentChallenge.type}
                        />
                    </div>
                ) : (
                    /* CHALLENGE PHASE */
                    <div className="flex-1 flex flex-col min-w-0 min-h-0">
                        {/* Header - visible on desktop, simplified on mobile */}
                        <header className={`px-4 py-2.5 flex items-center justify-between shrink-0 border-b ${theme === 'dark'
                            ? 'glass-dark border-white/5'
                            : 'glass border-[color:var(--color-border)] shadow-[0_6px_18px_rgba(32,27,43,0.08)]'
                            }`}>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setIsLessonPhase(true)}
                                    className={`text-xs transition-colors flex items-center gap-1 min-h-[44px] md:min-h-0 ${theme === 'dark'
                                        ? 'text-slate-500 hover:text-accent-purple'
                                        : 'text-[color:var(--color-text-muted)] hover:text-accent-purple'
                                        }`}
                                >
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                    <span className="hidden md:inline">Back to Lesson</span>
                                    <span className="md:hidden">Lesson</span>
                                </button>
                                <span className={theme === 'dark' ? 'text-white/20' : 'text-[color:var(--color-text-dim)]'}>|</span>
                                <span className="text-xs font-medium text-accent-cyan px-2 py-1 bg-accent-cyan/10 rounded border border-accent-cyan/20 hidden md:inline">
                                    {currentChallenge.category}
                                </span>
                                <h1 className={`text-sm md:text-base font-semibold truncate max-w-[150px] md:max-w-none ${theme === 'dark' ? 'text-white' : 'text-slate-900'
                                    }`}>
                                    {currentChallenge.title}
                                </h1>
                                <span className={`text-xs font-medium px-2 py-0.5 rounded hidden md:inline ${currentChallenge.difficulty === 'Beginner' ? 'bg-accent-green/20 text-accent-green border border-accent-green/40' :
                                    currentChallenge.difficulty === 'Easy' ? 'bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/40' :
                                        currentChallenge.difficulty === 'Medium' ? 'bg-accent-amber/20 text-accent-amber border border-accent-amber/40' :
                                            'bg-accent-pink/20 text-accent-pink border border-accent-pink/40'
                                    }`}>
                                    {currentChallenge.difficulty}
                                </span>
                            </div>
                            <div className={`text-sm font-mono ${theme === 'dark' ? 'text-slate-400' : 'text-[color:var(--color-text-muted)]'
                                }`}>
                                {currentChallengeIndex + 1} / {filteredChallenges.length}
                            </div>
                        </header>

                        {/* DESKTOP: 3-Column Layout */}
                        <main className="hidden md:grid flex-1 grid-cols-[1.05fr_1.45fr_0.9fr] overflow-hidden">
                            <ProblemCard
                                challenge={currentChallenge}
                                currentIndex={currentChallengeIndex}
                                totalChallenges={filteredChallenges.length}
                                onPrevious={handlePrevious}
                                onNext={handleNext}
                                failedAttempts={failedAttempts}
                                showSolution={showSolution}
                                onRevealSolution={() => setShowSolution(true)}
                                theme={theme}
                            />

                            <Editor
                                code={code}
                                onChange={setCode}
                                onRun={handleRun}
                                onReset={handleReset}
                                onNext={handleNext}
                                isRunning={isRunning}
                                allTestsPassed={hasRun && results.length > 0 && results.every(r => r.passed)}
                                canGoNext={currentChallengeIndex < filteredChallenges.length - 1}
                                theme={theme}
                            />

                            <Console results={results} hasRun={hasRun} theme={theme} />
                        </main>

                        {/* MOBILE: Tabbed Content - flex-1 min-h-0 for proper scrolling, pb-16 for tab bar clearance */}
                        <main className="md:hidden flex-1 min-h-0 overflow-hidden pb-16">
                            {activeMobileTab === 'task' && (
                                <div className="h-full overflow-y-auto scrollbar-hide">
                                    <ProblemCard
                                        challenge={currentChallenge}
                                        currentIndex={currentChallengeIndex}
                                        totalChallenges={filteredChallenges.length}
                                        onPrevious={handlePrevious}
                                        onNext={handleNext}
                                        failedAttempts={failedAttempts}
                                        showSolution={showSolution}
                                        onRevealSolution={() => setShowSolution(true)}
                                        theme={theme}
                                    />
                                </div>
                            )}

                            {activeMobileTab === 'code' && (
                                <div className="h-full flex flex-col">
                                    <Editor
                                        code={code}
                                        onChange={setCode}
                                        onRun={handleRun}
                                        onReset={handleReset}
                                        onNext={handleNext}
                                        isRunning={isRunning}
                                        allTestsPassed={hasRun && results.length > 0 && results.every(r => r.passed)}
                                        canGoNext={currentChallengeIndex < filteredChallenges.length - 1}
                                        theme={theme}
                                    />
                                </div>
                            )}

                            {activeMobileTab === 'run' && (
                                <div className="h-full overflow-y-auto scrollbar-hide">
                                    <Console results={results} hasRun={hasRun} theme={theme} />
                                </div>
                            )}
                        </main>

                        {/* Mobile Tab Bar */}
                        <MobileTabBar
                            activeTab={activeMobileTab}
                            onTabChange={setActiveMobileTab}
                            theme={theme}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
