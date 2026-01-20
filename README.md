# ConceptLoop

An interactive JavaScript learning platform with progressive lessons and coding challenges. Learn JavaScript fundamentals through a focused, step-by-step approach.

## ✨ Features

### Learning Experience
- **Progressive Lessons** - Step-by-step theory with interactive code execution
- **Vertical Stack Flow** - Previous content stays visible as you learn
- **Run Code to Continue** - Must interact with code before progressing
- **Lesson Reference** - Review theory while coding via tabbed interface

### User Interface
- **Focus Mode** - Collapsible sidebar for distraction-free learning
- **Smooth Transitions** - Animated UI with auto-scroll to new content
- **Dark Theme** - Easy on the eyes with modern glassmorphism design

### Progress Tracking
- **Code Persistence** - Your solutions are saved locally
- **Challenge Completion** - Track your progress across categories
- **Solution Reveal** - Access solutions after 3 failed attempts

### Mobile Experience
- **Responsive Design** - Native app-like experience on mobile
- **Tabbed Interface** - Task/Code/Run tabs with fixed bottom navigation
- **Touch Optimized** - 44px touch targets, safe area support for notched devices

## 📚 Categories

| Category | Description |
|----------|-------------|
| Essentials | Everyday values, strings, and calculations |
| Decisions & Validation | Rules, thresholds, and guard checks |
| Loops & Aggregation | Counting, totals, and averages |
| Functions & Reuse | Defaults, callbacks, and safe utilities |
| Data Shaping | Arrays and objects for structured data |
| Strings & Parsing | Cleaning, extracting, and formatting text |
| Mini Projects | Applied summaries and multi-step tasks |

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/KayZz69/ConceptLoop.git
cd ConceptLoop

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

## 🛠 Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Utility-first styling
- **Monaco Editor** - Code editor with syntax highlighting
- **PWA (vite-plugin-pwa)** - Service worker + offline caching

## 📁 Project Structure

```
src/
├── components/
│   ├── LessonView.tsx    # Progressive lesson wizard
│   ├── ProblemCard.tsx   # Task & lesson reference tabs
│   ├── Editor.tsx        # Monaco-based code editor
│   ├── Console.tsx       # Test results display
│   ├── Sidebar.tsx       # Collapsible navigation
│   ├── MobileHeader.tsx  # Fixed header with menu (mobile)
│   └── MobileTabBar.tsx  # Bottom navigation (mobile)
├── data/
│   └── challenges.ts     # 21 challenges with theory steps
├── utils/
│   └── runCode.ts        # Safe code execution engine
├── App.tsx               # Main application logic
├── index.css             # Global styles & animations
└── main.tsx              # Entry point
```

## 🤖 Agent Rules

This repo includes agent rules for contributors and automated assistants.
See the files in `.agent/rules/` for the current policies:

- `code-style.md` - style and architecture boundaries
- `documentation-rules.md` - documentation expectations
- `safety-and-scope.md` - scope and safe command guidance
- `testing.md` - testing requirements

## 📄 License

MIT
