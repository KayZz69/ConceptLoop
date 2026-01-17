# ConceptLoop Architecture

High-level overview of components, data flow, and external dependencies.

## Component Hierarchy

```
App.tsx                    # Root component, state management
├── MobileHeader           # Fixed header with hamburger menu (mobile only)
├── Sidebar                # Category navigation, collapsible (desktop/mobile slide-over)
├── LessonView             # Progressive lesson wizard with continuous scroll
├── ProblemCard            # Challenge task/instructions with lesson review tab
├── Editor                 # Monaco-based code editor with syntax highlighting
├── Console                # Test results display with pass/fail feedback
└── MobileTabBar           # Fixed bottom navigation (mobile only)
```

## State Management

All application state lives in `App.tsx` and flows down via props:

| State | Purpose |
|-------|---------|
| `selectedCategory` | Filters challenges by category |
| `currentChallengeIndex` | Current challenge position in filtered list |
| `code` | User's code in editor |
| `results` | Test execution results |
| `isLessonPhase` | Toggle between lesson wizard and challenge view |
| `completedChallenges` | Persisted to localStorage |
| `theme` | Dark/light mode, persisted to localStorage |

Local persistence uses `localStorage` keys:
`conceptLoop_completed`, `conceptLoop_theme`, and `conceptLoop_code_<challengeId>`.

## Data Flow

```
┌─────────────────────────────────────────────────────────┐
│  challenges.ts (static data)                            │
│  - Categories, challenges, theory steps, test cases    │
└─────────────────────┬───────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│  App.tsx (state container)                              │
│  - Filters challenges                                   │
│  - Manages lesson/challenge phase                       │
│  - Orchestrates code execution                          │
└───────┬─────────────┬─────────────┬─────────────────────┘
        │             │             │
        ▼             ▼             ▼
   LessonView    ProblemCard     Editor
   (theory)      (task/hints)    (code input)
                                      │
                                      ▼
                              ┌───────────────┐
                              │  runCode.ts   │
                              │  (sandboxed   │
                              │   execution)  │
                              └───────┬───────┘
                                      │
                                      ▼
                                   Console
                                   (results)
```

## External Dependencies

| Package | Purpose |
|---------|---------|
| `@monaco-editor/react` | Code editor with syntax highlighting |
| `tailwindcss` | Utility-first CSS framework |
| `vite` | Build tool and dev server |
| `vite-plugin-pwa` | Service worker registration and caching |

## Key Patterns

### Challenge Code Execution (runCode)
Challenge solutions run via `new Function()` with a custom console object in
`runCode.ts`. This captures logs and provides lightweight isolation in-browser.

### Lesson Step Execution (LessonView)
Lesson snippets run via `eval()` with a temporary `console.log` override to
capture output for display. This is separate from `runCode.ts`.

### PWA Caching
The app registers a service worker (via `vite-plugin-pwa`) and caches static
assets and Google Fonts for offline-ready load performance.

### Continuous Scroll (Lesson View)
Previous steps remain visible but dimmed. Uses refs to track step elements and
`scrollIntoView` for auto-scrolling when new steps appear.

### Mobile-First Tabs
Mobile uses a tabbed interface (Task/Code/Run) with a fixed bottom bar.
Desktop shows all panels simultaneously in a split layout.
