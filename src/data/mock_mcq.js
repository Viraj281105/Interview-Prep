export const mockQuizzes = [
  {
    id: 'quiz-react-fundamentals',
    title: 'React Fundamentals',
    subject: 'Frontend',
    icon: '⚛️',
    description: 'Test your knowledge on React hooks, lifecycle, and state management.',
    timeLimit: 10 * 60, // 10 minutes in seconds
    questions: [
      {
        id: 'q1',
        text: 'Which hook is used to perform side effects in a functional component?',
        options: ['useState', 'useEffect', 'useMemo', 'useCallback'],
        correctOptionIndex: 1,
        explanation: 'useEffect is specifically designed to handle side effects like data fetching, subscriptions, or manually changing the DOM.',
      },
      {
        id: 'q2',
        text: 'What does the useState hook return?',
        options: [
          'An object containing the state value and a setter',
          'A single state variable',
          'An array with two elements: the current state value and a function to update it',
          'A promise that resolves to the state value'
        ],
        correctOptionIndex: 2,
        explanation: 'useState returns an array where the first element is the state variable and the second is the setter function.',
        code: 'const [count, setCount] = useState(0);'
      },
      {
        id: 'q3',
        text: 'How do you prevent a component from re-rendering in React?',
        options: [
          'By returning false from the component function',
          'Using React.memo for functional components',
          'By setting state to null',
          'You cannot prevent re-rendering'
        ],
        correctOptionIndex: 1,
        explanation: 'React.memo is a higher order component that memoizes the rendered output of a functional component, preventing unnecessary re-renders if props have not changed.'
      },
      {
        id: 'q4',
        text: 'What is the purpose of the key prop when rendering lists in React?',
        options: [
          'It provides a unique identifier to style the element',
          'It helps React identify which items have changed, are added, or are removed',
          'It automatically sorts the list based on the key value',
          'It is required by HTML standards for list items'
        ],
        correctOptionIndex: 1,
        explanation: 'Keys help React track element identity during reconciliation, making DOM updates much more efficient.'
      },
      {
        id: 'q5',
        text: 'Which of the following causes a memory leak if not handled properly?',
        options: [
          'Updating state synchronously',
          'Failing to clean up an event listener in useEffect',
          'Using too many useMemo hooks',
          'Prop drilling'
        ],
        correctOptionIndex: 1,
        explanation: 'If an event listener or subscription is created in useEffect without a cleanup function returning, it will persist after the component unmounts, causing a memory leak.'
      }
    ]
  },
  {
    id: 'quiz-dsa-arrays',
    title: 'Arrays & Two Pointers',
    subject: 'Data Structures',
    icon: '🧮',
    description: 'Assess your algorithmic thinking with array manipulation and sliding windows.',
    timeLimit: 15 * 60, // 15 minutes
    questions: [
      {
        id: 'q1',
        text: 'What is the time complexity of looking up an element in an array by its index?',
        options: ['O(1)', 'O(log N)', 'O(N)', 'O(N^2)'],
        correctOptionIndex: 0,
        explanation: 'Arrays store elements in contiguous memory, allowing constant time O(1) random access using the base address and offset.'
      },
      {
        id: 'q2',
        text: 'In the Two Sum problem on an UNSORTED array, which data structure provides the optimal time complexity?',
        options: ['Binary Search Tree', 'Hash Map', 'Priority Queue', 'Stack'],
        correctOptionIndex: 1,
        explanation: 'A Hash Map allows us to store the "complement" of each number and look it up in O(1) time, yielding an overall O(N) time complexity.'
      },
      {
        id: 'q3',
        text: 'When is the Two Pointer technique typically most effective?',
        options: [
          'When searching through an unsorted array',
          'When processing a sorted array or finding palindromes',
          'When inserting elements into a linked list',
          'When balancing a binary tree'
        ],
        correctOptionIndex: 1,
        explanation: 'Two Pointers (often one at the start and one at the end) are highly effective for sorted arrays (e.g., Two Sum sorted) and palindrome checking.'
      },
      {
        id: 'q4',
        text: 'What is Kadane\'s algorithm used for?',
        options: [
          'Finding the longest common subsequence',
          'Finding the maximum sum of a contiguous subarray',
          'Sorting an array in O(N log N) time',
          'Finding the shortest path in an unweighted graph'
        ],
        correctOptionIndex: 1,
        explanation: 'Kadane\'s algorithm maintains a running maximum sum of contiguous elements, resetting it if it drops below zero, running in O(N) time.'
      }
    ]
  },
  {
    id: 'quiz-sql-basics',
    title: 'SQL Fundamentals',
    subject: 'Databases',
    icon: '🗄️',
    description: 'Check your knowledge of JOINs, aggregations, and basic query structures.',
    timeLimit: 8 * 60,
    questions: [
      {
        id: 'q1',
        text: 'Which SQL statement is used to extract data from a database?',
        options: ['EXTRACT', 'SELECT', 'GET', 'OPEN'],
        correctOptionIndex: 1,
        explanation: 'The SELECT statement is the standard command for querying data from a relational database.'
      },
      {
        id: 'q2',
        text: 'What is the primary difference between INNER JOIN and LEFT JOIN?',
        options: [
          'INNER JOIN returns all rows from the left table, LEFT JOIN does not',
          'LEFT JOIN returns all rows from the right table',
          'INNER JOIN returns only matching rows, LEFT JOIN returns all rows from the left table plus matches',
          'There is no difference'
        ],
        correctOptionIndex: 2,
        explanation: 'INNER JOIN strictly requires matches in both tables. LEFT JOIN keeps all records from the left table and appends NULLs if there is no match on the right.'
      },
      {
        id: 'q3',
        text: 'Which clause is used to filter the results of an aggregate function like COUNT()?',
        options: ['WHERE', 'HAVING', 'FILTER', 'GROUP BY'],
        correctOptionIndex: 1,
        explanation: 'The WHERE clause cannot be used with aggregate functions. HAVING is specifically designed to filter records after aggregation.'
      }
    ]
  }
];
