import { useState, useEffect, useRef } from 'react';
import { Challenge, TheoryStep } from '../data/challenges';

interface LessonViewProps {
    challenge: Challenge;
    onLessonComplete: () => void;
    currentIndex: number;
    totalChallenges: number;
}

export function LessonView({ challenge, onLessonComplete, currentIndex, totalChallenges }: LessonViewProps) {
    const [stepIndex, setStepIndex] = useState(0);
    const [stepStates, setStepStates] = useState<Record<number, { hasRun: boolean; output: string | null }>>({});
    const [isRunning, setIsRunning] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

    const steps = challenge.theorySteps || [];
    const totalSteps = steps.length;
    const isLastStep = stepIndex === totalSteps - 1;

    // Reset when challenge changes
    useEffect(() => {
        setStepIndex(0);
        setStepStates({});
    }, [challenge.id]);

    // Auto-scroll to current step when it changes
    useEffect(() => {
        const currentStepRef = stepRefs.current[stepIndex];
        if (currentStepRef) {
            setTimeout(() => {
                currentStepRef.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        }
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

    const handleBack = () => {
        if (stepIndex > 0) {
            setStepIndex(prev => prev - 1);
        }
    };

    const difficultyColors: Record<string, string> = {
        'Beginner': 'text-accent-green',
        'Easy': 'text-accent-cyan',
        'Medium': 'text-accent-amber',
        'Hard': 'text-red-400'
    };

    if (steps.length === 0) {
        onLessonComplete();
        return null;
    }

    // Render all steps from 0 to stepIndex
    const visibleSteps = steps.slice(0, stepIndex + 1);

    return (
        <div className="flex-1 flex flex-col overflow-hidden">
            {/* Fixed header */}
            <div className="shrink-0 px-8 py-4 border-b border-white/5 bg-dark-900/80 backdrop-blur-sm">
                <div className="max-w-2xl mx-auto">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                            <span className="text-xs text-slate-500">
                                {challenge.category}
                            </span>
                            <span className="text-white/20">•</span>
                            <span className={`text-xs ${difficultyColors[challenge.difficulty]}`}>
                                {challenge.difficulty}
                            </span>
                        </div>
                        <span className="text-xs text-slate-500">
                            Challenge {currentIndex + 1} of {totalChallenges}
                        </span>
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-3">
                        {challenge.title}
                    </h1>
                    {/* Progress bar */}
                    <div className="flex items-center gap-2">
                        {steps.map((_, idx) => (
                            <div
                                key={idx}
                                className={`h-1 flex-1 rounded-full transition-all duration-300 ${idx < stepIndex ? 'bg-accent-green' :
                                    idx === stepIndex ? 'bg-accent-purple' :
                                        'bg-dark-600'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Scrollable vertical stack */}
            <div
                ref={containerRef}
                className="flex-1 overflow-y-auto px-8 py-12"
            >
                <div className="max-w-2xl mx-auto space-y-16">
                    {visibleSteps.map((step, idx) => {
                        const isCompleted = idx < stepIndex;
                        const isCurrent = idx === stepIndex;
                        const state = stepStates[idx] || { hasRun: false, output: null };

                        return (
                            <div
                                key={idx}
                                ref={el => stepRefs.current[idx] = el}
                                className={`transition-all duration-500 ${isCompleted ? 'opacity-50 hover:opacity-100' : 'opacity-100'
                                    } ${isCurrent ? 'animate-fadeIn' : ''}`}
                            >
                                <StepCard
                                    step={step}
                                    stepNumber={idx + 1}
                                    totalSteps={totalSteps}
                                    isCurrent={isCurrent}
                                    hasRun={state.hasRun}
                                    output={state.output}
                                    isRunning={isRunning === idx}
                                    onRunCode={() => handleRunCode(step.codeExample!, idx)}
                                />
                            </div>
                        );
                    })}

                    {/* Navigation at bottom */}
                    <div className="pt-8 pb-32">
                        <div className="flex items-center justify-between">
                            <button
                                onClick={handleBack}
                                disabled={stepIndex === 0}
                                className={`px-5 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 flex items-center gap-2 ${stepIndex === 0
                                    ? 'text-slate-600 cursor-not-allowed'
                                    : 'text-slate-400 hover:text-white hover:bg-dark-600/50'
                                    }`}
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                Back
                            </button>

                            <button
                                onClick={handleContinue}
                                disabled={!canContinue}
                                className={`px-8 py-3.5 text-base font-semibold rounded-xl transition-all duration-200 flex items-center gap-3 ${canContinue
                                    ? 'bg-accent-purple text-white hover:bg-accent-purple/90 shadow-lg shadow-accent-purple/20'
                                    : 'bg-dark-600 text-slate-500 cursor-not-allowed'
                                    }`}
                            >
                                {isLastStep ? 'Start Challenge' : 'Continue'}
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>

                        {/* Hint when blocked */}
                        {needsRunCode && !hasRunCurrent && (
                            <p className="text-center text-xs text-accent-amber mt-4 animate-pulse">
                                👆 Run the code above to continue
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Skip lesson link - fixed at bottom */}
            <div className="shrink-0 py-3 text-center border-t border-white/5 bg-dark-900/80">
                <button
                    onClick={onLessonComplete}
                    className="text-xs text-slate-600 hover:text-slate-400 transition-colors"
                >
                    Skip to challenge →
                </button>
            </div>
        </div>
    );
}

// Individual step card component
interface StepCardProps {
    step: TheoryStep;
    stepNumber: number;
    totalSteps: number;
    isCurrent: boolean;
    hasRun: boolean;
    output: string | null;
    isRunning: boolean;
    onRunCode: () => void;
}

function StepCard({ step, stepNumber, totalSteps, isCurrent, hasRun, output, isRunning, onRunCode }: StepCardProps) {
    return (
        <div className={`glass rounded-2xl overflow-hidden transition-all duration-300 ${isCurrent ? 'ring-2 ring-accent-purple/50' : ''
            }`}>
            {/* Step header */}
            <div className="px-6 py-4 bg-gradient-to-r from-accent-purple/10 to-transparent border-b border-white/5">
                <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${hasRun || !step.runnable ? 'bg-accent-green/20 text-accent-green' : 'bg-accent-purple/20 text-accent-purple'
                        }`}>
                        {hasRun || !step.runnable ? '✓' : stepNumber}
                    </div>
                    <span className="text-xs text-slate-500">
                        Step {stepNumber} of {totalSteps}
                    </span>
                </div>
            </div>

            {/* Step content */}
            <div className="px-6 py-6">
                <p className="text-lg text-slate-200 leading-relaxed">
                    {renderText(step.text)}
                </p>

                {/* Code example */}
                {step.codeExample && (
                    <div className="mt-6">
                        <pre className="code-editor rounded-xl px-5 py-4 overflow-x-auto font-mono text-sm leading-relaxed text-accent-cyan">
                            <code>{step.codeExample}</code>
                        </pre>

                        {step.runnable && (
                            <div className="mt-4 flex justify-center">
                                <button
                                    onClick={onRunCode}
                                    disabled={isRunning || hasRun}
                                    className={`px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-200 flex items-center gap-3 ${hasRun
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

                        {/* Console output - show actual values */}
                        {output && (
                            <div className="mt-4 bg-dark-900/80 rounded-xl px-5 py-4 border border-accent-cyan/20 animate-fadeIn">
                                <div className="text-xs text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-accent-cyan rounded-full animate-pulse" />
                                    Output
                                </div>
                                <pre className="font-mono text-base text-accent-cyan whitespace-pre-wrap">
                                    {output}
                                </pre>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

// Helper to render text with inline formatting
function renderText(text: string): React.ReactNode {
    // Handle newlines
    const lines = text.split('\n');

    return lines.map((line, lineIndex) => (
        <span key={lineIndex}>
            {lineIndex > 0 && <br />}
            {renderLineFormatting(line, `line-${lineIndex}`)}
        </span>
    ));
}

function renderLineFormatting(text: string, keyPrefix: string): React.ReactNode {
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
                <strong key={`${keyPrefix}-${key++}`} className="font-bold text-white">
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
