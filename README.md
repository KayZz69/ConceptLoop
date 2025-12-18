# ConceptLoop

An interactive JavaScript learning platform with progressive lessons and coding challenges.

![ConceptLoop Screenshot](docs/screenshot.png)

## Features

- **Progressive Lessons**: Step-by-step theory with interactive code execution
- **Vertical Stack Flow**: Learn at your own pace - previous content stays visible
- **Interactive Challenges**: Apply what you learned with hands-on coding tasks
- **Lesson Reference**: Review theory while coding with tabbed interface
- **Collapsible Sidebar**: Focus mode for distraction-free learning
- **Code Persistence**: Your progress is saved locally

## Categories

- **JS Basics** - Variables, operators, and fundamentals
- **Conditionals** - if/else, ternary operators
- **Loops** - for loops, while loops, iteration
- **Functions** - Arrow functions, callbacks, default parameters
- **Strings** - String manipulation methods
- **Arrays** - Array methods and iteration
- **Objects** - Object access and manipulation

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/conceptloop.git
cd conceptloop

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling

## Project Structure

```
src/
├── components/
│   ├── LessonView.tsx    # Interactive lesson wizard
│   ├── ProblemCard.tsx   # Challenge task/reference tabs
│   ├── Editor.tsx        # Code editor
│   ├── Console.tsx       # Test results display
│   └── Sidebar.tsx       # Navigation sidebar
├── data/
│   └── challenges.ts     # Challenge definitions with theory steps
├── utils/
│   └── runCode.ts        # Code execution engine
├── App.tsx               # Main application
└── main.tsx              # Entry point
```

## License

MIT
