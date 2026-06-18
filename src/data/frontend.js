export const frontendData = [
  {
    id: 'frontend',
    title: 'Frontend Development',
    icon: '🎨',
    summary: 'Client‑side technologies, UI frameworks, performance, and modern web standards.',
    concepts: ['DOM', 'Virtual DOM', 'Component Architecture', 'State Management', 'Responsive Design', 'CSS-in-JS', 'Web Performance', 'Accessibility (a11y)', 'Progressive Web Apps', 'Server‑Side Rendering'],
    questions: [
      { id: 'frontend-001', question: 'What is the virtual DOM and why is it used?', difficulty: 'easy', answer: 'The virtual DOM is an in‑memory lightweight representation of the real DOM. Libraries like React diff the virtual DOM against a previous snapshot to compute minimal updates, reducing direct DOM manipulation and improving performance.', code: '', codeLanguage: '' },
      { id: 'frontend-002', question: 'Explain CSS specificity and how to calculate it.', difficulty: 'medium', answer: 'Specificity is calculated as a 4‑value tuple (inline, ID, class/attribute/pseudo‑class, element/pseudo‑element). Inline styles = 1‑0‑0‑0, IDs = 0‑1‑0‑0, classes/attributes = 0‑0‑1‑0, elements = 0‑0‑0‑1. The higher tuple wins; if equal, the later rule in the stylesheet overrides.', code: '', codeLanguage: '' },
      { id: 'frontend-003', question: 'What are the trade‑offs between using CSS Flexbox vs Grid?', difficulty: 'hard', answer: 'Flexbox is one‑dimensional (row or column) and excels at aligning items along a single axis, making it ideal for navigation bars or simple layouts. Grid is two‑dimensional, allowing placement of items in rows and columns simultaneously, suitable for complex page layouts. Flexbox is simpler for linear arrangements; Grid provides more precise control but can be more verbose.', code: '', codeLanguage: '' },
      { id: 'frontend-004', question: 'How does Server‑Side Rendering (SSR) improve perceived performance?', difficulty: 'medium', answer: 'SSR generates HTML on the server and sends a fully rendered page to the client, enabling the browser to display content sooner, improving First Contentful Paint (FCP) and SEO. Hydration then attaches JavaScript behavior on the client.', code: '', codeLanguage: '' },
      { id: 'frontend-005', question: 'What is code splitting in React and how do you implement it?', difficulty: 'medium', answer: "Code splitting breaks the bundle into smaller chunks that are loaded on demand. In React, you can use dynamic import with React.lazy and Suspense:\n```js\nconst Dashboard = React.lazy(() => import('./Dashboard'));\nfunction App(){\n  return (\n    <Suspense fallback={<Spinner/>}>\n      <Dashboard/>\n    </Suspense>\n  );\n}\n```\nWebpack or Vite will create separate chunk files.", code: "const Dashboard = React.lazy(() => import('./Dashboard'));\nfunction App(){\n  return (\n    <Suspense fallback={<Spinner/>}>\n      <Dashboard/>\n    </Suspense>\n  );\n}\n", codeLanguage: 'javascript' }
    ]
  }
];
