// Challenge data types and static repository - Category-Based Architecture

export type Category = 'JS Basics' | 'Conditionals' | 'Loops' | 'Functions' | 'Strings' | 'Arrays' | 'Objects';

export interface TestCase {
  input: any[];
  expected: any;
  description?: string;
}

// NEW: Step-based theory for progressive disclosure
export interface TheoryStep {
  text: string;           // The explanation text for this step
  codeExample?: string;   // Optional interactive code snippet
  runnable?: boolean;     // If true, show "Run Code" button
}

export interface Challenge {
  id: string;
  title: string;
  category: Category;
  difficulty: 'Beginner' | 'Easy' | 'Medium' | 'Hard';
  theorySteps: TheoryStep[]; // Changed from theory: string to step-based
  hint: string;
  description: string;
  examples: string[];
  starterCode: string;
  functionName: string;
  testCases: TestCase[];
  solution?: string; // Revealed after 3 failed attempts
}

export const categories: Category[] = ['JS Basics', 'Conditionals', 'Loops', 'Functions', 'Strings', 'Arrays', 'Objects'];

export const challenges: Challenge[] = [
  // ============================================
  // CATEGORY: JS BASICS
  // ============================================
  {
    id: 'js-variables',
    title: 'Variables',
    category: 'JS Basics',
    difficulty: 'Beginner',
    theorySteps: [
      { text: "A **variable** is a named container that stores data. Think of it as a labeled box where you can put information." },
      { text: "In JavaScript, we use `const` to declare variables that won't change.", codeExample: 'const greeting = "Hello";', runnable: true },
      { text: "The pattern is: `const` + **name** + `=` + **value**", codeExample: 'const age = 25;\nconst isActive = true;', runnable: true },
      { text: "Variable names are case-sensitive, so `myVar` and `myvar` are different variables." },
      { text: "To use a stored value, simply write the variable name. Try it:", codeExample: 'const message = "Hi there!";\nconsole.log(message);', runnable: true }
    ],
    hint: 'Declare a variable with const, assign a string value, and use return to send it back.',
    description: 'Assign the value `"JavaScript"` to a variable named `course` and return it.',
    examples: [
      'getCourse() → "JavaScript"'
    ],
    starterCode: `function getCourse() {
  // Create a variable called 'course' with value "JavaScript"
  // Then return it
  
}`,
    functionName: 'getCourse',
    testCases: [
      { input: [], expected: 'JavaScript', description: 'Should return "JavaScript"' }
    ],
    solution: `function getCourse() {
  const course = "JavaScript";
  return course;
}`
  },
  {
    id: 'js-sum',
    title: 'Sum Two Numbers',
    category: 'JS Basics',
    difficulty: 'Beginner',
    theorySteps: [
      { text: "JavaScript can perform mathematical calculations using **arithmetic operators**." },
      { text: "The `+` operator adds numbers, `-` subtracts, `*` multiplies, and `/` divides.", codeExample: 'console.log(5 + 3);  // 8\nconsole.log(10 - 4); // 6', runnable: true },
      { text: "When a function receives inputs (called **parameters**), you can use them in calculations.", codeExample: 'function multiply(x, y) {\n  return x * y;\n}\nconsole.log(multiply(4, 5));', runnable: true },
      { text: "The parameters are filled with values when you call the function. You can use any operator with them." }
    ],
    hint: 'Think about which operator combines two values into a total.',
    description: 'Return the sum of parameters `a` and `b`.',
    examples: [
      'sum(2, 3) → 5',
      'sum(10, -5) → 5'
    ],
    starterCode: `function sum(a, b) {
  // Return the sum of a and b
  
}`,
    functionName: 'sum',
    testCases: [
      { input: [2, 3], expected: 5, description: 'Basic addition' },
      { input: [10, -5], expected: 5, description: 'With negative number' },
      { input: [0, 0], expected: 0, description: 'Adding zeros' },
      { input: [100, 200], expected: 300, description: 'Larger numbers' }
    ],
    solution: `function sum(a, b) {
  return a + b;
}`
  },
  {
    id: 'js-modulo',
    title: 'Modulo (Remainder)',
    category: 'JS Basics',
    difficulty: 'Beginner',
    theorySteps: [
      { text: "The **modulo operator** `%` returns the **remainder** after division." },
      { text: "It tells you what's \"left over\" after dividing:", codeExample: 'console.log(10 % 3);  // 1 (10 ÷ 3 = 3 remainder 1)\nconsole.log(15 % 5);  // 0 (divides evenly)', runnable: true },
      { text: "Think of it like this: if you have 10 cookies and give 3 to each person, you serve 3 people with **1 cookie left over**." },
      { text: "The modulo is useful for checking divisibility—if the remainder is 0, it divides evenly.", codeExample: 'console.log(12 % 4);  // 0 - divides evenly\nconsole.log(13 % 4);  // 1 - has remainder', runnable: true }
    ],
    hint: 'There is an operator that gives you the remainder after division.',
    description: 'Return the remainder of `a` divided by `b`.',
    examples: [
      'modulo(10, 3) → 1',
      'modulo(15, 5) → 0'
    ],
    starterCode: `function modulo(a, b) {
  // Return the remainder of a divided by b
  
}`,
    functionName: 'modulo',
    testCases: [
      { input: [10, 3], expected: 1, description: '10 ÷ 3 = 3 remainder 1' },
      { input: [15, 5], expected: 0, description: 'Evenly divisible' },
      { input: [7, 2], expected: 1, description: 'Odd number mod 2' },
      { input: [100, 7], expected: 2, description: 'Larger numbers' }
    ],
    solution: `function modulo(a, b) {
  return a % b;
}`
  },
  {
    id: 'js-even-odd',
    title: 'Even or Odd',
    category: 'JS Basics',
    difficulty: 'Beginner',
    theorySteps: [
      { text: "A number is **even** if it's divisible by 2 (no remainder). Otherwise, it's **odd**." },
      { text: "We can check this using the modulo operator:", codeExample: 'console.log(4 % 2);  // 0 (even)\nconsole.log(7 % 2);  // 1 (odd)\nconsole.log(0 % 2);  // 0 (even!)', runnable: true },
      { text: "You can return the result of a comparison directly. Comparisons produce `true` or `false`:", codeExample: 'function isPositive(n) {\n  return n > 0;\n}\nconsole.log(isPositive(5));  // true\nconsole.log(isPositive(-3)); // false', runnable: true },
      { text: "Comparisons like `>`, `<`, and `===` naturally produce booleans, so you can return them directly." }
    ],
    hint: 'What does n % 2 give you for even numbers? How can you compare that result to get true/false?',
    description: 'Return `true` if number `n` is even, `false` otherwise.',
    examples: [
      'isEven(4) → true',
      'isEven(7) → false'
    ],
    starterCode: `function isEven(n) {
  // Return true if n is even, false if odd
  
}`,
    functionName: 'isEven',
    testCases: [
      { input: [4], expected: true, description: '4 is even' },
      { input: [7], expected: false, description: '7 is odd' },
      { input: [0], expected: true, description: '0 is even' },
      { input: [-2], expected: true, description: 'Negative even' },
      { input: [-3], expected: false, description: 'Negative odd' }
    ],
    solution: `function isEven(n) {
  return n % 2 === 0;
}`
  },

  // ============================================
  // CATEGORY: CONDITIONALS
  // ============================================
  {
    id: 'cond-age-check',
    title: 'Age Check',
    category: 'Conditionals',
    difficulty: 'Beginner',
    theorySteps: [
      { text: "Conditional statements let your code make **decisions**. They run different code based on whether something is true or false." },
      { text: "The `if` statement runs code only when a condition is true:", codeExample: "const temperature = 35;\nif (temperature > 30) {\n  console.log(\"It's hot!\");\n}", runnable: true },
      { text: "Use `else` to run different code when the condition is false:", codeExample: "const age = 15;\nif (age >= 21) {\n  console.log(\"Can drink\");\n} else {\n  console.log(\"Cannot drink\");\n}", runnable: true },
      { text: "Common comparison operators: `>=` (greater or equal), `<=` (less or equal), `===` (strictly equal), `!==` (not equal)" }
    ],
    hint: 'Use an if statement to check if the age meets a certain threshold, then return different strings for each case.',
    description: 'Return `"adult"` if `age` is 18 or older, otherwise return `"minor"`.',
    examples: [
      'checkAge(21) → "adult"',
      'checkAge(15) → "minor"'
    ],
    starterCode: `function checkAge(age) {
  // Return "adult" if 18+, else "minor"
  
}`,
    functionName: 'checkAge',
    testCases: [
      { input: [21], expected: 'adult', description: '21 is an adult' },
      { input: [18], expected: 'adult', description: '18 is exactly adult' },
      { input: [15], expected: 'minor', description: '15 is a minor' },
      { input: [0], expected: 'minor', description: '0 is a minor' }
    ],
    solution: `function checkAge(age) {
  if (age >= 18) {
    return "adult";
  } else {
    return "minor";
  }
}`
  },
  {
    id: 'cond-max',
    title: 'Find Maximum',
    category: 'Conditionals',
    difficulty: 'Easy',
    theorySteps: [
      { text: "You can use `if/else` to compare two values and take different actions based on the result." },
      { text: "Here's how to check which value is bigger:", codeExample: 'const a = 10;\nconst b = 7;\nif (a > b) {\n  console.log("a is bigger");\n} else {\n  console.log("b is bigger or equal");\n}', runnable: true },
      { text: "For simple if/else, JavaScript has a shorthand called the **ternary operator**:" },
      { text: "The syntax is: `condition ? valueIfTrue : valueIfFalse`", codeExample: 'const score = 85;\nconst result = score >= 60 ? "pass" : "fail";\nconsole.log(result);', runnable: true }
    ],
    hint: 'Compare the two values and return whichever one is greater.',
    description: 'Return the larger of the two numbers `a` and `b`.',
    examples: [
      'max(5, 3) → 5',
      'max(2, 8) → 8'
    ],
    starterCode: `function max(a, b) {
  // Return the larger number
  
}`,
    functionName: 'max',
    testCases: [
      { input: [5, 3], expected: 5, description: '5 is larger than 3' },
      { input: [2, 8], expected: 8, description: '8 is larger than 2' },
      { input: [4, 4], expected: 4, description: 'Equal numbers' },
      { input: [-1, -5], expected: -1, description: 'Negative numbers' }
    ],
    solution: `function max(a, b) {
  return a > b ? a : b;
}`
  },
  {
    id: 'cond-grade',
    title: 'Letter Grade',
    category: 'Conditionals',
    difficulty: 'Medium',
    theorySteps: [
      { text: "When you have **more than two possibilities**, use `else if` to chain multiple conditions." },
      { text: "Each condition is checked in order. Once one matches, the rest are skipped:", codeExample: 'const temp = 25;\nif (temp >= 30) {\n  console.log("hot");\n} else if (temp >= 20) {\n  console.log("warm");\n} else {\n  console.log("cold");\n}', runnable: true },
      { text: "⚠️ **Order matters!** If you check a broad condition first, specific cases might never be reached." },
      { text: "Always check the **most restrictive condition first**, then work down to broader ones." }
    ],
    hint: 'Start by checking the highest grade threshold, then work your way down. Use else if for each grade boundary.',
    description: 'Return the letter grade for a score: A (90+), B (80-89), C (70-79), D (60-69), F (below 60).',
    examples: [
      'getGrade(95) → "A"',
      'getGrade(72) → "C"'
    ],
    starterCode: `function getGrade(score) {
  // Return letter grade: A, B, C, D, or F
  
}`,
    functionName: 'getGrade',
    testCases: [
      { input: [95], expected: 'A', description: '95 is an A' },
      { input: [85], expected: 'B', description: '85 is a B' },
      { input: [72], expected: 'C', description: '72 is a C' },
      { input: [65], expected: 'D', description: '65 is a D' },
      { input: [50], expected: 'F', description: '50 is an F' }
    ],
    solution: `function getGrade(score) {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}`
  },

  // ============================================
  // CATEGORY: LOOPS
  // ============================================
  {
    id: 'loop-sum-1-to-n',
    title: 'Sum 1 to N',
    category: 'Loops',
    difficulty: 'Easy',
    theorySteps: [
      { text: "A `for` loop **repeats code** a specific number of times." },
      { text: "Here's the basic structure:", codeExample: 'for (let i = 1; i <= 3; i++) {\n  console.log("Count:", i);\n}', runnable: true },
      { text: "The loop has 3 parts: **initialization** (`let i = 1`), **condition** (`i <= 3`), and **update** (`i++`)." },
      { text: "A common pattern is to **accumulate** values as you loop—keep a running total in a variable:", codeExample: 'let total = 0;\ntotal = total + 5;\ntotal = total + 10;\nconsole.log(total);  // 15', runnable: true }
    ],
    hint: 'Create a variable to hold your running total. Loop through the numbers and keep adding to that variable.',
    description: 'Return the sum of all numbers from 1 to `n` (inclusive).',
    examples: [
      'sumToN(5) → 15  (1+2+3+4+5)',
      'sumToN(3) → 6   (1+2+3)'
    ],
    starterCode: `function sumToN(n) {
  // Return sum of 1 + 2 + ... + n
  
}`,
    functionName: 'sumToN',
    testCases: [
      { input: [5], expected: 15, description: '1+2+3+4+5 = 15' },
      { input: [3], expected: 6, description: '1+2+3 = 6' },
      { input: [1], expected: 1, description: 'Just 1' },
      { input: [10], expected: 55, description: 'Sum to 10' }
    ],
    solution: `function sumToN(n) {
  let total = 0;
  for (let i = 1; i <= n; i++) {
    total += i;
  }
  return total;
}`
  },
  {
    id: 'loop-count-vowels',
    title: 'Count Vowels',
    category: 'Loops',
    difficulty: 'Medium',
    theorySteps: [
      { text: "You can loop through each **character** in a string using `for...of`:", codeExample: 'const word = "Hi!";\nfor (const char of word) {\n  console.log(char);\n}', runnable: true },
      { text: "The `includes()` method checks if a string contains a specific character:", codeExample: 'console.log("xyz".includes("y"));  // true\nconsole.log("xyz".includes("a"));  // false', runnable: true },
      { text: "To **count** things, keep a running counter and increment it when a condition is met:", codeExample: 'let count = 0;\ncount++;  // Now count is 1\ncount++;  // Now count is 2\nconsole.log(count);', runnable: true }
    ],
    hint: 'Loop through each character. For each one, check if it\'s a vowel (a, e, i, o, u). If so, increment your counter.',
    description: 'Return the number of vowels (a, e, i, o, u) in the string.',
    examples: [
      'countVowels("hello") → 2',
      'countVowels("javascript") → 3'
    ],
    starterCode: `function countVowels(str) {
  // Count and return number of vowels
  
}`,
    functionName: 'countVowels',
    testCases: [
      { input: ['hello'], expected: 2, description: 'hello has 2 vowels' },
      { input: ['javascript'], expected: 3, description: 'javascript has 3' },
      { input: ['xyz'], expected: 0, description: 'No vowels' },
      { input: ['aeiou'], expected: 5, description: 'All vowels' }
    ],
    solution: `function countVowels(str) {
  let count = 0;
  for (const char of str.toLowerCase()) {
    if ("aeiou".includes(char)) {
      count++;
    }
  }
  return count;
}`
  },
  {
    id: 'loop-fizzbuzz',
    title: 'FizzBuzz',
    category: 'Loops',
    difficulty: 'Medium',
    theorySteps: [
      { text: "**FizzBuzz** is a classic programming interview question! Here are the rules:" },
      { text: "• If divisible by 3, say \"Fizz\"\n• If divisible by 5, say \"Buzz\"\n• If divisible by **both**, say \"FizzBuzz\"\n• Otherwise, just say the number" },
      { text: "Remember modulo `%`? When the remainder is 0, the number divides evenly:", codeExample: 'console.log(15 % 3);  // 0 (divisible)\nconsole.log(15 % 5);  // 0 (divisible)\nconsole.log(14 % 5);  // 4 (NOT divisible)', runnable: true },
      { text: "⚠️ Think about the **order** of your checks. What happens if you check divisibility by 3 first when a number is divisible by both?" }
    ],
    hint: 'Check the "both" condition first (divisible by 3 AND 5), then check each individually, then default to the number.',
    description: 'Return "FizzBuzz" if divisible by 3 and 5, "Fizz" if by 3, "Buzz" if by 5, else the number as string.',
    examples: [
      'fizzBuzz(15) → "FizzBuzz"',
      'fizzBuzz(9) → "Fizz"',
      'fizzBuzz(10) → "Buzz"',
      'fizzBuzz(7) → "7"'
    ],
    starterCode: `function fizzBuzz(n) {
  // Implement FizzBuzz logic
  
}`,
    functionName: 'fizzBuzz',
    testCases: [
      { input: [15], expected: 'FizzBuzz', description: '15 is FizzBuzz' },
      { input: [9], expected: 'Fizz', description: '9 is Fizz' },
      { input: [10], expected: 'Buzz', description: '10 is Buzz' },
      { input: [7], expected: '7', description: '7 is just 7' },
      { input: [30], expected: 'FizzBuzz', description: '30 is FizzBuzz' }
    ],
    solution: `function fizzBuzz(n) {
  if (n % 3 === 0 && n % 5 === 0) return "FizzBuzz";
  if (n % 3 === 0) return "Fizz";
  if (n % 5 === 0) return "Buzz";
  return String(n);
}`
  },

  // ============================================
  // CATEGORY: FUNCTIONS
  // ============================================
  {
    id: 'func-arrow',
    title: 'Arrow Functions',
    category: 'Functions',
    difficulty: 'Beginner',
    theorySteps: [
      { text: "**Arrow functions** are a shorter way to write functions in JavaScript." },
      { text: "Compare these two ways of writing the same function:", codeExample: '// Traditional\nfunction greet(name) {\n  return "Hello, " + name;\n}\nconsole.log(greet("Alice"));', runnable: true },
      { text: "Here's the same thing as an arrow function:", codeExample: '// Arrow function\nconst greet = (name) => "Hello, " + name;\nconsole.log(greet("Bob"));', runnable: true },
      { text: "**Syntax rules:**\n• Use `=>` instead of `function`\n• If only one expression, no `{}` or `return` needed\n• If one parameter, parentheses optional: `x => x * 2`" }
    ],
    hint: 'Use arrow syntax: const functionName = (parameters) => expression',
    description: 'The function should return the product of `a` and `b`. Use an arrow function.',
    examples: [
      'multiply(3, 4) → 12',
      'multiply(5, 2) → 10'
    ],
    starterCode: `// Create an arrow function called 'multiply'
// that takes a and b and returns their product

const multiply = // your arrow function here
`,
    functionName: 'multiply',
    testCases: [
      { input: [3, 4], expected: 12, description: '3 × 4 = 12' },
      { input: [5, 2], expected: 10, description: '5 × 2 = 10' },
      { input: [0, 100], expected: 0, description: '0 × anything = 0' },
      { input: [-2, 3], expected: -6, description: 'Negative numbers' }
    ],
    solution: `const multiply = (a, b) => a * b;`
  },
  {
    id: 'func-callback',
    title: 'Using Callbacks',
    category: 'Functions',
    difficulty: 'Medium',
    theorySteps: [
      { text: "A **callback** is a function passed as an argument to another function." },
      { text: "The receiving function can then \"call back\" to it:", codeExample: 'function doTwice(action) {\n  action();\n  action();\n}\n\ndoTwice(() => console.log("Hi!"));', runnable: true },
      { text: "Callbacks let you customize behavior. The caller decides what operation to perform:" },
      { text: "Array methods like `map` and `filter` use callbacks:", codeExample: 'const nums = [1, 2, 3];\nconst doubled = nums.map(x => x * 2);\nconsole.log(doubled);', runnable: true }
    ],
    hint: 'A callback is just a function. You can call it like any other function by using parentheses and passing arguments.',
    description: 'Apply the callback function to the value and return the result.',
    examples: [
      'applyCallback(5, x => x * 2) → 10',
      'applyCallback(3, x => x + 1) → 4'
    ],
    starterCode: `function applyCallback(value, callback) {
  // Call callback with value and return result
  
}`,
    functionName: 'applyCallback',
    testCases: [
      { input: [5, (x: number) => x * 2], expected: 10, description: 'Double 5' },
      { input: [3, (x: number) => x + 1], expected: 4, description: 'Add 1 to 3' },
      { input: [10, (x: number) => x / 2], expected: 5, description: 'Halve 10' },
      { input: [0, (x: number) => x + 100], expected: 100, description: 'Add 100 to 0' }
    ],
    solution: `function applyCallback(value, callback) {
  return callback(value);
}`
  },
  {
    id: 'func-default-params',
    title: 'Default Parameters',
    category: 'Functions',
    difficulty: 'Easy',
    theorySteps: [
      { text: "You can give function parameters **default values** that are used if no argument is provided." },
      { text: "Syntax: put `= defaultValue` after the parameter name:", codeExample: 'function greet(name = "Guest") {\n  return "Hello, " + name;\n}\nconsole.log(greet("Alice"));\nconsole.log(greet());  // Uses default', runnable: true },
      { text: "You can have multiple default parameters:", codeExample: 'function createUser(name = "Anon", role = "user") {\n  return name + " (" + role + ")";\n}\nconsole.log(createUser());\nconsole.log(createUser("Jo", "admin"));', runnable: true }
    ],
    hint: 'In the function definition, assign a default value to the parameter using = syntax.',
    description: 'Create a greeting function that defaults to "World" if no name given.',
    examples: [
      'greet("Alice") → "Hello, Alice!"',
      'greet() → "Hello, World!"'
    ],
    starterCode: `function greet(name) {
  // Default name to "World" if not provided
  // Return "Hello, {name}!"
  
}`,
    functionName: 'greet',
    testCases: [
      { input: ['Alice'], expected: 'Hello, Alice!', description: 'Greet Alice' },
      { input: [], expected: 'Hello, World!', description: 'Default greeting' },
      { input: ['Bob'], expected: 'Hello, Bob!', description: 'Greet Bob' }
    ],
    solution: `function greet(name = "World") {
  return "Hello, " + name + "!";
}`
  },

  // ============================================
  // CATEGORY: STRINGS
  // ============================================
  {
    id: 'str-first-3',
    title: 'First 3 Characters',
    category: 'Strings',
    difficulty: 'Easy',
    theorySteps: [
      { text: "Strings are sequences of characters. JavaScript provides methods to **extract portions** of them." },
      { text: "The `slice()` method extracts a section: `str.slice(start, end)`", codeExample: 'const word = "Fantastic";\nconsole.log(word.slice(0, 4));  // "Fant"\nconsole.log(word.slice(3, 7));  // "tast"', runnable: true },
      { text: "**Important:** The `end` index is NOT included in the result. And indices start at 0!" },
      { text: "So `slice(0, 3)` gets characters at positions 0, 1, and 2 (the first 3 characters)." }
    ],
    hint: 'Use slice with a starting index and an ending index to extract a portion of the string.',
    description: 'Return the first 3 characters of string `str`.',
    examples: [
      'firstThree("abcdef") → "abc"',
      'firstThree("Hello") → "Hel"'
    ],
    starterCode: `function firstThree(str) {
  // Return the first 3 characters of str
  
}`,
    functionName: 'firstThree',
    testCases: [
      { input: ['abcdef'], expected: 'abc', description: 'Basic string' },
      { input: ['Hello'], expected: 'Hel', description: 'Another string' },
      { input: ['JavaScript'], expected: 'Jav', description: 'Longer string' },
      { input: ['abc'], expected: 'abc', description: 'Exactly 3 chars' }
    ],
    solution: `function firstThree(str) {
  return str.slice(0, 3);
}`
  },
  {
    id: 'str-last-n',
    title: 'Last N Characters',
    category: 'Strings',
    difficulty: 'Easy',
    theorySteps: [
      { text: "To get characters from the **end** of a string, use **negative indices** with `slice()`." },
      { text: "Negative indices count backwards:\n• `-1` = last character\n• `-2` = second-to-last\n• `-n` = last n characters" },
      { text: "This is much cleaner than calculating `str.length - n`:", codeExample: 'const word = "Sunshine";\nconsole.log(word.slice(-3));   // "ine"\nconsole.log(word.slice(-5));   // "shine"\nconsole.log(word.slice(-1));   // "e"', runnable: true }
    ],
    hint: 'Slice accepts negative numbers to count from the end of the string.',
    description: 'Return the last `n` characters of string `str`.',
    examples: [
      'lastN("abcdef", 2) → "ef"',
      'lastN("Hello", 3) → "llo"'
    ],
    starterCode: `function lastN(str, n) {
  // Return the last n characters of str
  
}`,
    functionName: 'lastN',
    testCases: [
      { input: ['abcdef', 2], expected: 'ef', description: 'Last 2 characters' },
      { input: ['Hello', 3], expected: 'llo', description: 'Last 3 characters' },
      { input: ['JavaScript', 4], expected: 'ript', description: 'Last 4 of longer string' },
      { input: ['World', 1], expected: 'd', description: 'Just last character' }
    ],
    solution: `function lastN(str, n) {
  return str.slice(-n);
}`
  },
  {
    id: 'str-remove-last-3',
    title: 'Remove Last 3 Characters',
    category: 'Strings',
    difficulty: 'Easy',
    theorySteps: [
      { text: "To **remove** characters from the end, use `slice()` with a negative end index." },
      { text: "The pattern is: `str.slice(0, -n)` removes the last n characters.", codeExample: 'const word = "Testing";\nconsole.log(word.slice(0, -2));  // "Testi"\nconsole.log(word.slice(0, -4));  // "Tes"', runnable: true },
      { text: "It starts at position 0 and stops n characters before the end.", codeExample: 'console.log("Hello World".slice(0, -6));  // "Hello"', runnable: true },
      { text: "Note: `slice()` returns a **new string**—the original is not modified." }
    ],
    hint: 'Think about how to use slice with both a start and end index, where the end is negative.',
    description: 'Return the string `str` without its last 3 characters.',
    examples: [
      'removeLast3("abcdef") → "abc"',
      'removeLast3("Hello!") → "Hel"'
    ],
    starterCode: `function removeLast3(str) {
  // Return str without its last 3 characters
  
}`,
    functionName: 'removeLast3',
    testCases: [
      { input: ['abcdef'], expected: 'abc', description: 'Remove last 3' },
      { input: ['Hello!'], expected: 'Hel', description: 'Another string' },
      { input: ['JavaScript'], expected: 'JavaScr', description: 'Longer string' },
      { input: ['abcd'], expected: 'a', description: 'Short string' }
    ],
    solution: `function removeLast3(str) {
  return str.slice(0, -3);
}`
  },

  // ============================================
  // CATEGORY: ARRAYS
  // ============================================
  {
    id: 'arr-nth-element',
    title: 'Get Nth Element',
    category: 'Arrays',
    difficulty: 'Easy',
    theorySteps: [
      { text: "Arrays store **multiple values** in a single variable. Each value has an **index** starting from 0." },
      { text: "Use **bracket notation** to access elements:", codeExample: 'const colors = ["red", "green", "blue"];\nconsole.log(colors[0]);  // "red"\nconsole.log(colors[1]);  // "green"\nconsole.log(colors[2]);  // "blue"', runnable: true },
      { text: "You can use a **variable** as the index:", codeExample: 'const fruits = ["apple", "banana", "cherry"];\nconst i = 1;\nconsole.log(fruits[i]);  // "banana"', runnable: true },
      { text: "Remember: The **first** element is at index 0, not 1!" }
    ],
    hint: 'Access array elements using bracket notation with the index.',
    description: 'Return the element at index `n` from array `arr`.',
    examples: [
      'getNth([1, 2, 3, 4], 2) → 3',
      'getNth(["a", "b", "c"], 0) → "a"'
    ],
    starterCode: `function getNth(arr, n) {
  // Return the element at index n
  
}`,
    functionName: 'getNth',
    testCases: [
      { input: [[1, 2, 3, 4], 2], expected: 3, description: 'Get third element' },
      { input: [['a', 'b', 'c'], 0], expected: 'a', description: 'Get first element' },
      { input: [[10, 20, 30], 1], expected: 20, description: 'Get second element' },
      { input: [['x'], 0], expected: 'x', description: 'Single element array' }
    ],
    solution: `function getNth(arr, n) {
  return arr[n];
}`
  },
  {
    id: 'arr-count-negative',
    title: 'Count Negative Numbers',
    category: 'Arrays',
    difficulty: 'Medium',
    theorySteps: [
      { text: "The `filter()` method creates a **new array** with elements that pass a test." },
      { text: "You provide a function that returns true/false for each element:", codeExample: 'const numbers = [5, 12, 8, 130, 44];\nconst big = numbers.filter(n => n > 10);\nconsole.log(big);  // [12, 130, 44]', runnable: true },
      { text: "After filtering, use `.length` to count how many passed:", codeExample: 'const nums = [1, -2, 3, -4, 5];\nconst positives = nums.filter(n => n > 0);\nconsole.log(positives.length);  // 3', runnable: true },
      { text: "You can chain these together: `arr.filter(condition).length`" }
    ],
    hint: 'Filter the array to keep only numbers that meet your condition, then get the length of the result.',
    description: 'Return the count of negative numbers in array `arr`.',
    examples: [
      'countNegative([1, -2, 3, -4]) → 2',
      'countNegative([5, 10, 15]) → 0'
    ],
    starterCode: `function countNegative(arr) {
  // Return the count of negative numbers
  
}`,
    functionName: 'countNegative',
    testCases: [
      { input: [[1, -2, 3, -4]], expected: 2, description: 'Two negatives' },
      { input: [[5, 10, 15]], expected: 0, description: 'No negatives' },
      { input: [[-1, -2, -3]], expected: 3, description: 'All negatives' },
      { input: [[0, -1, 0, -2, 0]], expected: 2, description: 'With zeros' }
    ],
    solution: `function countNegative(arr) {
  return arr.filter(n => n < 0).length;
}`
  },
  {
    id: 'arr-sort-descending',
    title: 'Sort Numbers Descending',
    category: 'Arrays',
    difficulty: 'Medium',
    theorySteps: [
      { text: "JavaScript's `sort()` has a quirk: by default, it sorts **as strings**, not numbers!" },
      { text: "Watch this surprising behavior:", codeExample: 'const nums = [10, 2, 30];\nconsole.log(nums.sort());  // [10, 2, 30] - Wrong!', runnable: true },
      { text: "Fix it by passing a **compare function**: `arr.sort((a, b) => ...)`" },
      { text: "The compare function should return:\n• **Negative** → a comes first\n• **Positive** → b comes first\n• **Zero** → order unchanged", codeExample: 'const nums = [10, 2, 30];\nconsole.log(nums.sort((a, b) => a - b));  // Ascending', runnable: true }
    ],
    hint: 'The compare function should return positive when the first argument should come after the second.',
    description: 'Sort the array of numbers `arr` in descending order (largest first).',
    examples: [
      'sortDesc([3, 1, 4, 1, 5]) → [5, 4, 3, 1, 1]',
      'sortDesc([10, 2]) → [10, 2]'
    ],
    starterCode: `function sortDesc(arr) {
  // Sort arr in descending order (largest to smallest)
  
}`,
    functionName: 'sortDesc',
    testCases: [
      { input: [[3, 1, 4, 1, 5]], expected: [5, 4, 3, 1, 1], description: 'Mixed numbers' },
      { input: [[10, 2]], expected: [10, 2], description: 'Tests the sort bug!' },
      { input: [[1, 2, 3]], expected: [3, 2, 1], description: 'Already ascending' },
      { input: [[5, 5, 5]], expected: [5, 5, 5], description: 'All same' },
      { input: [[-1, -5, 3]], expected: [3, -1, -5], description: 'With negatives' }
    ],
    solution: `function sortDesc(arr) {
  return arr.sort((a, b) => b - a);
}`
  },

  // ============================================
  // CATEGORY: OBJECTS
  // ============================================
  {
    id: 'obj-access-property',
    title: 'Access Object Property',
    category: 'Objects',
    difficulty: 'Easy',
    theorySteps: [
      { text: "Objects store data as **key-value pairs**:", codeExample: 'const car = {\n  brand: "Toyota",\n  year: 2020\n};\nconsole.log(car);', runnable: true },
      { text: "**Dot notation** works when you know the key name:", codeExample: 'const person = { name: "Alice", age: 25 };\nconsole.log(person.name);  // "Alice"\nconsole.log(person.age);   // 25', runnable: true },
      { text: "**Bracket notation** is needed when the key is in a variable:", codeExample: 'const person = { name: "Bob" };\nconst key = "name";\nconsole.log(person[key]);  // "Bob"', runnable: true },
      { text: "When the property name comes from a parameter or variable, you **must** use bracket notation." }
    ],
    hint: 'When the property name is stored in a variable, you need to use bracket notation instead of dot notation.',
    description: 'Return the value of the property with key `key` from object `obj`.',
    examples: [
      'getProperty({a: 1, b: 2}, "a") → 1',
      'getProperty({name: "Alice"}, "name") → "Alice"'
    ],
    starterCode: `function getProperty(obj, key) {
  // Return the value of obj[key]
  
}`,
    functionName: 'getProperty',
    testCases: [
      { input: [{ a: 1, b: 2 }, 'a'], expected: 1, description: 'Get property a' },
      { input: [{ name: 'Alice', age: 25 }, 'name'], expected: 'Alice', description: 'Get name' },
      { input: [{ x: 100 }, 'x'], expected: 100, description: 'Single property' },
      { input: [{ active: true }, 'active'], expected: true, description: 'Boolean value' }
    ],
    solution: `function getProperty(obj, key) {
  return obj[key];
}`
  },
  {
    id: 'obj-swap-keys-values',
    title: 'Swap Keys and Values',
    category: 'Objects',
    difficulty: 'Medium',
    theorySteps: [
      { text: "Sometimes you need to create a new object with **keys and values swapped**." },
      { text: "`Object.entries()` converts an object to an array of [key, value] pairs:", codeExample: 'const obj = { x: 10, y: 20 };\nconsole.log(Object.entries(obj));\n// [["x", 10], ["y", 20]]', runnable: true },
      { text: "`Object.fromEntries()` does the reverse—pairs back to object:", codeExample: 'const pairs = [["a", 1], ["b", 2]];\nconsole.log(Object.fromEntries(pairs));\n// { a: 1, b: 2 }', runnable: true },
      { text: "You can use `map()` on entries to transform each [key, value] pair before converting back." }
    ],
    hint: 'Convert to entries, transform each pair to swap the key and value positions, then convert back to an object.',
    description: 'Return a new object where the keys and values of `obj` are swapped.',
    examples: [
      'swapKeysValues({a: 1, b: 2}) → {1: "a", 2: "b"}',
      'swapKeysValues({x: "y"}) → {y: "x"}'
    ],
    starterCode: `function swapKeysValues(obj) {
  // Return a new object with keys and values swapped
  
}`,
    functionName: 'swapKeysValues',
    testCases: [
      { input: [{ a: '1', b: '2' }], expected: { '1': 'a', '2': 'b' }, description: 'Swap string values' },
      { input: [{ x: 'y' }], expected: { y: 'x' }, description: 'Single property' },
      { input: [{ name: 'id', value: 'data' }], expected: { id: 'name', data: 'value' }, description: 'Word keys' }
    ],
    solution: `function swapKeysValues(obj) {
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [v, k])
  );
}`
  }
];
