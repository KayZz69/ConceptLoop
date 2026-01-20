// Challenge data types and static repository - JSChallenge Curriculum

export type Category =
  | 'Variables'
  | 'Booleans'
  | 'Operators'
  | 'Strings'
  | 'Conditionals'
  | 'Functions I'
  | 'Arrays'
  | 'Objects'
  | 'Loops';

export type ItemType = 'lesson' | 'challenge' | 'exam';

export interface TestCase {
  input: any[];
  expected: any;
  description?: string;
}

export interface TheoryStep {
  text: string;
  codeExample?: string;
  runnable?: boolean;
}

export interface Challenge {
  id: string;
  title: string;
  category: Category;
  type: ItemType;
  difficulty: 'Beginner' | 'Easy' | 'Medium' | 'Hard';
  theorySteps: TheoryStep[];
  hint: string;
  description: string;
  examples: string[];
  starterCode: string;
  functionName: string;
  testCases: TestCase[];
  solution?: string;
}

type ItemDefinition = Omit<Challenge, 'id' | 'category'> & { title: string };

const slugify = (value: string): string => {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const makeId = (category: Category, index: number, title: string): string => {
  return `${slugify(category)}-${String(index).padStart(2, '0')}-${slugify(title)}`;
};

const lessonItem = (title: string, steps: TheoryStep[]): ItemDefinition => {
  return {
    title,
    type: 'lesson',
    difficulty: 'Beginner',
    theorySteps: steps,
    hint: 'Read the lesson and continue.',
    description: 'Lesson item.',
    examples: [],
    starterCode: '',
    functionName: 'lessonItem',
    testCases: []
  };
};

const challengeItem = (
  title: string,
  theorySteps: TheoryStep[],
  hint: string,
  description: string,
  examples: string[],
  starterCode: string,
  functionName: string,
  testCases: TestCase[],
  solution: string,
  difficulty: Challenge['difficulty'] = 'Easy'
): ItemDefinition => {
  return {
    title,
    type: 'challenge',
    difficulty,
    theorySteps,
    hint,
    description,
    examples,
    starterCode,
    functionName,
    testCases,
    solution
  };
};

const examItem = (
  title: string,
  theorySteps: TheoryStep[],
  hint: string,
  description: string,
  examples: string[],
  starterCode: string,
  functionName: string,
  testCases: TestCase[],
  solution: string,
  difficulty: Challenge['difficulty'] = 'Medium'
): ItemDefinition => {
  return {
    title,
    type: 'exam',
    difficulty,
    theorySteps,
    hint,
    description,
    examples,
    starterCode,
    functionName,
    testCases,
    solution
  };
};

const buildModule = (category: Category, items: ItemDefinition[]): Challenge[] => {
  return items.map((item, index) => ({
    id: makeId(category, index + 1, item.title),
    category,
    ...item
  }));
};

export const categories: Category[] = [
  'Variables',
  'Booleans',
  'Operators',
  'Strings',
  'Conditionals',
  'Functions I',
  'Arrays',
  'Objects',
  'Loops'
];

const variablesItems: ItemDefinition[] = [
  challengeItem(
    'Hello World',
    [
      { text: 'A function can return a string value.' },
      { text: 'Return the exact text "Hello World".' }
    ],
    'Return the string exactly as shown.',
    'Return "Hello World".',
    ['helloWorld() -> "Hello World"'],
    `function helloWorld() {
  // Return the string "Hello World"

}`,
    'helloWorld',
    [{ input: [], expected: 'Hello World', description: 'Basic greeting' }],
    `function helloWorld() {
  return "Hello World";
}`,
    'Beginner'
  ),
  lessonItem('The console and introduction to variables', [
    { text: 'Variables store values so you can reuse them later.' },
    { text: 'Use let when a value can change and const when it should not.' },
    {
      text: 'console.log prints a value so you can see it while learning.',
      codeExample: 'const name = "Sam";\nconsole.log(name);',
      runnable: true
    }
  ]),
  challengeItem(
    'Reassign a value to a variable',
    [
      { text: 'let allows you to change a value after it is created.' },
      { text: 'Update the variable and return it.' }
    ],
    'Use let so the value can change.',
    'Create a variable status set to "offline", then change it to "online" and return it.',
    ['reassignValue() -> "online"'],
    `function reassignValue() {
  // Create status and update it

}`,
    'reassignValue',
    [{ input: [], expected: 'online', description: 'Updated value' }],
    `function reassignValue() {
  let status = "offline";
  status = "online";
  return status;
}`,
    'Beginner'
  ),
  challengeItem(
    'Assign a value to a variable',
    [
      { text: 'Variables can store strings, numbers, or other values.' },
      { text: 'Create the variable and return it.' }
    ],
    'Use const for a value that does not change.',
    'Assign "JavaScript" to a variable named language and return it.',
    ['assignValue() -> "JavaScript"'],
    `function assignValue() {
  // Create language with value "JavaScript"

}`,
    'assignValue',
    [{ input: [], expected: 'JavaScript', description: 'Assigned value' }],
    `function assignValue() {
  const language = "JavaScript";
  return language;
}`,
    'Beginner'
  ),
  challengeItem(
    'Assign the value of another variable',
    [
      { text: 'You can copy a value from one variable to another.' },
      { text: 'Return the copied value.' }
    ],
    'Set copy equal to original, then return copy.',
    'Create a variable original with value "data". Assign its value to copy and return copy.',
    ['copyValue() -> "data"'],
    `function copyValue() {
  // Create original and copy its value

}`,
    'copyValue',
    [{ input: [], expected: 'data', description: 'Copied value' }],
    `function copyValue() {
  const original = "data";
  const copy = original;
  return copy;
}`,
    'Beginner'
  ),
  challengeItem(
    'Create the missing variable',
    [
      { text: 'If a variable is missing, define it before using it.' },
      { text: 'Create the variable so the return works.' }
    ],
    'Define points before returning it.',
    'Create a variable named points set to 10 and return it.',
    ['createMissingVariable() -> 10'],
    `function createMissingVariable() {
  // const points = 10;
  return points;
}`,
    'createMissingVariable',
    [{ input: [], expected: 10, description: 'Missing variable added' }],
    `function createMissingVariable() {
  const points = 10;
  return points;
}`,
    'Beginner'
  ),
  lessonItem('Create variables with const', [
    { text: 'const creates a variable that cannot be reassigned.' },
    { text: 'Use const for values that should stay the same.' },
    {
      text: 'You can still read and return const values.',
      codeExample: 'const pi = 3.14;\nconsole.log(pi);',
      runnable: true
    }
  ]),
  challengeItem(
    'Accessing a variable (1)',
    [
      { text: 'Access a variable by using its name.' },
      { text: 'Return the stored value.' }
    ],
    'Return the value stored in message.',
    'Create a variable message with value "Hi" and return it.',
    ['getMessage() -> "Hi"'],
    `function getMessage() {
  // Create message and return it

}`,
    'getMessage',
    [{ input: [], expected: 'Hi', description: 'Returned message' }],
    `function getMessage() {
  const message = "Hi";
  return message;
}`,
    'Beginner'
  ),
  challengeItem(
    'Accessing a variable (2)',
    [
      { text: 'You can use variables in expressions.' },
      { text: 'Return the total of two variables.' }
    ],
    'Add first and second together.',
    'Create first = 2 and second = 3, then return their sum.',
    ['sumStoredValues() -> 5'],
    `function sumStoredValues() {
  // Create first and second and return their sum

}`,
    'sumStoredValues',
    [{ input: [], expected: 5, description: 'Sum of variables' }],
    `function sumStoredValues() {
  const first = 2;
  const second = 3;
  return first + second;
}`,
    'Beginner'
  ),
  challengeItem(
    'Declare a variable and assign a number',
    [
      { text: 'Numbers can be stored in variables.' },
      { text: 'Return the number you assign.' }
    ],
    'Create a variable answer = 42 and return it.',
    'Assign 42 to a variable named answer and return it.',
    ['getAnswer() -> 42'],
    `function getAnswer() {
  // Create answer and return it

}`,
    'getAnswer',
    [{ input: [], expected: 42, description: 'Assigned number' }],
    `function getAnswer() {
  const answer = 42;
  return answer;
}`,
    'Beginner'
  ),
  challengeItem(
    'Reassign a value to a variable (2)',
    [
      { text: 'Reassigning is common when state changes.' },
      { text: 'Update the value and return it.' }
    ],
    'Use let, then update the value.',
    'Set state to "idle", then change it to "ready" and return it.',
    ['updateState() -> "ready"'],
    `function updateState() {
  // Create state and update it

}`,
    'updateState',
    [{ input: [], expected: 'ready', description: 'Reassigned value' }],
    `function updateState() {
  let state = "idle";
  state = "ready";
  return state;
}`,
    'Beginner'
  ),
  challengeItem(
    'Uncomment to Assign a Number',
    [
      { text: 'Comments are ignored by JavaScript.' },
      { text: 'Uncomment the line so the variable exists.' }
    ],
    'Uncomment the points line.',
    'Uncomment the line that assigns points, then return points.',
    ['getPoints() -> 12'],
    `function getPoints() {
  // const points = 12;
  return points;
}`,
    'getPoints',
    [{ input: [], expected: 12, description: 'Points returned' }],
    `function getPoints() {
  const points = 12;
  return points;
}`,
    'Beginner'
  ),
  challengeItem(
    'Time to Uncomment',
    [
      { text: 'If a line is commented out, it does not run.' },
      { text: 'Uncomment the calculation and return the total.' }
    ],
    'Uncomment the total calculation.',
    'Uncomment the line that calculates total, then return total.',
    ['getTotal() -> 12'],
    `function getTotal() {
  const price = 10;
  const tax = 2;
  // const total = price + tax;
  return total;
}`,
    'getTotal',
    [{ input: [], expected: 12, description: 'Total returned' }],
    `function getTotal() {
  const price = 10;
  const tax = 2;
  const total = price + tax;
  return total;
}`,
    'Beginner'
  ),
  challengeItem(
    'Time to comment',
    [
      { text: 'Comments can disable a line without deleting it.' },
      { text: 'Comment out the line that changes the score.' }
    ],
    'Keep the score at 10.',
    'Comment out the line that resets score so the function returns 10.',
    ['getScore() -> 10'],
    `function getScore() {
  let score = 10;
  score = 0;
  return score;
}`,
    'getScore',
    [{ input: [], expected: 10, description: 'Score stays 10' }],
    `function getScore() {
  let score = 10;
  // score = 0;
  return score;
}`,
    'Beginner'
  ),
  examItem(
    'Test: JavaScript variables',
    [
      { text: 'Task 1: create a const named firstName set to "Alex".' },
      { text: 'Task 2: create a let named points set to 5, then update it to 8.' },
      { text: 'Task 3: return the string "Alex:8".' }
    ],
    'Follow each task in order and return the final string.',
    'Use variables and reassignment to produce the final string.',
    ['variablesExam() -> "Alex:8"'],
    `function variablesExam() {
  // Create firstName and points, update points, then return the string

}`,
    'variablesExam',
    [{ input: [], expected: 'Alex:8', description: 'Exam output' }],
    `function variablesExam() {
  const firstName = "Alex";
  let points = 5;
  points = 8;
  return "Alex:" + points;
}`
  )
];

const booleansItems: ItemDefinition[] = [
  lessonItem('Understanding Javascript Booleans', [
    { text: 'Booleans represent true or false.' },
    { text: 'Comparisons like 3 > 2 return a boolean.' },
    {
      text: 'Use booleans in conditions to make decisions.',
      codeExample: 'const isAdult = 20 >= 18;\nconsole.log(isAdult);',
      runnable: true
    }
  ]),
  challengeItem(
    'Assign boolean to a variable',
    [
      { text: 'You can assign true or false directly.' },
      { text: 'Return the boolean value.' }
    ],
    'Create isActive set to true.',
    'Assign true to a variable named isActive and return it.',
    ['setIsActive() -> true'],
    `function setIsActive() {
  // Create isActive and return it

}`,
    'setIsActive',
    [{ input: [], expected: true, description: 'Boolean stored' }],
    `function setIsActive() {
  const isActive = true;
  return isActive;
}`,
    'Beginner'
  ),
  lessonItem('Truthy and Falsy in JavaScript', [
    { text: 'Some values act like false: 0, "", null, undefined, NaN.' },
    { text: 'Everything else is truthy.' },
    {
      text: 'Double negation converts to boolean.',
      codeExample: 'console.log(!!0);\nconsole.log(!!"hi");',
      runnable: true
    }
  ]),
  challengeItem(
    'Convert Number to Boolean',
    [
      { text: 'Use Boolean(value) or !!value to convert.' },
      { text: 'Return the boolean result.' }
    ],
    'Use Boolean(num) to convert.',
    'Return true if num is truthy, otherwise false.',
    ['numberToBoolean(5) -> true', 'numberToBoolean(0) -> false'],
    `function numberToBoolean(num) {
  // Convert num to a boolean

}`,
    'numberToBoolean',
    [
      { input: [5], expected: true, description: 'Non-zero number' },
      { input: [0], expected: false, description: 'Zero is falsy' },
      { input: [-1], expected: true, description: 'Negative is truthy' }
    ],
    `function numberToBoolean(num) {
  return Boolean(num);
}`,
    'Beginner'
  ),
  examItem(
    'Test: JavaScript booleans',
    [
      { text: 'Task 1: convert value to a boolean.' },
      { text: 'Task 2: return true only if value is truthy and flag is true.' }
    ],
    'Use Boolean(value) and &&.',
    'Return true only when value is truthy and flag is true.',
    ['booleanExam("hi", true) -> true', 'booleanExam(0, true) -> false'],
    `function booleanExam(value, flag) {
  // Return Boolean(value) && flag

}`,
    'booleanExam',
    [
      { input: ['hi', true], expected: true, description: 'Truthy and true' },
      { input: [0, true], expected: false, description: 'Falsy value' },
      { input: [1, false], expected: false, description: 'False flag' }
    ],
    `function booleanExam(value, flag) {
  return Boolean(value) && flag;
}`
  )
];

const operatorsItems: ItemDefinition[] = [
  lessonItem('Introduction to JavaScript Comparison Operators', [
    { text: 'Comparison operators compare two values.' },
    { text: 'They return true or false.' },
    {
      text: 'Examples include ==, !=, >, <, >=, <=.',
      codeExample: 'console.log(5 > 3);\nconsole.log(5 == "5");',
      runnable: true
    }
  ]),
  challengeItem(
    'Comparison operators - Equal',
    [
      { text: 'The == operator checks equality with type coercion.' },
      { text: 'Return the result of a == b.' }
    ],
    'Use == to compare a and b.',
    'Return true if a is equal to b using ==.',
    ['isEqual(5, "5") -> true', 'isEqual(3, 4) -> false'],
    `function isEqual(a, b) {
  // Compare a and b with ==

}`,
    'isEqual',
    [
      { input: [5, '5'], expected: true, description: 'Loose equality' },
      { input: [3, 4], expected: false, description: 'Not equal' }
    ],
    `function isEqual(a, b) {
  return a == b;
}`
  ),
  challengeItem(
    'Comparison operators - Not Equal',
    [
      { text: 'The != operator checks inequality with type coercion.' },
      { text: 'Return the result of a != b.' }
    ],
    'Use != to compare a and b.',
    'Return true if a is not equal to b using !=.',
    ['isNotEqual(5, "5") -> false', 'isNotEqual(3, 4) -> true'],
    `function isNotEqual(a, b) {
  // Compare a and b with !=

}`,
    'isNotEqual',
    [
      { input: [5, '5'], expected: false, description: 'Loose inequality' },
      { input: [3, 4], expected: true, description: 'Not equal' }
    ],
    `function isNotEqual(a, b) {
  return a != b;
}`
  ),
  lessonItem('Introduction to JavaScript Comparison Operators II', [
    { text: 'Use > and < to compare sizes.' },
    { text: 'Use >= and <= to include equality.' },
    {
      text: 'Strict comparisons use === and !==.',
      codeExample: 'console.log(5 === "5");\nconsole.log(5 !== "5");',
      runnable: true
    }
  ]),
  challengeItem(
    'Comparison operators - Greater than',
    [
      { text: 'Use > to check if a is bigger than b.' },
      { text: 'Return a > b.' }
    ],
    'Use >.',
    'Return true when a is greater than b.',
    ['isGreaterThan(5, 3) -> true', 'isGreaterThan(2, 4) -> false'],
    `function isGreaterThan(a, b) {
  // Return a > b

}`,
    'isGreaterThan',
    [
      { input: [5, 3], expected: true, description: 'Greater than' },
      { input: [2, 4], expected: false, description: 'Not greater' }
    ],
    `function isGreaterThan(a, b) {
  return a > b;
}`
  ),
  challengeItem(
    'Comparison operators - Less than',
    [
      { text: 'Use < to check if a is smaller than b.' },
      { text: 'Return a < b.' }
    ],
    'Use <.',
    'Return true when a is less than b.',
    ['isLessThan(2, 4) -> true', 'isLessThan(5, 3) -> false'],
    `function isLessThan(a, b) {
  // Return a < b

}`,
    'isLessThan',
    [
      { input: [2, 4], expected: true, description: 'Less than' },
      { input: [5, 3], expected: false, description: 'Not less' }
    ],
    `function isLessThan(a, b) {
  return a < b;
}`
  ),
  challengeItem(
    'Comparison operators - Greater than or equal',
    [
      { text: 'Use >= to include equality.' },
      { text: 'Return a >= b.' }
    ],
    'Use >=.',
    'Return true when a is greater than or equal to b.',
    ['isAtLeast(4, 4) -> true', 'isAtLeast(3, 4) -> false'],
    `function isAtLeast(a, b) {
  // Return a >= b

}`,
    'isAtLeast',
    [
      { input: [4, 4], expected: true, description: 'Equal' },
      { input: [3, 4], expected: false, description: 'Less' }
    ],
    `function isAtLeast(a, b) {
  return a >= b;
}`
  ),
  challengeItem(
    'Comparison operators - Less than or equal',
    [
      { text: 'Use <= to include equality.' },
      { text: 'Return a <= b.' }
    ],
    'Use <=.',
    'Return true when a is less than or equal to b.',
    ['isAtMost(4, 4) -> true', 'isAtMost(5, 4) -> false'],
    `function isAtMost(a, b) {
  // Return a <= b

}`,
    'isAtMost',
    [
      { input: [4, 4], expected: true, description: 'Equal' },
      { input: [5, 4], expected: false, description: 'Greater' }
    ],
    `function isAtMost(a, b) {
  return a <= b;
}`
  ),
  challengeItem(
    'Comparison operators - Strict Equality',
    [
      { text: 'Strict equality === compares value and type.' },
      { text: 'Return a === b.' }
    ],
    'Use ===.',
    'Return true only if a and b are strictly equal.',
    ['isStrictEqual(5, 5) -> true', 'isStrictEqual(5, "5") -> false'],
    `function isStrictEqual(a, b) {
  // Return a === b

}`,
    'isStrictEqual',
    [
      { input: [5, 5], expected: true, description: 'Same type' },
      { input: [5, '5'], expected: false, description: 'Different type' }
    ],
    `function isStrictEqual(a, b) {
  return a === b;
}`
  ),
  challengeItem(
    'Comparison operators - Strict Inequality',
    [
      { text: 'Strict inequality !== compares value and type.' },
      { text: 'Return a !== b.' }
    ],
    'Use !==.',
    'Return true when a and b are not strictly equal.',
    ['isStrictNotEqual(5, "5") -> true', 'isStrictNotEqual(5, 5) -> false'],
    `function isStrictNotEqual(a, b) {
  // Return a !== b

}`,
    'isStrictNotEqual',
    [
      { input: [5, '5'], expected: true, description: 'Different type' },
      { input: [5, 5], expected: false, description: 'Same value' }
    ],
    `function isStrictNotEqual(a, b) {
  return a !== b;
}`
  ),
  challengeItem(
    'Logical operators - logical AND',
    [
      { text: 'The && operator is true only when both sides are true.' },
      { text: 'Return a && b.' }
    ],
    'Use &&.',
    'Return true only when both a and b are true.',
    ['bothTrue(true, false) -> false', 'bothTrue(true, true) -> true'],
    `function bothTrue(a, b) {
  // Return a && b

}`,
    'bothTrue',
    [
      { input: [true, false], expected: false, description: 'One false' },
      { input: [true, true], expected: true, description: 'Both true' }
    ],
    `function bothTrue(a, b) {
  return a && b;
}`
  ),
  challengeItem(
    'Logical operators - logical OR',
    [
      { text: 'The || operator is true if either side is true.' },
      { text: 'Return a || b.' }
    ],
    'Use ||.',
    'Return true when a or b is true.',
    ['eitherTrue(false, true) -> true', 'eitherTrue(false, false) -> false'],
    `function eitherTrue(a, b) {
  // Return a || b

}`,
    'eitherTrue',
    [
      { input: [false, true], expected: true, description: 'One true' },
      { input: [false, false], expected: false, description: 'Both false' }
    ],
    `function eitherTrue(a, b) {
  return a || b;
}`
  ),
  challengeItem(
    'Arithmetic operators - Addition',
    [
      { text: 'Use + to add two numbers.' },
      { text: 'Return the sum.' }
    ],
    'Return a + b.',
    'Return the sum of a and b.',
    ['add(2, 3) -> 5'],
    `function add(a, b) {
  // Return the sum

}`,
    'add',
    [
      { input: [2, 3], expected: 5, description: 'Simple sum' },
      { input: [10, -4], expected: 6, description: 'Negative numbers' }
    ],
    `function add(a, b) {
  return a + b;
}`
  ),
  challengeItem(
    'Arithmetic operators - Subtraction',
    [
      { text: 'Use - to subtract numbers.' },
      { text: 'Return a - b.' }
    ],
    'Return a - b.',
    'Return the difference of a and b.',
    ['subtract(5, 3) -> 2'],
    `function subtract(a, b) {
  // Return the difference

}`,
    'subtract',
    [
      { input: [5, 3], expected: 2, description: 'Simple subtract' },
      { input: [3, 5], expected: -2, description: 'Negative result' }
    ],
    `function subtract(a, b) {
  return a - b;
}`
  ),
  challengeItem(
    'Arithmetic operators - Multiplication',
    [
      { text: 'Use * to multiply numbers.' },
      { text: 'Return a * b.' }
    ],
    'Return a * b.',
    'Return the product of a and b.',
    ['multiply(4, 3) -> 12'],
    `function multiply(a, b) {
  // Return the product

}`,
    'multiply',
    [
      { input: [4, 3], expected: 12, description: 'Simple product' },
      { input: [5, 0], expected: 0, description: 'Multiply by zero' }
    ],
    `function multiply(a, b) {
  return a * b;
}`
  ),
  challengeItem(
    'Arithmetic operators - Division',
    [
      { text: 'Use / to divide numbers.' },
      { text: 'Return a / b.' }
    ],
    'Return a / b.',
    'Return the result of a divided by b.',
    ['divide(10, 2) -> 5'],
    `function divide(a, b) {
  // Return the quotient

}`,
    'divide',
    [
      { input: [10, 2], expected: 5, description: 'Simple division' },
      { input: [9, 3], expected: 3, description: 'Even division' }
    ],
    `function divide(a, b) {
  return a / b;
}`
  ),
  challengeItem(
    'Arithmetic operators - Exponential',
    [
      { text: 'Use ** to raise a number to a power.' },
      { text: 'Return base ** exponent.' }
    ],
    'Return base ** exponent.',
    'Return base raised to exponent.',
    ['power(2, 3) -> 8'],
    `function power(base, exponent) {
  // Return base to the power of exponent

}`,
    'power',
    [
      { input: [2, 3], expected: 8, description: '2 to the 3rd' },
      { input: [3, 2], expected: 9, description: '3 to the 2nd' }
    ],
    `function power(base, exponent) {
  return base ** exponent;
}`,
    'Beginner'
  ),
  challengeItem(
    'Arithmetic operators - Remainder',
    [
      { text: 'Use % to get the remainder after division.' },
      { text: 'Return a % b.' }
    ],
    'Return a % b.',
    'Return the remainder when a is divided by b.',
    ['remainder(10, 3) -> 1'],
    `function remainder(a, b) {
  // Return the remainder

}`,
    'remainder',
    [
      { input: [10, 3], expected: 1, description: 'Remainder 1' },
      { input: [12, 4], expected: 0, description: 'Even division' }
    ],
    `function remainder(a, b) {
  return a % b;
}`,
    'Beginner'
  ),
  examItem(
    'Test: JavaScript operators',
    [
      { text: 'Task 1: return the sum, difference, and product.' },
      { text: 'Task 2: return the quotient and a strict equality check.' }
    ],
    'Return an object with all results.',
    'Return { sum, difference, product, quotient, isStrictEqual } for a and b.',
    ['operatorExam(6, 3) -> { sum: 9, difference: 3, product: 18, quotient: 2, isStrictEqual: false }'],
    `function operatorExam(a, b) {
  // Return an object with results

}`,
    'operatorExam',
    [
      {
        input: [6, 3],
        expected: { sum: 9, difference: 3, product: 18, quotient: 2, isStrictEqual: false },
        description: 'Basic operator results'
      },
      {
        input: [5, 5],
        expected: { sum: 10, difference: 0, product: 25, quotient: 1, isStrictEqual: true },
        description: 'Equal values'
      }
    ],
    `function operatorExam(a, b) {
  return {
    sum: a + b,
    difference: a - b,
    product: a * b,
    quotient: a / b,
    isStrictEqual: a === b
  };
}`
  )
];

const stringsItems: ItemDefinition[] = [
  lessonItem('Introduction to JavaScript strings', [
    { text: 'Strings are sequences of characters.' },
    { text: 'You can create strings with single or double quotes.' },
    {
      text: 'Use + to combine strings.',
      codeExample: 'const first = "Hello";\nconst second = "World";\nconsole.log(first + " " + second);',
      runnable: true
    }
  ]),
  challengeItem(
    'Create a Javascript string',
    [
      { text: 'Create a string using quotes.' },
      { text: 'Return the string.' }
    ],
    'Return the string "JavaScript".',
    'Return the string "JavaScript".',
    ['createString() -> "JavaScript"'],
    `function createString() {
  // Return the string "JavaScript"

}`,
    'createString',
    [{ input: [], expected: 'JavaScript', description: 'String created' }],
    `function createString() {
  return "JavaScript";
}`,
    'Beginner'
  ),
  challengeItem(
    'Declare a String Variable',
    [
      { text: 'Store a string in a variable.' },
      { text: 'Return the variable.' }
    ],
    'Create a variable greeting with value "Hi".',
    'Create a variable greeting = "Hi" and return it.',
    ['declareString() -> "Hi"'],
    `function declareString() {
  // Create greeting and return it

}`,
    'declareString',
    [{ input: [], expected: 'Hi', description: 'Returned greeting' }],
    `function declareString() {
  const greeting = "Hi";
  return greeting;
}`,
    'Beginner'
  ),
  challengeItem(
    'Compare Strings with Different Quotes',
    [
      { text: 'Single and double quotes create the same string.' },
      { text: 'Compare them with ===.' }
    ],
    'Return the result of comparing "hello" and "hello".',
    'Return true when the two strings are the same.',
    ['compareQuotes() -> true'],
    `function compareQuotes() {
  // Compare "hello" and 'hello'

}`,
    'compareQuotes',
    [{ input: [], expected: true, description: 'Strings match' }],
    `function compareQuotes() {
  return "hello" === 'hello';
}`,
    'Beginner'
  ),
  challengeItem(
    'Different ways to create Javascript strings',
    [
      { text: 'You can use single quotes, double quotes, or template literals.' },
      { text: 'Return a string created with a template literal.' }
    ],
    'Use a template literal to return "Hi".',
    'Return the string "Hi" using a template literal.',
    ['stringWays() -> "Hi"'],
    `function stringWays() {
  // Return "Hi" using a template literal

}`,
    'stringWays',
    [{ input: [], expected: 'Hi', description: 'Template literal' }],
    `function stringWays() {
  return \`Hi\`;
}`,
    'Beginner'
  ),
  challengeItem(
    'Connect Javascript strings (1)',
    [
      { text: 'Use + to join strings.' },
      { text: 'Return the combined result.' }
    ],
    'Join first and last with a space.',
    'Return the full name by combining first and last.',
    ['connectStrings1("Ada", "Lovelace") -> "Ada Lovelace"'],
    `function connectStrings1(first, last) {
  // Return the full name

}`,
    'connectStrings1',
    [
      { input: ['Ada', 'Lovelace'], expected: 'Ada Lovelace', description: 'Full name' },
      { input: ['Sam', 'Lee'], expected: 'Sam Lee', description: 'Another name' }
    ],
    `function connectStrings1(first, last) {
  return first + " " + last;
}`
  ),
  challengeItem(
    'Find the Length of a String',
    [
      { text: 'Every string has a length property.' },
      { text: 'Return str.length.' }
    ],
    'Use the length property.',
    'Return the length of the input string.',
    ['stringLength("hello") -> 5'],
    `function stringLength(str) {
  // Return the length of str

}`,
    'stringLength',
    [
      { input: ['hello'], expected: 5, description: 'Length 5' },
      { input: [''], expected: 0, description: 'Empty string' }
    ],
    `function stringLength(str) {
  return str.length;
}`
  ),
  challengeItem(
    'Repeat a Word Twice',
    [
      { text: 'You can concatenate a word with itself.' },
      { text: 'Return the word repeated twice.' }
    ],
    'Use + to repeat the word.',
    'Return the word twice with no extra space.',
    ['repeatTwice("ha") -> "haha"'],
    `function repeatTwice(word) {
  // Return word twice

}`,
    'repeatTwice',
    [
      { input: ['ha'], expected: 'haha', description: 'Repeat twice' },
      { input: ['ok'], expected: 'okok', description: 'Repeat ok' }
    ],
    `function repeatTwice(word) {
  return word + word;
}`
  ),
  challengeItem(
    'Is the String Longer Than 5?',
    [
      { text: 'Compare str.length to 5.' },
      { text: 'Return true when it is longer.' }
    ],
    'Return str.length > 5.',
    'Return true if the string is longer than 5 characters.',
    ['isLongerThanFive("planet") -> true'],
    `function isLongerThanFive(str) {
  // Return true if str is longer than 5

}`,
    'isLongerThanFive',
    [
      { input: ['planet'], expected: true, description: 'Length 6' },
      { input: ['short'], expected: false, description: 'Length 5' }
    ],
    `function isLongerThanFive(str) {
  return str.length > 5;
}`
  ),
  challengeItem(
    'Form a Simple Sentence',
    [
      { text: 'Join words with spaces.' },
      { text: 'Add a period at the end.' }
    ],
    'Use string concatenation.',
    'Return a sentence in the form "subject verb."',
    ['makeSentence("Dogs", "run") -> "Dogs run."'],
    `function makeSentence(subject, verb) {
  // Return a simple sentence

}`,
    'makeSentence',
    [
      { input: ['Dogs', 'run'], expected: 'Dogs run.', description: 'Sentence' },
      { input: ['Birds', 'fly'], expected: 'Birds fly.', description: 'Sentence' }
    ],
    `function makeSentence(subject, verb) {
  return subject + " " + verb + ".";
}`
  ),
  challengeItem(
    'Store the First Character',
    [
      { text: 'Characters are accessed by index.' },
      { text: 'The first character is at index 0.' }
    ],
    'Return str[0].',
    'Return the first character of the string.',
    ['firstChar("abc") -> "a"'],
    `function firstChar(str) {
  // Return the first character

}`,
    'firstChar',
    [
      { input: ['abc'], expected: 'a', description: 'First character' },
      { input: ['Z'], expected: 'Z', description: 'Single character' }
    ],
    `function firstChar(str) {
  return str[0];
}`
  ),
  challengeItem(
    'Store the Last Character',
    [
      { text: 'The last character is at index length - 1.' },
      { text: 'Return that character.' }
    ],
    'Use str.length - 1.',
    'Return the last character of the string.',
    ['lastChar("abc") -> "c"'],
    `function lastChar(str) {
  // Return the last character

}`,
    'lastChar',
    [
      { input: ['abc'], expected: 'c', description: 'Last character' },
      { input: ['Z'], expected: 'Z', description: 'Single character' }
    ],
    `function lastChar(str) {
  return str[str.length - 1];
}`
  ),
  challengeItem(
    'Are the First and Last Characters the Same?',
    [
      { text: 'Compare the first and last characters.' },
      { text: 'Return true when they match.' }
    ],
    'Compare str[0] and str[str.length - 1].',
    'Return true if the first and last characters are the same.',
    ['isFirstLastSame("level") -> true'],
    `function isFirstLastSame(str) {
  // Compare first and last characters

}`,
    'isFirstLastSame',
    [
      { input: ['level'], expected: true, description: 'Same ends' },
      { input: ['hello'], expected: false, description: 'Different ends' }
    ],
    `function isFirstLastSame(str) {
  if (str.length === 0) return false;
  return str[0] === str[str.length - 1];
}`
  ),
  challengeItem(
    'Get the Character at a Given Index',
    [
      { text: 'Use bracket notation with the index.' },
      { text: 'Return the character.' }
    ],
    'Return str[index].',
    'Return the character at the given index.',
    ['charAtIndex("abc", 1) -> "b"'],
    `function charAtIndex(str, index) {
  // Return the character at index

}`,
    'charAtIndex',
    [
      { input: ['abc', 1], expected: 'b', description: 'Middle char' },
      { input: ['code', 0], expected: 'c', description: 'First char' }
    ],
    `function charAtIndex(str, index) {
  return str[index];
}`
  ),
  challengeItem(
    'Case Sensitivity in String Comparisons',
    [
      { text: 'String comparisons are case sensitive.' },
      { text: 'Compare the strings with ===.' }
    ],
    'Return the comparison result.',
    'Return true only if the strings are exactly the same.',
    ['isSameString("Hi", "hi") -> false'],
    `function isSameString(a, b) {
  // Compare with ===

}`,
    'isSameString',
    [
      { input: ['Hi', 'hi'], expected: false, description: 'Case differs' },
      { input: ['Hi', 'Hi'], expected: true, description: 'Exact match' }
    ],
    `function isSameString(a, b) {
  return a === b;
}`
  ),
  challengeItem(
    'Connect Javascript strings (2)',
    [
      { text: 'Template literals can also combine strings.' },
      { text: 'Return the combined string.' }
    ],
    'Use a template literal.',
    'Return "first last" using a template literal.',
    ['connectStrings2("Ada", "Lovelace") -> "Ada Lovelace"'],
    `function connectStrings2(first, last) {
  // Use a template literal

}`,
    'connectStrings2',
    [
      { input: ['Ada', 'Lovelace'], expected: 'Ada Lovelace', description: 'Full name' },
      { input: ['Sam', 'Lee'], expected: 'Sam Lee', description: 'Another name' }
    ],
    `function connectStrings2(first, last) {
  return \`\${first} \${last}\`;
}`
  ),
  challengeItem(
    'Connect Javascript strings (3)',
    [
      { text: 'You can combine more than two strings.' },
      { text: 'Return the combined string.' }
    ],
    'Join three words with spaces.',
    'Return a sentence using three words.',
    ['connectStrings3("I", "love", "code") -> "I love code"'],
    `function connectStrings3(a, b, c) {
  // Join three words

}`,
    'connectStrings3',
    [
      { input: ['I', 'love', 'code'], expected: 'I love code', description: 'Three words' },
      { input: ['We', 'learn', 'JS'], expected: 'We learn JS', description: 'Another sentence' }
    ],
    `function connectStrings3(a, b, c) {
  return a + " " + b + " " + c;
}`
  ),
  challengeItem(
    'Create a Greeting with Template Literals',
    [
      { text: 'Template literals use backticks and ${} placeholders.' },
      { text: 'Return a greeting string.' }
    ],
    'Use a template literal.',
    'Return "Hello, {name}!" using a template literal.',
    ['greetTemplate("Sam") -> "Hello, Sam!"'],
    `function greetTemplate(name) {
  // Return greeting with template literal

}`,
    'greetTemplate',
    [
      { input: ['Sam'], expected: 'Hello, Sam!', description: 'Greeting' },
      { input: ['Ava'], expected: 'Hello, Ava!', description: 'Another name' }
    ],
    `function greetTemplate(name) {
  return \`Hello, \${name}!\`;
}`
  ),
  challengeItem(
    "Display a User's Age with Template Literals",
    [
      { text: 'Template literals can embed numbers too.' },
      { text: 'Return the formatted string.' }
    ],
    'Use a template literal.',
    'Return "{name} is {age} years old."',
    ['ageMessage("Sam", 20) -> "Sam is 20 years old."'],
    `function ageMessage(name, age) {
  // Return the age message

}`,
    'ageMessage',
    [
      { input: ['Sam', 20], expected: 'Sam is 20 years old.', description: 'Age message' },
      { input: ['Ava', 31], expected: 'Ava is 31 years old.', description: 'Another age' }
    ],
    `function ageMessage(name, age) {
  return \`\${name} is \${age} years old.\`;
}`
  ),
  challengeItem(
    'Simple Math in a Template Literal',
    [
      { text: 'You can put expressions inside ${}.' },
      { text: 'Return the formatted math string.' }
    ],
    'Include the sum inside the string.',
    'Return "a + b = result" using a template literal.',
    ['mathTemplate(2, 3) -> "2 + 3 = 5"'],
    `function mathTemplate(a, b) {
  // Return the math string

}`,
    'mathTemplate',
    [
      { input: [2, 3], expected: '2 + 3 = 5', description: 'Simple math' },
      { input: [5, 7], expected: '5 + 7 = 12', description: 'Another sum' }
    ],
    `function mathTemplate(a, b) {
  return \`\${a} + \${b} = \${a + b}\`;
}`
  ),
  challengeItem(
    'Convert to Uppercase',
    [
      { text: 'Use toUpperCase() to uppercase a string.' },
      { text: 'Return the uppercased string.' }
    ],
    'Use toUpperCase().',
    'Return the string in all uppercase letters.',
    ['toUpperCaseString("hi") -> "HI"'],
    `function toUpperCaseString(str) {
  // Return uppercase

}`,
    'toUpperCaseString',
    [
      { input: ['hi'], expected: 'HI', description: 'Uppercase' },
      { input: ['JavaScript'], expected: 'JAVASCRIPT', description: 'Uppercase' }
    ],
    `function toUpperCaseString(str) {
  return str.toUpperCase();
}`
  ),
  challengeItem(
    'Convert to Lowercase',
    [
      { text: 'Use toLowerCase() to lowercase a string.' },
      { text: 'Return the lowercased string.' }
    ],
    'Use toLowerCase().',
    'Return the string in all lowercase letters.',
    ['toLowerCaseString("Hi") -> "hi"'],
    `function toLowerCaseString(str) {
  // Return lowercase

}`,
    'toLowerCaseString',
    [
      { input: ['Hi'], expected: 'hi', description: 'Lowercase' },
      { input: ['JavaScript'], expected: 'javascript', description: 'Lowercase' }
    ],
    `function toLowerCaseString(str) {
  return str.toLowerCase();
}`
  ),
  challengeItem(
    'Uppercase and Lowercase Mixed',
    [
      { text: 'You can combine multiple string transformations.' },
      { text: 'Return upper-lower separated by a hyphen.' }
    ],
    'Return upper + "-" + lower.',
    'Return the uppercase and lowercase versions separated by "-".',
    ['mixCase("Hi") -> "HI-hi"'],
    `function mixCase(str) {
  // Return upper-lower combined

}`,
    'mixCase',
    [
      { input: ['Hi'], expected: 'HI-hi', description: 'Mixed case' },
      { input: ['JavaScript'], expected: 'JAVASCRIPT-javascript', description: 'Mixed case' }
    ],
    `function mixCase(str) {
  return str.toUpperCase() + "-" + str.toLowerCase();
}`
  ),
  challengeItem(
    'Case-insensitive String Comparison',
    [
      { text: 'Convert both strings to the same case first.' },
      { text: 'Then compare with ===.' }
    ],
    'Use toLowerCase on both strings.',
    'Return true if the strings match ignoring case.',
    ['equalsIgnoreCase("Hi", "hi") -> true'],
    `function equalsIgnoreCase(a, b) {
  // Compare ignoring case

}`,
    'equalsIgnoreCase',
    [
      { input: ['Hi', 'hi'], expected: true, description: 'Ignore case' },
      { input: ['Hello', 'world'], expected: false, description: 'Different' }
    ],
    `function equalsIgnoreCase(a, b) {
  return a.toLowerCase() === b.toLowerCase();
}`
  ),
  challengeItem(
    'Validate Email',
    [
      { text: 'A simple email check looks for @ and a dot after it.' },
      { text: 'Return true if the pattern looks valid.' }
    ],
    'Check for @ and a dot after it.',
    'Return true if the email contains @ and a dot after @.',
    ['isValidEmail("a@b.com") -> true', 'isValidEmail("abc") -> false'],
    `function isValidEmail(email) {
  // Simple validation check

}`,
    'isValidEmail',
    [
      { input: ['a@b.com'], expected: true, description: 'Valid email' },
      { input: ['abc'], expected: false, description: 'Missing at' },
      { input: ['a@b'], expected: false, description: 'Missing dot' },
      { input: ['a@b.'], expected: false, description: 'Dot at end' }
    ],
    `function isValidEmail(email) {
  const atIndex = email.indexOf('@');
  if (atIndex <= 0) return false;
  const dotIndex = email.indexOf('.', atIndex + 1);
  if (dotIndex <= atIndex + 1) return false;
  if (dotIndex === email.length - 1) return false;
  return true;
}`,
    'Medium'
  ),
  challengeItem(
    'Case Sensitive Includes',
    [
      { text: 'includes checks for a substring and is case sensitive.' },
      { text: 'Return the result of text.includes(query).' }
    ],
    'Use includes.',
    'Return true if text includes query (case sensitive).',
    ['includesCaseSensitive("Hello", "He") -> true'],
    `function includesCaseSensitive(text, query) {
  // Return text.includes(query)

}`,
    'includesCaseSensitive',
    [
      { input: ['Hello', 'He'], expected: true, description: 'Match at start' },
      { input: ['Hello', 'he'], expected: false, description: 'Case sensitive' }
    ],
    `function includesCaseSensitive(text, query) {
  return text.includes(query);
}`
  ),
  examItem(
    'Test: JavaScript strings',
    [
      { text: 'Task 1: create a full name with a space.' },
      { text: 'Task 2: create initials from first and last names.' },
      { text: 'Task 3: return whether the full name is longer than 10.' }
    ],
    'Return an object with fullName, initials, and isLong.',
    'Return { fullName, initials, isLong } for the given names.',
    ['stringExam("Ada", "Lovelace") -> { fullName: "Ada Lovelace", initials: "AL", isLong: true }'],
    `function stringExam(firstName, lastName) {
  // Build fullName, initials, and isLong

}`,
    'stringExam',
    [
      {
        input: ['Ada', 'Lovelace'],
        expected: { fullName: 'Ada Lovelace', initials: 'AL', isLong: true },
        description: 'Long full name'
      },
      {
        input: ['Sam', 'Lee'],
        expected: { fullName: 'Sam Lee', initials: 'SL', isLong: false },
        description: 'Short full name'
      }
    ],
    `function stringExam(firstName, lastName) {
  const fullName = firstName + " " + lastName;
  const initials = firstName[0] + lastName[0];
  const isLong = fullName.length > 10;
  return { fullName, initials, isLong };
}`
  )
];

const conditionalsItems: ItemDefinition[] = [
  lessonItem('Introduction to conditional statements', [
    { text: 'Conditionals let your code make decisions.' },
    { text: 'if runs code when a condition is true.' },
    {
      text: 'else runs when the condition is false.',
      codeExample: 'const score = 70;\nif (score >= 60) {\n  console.log("pass");\n} else {\n  console.log("fail");\n}',
      runnable: true
    }
  ]),
  challengeItem(
    'if statement - satisfy condition',
    [
      { text: 'Use an if statement to compare values.' },
      { text: 'Return "yes" or "no".' }
    ],
    'Check if n is greater than 10.',
    'Return "yes" if n > 10, otherwise return "no".',
    ['isAboveTen(12) -> "yes"', 'isAboveTen(5) -> "no"'],
    `function isAboveTen(n) {
  // Return "yes" if n > 10

}`,
    'isAboveTen',
    [
      { input: [12], expected: 'yes', description: 'Above 10' },
      { input: [5], expected: 'no', description: 'Not above 10' }
    ],
    `function isAboveTen(n) {
  if (n > 10) {
    return "yes";
  }
  return "no";
}`,
    'Beginner'
  ),
  challengeItem(
    'Password Hint',
    [
      { text: 'Check string length to make decisions.' },
      { text: 'Return a hint based on length.' }
    ],
    'Use password.length to decide.',
    'Return "too short" if password length is under 8, else "ok".',
    ['passwordHint("short") -> "too short"'],
    `function passwordHint(password) {
  // Return a hint based on length

}`,
    'passwordHint',
    [
      { input: ['short'], expected: 'too short', description: 'Short password' },
      { input: ['longenough'], expected: 'ok', description: 'Long enough' }
    ],
    `function passwordHint(password) {
  if (password.length < 8) {
    return "too short";
  }
  return "ok";
}`,
    'Beginner'
  ),
  challengeItem(
    'Password Hint II',
    [
      { text: 'Use else if for multiple checks.' },
      { text: 'Return the best hint.' }
    ],
    'Check length first, then check for a number.',
    'Return "too short" if length < 8, "add number" if no digit, else "strong".',
    ['passwordHintII("password") -> "add number"'],
    `function passwordHintII(password) {
  // Return a detailed hint

}`,
    'passwordHintII',
    [
      { input: ['short'], expected: 'too short', description: 'Too short' },
      { input: ['password'], expected: 'add number', description: 'Missing number' },
      { input: ['pass1234'], expected: 'strong', description: 'Strong' }
    ],
    `function passwordHintII(password) {
  if (password.length < 8) {
    return "too short";
  }
  const hasNumber = /\\d/.test(password);
  if (!hasNumber) {
    return "add number";
  }
  return "strong";
}`,
    'Easy'
  ),
  challengeItem(
    'if statement - add missing condition',
    [
      { text: 'Use a comparison in the if condition.' },
      { text: 'Return the correct string.' }
    ],
    'Check if age is 18 or older.',
    'Return "yes" if age >= 18, otherwise "no".',
    ['canVote(18) -> "yes"', 'canVote(17) -> "no"'],
    `function canVote(age) {
  // Return "yes" if age >= 18

}`,
    'canVote',
    [
      { input: [18], expected: 'yes', description: 'Adult' },
      { input: [17], expected: 'no', description: 'Minor' }
    ],
    `function canVote(age) {
  if (age >= 18) {
    return "yes";
  }
  return "no";
}`,
    'Beginner'
  ),
  challengeItem(
    'Secret Code Check',
    [
      { text: 'Use strict equality to match a secret code.' },
      { text: 'Return true when it matches.' }
    ],
    'Check if code equals "XYZZY".',
    'Return true if code is "XYZZY", otherwise false.',
    ['isSecret("XYZZY") -> true'],
    `function isSecret(code) {
  // Return true if code is "XYZZY"

}`,
    'isSecret',
    [
      { input: ['XYZZY'], expected: true, description: 'Matches secret' },
      { input: ['OPEN'], expected: false, description: 'Wrong code' }
    ],
    `function isSecret(code) {
  return code === "XYZZY";
}`,
    'Beginner'
  ),
  lessonItem('Testing multiple conditions with JavaScript conditionals', [
    { text: 'Use && to require both conditions.' },
    { text: 'Use || to allow either condition.' },
    {
      text: 'Combine comparisons for more specific rules.',
      codeExample: 'const age = 20;\nconst hasTicket = true;\nconsole.log(age >= 18 && hasTicket);',
      runnable: true
    }
  ]),
  challengeItem(
    'if...else statement - run else',
    [
      { text: 'Use else to handle the false case.' },
      { text: 'Return the correct status.' }
    ],
    'Return "online" or "offline".',
    'Return "online" if isOnline is true, otherwise "offline".',
    ['statusLabel(true) -> "online"'],
    `function statusLabel(isOnline) {
  // Return a status label

}`,
    'statusLabel',
    [
      { input: [true], expected: 'online', description: 'Online' },
      { input: [false], expected: 'offline', description: 'Offline' }
    ],
    `function statusLabel(isOnline) {
  if (isOnline) {
    return "online";
  }
  return "offline";
}`,
    'Beginner'
  ),
  challengeItem(
    'Check Password Strength',
    [
      { text: 'Longer passwords are stronger.' },
      { text: 'Return "strong" or "weak".' }
    ],
    'Use length >= 12.',
    'Return "strong" if length >= 12, else "weak".',
    ['passwordStrength("longpassword") -> "strong"'],
    `function passwordStrength(password) {
  // Return "strong" or "weak"

}`,
    'passwordStrength',
    [
      { input: ['longpassword'], expected: 'strong', description: 'Strong' },
      { input: ['short'], expected: 'weak', description: 'Weak' }
    ],
    `function passwordStrength(password) {
  if (password.length >= 12) {
    return "strong";
  }
  return "weak";
}`,
    'Easy'
  ),
  challengeItem(
    'if statement - test multiple conditions',
    [
      { text: 'Use && to combine conditions.' },
      { text: 'Return true only when both pass.' }
    ],
    'Check age >= 18 and hasTicket is true.',
    'Return true only if age >= 18 and hasTicket is true.',
    ['canEnter(20, true) -> true'],
    `function canEnter(age, hasTicket) {
  // Return true when both conditions pass

}`,
    'canEnter',
    [
      { input: [20, true], expected: true, description: 'Allowed' },
      { input: [17, true], expected: false, description: 'Too young' },
      { input: [20, false], expected: false, description: 'No ticket' }
    ],
    `function canEnter(age, hasTicket) {
  return age >= 18 && hasTicket;
}`,
    'Easy'
  ),
  challengeItem(
    'Password Hint with Multiple Conditions',
    [
      { text: 'Check length first, then check for a number.' },
      { text: 'Return the best hint.' }
    ],
    'Use length and a digit check.',
    'Return "too short", "add number", or "good".',
    ['passwordHintMulti("pass") -> "too short"'],
    `function passwordHintMulti(password) {
  // Return the best hint

}`,
    'passwordHintMulti',
    [
      { input: ['pass'], expected: 'too short', description: 'Short' },
      { input: ['password'], expected: 'add number', description: 'No number' },
      { input: ['pass1234'], expected: 'good', description: 'Good' }
    ],
    `function passwordHintMulti(password) {
  if (password.length < 8) {
    return "too short";
  }
  const hasNumber = /\\d/.test(password);
  if (!hasNumber) {
    return "add number";
  }
  return "good";
}`,
    'Easy'
  ),
  challengeItem(
    'else-if',
    [
      { text: 'Use else if to chain conditions.' },
      { text: 'Return a letter grade.' }
    ],
    'Check highest scores first.',
    'Return A for 90+, B for 80+, C for 70+, else F.',
    ['grade(95) -> "A"'],
    `function grade(score) {
  // Return A, B, C, or F

}`,
    'grade',
    [
      { input: [95], expected: 'A', description: 'A grade' },
      { input: [82], expected: 'B', description: 'B grade' },
      { input: [70], expected: 'C', description: 'C grade' },
      { input: [50], expected: 'F', description: 'F grade' }
    ],
    `function grade(score) {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  return "F";
}`,
    'Medium'
  ),
  challengeItem(
    'Fix the Conditional Logic',
    [
      { text: 'Check zero before positive or negative.' },
      { text: 'Return the correct label.' }
    ],
    'Use else if to cover all cases.',
    'Return "positive", "negative", or "zero" based on the number.',
    ['signLabel(3) -> "positive"'],
    `function signLabel(n) {
  // Return "positive", "negative", or "zero"

}`,
    'signLabel',
    [
      { input: [3], expected: 'positive', description: 'Positive' },
      { input: [-2], expected: 'negative', description: 'Negative' },
      { input: [0], expected: 'zero', description: 'Zero' }
    ],
    `function signLabel(n) {
  if (n === 0) return "zero";
  if (n > 0) return "positive";
  return "negative";
}`,
    'Medium'
  ),
  challengeItem(
    'Conditional (ternary) operator',
    [
      { text: 'The ternary operator is a short if/else.' },
      { text: 'Return the larger number.' }
    ],
    'Use a ? b : c.',
    'Return the larger of a and b using a ternary operator.',
    ['maxNumber(3, 5) -> 5'],
    `function maxNumber(a, b) {
  // Use a ternary operator

}`,
    'maxNumber',
    [
      { input: [3, 5], expected: 5, description: 'Max value' },
      { input: [10, 2], expected: 10, description: 'Max value' }
    ],
    `function maxNumber(a, b) {
  return a > b ? a : b;
}`,
    'Easy'
  ),
  challengeItem(
    'Use a Ternary Operator Instead of if/else',
    [
      { text: 'Ternary can return one of two strings.' },
      { text: 'Return "even" or "odd".' }
    ],
    'Use n % 2 === 0 ? "even" : "odd".',
    'Return "even" if n is even, otherwise "odd".',
    ['evenOrOdd(4) -> "even"'],
    `function evenOrOdd(n) {
  // Use a ternary operator

}`,
    'evenOrOdd',
    [
      { input: [4], expected: 'even', description: 'Even' },
      { input: [7], expected: 'odd', description: 'Odd' }
    ],
    `function evenOrOdd(n) {
  return n % 2 === 0 ? "even" : "odd";
}`,
    'Easy'
  ),
  examItem(
    'Test: JavaScript conditionals',
    [
      { text: 'Task 1: return "vip" if isVIP is true.' },
      { text: 'Task 2: return "general" if age >= 18 and hasTicket is true.' },
      { text: 'Task 3: otherwise return "denied".' }
    ],
    'Check VIP first, then check age and ticket.',
    'Return access level based on VIP, age, and ticket.',
    ['accessLevel(20, true, false) -> "general"'],
    `function accessLevel(age, hasTicket, isVIP) {
  // Return "vip", "general", or "denied"

}`,
    'accessLevel',
    [
      { input: [30, false, true], expected: 'vip', description: 'VIP' },
      { input: [20, true, false], expected: 'general', description: 'General access' },
      { input: [16, true, false], expected: 'denied', description: 'Too young' }
    ],
    `function accessLevel(age, hasTicket, isVIP) {
  if (isVIP) return "vip";
  if (age >= 18 && hasTicket) return "general";
  return "denied";
}`
  )
];

const functionsItems: ItemDefinition[] = [
  lessonItem('Introduction to JavaScript functions', [
    { text: 'Functions group reusable code.' },
    { text: 'A function can take inputs and return a value.' },
    {
      text: 'Call a function using its name with parentheses.',
      codeExample: 'function greet() {\n  return "Hi";\n}\nconsole.log(greet());',
      runnable: true
    }
  ]),
  challengeItem(
    'Function declaration',
    [
      { text: 'A function declaration starts with the function keyword.' },
      { text: 'Return a simple value.' }
    ],
    'Create a function that returns "Hi".',
    'Return the string "Hi".',
    ['sayHi() -> "Hi"'],
    `function sayHi() {
  // Return "Hi"

}`,
    'sayHi',
    [{ input: [], expected: 'Hi', description: 'Greeting' }],
    `function sayHi() {
  return "Hi";
}`,
    'Beginner'
  ),
  challengeItem(
    'Function calling',
    [
      { text: 'You can call one function from another.' },
      { text: 'Return the result of the helper function.' }
    ],
    'Call greet inside callGreet.',
    'Return greet() from callGreet().',
    ['callGreet() -> "Hello"'],
    `function greet() {
  return "Hello";
}

function callGreet() {
  // Call greet and return its result

}`,
    'callGreet',
    [{ input: [], expected: 'Hello', description: 'Function call' }],
    `function greet() {
  return "Hello";
}

function callGreet() {
  return greet();
}`,
    'Beginner'
  ),
  challengeItem(
    'Correctly return value from function (1)',
    [
      { text: 'Use return to send a value back.' },
      { text: 'Return the number 10.' }
    ],
    'Return 10.',
    'Return the number 10.',
    ['getTen() -> 10'],
    `function getTen() {
  // Return 10

}`,
    'getTen',
    [{ input: [], expected: 10, description: 'Return value' }],
    `function getTen() {
  return 10;
}`,
    'Beginner'
  ),
  challengeItem(
    'Add the Missing Function Keyword',
    [
      { text: 'Function declarations start with the function keyword.' },
      { text: 'Return the sum of a and b.' }
    ],
    'Use a function declaration.',
    'Return a + b from addNumbers.',
    ['addNumbers(2, 3) -> 5'],
    `function addNumbers(a, b) {
  // Return the sum

}`,
    'addNumbers',
    [
      { input: [2, 3], expected: 5, description: 'Sum' },
      { input: [5, 1], expected: 6, description: 'Sum' }
    ],
    `function addNumbers(a, b) {
  return a + b;
}`,
    'Beginner'
  ),
  challengeItem(
    'Add the Missing Function Name',
    [
      { text: 'Functions should have clear names.' },
      { text: 'Return the product of a and b.' }
    ],
    'Name the function multiplyNumbers.',
    'Return a * b from multiplyNumbers.',
    ['multiplyNumbers(2, 3) -> 6'],
    `function multiplyNumbers(a, b) {
  // Return the product

}`,
    'multiplyNumbers',
    [
      { input: [2, 3], expected: 6, description: 'Product' },
      { input: [5, 0], expected: 0, description: 'Zero' }
    ],
    `function multiplyNumbers(a, b) {
  return a * b;
}`,
    'Beginner'
  ),
  challengeItem(
    'Correctly return value from function (2)',
    [
      { text: 'Return strings just like numbers.' },
      { text: 'Return "Welcome".' }
    ],
    'Return "Welcome".',
    'Return the string "Welcome".',
    ['getWelcome() -> "Welcome"'],
    `function getWelcome() {
  // Return "Welcome"

}`,
    'getWelcome',
    [{ input: [], expected: 'Welcome', description: 'String return' }],
    `function getWelcome() {
  return "Welcome";
}`,
    'Beginner'
  ),
  challengeItem(
    'Complete the function',
    [
      { text: 'Use parameters in your calculation.' },
      { text: 'Return the square of the number.' }
    ],
    'Return n * n.',
    'Return the square of the input number.',
    ['square(4) -> 16'],
    `function square(n) {
  // Return n squared

}`,
    'square',
    [
      { input: [4], expected: 16, description: 'Square' },
      { input: [0], expected: 0, description: 'Zero' }
    ],
    `function square(n) {
  return n * n;
}`,
    'Beginner'
  ),
  challengeItem(
    'Declare a Simple Function',
    [
      { text: 'A simple function can return true.' },
      { text: 'Return true.' }
    ],
    'Return true.',
    'Return the boolean true.',
    ['isTrue() -> true'],
    `function isTrue() {
  // Return true

}`,
    'isTrue',
    [{ input: [], expected: true, description: 'True' }],
    `function isTrue() {
  return true;
}`,
    'Beginner'
  ),
  lessonItem('Introduction to function parameters', [
    { text: 'Parameters are inputs to a function.' },
    { text: 'Arguments are the actual values passed in.' },
    {
      text: 'Use parameters in the function body.',
      codeExample: 'function double(n) {\n  return n * 2;\n}\nconsole.log(double(4));',
      runnable: true
    }
  ]),
  challengeItem(
    'Functions - parameters and arguments (1)',
    [
      { text: 'Use the parameter to compute a result.' },
      { text: 'Return n * 2.' }
    ],
    'Multiply the input by 2.',
    'Return double the input number.',
    ['double(4) -> 8'],
    `function double(n) {
  // Return n * 2

}`,
    'double',
    [
      { input: [4], expected: 8, description: 'Double' },
      { input: [0], expected: 0, description: 'Zero' }
    ],
    `function double(n) {
  return n * 2;
}`,
    'Beginner'
  ),
  challengeItem(
    'Add Missing Function Parameters',
    [
      { text: 'Add parameters so you can use inputs.' },
      { text: 'Return a + b.' }
    ],
    'Use parameters a and b.',
    'Return the sum of a and b.',
    ['sumValues(3, 4) -> 7'],
    `function sumValues(a, b) {
  // Return a + b

}`,
    'sumValues',
    [
      { input: [3, 4], expected: 7, description: 'Sum' },
      { input: [10, -5], expected: 5, description: 'Sum' }
    ],
    `function sumValues(a, b) {
  return a + b;
}`,
    'Beginner'
  ),
  challengeItem(
    'Find the Bug: Parameters in subtract function',
    [
      { text: 'Subtraction order matters.' },
      { text: 'Return a - b.' }
    ],
    'Use the correct parameter order.',
    'Return a minus b.',
    ['subtractValues(10, 3) -> 7'],
    `function subtractValues(a, b) {
  // Return a - b

}`,
    'subtractValues',
    [
      { input: [10, 3], expected: 7, description: 'Subtract' },
      { input: [3, 10], expected: -7, description: 'Negative result' }
    ],
    `function subtractValues(a, b) {
  return a - b;
}`,
    'Beginner'
  ),
  challengeItem(
    'Complete the greet function',
    [
      { text: 'Use the name parameter in your message.' },
      { text: 'Return a greeting.' }
    ],
    'Return "Hello, {name}".',
    'Return a greeting using the name parameter.',
    ['greetUser("Sam") -> "Hello, Sam"'],
    `function greetUser(name) {
  // Return a greeting

}`,
    'greetUser',
    [
      { input: ['Sam'], expected: 'Hello, Sam', description: 'Greeting' },
      { input: ['Ava'], expected: 'Hello, Ava', description: 'Greeting' }
    ],
    `function greetUser(name) {
  return "Hello, " + name;
}`,
    'Beginner'
  ),
  challengeItem(
    'Functions - parameters and arguments (2)',
    [
      { text: 'Functions can take more than one parameter.' },
      { text: 'Return the sum of three numbers.' }
    ],
    'Add a, b, and c.',
    'Return the sum of a, b, and c.',
    ['addThree(1, 2, 3) -> 6'],
    `function addThree(a, b, c) {
  // Return the sum

}`,
    'addThree',
    [
      { input: [1, 2, 3], expected: 6, description: 'Sum of three' },
      { input: [5, 0, -2], expected: 3, description: 'Mixed numbers' }
    ],
    `function addThree(a, b, c) {
  return a + b + c;
}`,
    'Beginner'
  ),
  challengeItem(
    'Functions - parameters and arguments (3)',
    [
      { text: 'Parameters can be used in string results.' },
      { text: 'Return "a-b".' }
    ],
    'Combine the values with a dash.',
    'Return the two values joined by a dash.',
    ['combineDash("a", "b") -> "a-b"'],
    `function combineDash(a, b) {
  // Return values joined by a dash

}`,
    'combineDash',
    [
      { input: ['a', 'b'], expected: 'a-b', description: 'Combined' },
      { input: ['one', 'two'], expected: 'one-two', description: 'Combined' }
    ],
    `function combineDash(a, b) {
  return a + "-" + b;
}`,
    'Beginner'
  ),
  challengeItem(
    'Return early from function',
    [
      { text: 'Return early to handle invalid input.' },
      { text: 'Return false when n <= 0.' }
    ],
    'Use an early return.',
    'Return true if n is positive, otherwise false.',
    ['isPositive(3) -> true', 'isPositive(0) -> false'],
    `function isPositive(n) {
  // Return true only if n is positive

}`,
    'isPositive',
    [
      { input: [3], expected: true, description: 'Positive' },
      { input: [0], expected: false, description: 'Zero' },
      { input: [-1], expected: false, description: 'Negative' }
    ],
    `function isPositive(n) {
  if (n <= 0) return false;
  return true;
}`,
    'Easy'
  ),
  challengeItem(
    'Is Adult Function',
    [
      { text: 'Check if age is at least 18.' },
      { text: 'Return a boolean.' }
    ],
    'Return age >= 18.',
    'Return true if age is 18 or older.',
    ['isAdult(18) -> true', 'isAdult(17) -> false'],
    `function isAdult(age) {
  // Return true if age >= 18

}`,
    'isAdult',
    [
      { input: [18], expected: true, description: 'Adult' },
      { input: [17], expected: false, description: 'Minor' }
    ],
    `function isAdult(age) {
  return age >= 18;
}`,
    'Beginner'
  ),
  challengeItem(
    'Check for Empty String',
    [
      { text: 'Empty strings have length 0.' },
      { text: 'Return true when the string is empty.' }
    ],
    'Use str.length === 0.',
    'Return true if the string is empty.',
    ['isEmpty("") -> true', 'isEmpty("hi") -> false'],
    `function isEmpty(str) {
  // Return true if str is empty

}`,
    'isEmpty',
    [
      { input: [''], expected: true, description: 'Empty' },
      { input: ['hi'], expected: false, description: 'Not empty' }
    ],
    `function isEmpty(str) {
  return str.length === 0;
}`,
    'Beginner'
  ),
  challengeItem(
    'Is Weekend Function',
    [
      { text: 'Weekend days are Saturday and Sunday.' },
      { text: 'Return true for weekend days.' }
    ],
    'Normalize to lowercase before comparing.',
    'Return true if day is Saturday or Sunday.',
    ['isWeekend("Saturday") -> true'],
    `function isWeekend(day) {
  // Return true for Saturday or Sunday

}`,
    'isWeekend',
    [
      { input: ['Saturday'], expected: true, description: 'Saturday' },
      { input: ['sunday'], expected: true, description: 'Sunday' },
      { input: ['Monday'], expected: false, description: 'Weekday' }
    ],
    `function isWeekend(day) {
  const lower = day.toLowerCase();
  return lower === "saturday" || lower === "sunday";
}`,
    'Easy'
  ),
  challengeItem(
    'Refactor Repeated Discount Calculations in a Shopping Cart',
    [
      { text: 'Use a helper formula for discounts.' },
      { text: 'Return the discounted total.' }
    ],
    'Use subtotal - (subtotal * percent / 100).',
    'Return the total after applying a percentage discount.',
    ['applyDiscount(100, 20) -> 80'],
    `function applyDiscount(subtotal, percent) {
  // Return discounted total

}`,
    'applyDiscount',
    [
      { input: [100, 20], expected: 80, description: '20 percent off' },
      { input: [50, 10], expected: 45, description: '10 percent off' }
    ],
    `function applyDiscount(subtotal, percent) {
  return subtotal - (subtotal * percent / 100);
}`,
    'Easy'
  ),
  challengeItem(
    'Refactor Duplicated Math Code into a Function',
    [
      { text: 'Create a reusable function for repeated math.' },
      { text: 'Return width * height.' }
    ],
    'Compute area with width * height.',
    'Return the area of a rectangle.',
    ['rectangleArea(4, 5) -> 20'],
    `function rectangleArea(width, height) {
  // Return the area

}`,
    'rectangleArea',
    [
      { input: [4, 5], expected: 20, description: 'Area' },
      { input: [3, 3], expected: 9, description: 'Area' }
    ],
    `function rectangleArea(width, height) {
  return width * height;
}`,
    'Easy'
  ),
  examItem(
    'Test: JavaScript functions',
    [
      { text: 'Task 1: return "Invalid name" if name is empty.' },
      { text: 'Task 2: return "adult" when age >= 18, otherwise "minor".' },
      { text: 'Task 3: return a string "name is status".' }
    ],
    'Handle the empty name first, then use age to decide.',
    'Return a message based on name and age.',
    ['functionsExam("Sam", 20) -> "Sam is adult"'],
    `function functionsExam(name, age) {
  // Return a message based on name and age

}`,
    'functionsExam',
    [
      { input: ['Sam', 20], expected: 'Sam is adult', description: 'Adult' },
      { input: ['Ava', 16], expected: 'Ava is minor', description: 'Minor' },
      { input: ['', 20], expected: 'Invalid name', description: 'Empty name' }
    ],
    `function functionsExam(name, age) {
  if (name.length === 0) return "Invalid name";
  const status = age >= 18 ? "adult" : "minor";
  return name + " is " + status;
}`
  )
];

const arraysItems: ItemDefinition[] = [
  lessonItem('Introduction to JavaScript arrays', [
    { text: 'Arrays store multiple values in a single variable.' },
    { text: 'Use brackets to create arrays.' },
    {
      text: 'Access values with indexes starting at 0.',
      codeExample: 'const items = ["a", "b", "c"];\nconsole.log(items[0]);',
      runnable: true
    }
  ]),
  challengeItem(
    'Create a JavaScript array',
    [
      { text: 'Use brackets with values separated by commas.' },
      { text: 'Return the array.' }
    ],
    'Return [1, 2, 3].',
    'Return an array with the numbers 1, 2, and 3.',
    ['createArray() -> [1, 2, 3]'],
    `function createArray() {
  // Return the array

}`,
    'createArray',
    [{ input: [], expected: [1, 2, 3], description: 'Basic array' }],
    `function createArray() {
  return [1, 2, 3];
}`,
    'Beginner'
  ),
  challengeItem(
    'Create an Array of Fruits',
    [
      { text: 'Arrays can store strings.' },
      { text: 'Return an array of fruits.' }
    ],
    'Return ["apple", "banana", "orange"].',
    'Return an array containing apple, banana, and orange.',
    ['fruitArray() -> ["apple", "banana", "orange"]'],
    `function fruitArray() {
  // Return the fruit array

}`,
    'fruitArray',
    [{ input: [], expected: ['apple', 'banana', 'orange'], description: 'Fruit list' }],
    `function fruitArray() {
  return ["apple", "banana", "orange"];
}`,
    'Beginner'
  ),
  challengeItem(
    'Create an array with mixed types',
    [
      { text: 'Arrays can hold different types.' },
      { text: 'Return a mixed array.' }
    ],
    'Return [1, "two", true].',
    'Return an array with a number, a string, and a boolean.',
    ['mixedArray() -> [1, "two", true]'],
    `function mixedArray() {
  // Return a mixed array

}`,
    'mixedArray',
    [{ input: [], expected: [1, 'two', true], description: 'Mixed types' }],
    `function mixedArray() {
  return [1, "two", true];
}`,
    'Beginner'
  ),
  challengeItem(
    'Access an array element',
    [
      { text: 'Use arr[index] to access a value.' },
      { text: 'Return the element at index.' }
    ],
    'Return arr[index].',
    'Return the element at the given index.',
    ['getElement(["a", "b"], 1) -> "b"'],
    `function getElement(arr, index) {
  // Return element at index

}`,
    'getElement',
    [
      { input: [['a', 'b'], 1], expected: 'b', description: 'Index 1' },
      { input: [[10, 20, 30], 0], expected: 10, description: 'Index 0' }
    ],
    `function getElement(arr, index) {
  return arr[index];
}`
  ),
  challengeItem(
    'Access the Middle Element of an Array',
    [
      { text: 'The middle index is Math.floor(length / 2).' },
      { text: 'Return the middle element.' }
    ],
    'Use Math.floor(arr.length / 2).',
    'Return the middle element of the array.',
    ['getMiddle([1, 2, 3]) -> 2'],
    `function getMiddle(arr) {
  // Return the middle element

}`,
    'getMiddle',
    [
      { input: [[1, 2, 3]], expected: 2, description: 'Odd length' },
      { input: [[10, 20, 30, 40, 50]], expected: 30, description: 'Middle' }
    ],
    `function getMiddle(arr) {
  const middleIndex = Math.floor(arr.length / 2);
  return arr[middleIndex];
}`,
    'Easy'
  ),
  challengeItem(
    'Write function to get last element of an array',
    [
      { text: 'The last index is length - 1.' },
      { text: 'Return the last element or null if empty.' }
    ],
    'Check for empty array first.',
    'Return the last element or null if the array is empty.',
    ['getLast([1, 2, 3]) -> 3'],
    `function getLast(arr) {
  // Return the last element or null

}`,
    'getLast',
    [
      { input: [[1, 2, 3]], expected: 3, description: 'Last element' },
      { input: [[]], expected: null, description: 'Empty array' }
    ],
    `function getLast(arr) {
  if (arr.length === 0) return null;
  return arr[arr.length - 1];
}`,
    'Easy'
  ),
  challengeItem(
    'Find the Length of a Movie List',
    [
      { text: 'Use the length property on arrays.' },
      { text: 'Return the length.' }
    ],
    'Return movies.length.',
    'Return the number of movies in the list.',
    ['movieCount(["A", "B"]) -> 2'],
    `function movieCount(movies) {
  // Return the number of movies

}`,
    'movieCount',
    [
      { input: [['A', 'B']], expected: 2, description: 'Two movies' },
      { input: [[]], expected: 0, description: 'Empty list' }
    ],
    `function movieCount(movies) {
  return movies.length;
}`
  ),
  challengeItem(
    'Count Songs Left in the Playlist',
    [
      { text: 'Subtract the number listened from the total.' },
      { text: 'Return the remaining count.' }
    ],
    'Return total - listened.',
    'Return how many songs are left to listen to.',
    ['songsLeft(10, 4) -> 6'],
    `function songsLeft(total, listened) {
  // Return songs left

}`,
    'songsLeft',
    [
      { input: [10, 4], expected: 6, description: 'Songs left' },
      { input: [5, 5], expected: 0, description: 'None left' }
    ],
    `function songsLeft(total, listened) {
  return total - listened;
}`
  ),
  challengeItem(
    'Change an Array Element by Index',
    [
      { text: 'You can assign a new value at an index.' },
      { text: 'Return the updated array.' }
    ],
    'Set arr[index] to value.',
    'Update the array at the given index and return it.',
    ['setElement([1, 2, 3], 1, 9) -> [1, 9, 3]'],
    `function setElement(arr, index, value) {
  // Update the array and return it

}`,
    'setElement',
    [
      { input: [[1, 2, 3], 1, 9], expected: [1, 9, 3], description: 'Updated element' },
      { input: [['a', 'b'], 0, 'z'], expected: ['z', 'b'], description: 'Updated element' }
    ],
    `function setElement(arr, index, value) {
  arr[index] = value;
  return arr;
}`,
    'Easy'
  ),
  challengeItem(
    'Create a JavaScript array using variables',
    [
      { text: 'Array elements can come from variables.' },
      { text: 'Return an array of the inputs.' }
    ],
    'Return [a, b, c].',
    'Return an array containing a, b, and c.',
    ['makeArray(1, 2, 3) -> [1, 2, 3]'],
    `function makeArray(a, b, c) {
  // Return an array of a, b, c

}`,
    'makeArray',
    [
      { input: [1, 2, 3], expected: [1, 2, 3], description: 'Array from variables' },
      { input: ['x', 'y', 'z'], expected: ['x', 'y', 'z'], description: 'Strings' }
    ],
    `function makeArray(a, b, c) {
  return [a, b, c];
}`,
    'Beginner'
  ),
  challengeItem(
    'Find the index of an array element',
    [
      { text: 'indexOf returns the first matching index.' },
      { text: 'Return arr.indexOf(value).' }
    ],
    'Use indexOf.',
    'Return the index of value in the array.',
    ['findIndex(["a", "b"], "b") -> 1'],
    `function findIndex(arr, value) {
  // Return the index of value

}`,
    'findIndex',
    [
      { input: [['a', 'b'], 'b'], expected: 1, description: 'Found' },
      { input: [[1, 2, 3], 4], expected: -1, description: 'Not found' }
    ],
    `function findIndex(arr, value) {
  return arr.indexOf(value);
}`
  ),
  challengeItem(
    "Find the Chocolate's Position",
    [
      { text: 'Use indexOf to find a value.' },
      { text: 'Return the index of "chocolate".' }
    ],
    'Use indexOf("chocolate").',
    'Return the index of "chocolate" in the flavors array.',
    ['findChocolate(["vanilla", "chocolate"]) -> 1'],
    `function findChocolate(flavors) {
  // Return the index of "chocolate"

}`,
    'findChocolate',
    [
      { input: [['vanilla', 'chocolate', 'strawberry']], expected: 1, description: 'Found' },
      { input: [['chocolate']], expected: 0, description: 'First element' }
    ],
    `function findChocolate(flavors) {
  return flavors.indexOf("chocolate");
}`
  ),
  challengeItem(
    'Add element to array',
    [
      { text: 'Use push to add to the end.' },
      { text: 'Return the updated array.' }
    ],
    'Use arr.push(value).',
    'Add value to the array and return it.',
    ['addElement([1], 2) -> [1, 2]'],
    `function addElement(arr, value) {
  // Add value and return the array

}`,
    'addElement',
    [
      { input: [[1], 2], expected: [1, 2], description: 'Added element' },
      { input: [[], 'a'], expected: ['a'], description: 'Added to empty' }
    ],
    `function addElement(arr, value) {
  arr.push(value);
  return arr;
}`,
    'Easy'
  ),
  challengeItem(
    'Swap Two Elements in an Array',
    [
      { text: 'Use a temporary variable to swap.' },
      { text: 'Return the updated array.' }
    ],
    'Swap arr[i] and arr[j].',
    'Swap the elements at indexes i and j.',
    ['swapElements([1, 2], 0, 1) -> [2, 1]'],
    `function swapElements(arr, i, j) {
  // Swap elements at i and j

}`,
    'swapElements',
    [
      { input: [[1, 2], 0, 1], expected: [2, 1], description: 'Swap two' },
      { input: [['a', 'b', 'c'], 1, 2], expected: ['a', 'c', 'b'], description: 'Swap later' }
    ],
    `function swapElements(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
  return arr;
}`,
    'Medium'
  ),
  challengeItem(
    'Replace Array Element at Index',
    [
      { text: 'Assign a new value at the index.' },
      { text: 'Return the updated array.' }
    ],
    'Set arr[index] to newValue.',
    'Replace the element at index with newValue and return the array.',
    ['replaceAt([1, 2, 3], 2, 9) -> [1, 2, 9]'],
    `function replaceAt(arr, index, newValue) {
  // Replace and return

}`,
    'replaceAt',
    [
      { input: [[1, 2, 3], 2, 9], expected: [1, 2, 9], description: 'Replaced' },
      { input: [['a', 'b'], 0, 'z'], expected: ['z', 'b'], description: 'Replaced' }
    ],
    `function replaceAt(arr, index, newValue) {
  arr[index] = newValue;
  return arr;
}`,
    'Easy'
  ),
  examItem(
    'Test: JavaScript arrays',
    [
      { text: 'Task 1: return the first element.' },
      { text: 'Task 2: return the last element.' },
      { text: 'Task 3: return the length.' }
    ],
    'Return an object with first, last, and count.',
    'Return { first, last, count } for the array.',
    ['arrayExam([1, 2, 3]) -> { first: 1, last: 3, count: 3 }'],
    `function arrayExam(arr) {
  // Return first, last, and count

}`,
    'arrayExam',
    [
      { input: [[1, 2, 3]], expected: { first: 1, last: 3, count: 3 }, description: 'Basic array' },
      { input: [['a']], expected: { first: 'a', last: 'a', count: 1 }, description: 'Single item' }
    ],
    `function arrayExam(arr) {
  return {
    first: arr[0],
    last: arr[arr.length - 1],
    count: arr.length
  };
}`
  )
];

const objectsItems: ItemDefinition[] = [
  lessonItem('Introduction to JavaScript objects', [
    { text: 'Objects group related data using key-value pairs.' },
    { text: 'Use curly braces and the syntax key: value.' },
    {
      text: 'Access values with dot or bracket notation.',
      codeExample: 'const user = { name: "Ava", age: 21 };\nconsole.log(user.name);',
      runnable: true
    }
  ]),
  challengeItem(
    'Get value from object',
    [
      { text: 'Bracket notation is useful for dynamic keys.' },
      { text: 'Return obj[key].' }
    ],
    'Use obj[key].',
    'Return the value for the given key in the object.',
    ['getValue({ name: "Ava" }, "name") -> "Ava"'],
    `function getValue(obj, key) {
  // Return the value for key

}`,
    'getValue',
    [
      { input: [{ name: 'Ava', age: 20 }, 'age'], expected: 20, description: 'Age value' },
      { input: [{ role: 'admin' }, 'role'], expected: 'admin', description: 'Role value' }
    ],
    `function getValue(obj, key) {
  return obj[key];
}`
  ),
  challengeItem(
    'Create an object I',
    [
      { text: 'Create an object literal with one property.' },
      { text: 'Return the object.' }
    ],
    'Return { language: "JavaScript" }.',
    'Return an object with a language property set to "JavaScript".',
    ['createObjectI() -> { language: "JavaScript" }'],
    `function createObjectI() {
  // Return the object

}`,
    'createObjectI',
    [{ input: [], expected: { language: 'JavaScript' }, description: 'Language object' }],
    `function createObjectI() {
  return { language: "JavaScript" };
}`,
    'Beginner'
  ),
  challengeItem(
    'Create an object II',
    [
      { text: 'Objects can store booleans.' },
      { text: 'Return an object with one property.' }
    ],
    'Return { isActive: true }.',
    'Return an object with an isActive property set to true.',
    ['createObjectII() -> { isActive: true }'],
    `function createObjectII() {
  // Return the object

}`,
    'createObjectII',
    [{ input: [], expected: { isActive: true }, description: 'Active object' }],
    `function createObjectII() {
  return { isActive: true };
}`,
    'Beginner'
  ),
  challengeItem(
    'Create an Object with Multiple Properties',
    [
      { text: 'Objects can store multiple related values.' },
      { text: 'Return an object with name, age, and member.' }
    ],
    'Return { name: "Mia", age: 28, member: true }.',
    'Return an object with name, age, and member properties.',
    ['createMember() -> { name: "Mia", age: 28, member: true }'],
    `function createMember() {
  // Return the object

}`,
    'createMember',
    [
      {
        input: [],
        expected: { name: 'Mia', age: 28, member: true },
        description: 'Member object'
      }
    ],
    `function createMember() {
  return { name: "Mia", age: 28, member: true };
}`,
    'Beginner'
  ),
  challengeItem(
    'Create Object from Function Parameters',
    [
      { text: 'Use parameter values as object properties.' },
      { text: 'Return an object with name and age.' }
    ],
    'Return { name: name, age: age }.',
    'Return an object built from the provided name and age.',
    ['buildUser("Sam", 20) -> { name: "Sam", age: 20 }'],
    `function buildUser(name, age) {
  // Return the object

}`,
    'buildUser',
    [
      { input: ['Sam', 20], expected: { name: 'Sam', age: 20 }, description: 'User object' },
      { input: ['Rae', 32], expected: { name: 'Rae', age: 32 }, description: 'User object' }
    ],
    `function buildUser(name, age) {
  return { name: name, age: age };
}`
  ),
  challengeItem(
    'Create an Object with Conditional Properties',
    [
      { text: 'Add properties only when a condition is true.' },
      { text: 'Always include name, add email when requested.' }
    ],
    'Create { name } and add email only when includeEmail is true.',
    'Return a profile object that optionally includes email.',
    ['buildProfile("Ava", "a@x.com", true) -> { name: "Ava", email: "a@x.com" }'],
    `function buildProfile(name, email, includeEmail) {
  // Return the profile object

}`,
    'buildProfile',
    [
      {
        input: ['Ava', 'a@x.com', true],
        expected: { name: 'Ava', email: 'a@x.com' },
        description: 'Include email'
      },
      {
        input: ['Ava', 'a@x.com', false],
        expected: { name: 'Ava' },
        description: 'Exclude email'
      }
    ],
    `function buildProfile(name, email, includeEmail) {
  const profile = { name: name };
  if (includeEmail) {
    profile.email = email;
  }
  return profile;
}`,
    'Easy'
  ),
  challengeItem(
    'Create an Object with Calculated Property Values',
    [
      { text: 'Calculated values can be stored as properties.' },
      { text: 'Include a total based on price and quantity.' }
    ],
    'Set total to price * quantity.',
    'Return an object with price, quantity, and total.',
    ['buildItem(5, 3) -> { price: 5, quantity: 3, total: 15 }'],
    `function buildItem(price, quantity) {
  // Return the object

}`,
    'buildItem',
    [
      {
        input: [5, 3],
        expected: { price: 5, quantity: 3, total: 15 },
        description: 'Total calculated'
      },
      {
        input: [12, 2],
        expected: { price: 12, quantity: 2, total: 24 },
        description: 'Total calculated'
      }
    ],
    `function buildItem(price, quantity) {
  return { price: price, quantity: quantity, total: price * quantity };
}`,
    'Easy'
  ),
  lessonItem('Modify existing JavaScript objects', [
    { text: 'Objects are mutable, so you can add or update properties.' },
    { text: 'Use dot notation for known keys and brackets for dynamic keys.' },
    { text: 'Use delete to remove a property.' }
  ]),
  challengeItem(
    'Add a property to an object using dot notation',
    [
      { text: 'Use dot notation to add a new property.' },
      { text: 'Return the updated object.' }
    ],
    'Set user.status to the status value.',
    'Add a status property to the user and return it.',
    ['addStatus({ name: "Ava" }, "active") -> { name: "Ava", status: "active" }'],
    `function addStatus(user, status) {
  // Add status and return

}`,
    'addStatus',
    [
      {
        input: [{ name: 'Ava' }, 'active'],
        expected: { name: 'Ava', status: 'active' },
        description: 'Status added'
      },
      {
        input: [{ name: 'Rex' }, 'inactive'],
        expected: { name: 'Rex', status: 'inactive' },
        description: 'Status added'
      }
    ],
    `function addStatus(user, status) {
  user.status = status;
  return user;
}`,
    'Easy'
  ),
  challengeItem(
    'Update an Object Property',
    [
      { text: 'Assign a new value to an existing property.' },
      { text: 'Return the updated object.' }
    ],
    'Set player.score to the new value.',
    'Update the score property and return the player.',
    ['updateScore({ name: "Ava", score: 1 }, 5) -> { name: "Ava", score: 5 }'],
    `function updateScore(player, newScore) {
  // Update score and return

}`,
    'updateScore',
    [
      {
        input: [{ name: 'Ava', score: 1 }, 5],
        expected: { name: 'Ava', score: 5 },
        description: 'Score updated'
      },
      {
        input: [{ name: 'Rex', score: 10 }, 7],
        expected: { name: 'Rex', score: 7 },
        description: 'Score updated'
      }
    ],
    `function updateScore(player, newScore) {
  player.score = newScore;
  return player;
}`,
    'Easy'
  ),
  challengeItem(
    'Add a Property to an Object',
    [
      { text: 'Bracket notation lets you use a dynamic key.' },
      { text: 'Add the property and return the object.' }
    ],
    'Use obj[key] = value.',
    'Add a property to the object using the provided key.',
    ['addProperty({ type: "basic" }, "level", 2) -> { type: "basic", level: 2 }'],
    `function addProperty(obj, key, value) {
  // Add property and return

}`,
    'addProperty',
    [
      {
        input: [{ type: 'basic' }, 'level', 2],
        expected: { type: 'basic', level: 2 },
        description: 'Property added'
      },
      {
        input: [{ name: 'Ava' }, 'role', 'admin'],
        expected: { name: 'Ava', role: 'admin' },
        description: 'Property added'
      }
    ],
    `function addProperty(obj, key, value) {
  obj[key] = value;
  return obj;
}`,
    'Easy'
  ),
  challengeItem(
    'Add a Property Based on Two Existing Properties',
    [
      { text: 'Use existing properties to compute a new one.' },
      { text: 'Return the updated object.' }
    ],
    'Set fullName to firstName + " " + lastName.',
    'Add a fullName property built from firstName and lastName.',
    [
      'addFullName({ firstName: "Ava", lastName: "Stone" }) -> { firstName: "Ava", lastName: "Stone", fullName: "Ava Stone" }'
    ],
    `function addFullName(person) {
  // Add fullName and return

}`,
    'addFullName',
    [
      {
        input: [{ firstName: 'Ava', lastName: 'Stone' }],
        expected: { firstName: 'Ava', lastName: 'Stone', fullName: 'Ava Stone' },
        description: 'Full name'
      },
      {
        input: [{ firstName: 'Sam', lastName: 'Lee' }],
        expected: { firstName: 'Sam', lastName: 'Lee', fullName: 'Sam Lee' },
        description: 'Full name'
      }
    ],
    `function addFullName(person) {
  person.fullName = person.firstName + " " + person.lastName;
  return person;
}`,
    'Easy'
  ),
  challengeItem(
    'Delete a property from an object',
    [
      { text: 'Use the delete keyword to remove a property.' },
      { text: 'Return the updated object.' }
    ],
    'Use delete user.password.',
    'Remove the password property from the user.',
    ['removePassword({ name: "Ava", password: "secret" }) -> { name: "Ava" }'],
    `function removePassword(user) {
  // Remove password and return

}`,
    'removePassword',
    [
      {
        input: [{ name: 'Ava', password: 'secret' }],
        expected: { name: 'Ava' },
        description: 'Password removed'
      },
      {
        input: [{ name: 'Rex', password: '1234', role: 'admin' }],
        expected: { name: 'Rex', role: 'admin' },
        description: 'Password removed'
      }
    ],
    `function removePassword(user) {
  delete user.password;
  return user;
}`,
    'Easy'
  ),
  examItem(
    'Test: JavaScript objects',
    [
      { text: 'Task 1: add fullName from firstName and lastName.' },
      { text: 'Task 2: set isAdult based on age >= 18.' },
      { text: 'Task 3: remove the password property.' }
    ],
    'Update the user object and return it.',
    'Return the user with fullName and isAdult, without password.',
    [
      'objectsExam({ firstName: "Sam", lastName: "Rae", age: 20, password: "x" }) -> { firstName: "Sam", lastName: "Rae", age: 20, fullName: "Sam Rae", isAdult: true }'
    ],
    `function objectsExam(user) {
  // Update user and return

}`,
    'objectsExam',
    [
      {
        input: [{ firstName: 'Sam', lastName: 'Rae', age: 20, password: 'x' }],
        expected: {
          firstName: 'Sam',
          lastName: 'Rae',
          age: 20,
          fullName: 'Sam Rae',
          isAdult: true
        },
        description: 'Adult user'
      },
      {
        input: [{ firstName: 'Ava', lastName: 'Stone', age: 16, password: 'pw' }],
        expected: {
          firstName: 'Ava',
          lastName: 'Stone',
          age: 16,
          fullName: 'Ava Stone',
          isAdult: false
        },
        description: 'Minor user'
      }
    ],
    `function objectsExam(user) {
  user.fullName = user.firstName + " " + user.lastName;
  user.isAdult = user.age >= 18;
  delete user.password;
  return user;
}`
  )
];

const loopsItems: ItemDefinition[] = [
  lessonItem('Introduction to JavaScript loops', [
    { text: 'Loops repeat a block of code.' },
    { text: 'Use for loops for counted repetition and while loops for conditions.' },
    {
      text: 'break stops a loop early and continue skips to the next iteration.',
      codeExample: 'for (let i = 1; i <= 3; i++) {\n  console.log(i);\n}',
      runnable: true
    }
  ]),
  challengeItem(
    'for loop I - creating JavaScript loops',
    [
      { text: 'Create an array and push values inside a for loop.' },
      { text: 'Return the array from 1 to n.' }
    ],
    'Loop from 1 to n and push each number.',
    'Return an array of numbers from 1 to n.',
    ['countTo(3) -> [1, 2, 3]'],
    `function countTo(n) {
  // Return [1, 2, ..., n]

}`,
    'countTo',
    [
      { input: [3], expected: [1, 2, 3], description: 'Count to 3' },
      { input: [1], expected: [1], description: 'Count to 1' }
    ],
    `function countTo(n) {
  const result = [];
  for (let i = 1; i <= n; i++) {
    result.push(i);
  }
  return result;
}`,
    'Beginner'
  ),
  challengeItem(
    'for loop II - looping through an array',
    [
      { text: 'Use a for loop to sum array values.' },
      { text: 'Return the total sum.' }
    ],
    'Add each number to a total.',
    'Return the sum of all numbers in the array.',
    ['sumArray([1, 2, 3]) -> 6'],
    `function sumArray(numbers) {
  // Return the sum

}`,
    'sumArray',
    [
      { input: [[1, 2, 3]], expected: 6, description: 'Sum of three' },
      { input: [[10, -2, 4]], expected: 12, description: 'Sum with negative' }
    ],
    `function sumArray(numbers) {
  let total = 0;
  for (let i = 0; i < numbers.length; i++) {
    total += numbers[i];
  }
  return total;
}`
  ),
  challengeItem(
    'Multiply Each Number in an Array by 2',
    [
      { text: 'Create a new array and push doubled values.' },
      { text: 'Return the new array.' }
    ],
    'Push number * 2 for each element.',
    'Return a new array where each number is doubled.',
    ['doubleArray([1, 2, 3]) -> [2, 4, 6]'],
    `function doubleArray(numbers) {
  // Return doubled values

}`,
    'doubleArray',
    [
      { input: [[1, 2, 3]], expected: [2, 4, 6], description: 'Double values' },
      { input: [[0, 5]], expected: [0, 10], description: 'Double values' }
    ],
    `function doubleArray(numbers) {
  const result = [];
  for (let i = 0; i < numbers.length; i++) {
    result.push(numbers[i] * 2);
  }
  return result;
}`
  ),
  challengeItem(
    'Sum Even Numbers with a For Loop',
    [
      { text: 'Loop from 1 to limit.' },
      { text: 'Add only even numbers to the sum.' }
    ],
    'Check i % 2 === 0 inside the loop.',
    'Return the sum of even numbers from 1 to limit.',
    ['sumEvens(6) -> 12'],
    `function sumEvens(limit) {
  // Return sum of even numbers

}`,
    'sumEvens',
    [
      { input: [6], expected: 12, description: '2 + 4 + 6' },
      { input: [1], expected: 0, description: 'No evens' }
    ],
    `function sumEvens(limit) {
  let total = 0;
  for (let i = 1; i <= limit; i++) {
    if (i % 2 === 0) {
      total += i;
    }
  }
  return total;
}`,
    'Easy'
  ),
  challengeItem(
    'for loop III - abort running loop',
    [
      { text: 'Use break to stop when a condition is met.' },
      { text: 'Return the first negative number or null.' }
    ],
    'Stop looping after finding a negative number.',
    'Return the first negative number in the array, or null if none.',
    ['firstNegative([3, -2, -5]) -> -2'],
    `function firstNegative(numbers) {
  // Return the first negative number or null

}`,
    'firstNegative',
    [
      { input: [[3, -2, -5]], expected: -2, description: 'First negative' },
      { input: [[1, 2, 3]], expected: null, description: 'No negatives' }
    ],
    `function firstNegative(numbers) {
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] < 0) {
      return numbers[i];
    }
  }
  return null;
}`,
    'Medium'
  ),
  challengeItem(
    'while loop',
    [
      { text: 'Use while to repeat while a condition is true.' },
      { text: 'Count down and collect values.' }
    ],
    'While n > 0, push n and decrement it.',
    'Return an array counting down from n to 1.',
    ['countDown(3) -> [3, 2, 1]'],
    `function countDown(n) {
  // Return countdown array

}`,
    'countDown',
    [
      { input: [3], expected: [3, 2, 1], description: 'Countdown' },
      { input: [0], expected: [], description: 'Empty' }
    ],
    `function countDown(n) {
  const result = [];
  while (n > 0) {
    result.push(n);
    n--;
  }
  return result;
}`,
    'Beginner'
  ),
  challengeItem(
    'Double a value using a while loop',
    [
      { text: 'Multiply by 2 until the value reaches the max.' },
      { text: 'Return the final value.' }
    ],
    'While value < max, set value = value * 2.',
    'Return the value after doubling until it is at least max.',
    ['doubleUntil(2, 10) -> 16'],
    `function doubleUntil(value, max) {
  // Double until value >= max

}`,
    'doubleUntil',
    [
      { input: [2, 10], expected: 16, description: 'Double until max' },
      { input: [5, 5], expected: 5, description: 'Already at max' }
    ],
    `function doubleUntil(value, max) {
  while (value < max) {
    value *= 2;
  }
  return value;
}`,
    'Easy'
  ),
  examItem(
    'Test: JavaScript loops',
    [
      { text: 'Task 1: sum numbers until a 0 is hit.' },
      { text: 'Task 2: count numbers greater than 10 before the stop.' },
      { text: 'Task 3: return { sum, countBig, stopped }.' }
    ],
    'Use a loop and break when you hit 0.',
    'Process the array and return summary results.',
    ['loopsExam([4, 12, 0, 5]) -> { sum: 16, countBig: 1, stopped: true }'],
    `function loopsExam(numbers) {
  // Return { sum, countBig, stopped }

}`,
    'loopsExam',
    [
      {
        input: [[4, 12, 0, 5]],
        expected: { sum: 16, countBig: 1, stopped: true },
        description: 'Stopped early'
      },
      {
        input: [[3, 11, 8]],
        expected: { sum: 22, countBig: 1, stopped: false },
        description: 'No stop'
      },
      {
        input: [[11, 13, 0, 2]],
        expected: { sum: 24, countBig: 2, stopped: true },
        description: 'Stop after big values'
      }
    ],
    `function loopsExam(numbers) {
  let sum = 0;
  let countBig = 0;
  let stopped = false;

  for (let i = 0; i < numbers.length; i++) {
    const value = numbers[i];
    if (value === 0) {
      stopped = true;
      break;
    }
    sum += value;
    if (value > 10) {
      countBig += 1;
    }
  }

  return { sum: sum, countBig: countBig, stopped: stopped };
}`
  )
];

export const challenges: Challenge[] = [
  ...buildModule('Variables', variablesItems),
  ...buildModule('Booleans', booleansItems),
  ...buildModule('Operators', operatorsItems),
  ...buildModule('Strings', stringsItems),
  ...buildModule('Conditionals', conditionalsItems),
  ...buildModule('Functions I', functionsItems),
  ...buildModule('Arrays', arraysItems),
  ...buildModule('Objects', objectsItems),
  ...buildModule('Loops', loopsItems)
];
