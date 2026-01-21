import { TestResult, formatValue } from '../utils/runCode';

interface ConsoleProps {
    results: TestResult[];
    hasRun: boolean;
    theme?: 'dark' | 'light';
}

export function Console({ results, hasRun, theme = 'dark' }: ConsoleProps) {
    const passedCount = results.filter(r => r.passed).length;
    const totalCount = results.length;
    const allPassed = passedCount === totalCount && totalCount > 0;

    return (
        <div className={`h-full flex flex-col ${theme === 'dark' ? 'glass-dark' : 'glass border-[color:var(--color-border)]'
            }`}>
            {/* Header */}
            <div className={`px-4 py-3 border-b flex items-center justify-between ${theme === 'dark'
                ? 'border-white/5 bg-[color:var(--color-bg-glass-light)]'
                : 'border-[color:var(--color-border)] bg-[var(--color-bg-secondary)]'
                }`}>
                <span className="text-xs font-medium text-[color:var(--color-text-muted)] flex items-center gap-2">
                    <svg
                        className="w-4 h-4 text-accent-purple"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    Test Results
                </span>
                {hasRun && (
                    <span
                        className={`text-xs font-bold font-mono ${allPassed ? 'text-accent-green' : 'text-accent-pink'}`}
                    >
                        {passedCount}/{totalCount} Passed
                    </span>
                )}
            </div>

            {/* Results */}
            <div className="flex-1 overflow-y-auto p-4">
                {!hasRun ? (
                    <div className="h-full flex items-center justify-center">
                        <div className="text-center text-[color:var(--color-text-muted)]">
                            <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-dark-600/50' : 'bg-[var(--color-bg-glass-light)]'
                                }`}>
                                <svg
                                    className="w-8 h-8 text-accent-purple/50"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <p className="text-sm font-medium text-[color:var(--color-text-secondary)] mb-1">Ready to test your code</p>
                        <p className="text-xs text-[color:var(--color-text-muted)]">Click "Run Code" when you're ready</p>
                        </div>
                    </div>
                ) : allPassed ? (
                    <div className="mb-6 p-5 success-banner rounded-xl animate-fadeIn">
                        <div className="flex items-center gap-3 text-accent-green font-semibold text-lg mb-2">
                            <span className="text-2xl">🎉</span>
                            All Tests Passed!
                        </div>
                        <p className="text-sm text-accent-green/80">
                            Excellent work! You've mastered this concept. Ready for the next challenge?
                        </p>
                    </div>
                ) : (
                    <div className={`mb-4 p-4 rounded-xl animate-fadeIn ${theme === 'dark' ? 'glass' : 'bg-[var(--color-bg-secondary)] border border-[color:var(--color-border)]'
                        }`}>
                        <div className={`flex items-center gap-2 font-medium mb-1 ${theme === 'dark' ? 'text-slate-300' : 'text-[color:var(--color-text-secondary)]'}`}>
                            <span className="text-lg">🤔</span>
                            Not quite right yet...
                        </div>
                        <p className="text-xs text-[color:var(--color-text-muted)]">
                            Don't worry! Check the feedback below and try again. Learning takes practice.
                        </p>
                    </div>
                )}

                <div className="space-y-3">
                    {results.map((result, index) => (
                        <TestResultCard key={index} result={result} index={index} theme={theme} />
                    ))}
                </div>
            </div>
        </div>
    );
}

interface TestResultCardProps {
    result: TestResult;
    index: number;
    theme: 'dark' | 'light';
}

function TestResultCard({ result, index, theme }: TestResultCardProps) {
    return (
        <div
            className={`p-4 rounded-xl animate-slideIn ${result.passed
                ? 'test-passed'
                : 'test-failed'
                }`}
            style={{ animationDelay: `${index * 100}ms` }}
        >
            {/* Test Header */}
            <div className="flex items-center gap-2 mb-2">
                {result.passed ? (
                    <div className="w-5 h-5 rounded-full bg-accent-green/20 flex items-center justify-center">
                        <svg className="w-3 h-3 text-accent-green" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                        </svg>
                    </div>
                ) : (
                    <div className="w-5 h-5 rounded-full bg-accent-pink/20 flex items-center justify-center">
                        <svg className="w-3 h-3 text-accent-pink" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                        </svg>
                    </div>
                )}
                <span
                    className={`text-sm font-medium ${result.passed ? 'text-accent-green' : 'text-accent-pink'}`}
                >
                    Test {index + 1}: {result.passed ? 'Passed' : 'Failed'}
                </span>
            </div>

            {/* Test Description */}
            {result.description && (
                <p className={`text-xs mb-2 ${result.passed ? 'text-accent-green/70' : 'text-accent-pink/70'}`}>
                    {result.description}
                </p>
            )}

            {/* Error Message */}
            {result.error && (
                <div className="bg-accent-pink/10 border border-accent-pink/30 rounded-lg px-3 py-2 mb-3">
                    <p className="text-xs font-mono text-accent-pink">Error: {result.error}</p>
                </div>
            )}

            {/* Helpful Suggestion */}
            {result.suggestion && (
                <div className="bg-accent-amber/5 border border-accent-amber/20 rounded-lg px-3 py-2 mb-3">
                    <p className="text-sm text-accent-amber/80">{result.suggestion}</p>
                </div>
            )}

            {/* Console Logs */}
            {result.consoleLogs && result.consoleLogs.length > 0 && (
                <div className={`rounded-lg px-3 py-2 mb-3 ${theme === 'dark' ? 'bg-dark-800/80 border border-white/10' : 'bg-[color:var(--color-bg-glass-light)] border border-[color:var(--color-border)]'}`}>
                    <div className="text-[10px] font-medium text-[color:var(--color-text-muted)] uppercase tracking-wider mb-1.5">Console Output</div>
                    {result.consoleLogs.map((log, i) => (
                        <div key={i} className="font-mono text-xs text-accent-purple">
                            <span className="text-[color:var(--color-text-dim)] mr-2">›</span>{log}
                        </div>
                    ))}
                </div>
            )}

            {/* Expected vs Received */}
            <div className={`space-y-1 font-mono text-xs mt-3 p-3 rounded-lg ${theme === 'dark' ? 'bg-dark-900/50' : 'bg-[var(--color-bg-secondary)] border border-[color:var(--color-border-light)]'
                }`}>
                <div className="flex">
                    <span className="text-[color:var(--color-text-muted)] w-20">Expected:</span>
                    <span className={result.passed ? 'text-accent-green' : theme === 'dark' ? 'text-slate-300' : 'text-[color:var(--color-text-secondary)]'}>
                        {formatValue(result.expected)}
                    </span>
                </div>
                <div className="flex">
                    <span className="text-[color:var(--color-text-muted)] w-20">Received:</span>
                    <span className={result.passed ? 'text-accent-green' : 'text-accent-pink'}>
                        {formatValue(result.received)}
                    </span>
                </div>
            </div>
        </div>
    );
}
