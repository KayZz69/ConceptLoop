import { useRef } from 'react';

interface EditorProps {
    code: string;
    onChange: (code: string) => void;
    onRun: () => void;
    onReset: () => void;
    onNext: () => void;
    isRunning: boolean;
    allTestsPassed: boolean;
    canGoNext: boolean;
}

export function Editor({
    code,
    onChange,
    onRun,
    onReset,
    onNext,
    isRunning,
    allTestsPassed,
    canGoNext
}: EditorProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Handle tab key for indentation
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            const target = e.target as HTMLTextAreaElement;
            const start = target.selectionStart;
            const end = target.selectionEnd;

            const newValue = code.substring(0, start) + '  ' + code.substring(end);
            onChange(newValue);

            setTimeout(() => {
                if (textareaRef.current) {
                    textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 2;
                }
            }, 0);
        }
    };

    // Calculate line numbers
    const lineCount = code.split('\n').length;
    const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1);

    return (
        <div className="h-full flex flex-col glass border-x border-white/5">
            {/* Editor Header - IDE Style */}
            <div className="px-3 py-2.5 border-b border-white/5 bg-dark-800/60 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                    {/* File tab */}
                    <div className="flex items-center gap-2 bg-dark-700/80 px-3 py-1.5 rounded-t-lg border-t border-x border-white/10 -mb-[1px] relative">
                        <svg className="w-3.5 h-3.5 text-accent-amber" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                        </svg>
                        <span className="text-xs font-medium text-slate-300">solution.js</span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={onReset}
                        className="px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-white 
                       hover:bg-dark-500/50 rounded-lg transition-all border border-transparent hover:border-white/10 min-h-[44px] md:min-h-0"
                    >
                        Reset
                    </button>

                    <button
                        onClick={onRun}
                        disabled={isRunning}
                        className="btn-primary px-4 py-1.5 text-xs rounded-lg min-h-[44px] md:min-h-0
                       disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                       flex items-center gap-2"
                    >
                        {isRunning ? (
                            <>
                                <span className="w-3 h-3 border-2 border-dark-900 border-t-transparent rounded-full animate-spin" />
                                Running...
                            </>
                        ) : (
                            <>
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                                Run Code
                            </>
                        )}
                    </button>

                    {/* Next Challenge Button - Appears on Success */}
                    {allTestsPassed && canGoNext && (
                        <button
                            onClick={onNext}
                            className="btn-success px-4 py-1.5 text-xs rounded-lg
                         flex items-center gap-2 animate-pulse-glow"
                        >
                            Next Challenge
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </button>
                    )}
                </div>
            </div>

            {/* Editor Body - IDE Style */}
            <div className="flex-1 flex overflow-hidden code-editor">
                {/* Line Numbers */}
                <div className="line-numbers w-12 py-3 select-none shrink-0">
                    <div className="text-right pr-3 font-mono text-xs text-slate-600 leading-6">
                        {lineNumbers.map(num => (
                            <div key={num}>{num}</div>
                        ))}
                    </div>
                </div>

                {/* Code Area */}
                <textarea
                    ref={textareaRef}
                    value={code}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    spellCheck={false}
                    className="flex-1 p-3 font-mono text-sm leading-6 text-slate-200 bg-transparent
                     resize-none outline-none border-none
                     focus:ring-0 placeholder:text-slate-600"
                    style={{ fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace" }}
                    placeholder="// Write your solution here..."
                />
            </div>

            {/* Editor Footer - Keyboard hints (hidden on mobile) */}
            <div className="hidden md:flex px-3 py-2 border-t border-white/5 bg-dark-800/60 items-center justify-between shrink-0">
                <span className="text-[10px] text-slate-500 flex items-center gap-3">
                    <span className="flex items-center gap-1">
                        <kbd className="px-1.5 py-0.5 bg-dark-600 rounded text-[10px] text-slate-400 border border-white/10">Tab</kbd>
                        <span>indent</span>
                    </span>
                    <span className="text-slate-700">•</span>
                    <span className="flex items-center gap-1">
                        <kbd className="px-1.5 py-0.5 bg-dark-600 rounded text-[10px] text-slate-400 border border-white/10">Ctrl</kbd>
                        <span>+</span>
                        <kbd className="px-1.5 py-0.5 bg-dark-600 rounded text-[10px] text-slate-400 border border-white/10">Enter</kbd>
                        <span>run</span>
                    </span>
                </span>
                <span className="text-[10px] text-slate-500 font-mono">
                    {lineCount} line{lineCount !== 1 ? 's' : ''}
                </span>
            </div>
        </div>
    );
}
