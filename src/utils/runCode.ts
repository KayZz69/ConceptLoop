// Safe code execution utility with enhanced educational feedback

import { TestCase } from '../data/challenges';

/**
 * Strip ANSI escape codes from strings (colors, formatting, etc.)
 * These can appear in console output and cause invisible comparison failures
 */
function stripAnsi(str: string): string {
    // Regex pattern for ANSI escape codes
    // eslint-disable-next-line no-control-regex
    const ansiPattern = /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g;
    return str.replace(ansiPattern, '');
}

/**
 * Normalize a value for comparison:
 * - Strip ANSI codes from strings
 * - Trim whitespace (including \r\n\t)
 * - Recursively normalize arrays and objects
 */
function normalizeValue(value: any): any {
    if (typeof value === 'string') {
        // Strip ANSI codes and trim all whitespace
        return stripAnsi(value).trim();
    }
    if (Array.isArray(value)) {
        return value.map(normalizeValue);
    }
    if (value !== null && typeof value === 'object') {
        const normalized: Record<string, any> = {};
        for (const key of Object.keys(value)) {
            normalized[normalizeValue(key)] = normalizeValue(value[key]);
        }
        return normalized;
    }
    return value;
}

export interface TestResult {
    passed: boolean;
    expected: any;
    received: any;
    description?: string;
    error?: string;
    suggestion?: string;
    consoleLogs?: string[]; // Captured console.log output
}

/**
 * Analyze code for common beginner mistakes and provide helpful suggestions
 */
function detectCommonMistakes(userCode: string, error: string): string | undefined {
    const code = userCode.toLowerCase();
    const errorLower = error.toLowerCase();

    // Missing return keyword
    if (!userCode.includes('return')) {
        return '💡 Tip: Did you forget the `return` keyword? Your function needs to give back a value using `return`.';
    }

    // Undefined variable
    if (errorLower.includes('is not defined')) {
        return '💡 Tip: You\'re using a variable that doesn\'t exist. Check your spelling and make sure you\'ve declared it with `const`.';
    }

    // Syntax error - missing parenthesis
    if (errorLower.includes('unexpected end') || errorLower.includes('missing )')) {
        return '💡 Tip: Check your parentheses and brackets. Every `(` needs a `)` and every `{` needs a `}`.';
    }

    // Syntax error - missing quote
    if (errorLower.includes('unterminated string') || errorLower.includes('unexpected string')) {
        return '💡 Tip: Check your quotes! Every string needs matching opening and closing quotes.';
    }

    // Common typo: retrun instead of return
    if (code.includes('retrun') || code.includes('reutrn') || code.includes('retrn')) {
        return '💡 Tip: Check your spelling of `return` — it looks like there might be a typo!';
    }

    // Using = instead of == or ===
    if (errorLower.includes('invalid left-hand side')) {
        return '💡 Tip: You might be using `=` (assignment) instead of `===` (comparison).';
    }

    return undefined;
}

/**
 * Pre-validate code for syntax errors before execution
 * Returns error details if found, undefined if code is valid
 */
function detectSyntaxError(userCode: string): { message: string; suggestion?: string } | undefined {
    try {
        // Try to parse the code
        new Function(userCode);
        return undefined;
    } catch (error) {
        if (error instanceof SyntaxError) {
            const message = error.message;
            let suggestion: string | undefined;

            // Provide helpful suggestions for common syntax errors
            if (message.includes('Unexpected end of input')) {
                suggestion = '💡 It looks like you\'re missing a closing bracket `}` or parenthesis `)`. Check that every opening bracket has a matching closing one.';
            } else if (message.includes('Unexpected token')) {
                if (message.includes('}')) {
                    suggestion = '💡 There\'s an extra closing bracket `}`. Remove it or add the matching opening bracket `{`.';
                } else if (message.includes(')')) {
                    suggestion = '💡 There\'s an extra closing parenthesis `)`. Remove it or add the matching opening parenthesis `(`.';
                } else {
                    suggestion = '💡 There\'s a syntax error in your code. Check for typos, missing semicolons, or mismatched brackets.';
                }
            } else if (message.includes('Unexpected identifier')) {
                suggestion = '💡 There\'s an unexpected word in your code. You might be missing a semicolon, comma, or operator.';
            } else if (message.includes('missing )')) {
                suggestion = '💡 You\'re missing a closing parenthesis `)`.';
            } else if (message.includes('missing }')) {
                suggestion = '💡 You\'re missing a closing bracket `}`.';
            }

            return { message: `Syntax Error: ${message}`, suggestion };
        }
        return undefined;
    }
}

/**
 * Check for common logical mistakes (not syntax errors)
 */
