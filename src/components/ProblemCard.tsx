import { useState } from 'react';
import { Challenge, TheoryStep } from '../data/challenges';

interface ProblemCardProps {
    challenge: Challenge;
    currentIndex: number;
    totalChallenges: number;
    onPrevious: () => void;
    onNext: () => void;
    failedAttempts: number;
    showSolution: boolean;
    onRevealSolution: () => void;
    theme?: 'dark' | 'light';
}

type TabType = 'task' | 'lesson';

export function ProblemCard({
    challenge,
    currentIndex,
    totalChallenges,
    onPrevious,
    onNext,
    failedAttempts,
    showSolution,
    onRevealSolution,
    theme = 'dark'
}: ProblemCardProps) {
    const [activeTab, setActiveTab] = useState<TabType>('task');
    const typeLabel = challenge.type === 'lesson' ? 'Lesson' : challenge.type === 'exam' ? 'Exam' : 'Challenge';

    const difficultyColors: Record<string, string> = {
        'Beginner': 'bg-accent-green/20 text-accent-green border border-accent-green/40',
        'Easy': 'bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/40',
        'Medium': 'bg-accent-amber/20 text-accent-amber border border-accent-amber/40',
        'Hard': 'bg-accent-pink/20 text-accent-pink border border-accent-pink/40'
    };

    return (
        <div className={`h-full flex flex-col border-r overflow-hidden ${theme === 'dark'
                ? 'glass-dark border-white/5'
                : 'glass border-[color:var(--color-border)]'
            }`}>
            {/* Header with Title */}
            <div className={`shrink-0 px-4 py-3 border-b ${theme === 'dark'
                    ? 'border-white/5 bg-[color:var(--color-bg-glass-light)]'
                    : 'border-[color:var(--color-border)] bg-[var(--color-bg-secondary)]'
                }`}>
                <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-medium text-[color:var(--color-text-muted)] uppercase tracking-wider">
                        {typeLabel} {currentIndex + 1} of {totalChallenges}
                    </span>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded ${difficultyColors[challenge.difficulty]}`}>
                        {challenge.difficulty}
                    </span>
                </div>
                <h1 className={`text-xl md:text-[22px] font-semibold leading-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'
                    }`}>
                    {challenge.title}
                </h1>
            </div>

            {/* Tab Navigation */}
            <div className={`shrink-0 flex border-b ${theme === 'dark' ? 'border-white/5' : 'border-[color:var(--color-border)]'}`}>
                <button
                    onClick={() => setActiveTab('task')}
                    className={`flex-1 px-4 py-2.5 text-xs font-medium transition-all relative ${activeTab === 'task'
                        ? 'text-accent-cyan'
                        : theme === 'dark' ? 'text-slate-500 hover:text-slate-300' : 'text-[color:var(--color-text-muted)] hover:text-[color:var(--color-text-primary)]'
                        }`}
                >
                    📋 Task
                    {activeTab === 'task' && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-cyan" />
                    )}
                </button>
                <button
                    onClick={() => setActiveTab('lesson')}
                    className={`flex-1 px-4 py-2.5 text-xs font-medium transition-all relative ${activeTab === 'lesson'
                        ? 'text-accent-purple'
                        : theme === 'dark' ? 'text-slate-500 hover:text-slate-300' : 'text-[color:var(--color-text-muted)] hover:text-[color:var(--color-text-primary)]'
                        }`}
                >
                    📖 Lesson Review
                    {activeTab === 'lesson' && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-purple" />
                    )}
                </button>
            </div>

            {/* Tab Content */}
            <div className="flex-1 min-h-0 overflow-y-auto">
                {activeTab === 'task' ? (
                    <TaskTab
                        challenge={challenge}
                        failedAttempts={failedAttempts}
                        showSolution={showSolution}
                        onRevealSolution={onRevealSolution}
                        onSwitchToLesson={() => setActiveTab('lesson')}
                        theme={theme}
                    />
                ) : (
                    <LessonReviewTab steps={challenge.theorySteps || []} theme={theme} />
                )}
            </div>

            {/* Navigation Footer */}
            <div className={`shrink-0 px-4 py-2.5 border-t flex justify-between ${theme === 'dark'
                    ? 'border-white/5 bg-[color:var(--color-bg-glass-light)]'
                    : 'border-[color:var(--color-border)] bg-[var(--color-bg-secondary)]'
                }`}>
                <button
                    onClick={onPrevious}
                    disabled={currentIndex === 0}
                    className={`px-3 py-1.5 text-xs font-medium transition-colors flex items-center gap-1 
                     disabled:opacity-30 disabled:cursor-not-allowed ${theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-[color:var(--color-text-muted)] hover:text-[color:var(--color-text-primary)]'}`}
                >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Previous
                </button>
                <button
                    onClick={onNext}
                    disabled={currentIndex === totalChallenges - 1}
                    className={`px-3 py-1.5 text-xs font-medium transition-colors flex items-center gap-1 
                     disabled:opacity-30 disabled:cursor-not-allowed ${theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-[color:var(--color-text-muted)] hover:text-[color:var(--color-text-primary)]'}`}
                >
                    Next
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

// Task Tab Component
interface TaskTabProps {
    challenge: Challenge;
    failedAttempts: number;
    showSolution: boolean;
    onRevealSolution: () => void;
    onSwitchToLesson: () => void;
    theme: 'dark' | 'light';
}

function TaskTab({ challenge, failedAttempts, showSolution, onRevealSolution, onSwitchToLesson, theme }: TaskTabProps) {
    return (
        <div className="animate-fadeIn">
            {/* YOUR TASK */}
            <div className={`px-4 py-4 border-b ${theme === 'dark' ? 'border-white/5' : 'border-[color:var(--color-border)]'}`}>
                <h2 className="text-[10px] font-bold text-accent-cyan uppercase tracking-wider mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-accent-cyan rounded-full animate-pulse"></span>
                    Your Task
                </h2>
                <p className={`text-[15px] leading-relaxed ${theme === 'dark' ? 'text-slate-200' : 'text-slate-700'}`}>
                    {challenge.description}
                </p>

                {/* Examples */}
                <div className="mt-4 space-y-2">
                    {challenge.examples.map((example, index) => (
                        <div
                            key={index}
                            className="glass rounded-lg px-3 py-2.5 font-mono text-xs text-accent-cyan"
                        >
                            {example}
                        </div>
                    ))}
                </div>

                {/* Hint */}
                <div className="mt-4 bg-accent-amber/5 border-l-2 border-accent-amber/50 px-3 py-2.5 rounded-r-lg">
                    <div className="flex items-start gap-2">
                        <span className="text-accent-amber text-sm">💡</span>
                        <p className="text-xs text-accent-amber/80">{challenge.hint}</p>
                    </div>
                </div>

                {/* "Stuck?" link */}
                <div className="mt-4 text-center">
                    <button
                        onClick={onSwitchToLesson}
                        className={`text-xs transition-colors ${theme === 'dark' ? 'text-slate-500 hover:text-accent-purple' : 'text-[color:var(--color-text-muted)] hover:text-accent-purple'}`}
                    >
                        Need a refresher? <span className="underline">Review the lesson</span> →
                    </button>
                </div>
            </div>

            {/* SOLUTION - Shows after user clicks reveal */}
            {challenge.solution && showSolution && (
                <div className={`border-b px-4 py-4 animate-fadeIn ${theme === 'dark' ? 'border-white/5' : 'border-[color:var(--color-border)]'}`}>
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-accent-green text-sm">✅</span>
                        <span className="text-[10px] font-bold text-accent-green uppercase tracking-wider">
                            Solution
                        </span>
                    </div>
                    <pre className="code-editor rounded-lg px-4 py-3 overflow-x-auto font-mono text-xs leading-relaxed text-accent-cyan">
                        <code>{challenge.solution}</code>
                    </pre>
                    <p className={`text-[10px] mt-2 italic ${theme === 'dark' ? 'text-slate-500' : 'text-[color:var(--color-text-muted)]'}`}>
                        💡 Study the solution and try to understand why it works.
                    </p>
                </div>
            )}

            {/* Reveal Solution Button */}
            {challenge.solution && failedAttempts >= 3 && !showSolution && (
                <div className={`border-b px-4 py-3 ${theme === 'dark' ? 'border-white/5' : 'border-[color:var(--color-border)]'}`}>
                    <button
                        onClick={onRevealSolution}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-accent-purple/10 text-accent-purple 
                           border border-accent-purple/30 rounded-lg text-xs font-medium hover:bg-accent-purple/20 transition-colors"
                    >
                        <span>🔓</span>
                        Show Solution
                    </button>
                    <p className={`text-[10px] text-center mt-2 ${theme === 'dark' ? 'text-slate-500' : 'text-[color:var(--color-text-muted)]'}`}>
                        Stuck? It's okay to learn from the solution.
                    </p>
                </div>
            )}
        </div>
    );
}

// Lesson Review Tab - Renders all steps as scrollable reference
interface LessonReviewTabProps {
    steps: TheoryStep[];
    theme: 'dark' | 'light';
}

function LessonReviewTab({ steps, theme }: LessonReviewTabProps) {
    if (steps.length === 0) {
        return (
            <div className="px-4 py-8 text-center">
                <p className={`text-sm ${theme === 'dark' ? 'text-slate-500' : 'text-[color:var(--color-text-muted)]'}`}>No lesson content available.</p>
            </div>
        );
    }

    return (
        <div className="px-4 py-4 space-y-6 animate-fadeIn">
            <div className={`text-[10px] font-medium uppercase tracking-wider mb-4 ${theme === 'dark' ? 'text-slate-500' : 'text-[color:var(--color-text-muted)]'}`}>
                📚 Quick Reference
            </div>

            {steps.map((step, idx) => (
                <div key={idx} className="border-l-2 border-accent-purple/30 pl-3">
                    {/* Step number badge */}
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-medium text-accent-purple bg-accent-purple/10 px-1.5 py-0.5 rounded">
                            {idx + 1}
                        </span>
                    </div>

                    {/* Step text - smaller for reference */}
                    <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-[color:var(--color-text-muted)]'}`}>
                        {renderInlineText(step.text, theme)}
                    </p>

                    {/* Code example if present */}
                    {step.codeExample && (
                        <pre className="mt-2 code-editor rounded-lg px-3 py-2 overflow-x-auto font-mono text-[11px] leading-relaxed text-accent-cyan/80">
                            <code>{step.codeExample}</code>
                        </pre>
                    )}
                </div>
            ))}
        </div>
    );
}

// Helper to render inline formatting (bold, code)
function renderInlineText(text: string, theme: 'dark' | 'light' = 'dark'): React.ReactNode {
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
                <code key={key++} className="bg-accent-cyan/10 text-accent-cyan px-1 py-0.5 rounded font-mono text-[11px]">
                    {codeMatch[1]}
                </code>
            );
            remaining = remaining.slice(codeMatch.index! + codeMatch[0].length);
        } else if (boldMatch && (!codeMatch || boldMatch.index! < codeMatch.index!)) {
            if (boldMatch.index! > 0) {
                parts.push(remaining.slice(0, boldMatch.index));
            }
            parts.push(
                <strong key={key++} className={`font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-800'}`}>
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
