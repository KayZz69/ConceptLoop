// Safe code execution utility with enhanced educational feedback

import { TestCase } from '../data/challenges';

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

    for (const testCase of testCases) {
        const logs: string[] = [];

        try {
            // Create a function from the user's code with console.log capture
            const wrappedCode = `
        const __logs = [];
        const console = { 
            log: (...args) => __logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')),
            warn: (...args) => __logs.push('[WARN] ' + args.join(' ')),
            error: (...args) => __logs.push('[ERROR] ' + args.join(' '))
        };
        ${userCode}
        const __result = ${functionName}(...args);
        return { result: __result, logs: __logs };
      `;

            // Create a new function with 'args' as the parameter
            const executableFunction = new Function('args', wrappedCode);

            // Execute with the test case inputs
            const { result: received, logs: capturedLogs } = executableFunction(testCase.input);
            logs.push(...capturedLogs);

            // Deep equality check
            const passed = deepEqual(received, testCase.expected);

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
            const suggestion = detectCommonMistakes(userCode, errorMessage);

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
