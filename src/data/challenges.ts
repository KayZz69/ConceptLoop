// Challenge data types and static repository - Category-Based Architecture

export type Category =
  | 'Essentials'
  | 'Decisions & Validation'
  | 'Loops & Aggregation'
  | 'Functions & Reuse'
  | 'Data Shaping'
  | 'Strings & Parsing'
  | 'Mini Projects';

export interface TestCase {
  input: any[];
  expected: any;
  description?: string;
}

// Step-based theory for progressive disclosure
export interface TheoryStep {
  text: string; // The explanation text for this step
  codeExample?: string; // Optional interactive code snippet
  runnable?: boolean; // If true, show "Run Code" button
}

export interface Challenge {
  id: string;
  title: string;
  category: Category;
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

export const categories: Category[] = [
  'Essentials',
  'Decisions & Validation',
  'Loops & Aggregation',
  'Functions & Reuse',
  'Data Shaping',
  'Strings & Parsing',
  'Mini Projects'
];

export const challenges: Challenge[] = [
  // ============================================
  // CATEGORY: ESSENTIALS
  // ============================================
  {
    id: 'essentials-greeting',
    title: 'Personalized Greeting',
    category: 'Essentials',
    difficulty: 'Beginner',
    theorySteps: [
      { text: 'Functions take inputs (parameters) and return a result.' },
      {
        text: 'Template literals make it easy to insert values into strings:',
        codeExample: 'const name = "Sam";\nconst message = `Hello, ${name}!`;\nconsole.log(message);',
        runnable: true
      },
      { text: 'Return the final message from your function.' }
    ],
    hint: 'Build the message with the name and return it.',
    description: 'Return the string "Hello, {name}!" for the given name.',
    examples: [
      'greetUser("Sam") -> "Hello, Sam!"',
      'greetUser("Ava") -> "Hello, Ava!"'
    ],
    starterCode: `function greetUser(name) {
  // Return "Hello, {name}!"

}`,
    functionName: 'greetUser',
    testCases: [
      { input: ['Sam'], expected: 'Hello, Sam!', description: 'Basic name' },
      { input: ['Ava'], expected: 'Hello, Ava!', description: 'Another name' }
    ],
    solution: `function greetUser(name) {
  return \`Hello, \${name}!\`;
}`
  },
  {
    id: 'essentials-total-with-tax',
    title: 'Total with Tax',
    category: 'Essentials',
    difficulty: 'Easy',
    theorySteps: [
      { text: 'A tax rate is a decimal (25% is 0.25).' },
      {
        text: 'Compute the tax amount with multiplication:',
        codeExample: 'const price = 100;\nconst taxRate = 0.25;\nconst total = price + price * taxRate;\nconsole.log(total);',
        runnable: true
      },
      { text: 'Return the total price after tax.' }
    ],
    hint: 'Total = price + (price * taxRate).',
    description: 'Return the total price after applying taxRate.',
    examples: [
      'totalWithTax(100, 0.25) -> 125',
      'totalWithTax(80, 0.5) -> 120'
    ],
    starterCode: `function totalWithTax(price, taxRate) {
  // Return price after adding tax

}`,
    functionName: 'totalWithTax',
    testCases: [
      { input: [100, 0.25], expected: 125, description: 'Quarter tax' },
      { input: [80, 0.5], expected: 120, description: 'Half tax' },
      { input: [60, 0], expected: 60, description: 'No tax' }
    ],
    solution: `function totalWithTax(price, taxRate) {
  return price + price * taxRate;
}`
  },
  {
    id: 'essentials-split-bill',
    title: 'Split the Bill',
    category: 'Essentials',
    difficulty: 'Easy',
    theorySteps: [
      { text: 'Division splits a total into equal parts.' },
      {
        text: 'Per-person cost is total divided by people:',
        codeExample: 'const total = 45;\nconst people = 3;\nconsole.log(total / people);',
        runnable: true
      },
      { text: 'Return the per-person amount.' }
    ],
    hint: 'Use division to split the total.',
    description: 'Return the per-person cost when splitting a bill.',
    examples: [
      'splitBill(100, 4) -> 25',
      'splitBill(45, 3) -> 15'
    ],
    starterCode: `function splitBill(total, people) {
  // Return total divided by people

}`,
    functionName: 'splitBill',
    testCases: [
      { input: [100, 4], expected: 25, description: 'Even split' },
      { input: [45, 3], expected: 15, description: 'Another split' }
    ],
    solution: `function splitBill(total, people) {
  return total / people;
}`
  },

  // ============================================
  // CATEGORY: DECISIONS & VALIDATION
  // ============================================
  {
    id: 'decision-free-shipping',
    title: 'Free Shipping',
    category: 'Decisions & Validation',
    difficulty: 'Beginner',
    theorySteps: [
      { text: 'Use an if statement to decide between two outcomes.' },
      {
        text: 'The >= operator checks if a number meets a minimum:',
        codeExample: 'const subtotal = 50;\nconsole.log(subtotal >= 50);',
        runnable: true
      },
      { text: 'Return different values based on the condition.' }
    ],
    hint: 'If subtotal is 50 or more, return 0. Otherwise return 5.',
    description: 'Return 0 for free shipping if subtotal >= 50, otherwise return 5.',
    examples: [
      'shippingCost(60) -> 0',
      'shippingCost(20) -> 5'
    ],
    starterCode: `function shippingCost(subtotal) {
  // Return 0 if subtotal >= 50, else 5

}`,
    functionName: 'shippingCost',
    testCases: [
      { input: [60], expected: 0, description: 'Free shipping' },
      { input: [50], expected: 0, description: 'Edge case' },
      { input: [49], expected: 5, description: 'Below threshold' },
      { input: [0], expected: 5, description: 'No subtotal' }
    ],
    solution: `function shippingCost(subtotal) {
  return subtotal >= 50 ? 0 : 5;
}`
  },
  {
    id: 'decision-clamp-percent',
    title: 'Clamp Percentage',
    category: 'Decisions & Validation',
    difficulty: 'Easy',
    theorySteps: [
      { text: 'Clamping keeps a value within a safe range.' },
      { text: 'Check the low bound first, then the high bound.' },
      { text: 'Return the original value when it is already in range.' }
    ],
    hint: 'Return 0 for values below 0, 100 for values above 100.',
    description: 'Clamp a percentage to the range 0-100.',
    examples: [
      'clampPercent(-10) -> 0',
      'clampPercent(120) -> 100'
    ],
    starterCode: `function clampPercent(value) {
  // Keep value between 0 and 100

}`,
    functionName: 'clampPercent',
    testCases: [
      { input: [-10], expected: 0, description: 'Below range' },
      { input: [50], expected: 50, description: 'In range' },
      { input: [120], expected: 100, description: 'Above range' },
      { input: [0], expected: 0, description: 'Lower edge' },
      { input: [100], expected: 100, description: 'Upper edge' }
    ],
    solution: `function clampPercent(value) {
  if (value < 0) return 0;
  if (value > 100) return 100;
  return value;
}`
  },
  {
    id: 'decision-can-rent',
    title: 'Rental Eligibility',
    category: 'Decisions & Validation',
    difficulty: 'Easy',
    theorySteps: [
      { text: 'Sometimes you need more than one condition to be true.' },
      {
        text: 'Use && to require both conditions:',
        codeExample: 'const age = 25;\nconst hasLicense = true;\nconsole.log(age >= 21 && hasLicense);',
        runnable: true
      },
      { text: 'Return the boolean result of the combined check.' }
    ],
    hint: 'Both age and license status must be valid.',
    description: 'Return true if age >= 21 and hasLicense is true.',
    examples: [
      'canRentCar(25, true) -> true',
      'canRentCar(20, true) -> false'
    ],
    starterCode: `function canRentCar(age, hasLicense) {
  // Return true only if age >= 21 and hasLicense is true

}`,
    functionName: 'canRentCar',
    testCases: [
      { input: [25, true], expected: true, description: 'Eligible' },
      { input: [20, true], expected: false, description: 'Too young' },
      { input: [30, false], expected: false, description: 'No license' },
      { input: [21, true], expected: true, description: 'Edge case' }
    ],
    solution: `function canRentCar(age, hasLicense) {
  return age >= 21 && hasLicense;
}`
  },

  // ============================================
  // CATEGORY: LOOPS & AGGREGATION
  // ============================================
  {
    id: 'loop-sum-prices',
    title: 'Sum Prices',
    category: 'Loops & Aggregation',
    difficulty: 'Easy',
    theorySteps: [
      { text: 'Loops help you add up a list of numbers.' },
      {
        text: 'Start with total = 0 and add each price:',
        codeExample: 'const prices = [10, 20, 5];\nlet total = 0;\nfor (const price of prices) {\n  total += price;\n}\nconsole.log(total);',
        runnable: true
      },
      { text: 'Return the final total.' }
    ],
    hint: 'Use a loop and a running total.',
    description: 'Return the sum of all numbers in the prices array.',
    examples: [
      'sumPrices([10, 20, 5]) -> 35',
      'sumPrices([]) -> 0'
    ],
    starterCode: `function sumPrices(prices) {
  // Return the total of all prices

}`,
    functionName: 'sumPrices',
    testCases: [
      { input: [[10, 20, 5]], expected: 35, description: 'Basic sum' },
      { input: [[]], expected: 0, description: 'Empty array' },
      { input: [[7]], expected: 7, description: 'Single item' }
    ],
    solution: `function sumPrices(prices) {
  let total = 0;
  for (const price of prices) {
    total += price;
  }
  return total;
}`
  },
  {
    id: 'loop-average-rating',
    title: 'Average Rating',
    category: 'Loops & Aggregation',
    difficulty: 'Medium',
    theorySteps: [
      { text: 'Average is total divided by count.' },
      { text: 'If there are no ratings, return 0 to avoid dividing by 0.' },
      { text: 'Sum all ratings, then divide by ratings.length.' }
    ],
    hint: 'Guard against empty arrays before dividing.',
    description: 'Return the average of ratings, or 0 if the array is empty.',
    examples: [
      'averageRating([5, 4, 3]) -> 4',
      'averageRating([]) -> 0'
    ],
    starterCode: `function averageRating(ratings) {
  // Return average rating, or 0 if there are none

}`,
    functionName: 'averageRating',
    testCases: [
      { input: [[5, 4, 3]], expected: 4, description: 'Average of three' },
      { input: [[4]], expected: 4, description: 'Single rating' },
      { input: [[]], expected: 0, description: 'Empty array' }
    ],
    solution: `function averageRating(ratings) {
  if (ratings.length === 0) return 0;
  let total = 0;
  for (const rating of ratings) {
    total += rating;
  }
  return total / ratings.length;
}`
  },
  {
    id: 'loop-count-short-words',
    title: 'Count Short Words',
    category: 'Loops & Aggregation',
    difficulty: 'Medium',
    theorySteps: [
      { text: 'Loop through each word in the list.' },
      { text: 'Check word.length against the max length.' },
      { text: 'Increment a counter when the word is short enough.' }
    ],
    hint: 'Count words where word.length <= maxLength.',
    description: 'Return how many words are at most maxLength characters.',
    examples: [
      'countShortWords(["hi", "there", "a"], 2) -> 2',
      'countShortWords(["apple", "pear", "fig"], 3) -> 1'
    ],
    starterCode: `function countShortWords(words, maxLength) {
  // Count words with length <= maxLength

}`,
    functionName: 'countShortWords',
    testCases: [
      { input: [['hi', 'there', 'a'], 2], expected: 2, description: 'Two short' },
      { input: [['apple', 'pear', 'fig'], 3], expected: 1, description: 'Only fig' },
      { input: [[], 3], expected: 0, description: 'Empty list' }
    ],
    solution: `function countShortWords(words, maxLength) {
  let count = 0;
  for (const word of words) {
    if (word.length <= maxLength) {
      count++;
    }
  }
  return count;
}`
  },

  // ============================================
  // CATEGORY: FUNCTIONS & REUSE
  // ============================================
  {
    id: 'func-format-price',
    title: 'Format Price',
    category: 'Functions & Reuse',
    difficulty: 'Easy',
    theorySteps: [
      { text: 'Default parameters give a fallback value when nothing is passed.' },
      {
        text: 'Use toFixed(2) to format a number with two decimals:',
        codeExample: 'const amount = 12.5;\nconsole.log(amount.toFixed(2));  // "12.50"',
        runnable: true
      },
      { text: 'Return a string like "USD 12.50".' }
    ],
    hint: 'Use a default for currency and toFixed(2) for decimals.',
    description: 'Return a formatted price string, defaulting currency to "USD".',
    examples: [
      'formatPrice(12) -> "USD 12.00"',
      'formatPrice(12.5, "EUR") -> "EUR 12.50"'
    ],
    starterCode: `function formatPrice(amount, currency) {
  // Default currency to "USD" and format with 2 decimals

}`,
    functionName: 'formatPrice',
    testCases: [
      { input: [12], expected: 'USD 12.00', description: 'Default currency' },
      { input: [12.5, 'EUR'], expected: 'EUR 12.50', description: 'Custom currency' },
      { input: [0, 'USD'], expected: 'USD 0.00', description: 'Zero amount' }
    ],
    solution: `function formatPrice(amount, currency = "USD") {
  return \`\${currency} \${amount.toFixed(2)}\`;
}`
  },
  {
    id: 'func-apply-callback',
    title: 'Apply Transform',
    category: 'Functions & Reuse',
    difficulty: 'Medium',
    theorySteps: [
      { text: 'A callback is a function passed into another function.' },
      {
        text: 'Call the callback with the value and return the result:',
        codeExample: 'function apply(value, callback) {\n  return callback(value);\n}\nconsole.log(apply(5, x => x * 2));',
        runnable: true
      },
      { text: 'This lets callers supply different behaviors.' }
    ],
    hint: 'Call callback(value) and return what it gives back.',
    description: 'Call the callback with value and return the result.',
    examples: [
      'applyCallback(5, x => x * 2) -> 10',
      'applyCallback(3, x => x * 2) -> 6'
    ],
    starterCode: `function applyCallback(value, callback) {
  // Call callback with value and return the result

}`,
    functionName: 'applyCallback',
    testCases: [
      { input: [5], expected: 10, description: 'Double 5' },
      { input: [3], expected: 6, description: 'Double 3' },
      { input: [0], expected: 0, description: 'Double 0' }
    ],
    solution: `function applyCallback(value, callback) {
  return callback(value);
}`
  },
  {
    id: 'func-safe-divide',
    title: 'Safe Divide',
    category: 'Functions & Reuse',
    difficulty: 'Medium',
    theorySteps: [
      { text: 'Guard clauses return early when input is invalid.' },
      { text: 'Division by 0 is invalid, so return null in that case.' },
      { text: 'Otherwise, return a / b.' }
    ],
    hint: 'If b is 0, return null.',
    description: 'Return a / b, or null when b is 0.',
    examples: [
      'safeDivide(10, 2) -> 5',
      'safeDivide(5, 0) -> null'
    ],
    starterCode: `function safeDivide(a, b) {
  // Return null when b is 0

}`,
    functionName: 'safeDivide',
    testCases: [
      { input: [10, 2], expected: 5, description: 'Normal division' },
      { input: [5, 0], expected: null, description: 'Divide by zero' },
      { input: [9, 3], expected: 3, description: 'Even division' }
    ],
    solution: `function safeDivide(a, b) {
  if (b === 0) return null;
  return a / b;
}`
  },

  // ============================================
  // CATEGORY: DATA SHAPING
  // ============================================
  {
    id: 'data-last-item',
    title: 'Last Item',
    category: 'Data Shaping',
    difficulty: 'Easy',
    theorySteps: [
      { text: 'Arrays are zero-indexed, so the last index is length - 1.' },
      { text: 'Handle empty arrays before accessing the last element.' },
      { text: 'Return the last item or null if the array is empty.' }
    ],
    hint: 'Use arr[arr.length - 1] when arr is not empty.',
    description: 'Return the last element of the array, or null if empty.',
    examples: [
      'lastItem([1, 2, 3]) -> 3',
      'lastItem([]) -> null'
    ],
    starterCode: `function lastItem(arr) {
  // Return last element or null

}`,
    functionName: 'lastItem',
    testCases: [
      { input: [[1, 2, 3]], expected: 3, description: 'Basic array' },
      { input: [['a']], expected: 'a', description: 'Single element' },
      { input: [[]], expected: null, description: 'Empty array' }
    ],
    solution: `function lastItem(arr) {
  if (arr.length === 0) return null;
  return arr[arr.length - 1];
}`
  },
  {
    id: 'data-active-users',
    title: 'Filter Active Users',
    category: 'Data Shaping',
    difficulty: 'Medium',
    theorySteps: [
      { text: 'Use filter to keep only items that match a condition.' },
      {
        text: 'The callback should return true for active users:',
        codeExample: 'const users = [{ name: "A", active: true }, { name: "B", active: false }];\nconst active = users.filter(user => user.active);\nconsole.log(active);',
        runnable: true
      },
      { text: 'Return the filtered array.' }
    ],
    hint: 'Filter users where user.active is true.',
    description: 'Return only the users that are active.',
    examples: [
      'activeOnly([{name:"A",active:true},{name:"B",active:false}]) -> [{name:"A",active:true}]',
      'activeOnly([]) -> []'
    ],
    starterCode: `function activeOnly(users) {
  // Return only active users

}`,
    functionName: 'activeOnly',
    testCases: [
      {
        input: [[{ name: 'A', active: true }, { name: 'B', active: false }, { name: 'C', active: true }]],
        expected: [{ name: 'A', active: true }, { name: 'C', active: true }],
        description: 'Two active'
      },
      { input: [[{ name: 'Solo', active: true }]], expected: [{ name: 'Solo', active: true }], description: 'Single active' },
      { input: [[{ name: 'Off', active: false }]], expected: [], description: 'None active' }
    ],
    solution: `function activeOnly(users) {
  return users.filter(user => user.active);
}`
  },
  {
    id: 'data-get-setting',
    title: 'Get Setting with Fallback',
    category: 'Data Shaping',
    difficulty: 'Medium',
    theorySteps: [
      { text: 'Objects store key-value pairs.' },
      { text: 'Sometimes a key is missing and you need a fallback value.' },
      { text: 'Check for undefined so 0 and false are not treated as missing.' }
    ],
    hint: 'Return config[key] when it is not undefined, otherwise fallback.',
    description: 'Return a setting value or a fallback when it is missing.',
    examples: [
      'getSetting({ theme: "dark" }, "theme", "light") -> "dark"',
      'getSetting({}, "theme", "light") -> "light"'
    ],
    starterCode: `function getSetting(config, key, fallback) {
  // Return config[key] when defined, else fallback

}`,
    functionName: 'getSetting',
    testCases: [
      { input: [{ theme: 'dark' }, 'theme', 'light'], expected: 'dark', description: 'Found value' },
      { input: [{}, 'theme', 'light'], expected: 'light', description: 'Missing value' },
      { input: [{ count: 0 }, 'count', 10], expected: 0, description: 'Falsy but defined' }
    ],
    solution: `function getSetting(config, key, fallback) {
  if (config[key] !== undefined) return config[key];
  return fallback;
}`
  },

  // ============================================
  // CATEGORY: STRINGS & PARSING
  // ============================================
  {
    id: 'string-clean-input',
    title: 'Clean Input',
    category: 'Strings & Parsing',
    difficulty: 'Easy',
    theorySteps: [
      { text: 'User input often has extra spaces and inconsistent casing.' },
      {
        text: 'Use trim() to remove outer whitespace:',
        codeExample: 'const raw = "  Hello  ";\nconsole.log(raw.trim());',
        runnable: true
      },
      { text: 'Use toLowerCase() to normalize text.' }
    ],
    hint: 'Trim first, then lowercase.',
    description: 'Return the text trimmed and lowercased.',
    examples: [
      'cleanInput("  Hello ") -> "hello"',
      'cleanInput("JAVA script") -> "java script"'
    ],
    starterCode: `function cleanInput(text) {
  // Trim and lowercase the text

}`,
    functionName: 'cleanInput',
    testCases: [
      { input: ['  Hello '], expected: 'hello', description: 'Trim and lowercase' },
      { input: ['JAVA script'], expected: 'java script', description: 'Lowercase only' },
      { input: ['   '], expected: '', description: 'Only spaces' }
    ],
    solution: `function cleanInput(text) {
  return text.trim().toLowerCase();
}`
  },
  {
    id: 'string-file-extension',
    title: 'File Extension',
    category: 'Strings & Parsing',
    difficulty: 'Medium',
    theorySteps: [
      { text: 'Use lastIndexOf(".") to find the final dot.' },
      { text: 'If there is no dot (or it is the first char), return an empty string.' },
      { text: 'Use slice(index + 1) to get the extension.' }
    ],
    hint: 'Find the last dot and slice after it.',
    description: 'Return the file extension without the dot, or "" if none.',
    examples: [
      'getExtension("photo.jpg") -> "jpg"',
      'getExtension("README") -> ""'
    ],
    starterCode: `function getExtension(filename) {
  // Return file extension without the dot, or ""

}`,
    functionName: 'getExtension',
    testCases: [
      { input: ['photo.jpg'], expected: 'jpg', description: 'Basic extension' },
      { input: ['archive.tar.gz'], expected: 'gz', description: 'Last extension' },
      { input: ['README'], expected: '', description: 'No dot' },
      { input: ['.env'], expected: '', description: 'Dot at start' }
    ],
    solution: `function getExtension(filename) {
  const dotIndex = filename.lastIndexOf('.');
  if (dotIndex <= 0) return '';
  return filename.slice(dotIndex + 1);
}`
  },
  {
    id: 'string-slugify',
    title: 'Slugify Title',
    category: 'Strings & Parsing',
    difficulty: 'Medium',
    theorySteps: [
      { text: 'A slug is lowercase words separated by hyphens.' },
      { text: 'Trim and lowercase the title, then split on spaces.' },
      { text: 'Remove empty parts and join with "-".' }
    ],
    hint: 'Use trim, toLowerCase, split, filter, and join.',
    description: 'Convert a title into a URL-friendly slug.',
    examples: [
      'slugify("Hello World") -> "hello-world"',
      'slugify("  JavaScript   Basics ") -> "javascript-basics"'
    ],
    starterCode: `function slugify(title) {
  // Convert title to a lowercase, hyphenated slug

}`,
    functionName: 'slugify',
    testCases: [
      { input: ['Hello World'], expected: 'hello-world', description: 'Basic slug' },
      { input: ['  JavaScript   Basics '], expected: 'javascript-basics', description: 'Extra spaces' },
      { input: ['Already-Slug'], expected: 'already-slug', description: 'Keep hyphen' }
    ],
    solution: `function slugify(title) {
  return title
    .trim()
    .toLowerCase()
    .split(' ')
    .filter(Boolean)
    .join('-');
}`
  },

  // ============================================
  // CATEGORY: MINI PROJECTS
  // ============================================
  {
    id: 'mini-cart-total',
    title: 'Cart Total',
    category: 'Mini Projects',
    difficulty: 'Medium',
    theorySteps: [
      { text: 'Each cart item has a price and quantity.' },
      { text: 'Multiply price by quantity and add to a running total.' },
      { text: 'Return the final total cost.' }
    ],
    hint: 'Loop items and add item.price * item.quantity.',
    description: 'Return the total cost for all items in the cart.',
    examples: [
      'cartTotal([{price:10,quantity:2},{price:5,quantity:3}]) -> 35',
      'cartTotal([]) -> 0'
    ],
    starterCode: `function cartTotal(items) {
  // Sum price * quantity for each item

}`,
    functionName: 'cartTotal',
    testCases: [
      {
        input: [[{ price: 10, quantity: 2 }, { price: 5, quantity: 3 }]],
        expected: 35,
        description: 'Multiple items'
      },
      { input: [[]], expected: 0, description: 'Empty cart' },
      { input: [[{ price: 7, quantity: 1 }]], expected: 7, description: 'Single item' }
    ],
    solution: `function cartTotal(items) {
  let total = 0;
  for (const item of items) {
    total += item.price * item.quantity;
  }
  return total;
}`
  },
  {
    id: 'mini-score-summary',
    title: 'Score Summary',
    category: 'Mini Projects',
    difficulty: 'Hard',
    theorySteps: [
      { text: 'Summaries often include min, max, and average.' },
      { text: 'If the list is empty, return nulls for each field.' },
      { text: 'Otherwise, track min, max, and sum as you loop.' }
    ],
    hint: 'Initialize min and max from the first score, then loop.',
    description: 'Return { min, max, average } for the scores array.',
    examples: [
      'summarizeScores([2, 8, 5]) -> { min: 2, max: 8, average: 5 }',
      'summarizeScores([]) -> { min: null, max: null, average: null }'
    ],
    starterCode: `function summarizeScores(scores) {
  // Return { min, max, average } or nulls for empty input

}`,
    functionName: 'summarizeScores',
    testCases: [
      {
        input: [[2, 8, 5]],
        expected: { min: 2, max: 8, average: 5 },
        description: 'Three scores'
      },
      {
        input: [[10]],
        expected: { min: 10, max: 10, average: 10 },
        description: 'Single score'
      },
      {
        input: [[]],
        expected: { min: null, max: null, average: null },
        description: 'Empty list'
      }
    ],
    solution: `function summarizeScores(scores) {
  if (scores.length === 0) {
    return { min: null, max: null, average: null };
  }
  let min = scores[0];
  let max = scores[0];
  let sum = 0;
  for (const score of scores) {
    if (score < min) min = score;
    if (score > max) max = score;
    sum += score;
  }
  return { min, max, average: sum / scores.length };
}`
  }
];
