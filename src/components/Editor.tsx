import { useRef, useEffect, useCallback } from 'react';
import MonacoEditor, { OnMount, OnChange } from '@monaco-editor/react';
import type { editor } from 'monaco-editor';

interface EditorProps {
    code: string;
    onChange: (code: string) => void;
    onRun: () => void;
    onReset: () => void;
    onNext: () => void;
    isRunning: boolean;
    allTestsPassed: boolean;
    canGoNext: boolean;
    theme: 'dark' | 'light';
}

export function Editor({
    code,
    onChange,
    onRun,
    onReset,
    onNext,
    isRunning,
    allTestsPassed,
    canGoNext,
    theme
}: EditorProps) {
    const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
    const monacoRef = useRef<typeof import('monaco-editor') | null>(null);

    // Handle editor mount
    const handleEditorDidMount: OnMount = useCallback((editor, monaco) => {
        editorRef.current = editor;
        monacoRef.current = monaco;

        // Add Ctrl+Enter action for running code
        editor.addAction({
            id: 'run-code',
            label: 'Run Code',
            keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter],
            run: () => {
                onRun();
            }
        });

        // Focus the editor
        editor.focus();
    }, [onRun]);

    // Handle code changes
    const handleEditorChange: OnChange = useCallback((value) => {
        if (value !== undefined) {
            onChange(value);
        }
    }, [onChange]);

    // Validate syntax and show error markers
    useEffect(() => {
        if (!editorRef.current || !monacoRef.current) return;

        const model = editorRef.current.getModel();
        if (!model) return;

        try {
            // Try to parse the code to check for syntax errors
            new Function(code);
            // Clear markers if code is valid
            monacoRef.current.editor.setModelMarkers(model, 'syntax', []);
        } catch (error) {
            if (error instanceof SyntaxError) {
                // Extract line and column number from error message/stack
                const match = error.message.match(/line (\d+)/i) ||
                    error.stack?.match(/<anonymous>:(\d+):(\d+)/);

                let lineNumber = 1;
                let column = 1;

                if (match) {
                    lineNumber = parseInt(match[1], 10) - 1; // Adjust for Function wrapper
                    if (match[2]) column = parseInt(match[2], 10);
                }

                // Ensure valid line number
                lineNumber = Math.max(1, Math.min(lineNumber, model.getLineCount()));

                monacoRef.current.editor.setModelMarkers(model, 'syntax', [{
                    startLineNumber: lineNumber,
                    startColumn: column,
                    endLineNumber: lineNumber,
                    endColumn: model.getLineMaxColumn(lineNumber),
                    message: error.message,
                    severity: monacoRef.current.MarkerSeverity.Error
                }]);
            }
        }
    }, [code]);

    // Dynamically switch Monaco editor theme when app theme changes
    useEffect(() => {
        if (monacoRef.current) {
            monacoRef.current.editor.setTheme(theme === 'dark' ? 'vs-dark' : 'light');
        }
    }, [theme]);

    // Calculate line count for footer
    const lineCount = code.split('\n').length;

    return (
        <div className={`h-full flex flex-col border-x ${theme === 'dark'
                ? 'glass border-white/5'
                : 'glass border-[color:var(--color-border)]'
            }`}>
            {/* Editor Header - IDE Style */}
            <div className={`px-3 py-2.5 border-b flex items-center justify-between shrink-0 ${theme === 'dark'
                    ? 'border-white/5 bg-[color:var(--color-bg-glass-light)]'
                    : 'border-[color:var(--color-border)] bg-[color:var(--color-bg-glass)]'
                }`}>
                <div className="flex items-center gap-2">
                    {/* File tab */}
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-t-lg border-t border-x -mb-[1px] relative ${theme === 'dark'
                            ? 'bg-[color:var(--color-bg-glass-light)] border-white/10'
                            : 'bg-[var(--color-bg-primary)] border-[color:var(--color-border)]'
                        }`}>
                        <svg className="w-3.5 h-3.5 text-accent-amber" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                        </svg>
                        <span className={`text-xs font-medium ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                            }`}>solution.js</span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={onReset}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all border border-transparent min-h-[44px] md:min-h-0 ${theme === 'dark'
                                ? 'text-slate-400 hover:text-white hover:bg-dark-500/50 hover:border-white/10'
                                : 'text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-text-primary)] hover:bg-[var(--color-bg-glass-light)] hover:border-[color:var(--color-border)]'
                            }`}
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

            {/* Monaco Editor */}
            <div className={`flex-1 overflow-hidden ${theme === 'dark' ? 'code-editor' : 'bg-[var(--color-bg-primary)] border-y border-[color:var(--color-border)]'
                }`}>
                <MonacoEditor
                    height="100%"
                    language="javascript"
                    theme={theme === 'dark' ? 'vs-dark' : 'light'}
                    value={code}
                    onChange={handleEditorChange}
                    onMount={handleEditorDidMount}
                    options={{
                        fontSize: 15,
                        lineHeight: 22,
                        fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
                        minimap: { enabled: false },
                        scrollBeyondLastLine: false,
                        lineNumbers: 'on',
                        glyphMargin: true,
                        folding: true,
                        automaticLayout: true,
                        tabSize: 2,
                        wordWrap: 'on',
                        padding: { top: 12, bottom: 12 },
                        renderLineHighlight: 'line',
                        cursorBlinking: 'smooth',
                        cursorSmoothCaretAnimation: 'on',
                        smoothScrolling: true,
                        contextmenu: true,
                        quickSuggestions: true,
                        suggestOnTriggerCharacters: true,
                        parameterHints: { enabled: true },
                        bracketPairColorization: { enabled: true },
                        // BEGINNER-FRIENDLY SETTINGS:
                        // Disable auto-closing brackets to prevent confusion
                        // (e.g., typing `{` doesn't auto-insert `}`)
                        autoClosingBrackets: 'never',
                        autoClosingQuotes: 'never',
                        autoClosingOvertype: 'never',
                        // Keep matching bracket highlighting
                        matchBrackets: 'always',
                        // Auto-indent on paste
                        formatOnPaste: true,
                        // Show indent guides to help with structure
                        guides: {
                            indentation: true,
                            bracketPairs: true,
                        },
                    }}
                    loading={
                        <div className={`h-full flex items-center justify-center ${theme === 'dark' ? 'bg-dark-900' : 'bg-[color:var(--color-bg-glass)]'}`}>
                            <div className="flex items-center gap-3 text-slate-400">
                                <span className="w-5 h-5 border-2 border-accent-cyan border-t-transparent rounded-full animate-spin" />
                                Loading editor...
                            </div>
                        </div>
                    }
                />
            </div>

            {/* Editor Footer - Keyboard hints (hidden on mobile) */}
            <div className={`hidden md:flex px-3 py-2 border-t items-center justify-between shrink-0 ${theme === 'dark'
                    ? 'border-white/5 bg-[color:var(--color-bg-glass-light)]'
                    : 'border-[color:var(--color-border)] bg-[color:var(--color-bg-glass)]'
                }`}>
                <span className="text-[10px] flex items-center gap-3 text-[color:var(--color-text-muted)]">
                    <span className="flex items-center gap-1">
                        <kbd className={`px-1.5 py-0.5 rounded text-[10px] border ${theme === 'dark'
                                ? 'bg-dark-600 text-slate-400 border-white/10'
                                : 'bg-[var(--color-bg-glass-light)] text-[color:var(--color-text-secondary)] border-[color:var(--color-border)]'
                            }`}>Tab</kbd>
                        <span>indent</span>
                    </span>
                    <span className="text-[color:var(--color-text-dim)]">•</span>
                    <span className="flex items-center gap-1">
                        <kbd className={`px-1.5 py-0.5 rounded text-[10px] border ${theme === 'dark'
                                ? 'bg-dark-600 text-slate-400 border-white/10'
                                : 'bg-[var(--color-bg-glass-light)] text-[color:var(--color-text-secondary)] border-[color:var(--color-border)]'
                            }`}>Ctrl</kbd>
                        <span>+</span>
                        <kbd className={`px-1.5 py-0.5 rounded text-[10px] border ${theme === 'dark'
                                ? 'bg-dark-600 text-slate-400 border-white/10'
                                : 'bg-[var(--color-bg-glass-light)] text-[color:var(--color-text-secondary)] border-[color:var(--color-border)]'
                            }`}>Enter</kbd>
                        <span>run</span>
                    </span>
                </span>
                <span className="text-[10px] font-mono text-[color:var(--color-text-muted)]">
                    {lineCount} line{lineCount !== 1 ? 's' : ''}
                </span>
            </div>
        </div>
    );
}