function detectLogicalMistakes(userCode: string, received: any, expected: any): string | undefined {
    // Returned undefined when should have returned something
    if (received === undefined && expected !== undefined) {
        if (!userCode.includes('return')) {
            return '💡 Your function returned `undefined`. Did you forget to use `return`?';
        }
        return '💡 Your function returned `undefined`. Make sure you\'re returning the right value.';
    }

    // Returned a string when should have returned a number (or vice versa)
    if (typeof received !== typeof expected) {
        if (typeof expected === 'boolean' && typeof received === 'string') {
            return '💡 You returned a string, but a boolean was expected. Remember: `true` and `"true"` are different!';
        }
        if (typeof expected === 'number' && typeof received === 'string') {
            return '💡 You returned a string instead of a number. Remove the quotes around your value.';
        }
    }

    // Case sensitivity issues for strings
    if (typeof expected === 'string' && typeof received === 'string') {
        if (expected.toLowerCase() === received.toLowerCase() && expected !== received) {
            return '💡 Almost there! Check your capitalization — JavaScript strings are case-sensitive.';
        }
    }

    return undefined;
}

/**
 * Safely execute user code against test cases using new Function()
 * This runs in the browser context but provides isolation from the main app
 */
export function runCode(
    userCode: string,
    functionName: string,
    testCases: TestCase[]
): TestResult[] {
    const results: TestResult[] = [];

    // PRE-CHECK: Validate syntax before running any tests
    // This gives users a clear "Syntax Error" message instead of confusing "undefined" results
    const syntaxError = detectSyntaxError(userCode);
    if (syntaxError) {
        // Return a single failed result with the syntax error
        return [{
            passed: false,
            expected: testCases[0]?.expected,
            received: undefined,
            description: 'Syntax Check',
            error: syntaxError.message,
            suggestion: syntaxError.suggestion,
        }];
    }

    for (const testCase of testCases) {
        const logs: string[] = [];

        try {
            // Create a sandboxed execution environment using new Function().
            // This approach:
            // 1. Isolates user code from the main app's scope
            // 2. Captures console.log/warn/error output by overriding console
            // 3. Wraps execution to return both result and captured logs
            // Note: This is NOT fully secure (user could access window), but
            // provides reasonable isolation for an educational context.

            // Special handling for callback challenge: inject a doubling function
            // since we can't serialize/pass actual functions through test cases
            const isCallbackChallenge = functionName === 'applyCallback';

            const wrappedCode = `
        const __logs = [];
        const console = { 
            log: (...args) => __logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')),
            warn: (...args) => __logs.push('[WARN] ' + args.join(' ')),
            error: (...args) => __logs.push('[ERROR] ' + args.join(' '))
        };
        ${userCode}
        ${isCallbackChallenge
                    ? `const __result = ${functionName}(args[0], x => x * 2);`
                    : `const __result = ${functionName}(...args);`}
        return { result: __result, logs: __logs };
      `;

            // Create a new function with 'args' as the parameter
            const executableFunction = new Function('args', wrappedCode);

            // Execute with the test case inputs
            const { result: received, logs: capturedLogs } = executableFunction(testCase.input);
            logs.push(...capturedLogs);

            // Normalize values to strip ANSI codes and trim whitespace
            const normalizedReceived = normalizeValue(received);
            const normalizedExpected = normalizeValue(testCase.expected);

            // Deep equality check using normalized values
            const passed = deepEqual(normalizedReceived, normalizedExpected);

            // Check for logical mistakes if test failed
            const suggestion = passed ? undefined : detectLogicalMistakes(userCode, received, testCase.expected);

            results.push({
                passed,
                expected: testCase.expected,
                received,
                description: testCase.description,
                suggestion,
                consoleLogs: logs.length > 0 ? logs : undefined
            });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            let suggestion = detectCommonMistakes(userCode, errorMessage);

            // Special handling for function not defined errors
            if (errorMessage.includes('is not defined') && errorMessage.includes(functionName)) {
                suggestion = `💡 The function \`${functionName}\` is not defined. Make sure you've written the function with the correct name: \`function ${functionName}(...) { ... }\``;
            } else if (errorMessage.includes('is not a function')) {
                suggestion = `💡 \`${functionName}\` is not a function. Make sure you're defining a function, not just a variable.`;
            }

            results.push({
                passed: false,
                expected: testCase.expected,
                received: undefined,
                description: testCase.description,
                error: errorMessage,
                suggestion,
                consoleLogs: logs.length > 0 ? logs : undefined
            });
        }
    }

    return results;
}

/**
 * Deep equality comparison for arrays, objects, and primitives
 */
function deepEqual(a: any, b: any): boolean {
    // Handle primitives
    if (a === b) return true;

    // Handle null/undefined
    if (a == null || b == null) return a === b;

    // Handle different types
    if (typeof a !== typeof b) return false;

    // Handle arrays
    if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length !== b.length) return false;
        return a.every((item, index) => deepEqual(item, b[index]));
    }

    // Handle objects
    if (typeof a === 'object' && typeof b === 'object') {
        const keysA = Object.keys(a);
        const keysB = Object.keys(b);
        if (keysA.length !== keysB.length) return false;
        return keysA.every(key => deepEqual(a[key], b[key]));
    }

    return false;
}

/**
 * Format a value for display in the console
 */
export function formatValue(value: any): string {
    if (value === undefined) return 'undefined';
    if (value === null) return 'null';
    if (typeof value === 'string') return `"${value}"`;
    if (typeof value === 'boolean') return value ? 'true' : 'false';
    if (Array.isArray(value)) {
        return `[${value.map(formatValue).join(', ')}]`;
    }
    if (typeof value === 'object') {
        return JSON.stringify(value);
    }
    return String(value);
}
