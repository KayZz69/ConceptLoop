import { useState, useEffect, useRef } from 'react';
import { Challenge, TheoryStep } from '../data/challenges';

interface LessonViewProps {
    challenge: Challenge;
    onLessonComplete: () => void;
    currentIndex: number;
    totalChallenges: number;
    theme?: 'dark' | 'light';
    itemType: 'lesson' | 'challenge' | 'exam';
}

export function LessonView({
    challenge,
    onLessonComplete,
    currentIndex,
    totalChallenges,
    theme = 'dark',
    itemType
}: LessonViewProps) {
    const [stepIndex, setStepIndex] = useState(0);
    const [stepStates, setStepStates] = useState<Record<number, { hasRun: boolean; output: string | null }>>({});
    const [isRunning, setIsRunning] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
    // Track previous step index to detect when user advances to a new step.
    // This prevents auto-scroll on initial render or challenge reset, ensuring
    // scroll only triggers when genuinely moving forward in the lesson.
    const prevStepIndexRef = useRef(0);

    const steps = challenge.theorySteps || [];
    const totalSteps = steps.length;
    const isLastStep = stepIndex === totalSteps - 1;
    const isLessonOnly = itemType === 'lesson';

    // Reset when challenge changes
    useEffect(() => {
        setStepIndex(0);
        setStepStates({});
        prevStepIndexRef.current = 0;
    }, [challenge.id]);

    // Auto-scroll ONLY when a new step is revealed (stepIndex increases)
    useEffect(() => {
        // Only scroll if stepIndex actually increased (not on initial render or reset)
        if (stepIndex > prevStepIndexRef.current) {
            const currentStepRef = stepRefs.current[stepIndex];
            if (currentStepRef && containerRef.current) {
                setTimeout(() => {
                    currentStepRef.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 150);
            }
        }
        prevStepIndexRef.current = stepIndex;
    }, [stepIndex]);

    // Check if current step can continue
    const currentStep = steps[stepIndex];
    const needsRunCode = currentStep?.runnable && currentStep?.codeExample;
    const hasRunCurrent = stepStates[stepIndex]?.hasRun || false;
    const canContinue = needsRunCode ? hasRunCurrent : true;

    const handleRunCode = (code: string, idx: number) => {
        setIsRunning(idx);
        const logs: string[] = [];
        const originalLog = console.log;
        console.log = (...args) => {
            logs.push(args.map(arg =>
                typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
            ).join(' '));
        };

        setTimeout(() => {
            try {
                // eslint-disable-next-line no-eval
                eval(code);
                const output = logs.join('\n') || '(no output)';
                setStepStates(prev => ({ ...prev, [idx]: { hasRun: true, output } }));
            } catch (error) {
                setStepStates(prev => ({ ...prev, [idx]: { hasRun: true, output: `Error: ${(error as Error).message}` } }));
            } finally {
                console.log = originalLog;
                setIsRunning(null);
            }
        }, 200);
    };

    const handleContinue = () => {
        if (!canContinue) return;

        if (isLastStep) {
            onLessonComplete();
        } else {
            setStepIndex(prev => prev + 1);
        }
    };

    const difficultyColors: Record<string, string> = {
        'Beginner': 'text-accent-green',
        'Easy': 'text-accent-cyan',
        'Medium': 'text-accent-amber',
        'Hard': 'text-accent-pink'
    };

    const inactiveProgressClass = theme === 'dark' ? 'bg-dark-600' : 'bg-[var(--color-bg-tertiary)]';

    if (steps.length === 0) {
        onLessonComplete();
        return null;
    }

    // Render all steps from 0 to stepIndex
    const visibleSteps = steps.slice(0, stepIndex + 1);

    return (
        <div className="flex-1 flex flex-col min-h-0">
            {/* Fixed header - responsive padding */}
            <div className={`shrink-0 px-4 md:px-8 py-3 md:py-4 border-b backdrop-blur-sm ${theme === 'dark'
                ? 'border-white/5 bg-[color:var(--color-bg-glass-dark)]'
                : 'border-[color:var(--color-border)] bg-[color:var(--color-bg-glass)]'
                }`}>
                <div className="max-w-3xl mx-auto">
                    <div className="flex items-center justify-between mb-2 md:mb-3">
                        <div className="flex items-center gap-2 md:gap-3">
                            <span className="text-xs text-[color:var(--color-text-muted)]">
                                {challenge.category}
                            </span>
                            <span className={theme === 'dark' ? 'text-white/20' : 'text-[color:var(--color-text-dim)]'}>•</span>
                            <span className={`text-xs ${difficultyColors[challenge.difficulty]} hidden md:inline`}>
                                {challenge.difficulty}
                            </span>
                        </div>
                        <span className="text-xs text-[color:var(--color-text-muted)]">
                            {currentIndex + 1} / {totalChallenges}
                        </span>
                    </div>
                    <h1 className={`text-2xl md:text-3xl font-bold mb-2 md:mb-3 ${theme === 'dark' ? 'text-white' : 'text-slate-900'
                        }`}>
                        {challenge.title}
                    </h1>
                    {/* Progress bar */}
                    <div className="flex items-center gap-1 md:gap-2">
                        {steps.map((_, idx) => (
                            <div
                                key={idx}
                                className={`h-1 flex-1 rounded-full transition-all duration-300 ${idx < stepIndex ? 'bg-accent-green' :
                                    idx === stepIndex ? 'bg-accent-purple' :
                                        inactiveProgressClass
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Scrollable continuous document - flex-1 min-h-0 pattern for mobile flexbox fix */}
            <div
                ref={containerRef}
                className="flex-1 min-h-0 overflow-y-auto px-4 md:px-8 py-6 md:py-12 scrollbar-hide"
            >
                <div className="max-w-3xl mx-auto">
                    {/* Continuous content flow - no card borders */}
                    <div className={`divide-y ${theme === 'dark' ? 'divide-white/5' : 'divide-[color:var(--color-border)]'
                        }`}>
                        {visibleSteps.map((step, idx) => {
                            const isCompleted = idx < stepIndex;
                            const isCurrent = idx === stepIndex;
                            const state = stepStates[idx] || { hasRun: false, output: null };

                            return (
                                <div
                                    key={idx}
                                    ref={el => stepRefs.current[idx] = el}
                                    className={`transition-opacity duration-500 ${isCompleted ? 'opacity-75' : 'opacity-100'
                                        } ${isCurrent ? 'animate-fadeIn' : ''}`}
                                >
                                    <StepCard
                                        step={step}
                                        hasRun={state.hasRun}
                                        output={state.output}
                                        isRunning={isRunning === idx}
                                        onRunCode={() => handleRunCode(step.codeExample!, idx)}
                                        theme={theme}
                                    />
                                </div>
                            );
                        })}
                    </div>

                    {/* Single Continue button at bottom - with safe area bottom for notched devices */}
                    <div className="pt-8 md:pt-12 pb-24 md:pb-32 safe-area-bottom">
                        {/* Hint when blocked by runnable code */}
                        {needsRunCode && !hasRunCurrent && (
                            <p className="text-center text-sm text-accent-amber mb-6 animate-pulse">
                                Run the code above to continue
                            </p>
                        )}

                        <div className="flex justify-center">
                            <button
                                onClick={handleContinue}
                                disabled={!canContinue}
                                className={`px-8 md:px-10 py-3.5 md:py-4 text-base font-semibold rounded-xl transition-all duration-200 flex items-center gap-3 min-h-[44px] ${canContinue
                                    ? 'bg-accent-purple text-white hover:bg-accent-purple/90 shadow-lg shadow-accent-purple/20 hover:shadow-xl hover:shadow-accent-purple/30 hover:-translate-y-0.5'
                                    : theme === 'dark'
                                        ? 'bg-dark-600 text-slate-500 cursor-not-allowed'
                                        : 'bg-[var(--color-bg-tertiary)] text-[color:var(--color-text-dim)] cursor-not-allowed'
                                    }`}
                            >
                                {isLastStep ? (isLessonOnly ? 'Continue' : 'Start Challenge') : 'Continue'}
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Skip lesson link - fixed at bottom, touch-friendly with safe-area for notched devices */}
            <div className={`shrink-0 py-2 md:py-3 text-center border-t safe-area-bottom ${theme === 'dark'
                ? 'border-white/5 bg-[color:var(--color-bg-glass-dark)]'
                : 'border-[color:var(--color-border)] bg-[color:var(--color-bg-glass)]'
                }`}>
                <button
                    onClick={onLessonComplete}
                    className={`text-xs transition-colors py-2 px-4 min-h-[44px] ${theme === 'dark'
                        ? 'text-slate-600 hover:text-slate-400'
                        : 'text-[color:var(--color-text-muted)] hover:text-[color:var(--color-text-secondary)]'
                        }`}
                >
                    {isLessonOnly ? 'Skip lesson' : 'Skip to challenge'}
                </button>
            </div>
        </div>
    );
}


// Individual step content block - no card styling
interface StepCardProps {
    step: TheoryStep;
    hasRun: boolean;
    output: string | null;
    isRunning: boolean;
    onRunCode: () => void;
    theme: 'dark' | 'light';
}

function StepCard({ step, hasRun, output, isRunning, onRunCode, theme }: StepCardProps) {
    return (
        <div className="py-6 md:py-8">
            {/* Step text content - clean, borderless */}
            <p className={`text-[17px] md:text-[18px] leading-relaxed ${theme === 'dark' ? 'text-slate-200' : 'text-[color:var(--color-text-secondary)]'
                }`}>
                {renderText(step.text, theme)}
            </p>

            {/* Code example */}
            {step.codeExample && (
                <div className="mt-4 md:mt-6">
                    <pre className="code-editor rounded-lg md:rounded-xl px-4 md:px-5 py-3 md:py-4 overflow-x-auto font-mono text-[14px] md:text-sm leading-relaxed text-accent-cyan">
                        <code>{step.codeExample}</code>
                    </pre>

                    {step.runnable && (
                        <div className="mt-4 flex justify-center">
                            <button
                                onClick={onRunCode}
                                disabled={isRunning || hasRun}
                                className={`px-5 md:px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-200 flex items-center gap-2 md:gap-3 min-h-[44px] ${hasRun
                                    ? 'bg-accent-green/20 text-accent-green border border-accent-green/30'
                                    : 'bg-accent-amber text-dark-900 hover:bg-accent-amber/90 shadow-lg shadow-accent-amber/20'
                                    }`}
                            >
                                {isRunning ? (
                                    <>
                                        <span className="w-4 h-4 border-2 border-dark-900/40 border-t-dark-900 rounded-full animate-spin" />
                                        Running...
                                    </>
                                ) : hasRun ? (
                                    <>
                                        <span>✓</span>
                                        Done
                                    </>
                                ) : (
                                    <>
                                        <span className="text-lg">▶</span>
                                        Run Code
                                    </>
                                )}
                            </button>
                        </div>
                    )}

                    {/* Console output */}
                    {output && (
                        <div className={`mt-4 rounded-lg md:rounded-xl px-4 md:px-5 py-3 md:py-4 border animate-fadeIn ${theme === 'dark'
                                ? 'bg-dark-900/80 border-accent-cyan/20'
                                : 'bg-[var(--color-bg-secondary)] border-[color:var(--color-border)]'
                            }`}>
                            <div className="text-xs text-[color:var(--color-text-muted)] uppercase tracking-wider mb-2 flex items-center gap-2">
                                <span className="w-2 h-2 bg-accent-cyan rounded-full animate-pulse" />
                                Output
                            </div>
                            <pre className="font-mono text-sm md:text-base text-accent-cyan whitespace-pre-wrap">
                                {output}
                            </pre>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}


// Helper to render text with inline formatting
function renderText(text: string, theme: 'dark' | 'light' = 'dark'): React.ReactNode {
    // Handle newlines
    const lines = text.split('\n');

    return lines.map((line, lineIndex) => (
        <span key={lineIndex}>
            {lineIndex > 0 && <br />}
            {renderLineFormatting(line, `line-${lineIndex}`, theme)}
        </span>
    ));
}

/**
 * Parse markdown-like inline formatting in lesson text.
 * Supports two patterns:
 *   - `code` -> rendered as <code> with cyan styling
 *   - **bold** -> rendered as <strong> with white text
 *
 * Uses a greedy approach: finds earliest match of either pattern,
 * renders it, then continues with remaining text. This ensures
 * proper nesting behavior (e.g., "Use `const` for **variables**").
 */
function renderLineFormatting(text: string, keyPrefix: string, theme: 'dark' | 'light' = 'dark'): React.ReactNode {
    const parts: React.ReactNode[] = [];
    let remaining = text;
    let key = 0;

    while (remaining) {
        const codeMatch = remaining.match(/`([^`]+)`/);
        const boldMatch = remaining.match(/\*\*([^*]+)\*\*/);

        if (codeMatch && (!boldMatch || codeMatch.index! < boldMatch.index!)) {
            if (codeMatch.index! > 0) {
                parts.push(remaining.slice(0, codeMatch.index));
            }
            parts.push(
                <code key={`${keyPrefix}-${key++}`} className="bg-accent-cyan/10 text-accent-cyan px-2 py-1 rounded font-mono text-base">
                    {codeMatch[1]}
                </code>
            );
            remaining = remaining.slice(codeMatch.index! + codeMatch[0].length);
        } else if (boldMatch && (!codeMatch || boldMatch.index! < codeMatch.index!)) {
            if (boldMatch.index! > 0) {
                parts.push(remaining.slice(0, boldMatch.index));
            }
            parts.push(
                <strong key={`${keyPrefix}-${key++}`} className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'
                    }`}>
                    {boldMatch[1]}
                </strong>
            );
            remaining = remaining.slice(boldMatch.index! + boldMatch[0].length);
        } else {
            parts.push(remaining);
            break;
        }
    }

    return parts;
}
