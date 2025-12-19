import { useState, useCallback, useEffect, useMemo } from 'react';
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

    // Handle lesson complete - transition to challenge phase
    const handleLessonComplete = useCallback(() => {
        setIsLessonPhase(false);
    }, []);

    // Handle code execution
    const handleRun = useCallback(() => {
        if (!currentChallenge) return;

        setIsRunning(true);

        setTimeout(() => {
            const testResults = runCode(
                code,
                currentChallenge.functionName,
                currentChallenge.testCases
            );
            setResults(testResults);
            setHasRun(true);
            setIsRunning(false);

            // Smart transition: auto-switch to Run tab on mobile
            setActiveMobileTab('run');

            const allPassed = testResults.length > 0 && testResults.every(r => r.passed);
            if (allPassed) {
                setCompletedChallenges(prev => {
                    if (prev.includes(currentChallenge.id)) return prev;
                    return [...prev, currentChallenge.id];
                });
                setFailedAttempts(0);
            } else {
                setFailedAttempts(prev => prev + 1);
            }
        }, 300);
    }, [code, currentChallenge]);

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
        if (currentChallengeIndex < filteredChallenges.length - 1) {
            setCurrentChallengeIndex(prev => prev + 1);
        }
    }, [currentChallengeIndex, filteredChallenges.length]);

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
            <div className="h-screen flex items-center justify-center bg-dark-900">
                <div className="text-slate-400">No challenges found</div>
            </div>
        );
    }

    return (
        <div className="h-screen flex flex-col md:flex-row bg-dark-900 overflow-hidden">
            {/* Mobile Header */}
            <MobileHeader
                onMenuToggle={() => setIsMobileMenuOpen(prev => !prev)}
                isMenuOpen={isMobileMenuOpen}
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
            />

            {/* Main Content - with mobile header offset */}
            <div className="flex-1 flex flex-col min-w-0 pt-14 md:pt-0">
                {isLessonPhase ? (
                    /* LESSON PHASE: Vertical stack lesson view */
                    <div className="flex-1 flex flex-col min-w-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
                        <LessonView
                            challenge={currentChallenge}
                            onLessonComplete={handleLessonComplete}
                            currentIndex={currentChallengeIndex}
                            totalChallenges={filteredChallenges.length}
                        />
                    </div>
                ) : (
                    /* CHALLENGE PHASE */
                    <div className="flex-1 flex flex-col min-w-0">
                        {/* Header - visible on desktop, simplified on mobile */}
                        <header className="glass-dark px-4 py-2.5 flex items-center justify-between shrink-0 border-b border-white/5">
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setIsLessonPhase(true)}
                                    className="text-xs text-slate-500 hover:text-accent-purple transition-colors flex items-center gap-1 min-h-[44px] md:min-h-0"
                                >
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                    <span className="hidden md:inline">Back to Lesson</span>
                                    <span className="md:hidden">Lesson</span>
                                </button>
                                <span className="text-white/20 hidden md:inline">|</span>
                                <span className="text-xs font-medium text-accent-cyan px-2 py-1 bg-accent-cyan/10 rounded border border-accent-cyan/20 hidden md:inline">
                                    {currentChallenge.category}
                                </span>
                                <h1 className="text-sm md:text-base font-semibold text-white truncate max-w-[150px] md:max-w-none">
                                    {currentChallenge.title}
                                </h1>
                                <span className={`text-xs font-medium px-2 py-0.5 rounded hidden md:inline ${currentChallenge.difficulty === 'Beginner' ? 'bg-accent-green/10 text-accent-green border border-accent-green/20' :
                                    currentChallenge.difficulty === 'Easy' ? 'bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20' :
                                        currentChallenge.difficulty === 'Medium' ? 'bg-accent-amber/10 text-accent-amber border border-accent-amber/20' :
                                            'bg-red-500/10 text-red-400 border border-red-500/20'
                                    }`}>
                                    {currentChallenge.difficulty}
                                </span>
                            </div>
                            <div className="text-sm text-slate-400 font-mono">
                                {currentChallengeIndex + 1} / {filteredChallenges.length}
                            </div>
                        </header>

                        {/* DESKTOP: 3-Column Layout */}
                        <main className="hidden md:grid flex-1 grid-cols-3 overflow-hidden">
                            <ProblemCard
                                challenge={currentChallenge}
                                currentIndex={currentChallengeIndex}
                                totalChallenges={filteredChallenges.length}
                                onPrevious={handlePrevious}
                                onNext={handleNext}
                                failedAttempts={failedAttempts}
                                showSolution={showSolution}
                                onRevealSolution={() => setShowSolution(true)}
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
                            />

                            <Console results={results} hasRun={hasRun} />
                        </main>

                        {/* MOBILE: Tabbed Content */}
                        <main className="md:hidden flex-1 overflow-hidden pb-16">
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
                                    />
                                </div>
                            )}

                            {activeMobileTab === 'run' && (
                                <div className="h-full overflow-y-auto scrollbar-hide">
                                    <Console results={results} hasRun={hasRun} />
                                </div>
                            )}
                        </main>

                        {/* Mobile Tab Bar */}
                        <MobileTabBar
                            activeTab={activeMobileTab}
                            onTabChange={setActiveMobileTab}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
