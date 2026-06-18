export const frontendData = [
  {
    id: 'react',
    title: 'React.js',
    icon: '⚛️',
    summary: 'A JavaScript library for building user interfaces with a component-based architecture and declarative rendering.',
    concepts: ['JSX', 'Virtual DOM', 'Hooks', 'State & Props', 'Context API', 'Reconciliation', 'Higher-Order Components', 'Refs'],
    questions: [
      {
        id: 'react-001',
        question: 'What is the Virtual DOM and how does React use it?',
        difficulty: 'easy',
        answer: 'The Virtual DOM is a lightweight JavaScript representation of the actual DOM. When state changes, React creates a new Virtual DOM tree, compares it with the previous one (diffing), and calculates the minimum number of changes needed (reconciliation) before updating the real DOM.',
        codeLanguage: 'javascript'
      },
      {
        id: 'react-002',
        question: 'Explain the difference between useEffect and useLayoutEffect.',
        difficulty: 'hard',
        answer: 'useEffect runs asynchronously AFTER the browser paints the DOM, so it doesn\'t block rendering. useLayoutEffect runs synchronously immediately after React performs all DOM mutations, BEFORE the browser paints. useLayoutEffect is used when you need to read DOM measurements and mutate the DOM again to prevent visual flickering.',
        codeLanguage: 'javascript'
      },
      {
        id: 'react-003',
        question: 'What are React Server Components (RSC)?',
        difficulty: 'hard',
        answer: 'RSCs execute only on the server and never ship their JavaScript to the client, reducing bundle size. They can directly access backend resources (like databases) and are streamed to the client as HTML/UI descriptions. Client components (marked with \'use client\') are used for interactivity.',
        codeLanguage: 'javascript'
      },
      {
        id: 'react-004',
        question: 'How do you optimize performance in a React application?',
        difficulty: 'medium',
        answer: '1. Use React.memo() to memoize functional components. 2. Use useMemo() for expensive calculations. 3. Use useCallback() to memoize functions passed as props. 4. Code split using React.lazy() and Suspense. 5. Avoid inline objects/functions in props if they cause unnecessary re-renders. 6. Virtualize long lists using react-window.',
        codeLanguage: 'javascript'
      },
      {
        id: 'react-005',
        question: 'What is the Context API and when should you use it?',
        difficulty: 'medium',
        answer: 'Context provides a way to pass data through the component tree without having to pass props down manually at every level (prop drilling). It is ideal for global state like themes, user authentication, or language preferences. It should not be used for high-frequency state changes as it triggers a re-render of all consuming components.',
        codeLanguage: 'javascript'
      }
    ]
  },
  {
    id: 'css',
    title: 'CSS & Styling',
    icon: '💅',
    summary: 'Cascading Style Sheets, layout algorithms, preprocessors, and modern styling architectures.',
    concepts: ['Flexbox', 'Grid', 'Specificity', 'Box Model', 'BEM', 'CSS Modules', 'Tailwind', 'Animations'],
    questions: [
      {
        id: 'css-001',
        question: 'Explain CSS Specificity and how it is calculated.',
        difficulty: 'medium',
        answer: 'Specificity is a weight applied to a given CSS declaration. It is calculated in 4 columns: Inline styles (1,0,0,0), IDs (0,1,0,0), Classes/Attributes/Pseudo-classes (0,0,1,0), Elements/Pseudo-elements (0,0,0,1). The highest value wins. !important overrides all normal specificity rules.',
        codeLanguage: 'css'
      },
      {
        id: 'css-002',
        question: 'What is the difference between relative, absolute, fixed, and sticky positioning?',
        difficulty: 'easy',
        answer: 'Relative: Positions relative to its normal position. Absolute: Positions relative to the nearest positioned ancestor (non-static). Fixed: Positions relative to the viewport. Sticky: Toggles between relative and fixed based on the scroll position.',
        codeLanguage: 'css'
      },
      {
        id: 'css-003',
        question: 'Describe the CSS Box Model.',
        difficulty: 'easy',
        answer: 'The Box Model consists of four areas: Content (the actual data), Padding (transparent area around content), Border (area around padding), and Margin (transparent area around the border). box-sizing: border-box includes padding and border within the element\'s declared width/height.',
        codeLanguage: 'css'
      },
      {
        id: 'css-004',
        question: 'How does CSS Grid differ from Flexbox?',
        difficulty: 'medium',
        answer: 'Flexbox is a one-dimensional layout system designed for laying out items in a single row or column. Grid is a two-dimensional layout system designed for placing items in both rows and columns simultaneously. Flexbox is content-out, Grid is layout-in.',
        codeLanguage: 'css'
      }
    ]
  },
  {
    id: 'web-perf',
    title: 'Web Performance & Architecture',
    icon: '🚀',
    summary: 'Core Web Vitals, browser rendering pipeline, caching, and network optimization.',
    concepts: ['Core Web Vitals', 'Critical Rendering Path', 'Lazy Loading', 'Caching', 'CDN', 'Service Workers', 'Prefetch/Preload'],
    questions: [
      {
        id: 'perf-001',
        question: 'What are the Core Web Vitals?',
        difficulty: 'hard',
        answer: 'Core Web Vitals are a set of metrics defined by Google. 1. Largest Contentful Paint (LCP): Measures loading performance (target < 2.5s). 2. First Input Delay (FID) / Interaction to Next Paint (INP): Measures interactivity/responsiveness. 3. Cumulative Layout Shift (CLS): Measures visual stability (target < 0.1).',
        codeLanguage: 'javascript'
      },
      {
        id: 'perf-002',
        question: 'Explain the Critical Rendering Path.',
        difficulty: 'hard',
        answer: 'The sequence of steps the browser takes to convert HTML, CSS, and JS into pixels. 1. Parse HTML to create DOM. 2. Parse CSS to create CSSOM. 3. Combine DOM and CSSOM into the Render Tree. 4. Layout (calculate positions and geometry). 5. Paint (draw pixels on screen). 6. Composite (layer composition).',
        codeLanguage: 'javascript'
      },
      {
        id: 'perf-003',
        question: 'What is the difference between <script defer> and <script async>?',
        difficulty: 'medium',
        answer: 'Both allow HTML parsing to continue while the script downloads. "async" executes the script immediately once downloaded, pausing HTML parsing, and doesn\'t guarantee execution order. "defer" executes the script only after HTML parsing is fully complete, and guarantees execution in the order they appear in the document.',
        codeLanguage: 'html'
      }
    ]
  },
  {
    id: 'javascript',
    title: 'JavaScript Core',
    icon: '💛',
    summary: 'The language of the web: closures, event loop, prototypes, and ES6+ features.',
    concepts: ['Closures', 'Hoisting', 'Promises & Async/Await', 'Event Delegation', 'Prototypal Inheritance', 'Execution Context'],
    questions: [
      {
        id: 'js-001',
        question: 'What is a Closure?',
        difficulty: 'medium',
        answer: 'A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). In other words, a closure gives a function access to its outer scope, even after the outer function has returned. Commonly used for data privacy and function factories.',
        codeLanguage: 'javascript'
      },
      {
        id: 'js-002',
        question: 'Explain Event Delegation in JavaScript.',
        difficulty: 'medium',
        answer: 'Event delegation is a technique involving adding event listeners to a parent element instead of adding them to the descendant elements. The listener will fire whenever the event is triggered on the descendant elements due to event bubbling up the DOM. This saves memory and works automatically for dynamically added children.',
        codeLanguage: 'javascript'
      },
      {
        id: 'js-003',
        question: 'What is the difference between == and ===?',
        difficulty: 'easy',
        answer: 'The == operator performs type coercion before comparison (e.g., "1" == 1 is true). The === operator (strict equality) does not perform type coercion, meaning both the value and the type must be identical (e.g., "1" === 1 is false). Always use === to avoid unexpected bugs.',
        codeLanguage: 'javascript'
      },
      {
        id: 'js-004',
        question: 'Explain the concept of "Hoisting".',
        difficulty: 'medium',
        answer: 'Hoisting is JavaScript\'s default behavior of moving declarations to the top of the current scope (script or function) before code execution. Only declarations are hoisted, not initializations. Variables declared with var are hoisted and initialized with undefined. let and const are hoisted but remain uninitialized in the "Temporal Dead Zone".',
        codeLanguage: 'javascript'
      }
    ]
  },
  {
    id: 'typescript',
    title: 'TypeScript',
    icon: '📘',
    summary: 'A strict syntactical superset of JavaScript that adds optional static typing.',
    concepts: ['Interfaces vs Types', 'Generics', 'Utility Types', 'Enums', 'Type Guards', 'Decorators'],
    questions: [
      {
        id: 'ts-001',
        question: 'What is the difference between an Interface and a Type alias?',
        difficulty: 'medium',
        answer: 'Interfaces are primarily used to define the shape of objects and can be merged (declaration merging). Types can define the shape of objects but also represent primitive types, unions, and intersections. Types cannot be merged. In general, use interfaces for public API definitions and object shapes, and types for unions/complex utility types.',
        codeLanguage: 'typescript'
      },
      {
        id: 'ts-002',
        question: 'Explain Generics in TypeScript.',
        difficulty: 'hard',
        answer: 'Generics allow you to create reusable components/functions that can work over a variety of types rather than a single one. They act as a placeholder for a type that will be specified when the function or class is used (e.g., Array<T>). This provides type safety without sacrificing flexibility.',
        codeLanguage: 'typescript'
      },
      {
        id: 'ts-003',
        question: 'What are Type Guards?',
        difficulty: 'medium',
        answer: 'Type guards are expressions that perform a runtime check to narrow down the type within a specific scope. Examples include using typeof, instanceof, the "in" operator, or custom type predicate functions (e.g., function isString(val: any): val is string).',
        codeLanguage: 'typescript'
      }
    ]
  }
];
