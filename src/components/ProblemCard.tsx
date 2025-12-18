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
    onRevealSolution
}: ProblemCardProps) {
    const [activeTab, setActiveTab] = useState<TabType>('task');

    const difficultyColors: Record<string, string> = {
        'Beginner': 'bg-accent-green/10 text-accent-green border border-accent-green/20',
        'Easy': 'bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20',
        'Medium': 'bg-accent-amber/10 text-accent-amber border border-accent-amber/20',
        'Hard': 'bg-red-500/10 text-red-400 border border-red-500/20'
    };

    return (
        <div className="h-full flex flex-col glass-dark border-r border-white/5 overflow-hidden">
            {/* Header with Title */}
            <div className="shrink-0 px-4 py-3 border-b border-white/5 bg-dark-800/50">
                <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">
                        Challenge {currentIndex + 1} of {totalChallenges}
                    </span>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded ${difficultyColors[challenge.difficulty]}`}>
                        {challenge.difficulty}
                    </span>
                </div>
                <h1 className="text-lg font-semibold text-white leading-tight">
                    {challenge.title}
                </h1>
            </div>

            {/* Tab Navigation */}
            <div className="shrink-0 flex border-b border-white/5">
                <button
                    onClick={() => setActiveTab('task')}
                    className={`flex-1 px-4 py-2.5 text-xs font-medium transition-all relative ${activeTab === 'task'
                            ? 'text-accent-cyan'
                            : 'text-slate-500 hover:text-slate-300'
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
                            : 'text-slate-500 hover:text-slate-300'
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
                    />
                ) : (
                    <LessonReviewTab steps={challenge.theorySteps || []} />
                )}
            </div>

            {/* Navigation Footer */}
            <div className="shrink-0 px-4 py-2.5 border-t border-white/5 bg-dark-800/50 flex justify-between">
                <button
                    onClick={onPrevious}
                    disabled={currentIndex === 0}
                    className="px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-white 
                     disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
                >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Previous
                </button>
                <button
                    onClick={onNext}
                    disabled={currentIndex === totalChallenges - 1}
                    className="px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-white 
                     disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
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
}

function TaskTab({ challenge, failedAttempts, showSolution, onRevealSolution, onSwitchToLesson }: TaskTabProps) {
    return (
        <div className="animate-fadeIn">
            {/* YOUR TASK */}
            <div className="px-4 py-4 border-b border-white/5">
                <h2 className="text-[10px] font-bold text-accent-cyan uppercase tracking-wider mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-accent-cyan rounded-full animate-pulse"></span>
                    Your Task
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed">
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
                        className="text-xs text-slate-500 hover:text-accent-purple transition-colors"
                    >
                        Need a refresher? <span className="underline">Review the lesson</span> →
                    </button>
                </div>
            </div>

            {/* SOLUTION - Shows after 3 failed attempts */}
            {challenge.solution && (failedAttempts >= 3 || showSolution) && (
                <div className="border-b border-white/5 px-4 py-4 animate-fadeIn">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-accent-green text-sm">✅</span>
                        <span className="text-[10px] font-bold text-accent-green uppercase tracking-wider">
                            Solution
                        </span>
                    </div>
                    <pre className="code-editor rounded-lg px-4 py-3 overflow-x-auto font-mono text-xs leading-relaxed text-accent-cyan">
                        <code>{challenge.solution}</code>
                    </pre>
                    <p className="text-[10px] text-slate-500 mt-2 italic">
                        💡 Study the solution and try to understand why it works.
                    </p>
                </div>
            )}

            {/* Reveal Solution Button */}
            {challenge.solution && failedAttempts >= 3 && !showSolution && (
                <div className="border-b border-white/5 px-4 py-3">
                    <button
                        onClick={onRevealSolution}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-accent-purple/10 text-accent-purple 
                           border border-accent-purple/30 rounded-lg text-xs font-medium hover:bg-accent-purple/20 transition-colors"
                    >
                        <span>🔓</span>
                        Show Solution
                    </button>
                    <p className="text-[10px] text-slate-500 text-center mt-2">
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
}

function LessonReviewTab({ steps }: LessonReviewTabProps) {
    if (steps.length === 0) {
        return (
            <div className="px-4 py-8 text-center">
                <p className="text-sm text-slate-500">No lesson content available.</p>
            </div>
        );
    }

    return (
        <div className="px-4 py-4 space-y-6 animate-fadeIn">
            <div className="text-[10px] font-medium text-slate-500 uppercase tracking-wider mb-4">
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
                    <p className="text-xs text-slate-400 leading-relaxed">
                        {renderInlineText(step.text)}
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
function renderInlineText(text: string): React.ReactNode {
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
                <strong key={key++} className="font-semibold text-slate-300">
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
