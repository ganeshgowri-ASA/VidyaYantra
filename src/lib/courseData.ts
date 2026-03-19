export type LessonType = 'video' | 'reading' | 'quiz' | 'exercise' | 'lab'

export interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correct: number
  explanation: string
}

export interface Lesson {
  id: string
  title: string
  type: LessonType
  duration: string
  xp: number
  content: {
    overview: string
    keyPoints: string[]
    videoTitle?: string
    videoDuration?: string
    transcript?: string
    codeExample?: string
    quiz?: QuizQuestion[]
    exercise?: {
      title: string
      description: string
      starterCode: string
      solution: string
      hints: string[]
    }
  }
}

export interface Module {
  id: number
  title: string
  lessons: Lesson[]
}

export interface CourseContent {
  id: number
  title: string
  category: string
  level: string
  instructor: string
  about: string
  whatYouLearn: string[]
  requirements: string[]
  modules: Module[]
}

export const allCourses: CourseContent[] = [
  {
    id: 1,
    title: 'Full-Stack Web Development with React & Node.js',
    category: 'Development',
    level: 'Intermediate',
    instructor: 'Dr. Priya Sharma',
    about: 'Master modern full-stack development by building real-world applications with React, Node.js, Express, and PostgreSQL. This comprehensive course covers everything from component architecture to deployment.',
    whatYouLearn: [
      'Build production-ready React applications with hooks and context',
      'Create RESTful APIs with Node.js and Express',
      'Implement authentication with JWT and OAuth',
      'Deploy full-stack apps to cloud platforms',
      'Write unit and integration tests',
      'Use TypeScript for type-safe development'
    ],
    requirements: [
      'Basic JavaScript knowledge',
      'Understanding of HTML and CSS',
      'Familiarity with command line',
      'A computer with Node.js installed'
    ],
    modules: [
      {
        id: 1,
        title: 'React Fundamentals',
        lessons: [
          {
            id: '1-1-1',
            title: 'Introduction to React & JSX',
            type: 'video',
            duration: '18 min',
            xp: 50,
            content: {
              overview: 'Learn the core concepts of React including components, JSX syntax, and the virtual DOM. Understand why React has become the most popular frontend library.',
              keyPoints: [
                'React uses a virtual DOM for efficient updates',
                'JSX lets you write HTML-like syntax in JavaScript',
                'Components are the building blocks of React apps',
                'React follows a unidirectional data flow'
              ],
              videoTitle: 'React & JSX Deep Dive',
              videoDuration: '18:24',
              codeExample: 'function Welcome({ name }) {\n  return <h1>Hello, {name}!</h1>\n}\n\nexport default function App() {\n  return (\n    <div>\n      <Welcome name="VidyaYantra" />\n    </div>\n  )\n}'
            }
          },
          {
            id: '1-1-2',
            title: 'State Management with Hooks',
            type: 'exercise',
            duration: '25 min',
            xp: 75,
            content: {
              overview: 'Master useState and useEffect hooks to manage component state and side effects in functional React components.',
              keyPoints: [
                'useState provides state in functional components',
                'useEffect handles side effects like API calls',
                'Custom hooks enable reusable stateful logic',
                'Rules of hooks must be followed'
              ],
              exercise: {
                title: 'Build a Counter with useReducer',
                description: 'Create a counter component that supports increment, decrement, and reset using useReducer hook.',
                starterCode: 'import { useReducer } from "react"\n\nfunction reducer(state, action) {\n  // TODO: Implement reducer\n}\n\nexport default function Counter() {\n  // TODO: Use useReducer\n  return <div>Counter</div>\n}',
                solution: 'import { useReducer } from "react"\n\nfunction reducer(state, action) {\n  switch (action.type) {\n    case "increment": return { count: state.count + 1 }\n    case "decrement": return { count: state.count - 1 }\n    case "reset": return { count: 0 }\n    default: return state\n  }\n}\n\nexport default function Counter() {\n  const [state, dispatch] = useReducer(reducer, { count: 0 })\n  return (\n    <div>\n      <p>Count: {state.count}</p>\n      <button onClick={() => dispatch({ type: "increment" })}>+</button>\n      <button onClick={() => dispatch({ type: "decrement" })}>-</button>\n      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>\n    </div>\n  )\n}',
                hints: [
                  'useReducer takes a reducer function and initial state',
                  'The reducer should return new state based on action type',
                  'dispatch sends actions to the reducer'
                ]
              }
            }
          },
          {
            id: '1-1-3',
            title: 'React Fundamentals Quiz',
            type: 'quiz',
            duration: '10 min',
            xp: 40,
            content: {
              overview: 'Test your understanding of React fundamentals including JSX, components, and hooks.',
              keyPoints: ['Review core React concepts'],
              quiz: [
                {
                  id: 1,
                  question: 'What is JSX?',
                  options: ['A new programming language', 'A syntax extension for JavaScript', 'A CSS framework', 'A database query language'],
                  correct: 1,
                  explanation: 'JSX is a syntax extension for JavaScript that allows writing HTML-like code within JavaScript files.'
                },
                {
                  id: 2,
                  question: 'Which hook is used for side effects?',
                  options: ['useState', 'useEffect', 'useContext', 'useMemo'],
                  correct: 1,
                  explanation: 'useEffect is the hook designed for handling side effects like data fetching, subscriptions, and DOM manipulation.'
                },
                {
                  id: 3,
                  question: 'What does the virtual DOM do?',
                  options: ['Replaces the real DOM entirely', 'Creates a lightweight copy for efficient diffing', 'Stores data in the browser', 'Handles routing'],
                  correct: 1,
                  explanation: 'The virtual DOM creates a lightweight in-memory representation of the real DOM, enabling React to efficiently compute and apply minimal updates.'
                }
              ]
            }
          }
        ]
      },
      {
        id: 2,
        title: 'Backend with Node.js & Express',
        lessons: [
          {
            id: '1-2-1',
            title: 'Building RESTful APIs',
            type: 'video',
            duration: '22 min',
            xp: 55,
            content: {
              overview: 'Learn to build scalable RESTful APIs using Node.js and Express. Cover routing, middleware, error handling, and best practices for API design.',
              keyPoints: [
                'Express simplifies Node.js server creation',
                'REST uses HTTP methods for CRUD operations',
                'Middleware functions process requests in a pipeline',
                'Proper error handling improves API reliability'
              ],
              videoTitle: 'RESTful API Design Masterclass',
              videoDuration: '22:10',
              codeExample: 'const express = require("express")\nconst app = express()\n\napp.use(express.json())\n\nlet todos = []\n\napp.get("/api/todos", (req, res) => {\n  res.json(todos)\n})\n\napp.post("/api/todos", (req, res) => {\n  const todo = { id: Date.now(), ...req.body }\n  todos.push(todo)\n  res.status(201).json(todo)\n})\n\napp.listen(3000, () => console.log("Server running"))'
            }
          },
          {
            id: '1-2-2',
            title: 'Database Integration with PostgreSQL',
            type: 'lab',
            duration: '30 min',
            xp: 80,
            content: {
              overview: 'Connect your Express API to PostgreSQL using Prisma ORM. Learn schema design, migrations, and querying.',
              keyPoints: [
                'Prisma provides type-safe database access',
                'Migrations track database schema changes',
                'Relations model real-world data connections',
                'Query optimization improves performance'
              ],
              codeExample: '// schema.prisma\nmodel User {\n  id    Int     @id @default(autoincrement())\n  email String  @unique\n  name  String?\n  posts Post[]\n}\n\nmodel Post {\n  id       Int    @id @default(autoincrement())\n  title    String\n  content  String?\n  author   User   @relation(fields: [authorId], references: [id])\n  authorId Int\n}'
            }
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'Data Science & Machine Learning with Python',
    category: 'Data Science',
    level: 'Beginner',
    instructor: 'Prof. Arjun Mehta',
    about: 'Dive into data science and machine learning using Python. Learn data analysis with pandas, visualization with matplotlib, and build ML models with scikit-learn and TensorFlow.',
    whatYouLearn: [
      'Analyze data with pandas and NumPy',
      'Create stunning visualizations with matplotlib and seaborn',
      'Build classification and regression models',
      'Understand neural networks and deep learning basics',
      'Work with real-world datasets',
      'Deploy ML models as APIs'
    ],
    requirements: [
      'Basic Python programming',
      'High school mathematics',
      'Curiosity about data and patterns'
    ],
    modules: [
      {
        id: 1,
        title: 'Python for Data Science',
        lessons: [
          {
            id: '2-1-1',
            title: 'NumPy & Pandas Essentials',
            type: 'video',
            duration: '20 min',
            xp: 50,
            content: {
              overview: 'Learn the foundational libraries for data manipulation in Python. NumPy provides efficient numerical computing while pandas offers powerful data structures.',
              keyPoints: [
                'NumPy arrays enable fast numerical operations',
                'DataFrames are the core pandas data structure',
                'Vectorized operations outperform loops',
                'Data cleaning is essential before analysis'
              ],
              videoTitle: 'NumPy & Pandas Crash Course',
              videoDuration: '20:15',
              codeExample: 'import pandas as pd\nimport numpy as np\n\n# Create DataFrame\ndf = pd.DataFrame({\n  "name": ["Alice", "Bob", "Charlie"],\n  "score": [95, 87, 92],\n  "grade": ["A", "B+", "A-"]\n})\n\nprint(df.describe())\nprint(df[df["score"] > 90])'
            }
          },
          {
            id: '2-1-2',
            title: 'Data Visualization Lab',
            type: 'lab',
            duration: '25 min',
            xp: 70,
            content: {
              overview: 'Create compelling visualizations using matplotlib and seaborn. Learn to choose the right chart type for your data story.',
              keyPoints: [
                'matplotlib is the foundation of Python plotting',
                'seaborn provides statistical visualizations',
                'Choose chart types based on data relationships',
                'Good visualizations tell a clear story'
              ],
              codeExample: 'import matplotlib.pyplot as plt\nimport seaborn as sns\n\n# Sample data\ntips = sns.load_dataset("tips")\n\nfig, axes = plt.subplots(1, 2, figsize=(12, 5))\nsns.histplot(tips["total_bill"], ax=axes[0])\nsns.scatterplot(x="total_bill", y="tip", hue="time", data=tips, ax=axes[1])\nplt.tight_layout()\nplt.show()'
            }
          },
          {
            id: '2-1-3',
            title: 'Data Analysis Quiz',
            type: 'quiz',
            duration: '8 min',
            xp: 35,
            content: {
              overview: 'Test your knowledge of Python data science fundamentals.',
              keyPoints: ['Review pandas and NumPy concepts'],
              quiz: [
                {
                  id: 1,
                  question: 'What is the primary data structure in pandas?',
                  options: ['Array', 'DataFrame', 'Dictionary', 'List'],
                  correct: 1,
                  explanation: 'DataFrame is the primary two-dimensional data structure in pandas for storing tabular data.'
                },
                {
                  id: 2,
                  question: 'Why are NumPy operations faster than Python loops?',
                  options: ['They use more memory', 'Vectorized operations in C', 'They skip error checking', 'They use multithreading'],
                  correct: 1,
                  explanation: 'NumPy operations are implemented in C and operate on entire arrays at once (vectorization), avoiding slow Python loops.'
                }
              ]
            }
          }
        ]
      },
      {
        id: 2,
        title: 'Machine Learning Foundations',
        lessons: [
          {
            id: '2-2-1',
            title: 'Your First ML Model',
            type: 'exercise',
            duration: '30 min',
            xp: 85,
            content: {
              overview: 'Build your first machine learning model using scikit-learn. Learn the ML workflow from data preparation to model evaluation.',
              keyPoints: [
                'ML workflow: prepare, train, evaluate, predict',
                'Train/test split prevents overfitting',
                'Feature scaling improves model performance',
                'Metrics help evaluate model quality'
              ],
              exercise: {
                title: 'Build a House Price Predictor',
                description: 'Use linear regression to predict house prices based on features like size, bedrooms, and location.',
                starterCode: 'from sklearn.linear_model import LinearRegression\nfrom sklearn.model_selection import train_test_split\nimport pandas as pd\n\n# TODO: Load data, split, train, and evaluate',
                solution: 'from sklearn.linear_model import LinearRegression\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.metrics import r2_score\nimport pandas as pd\n\ndf = pd.read_csv("houses.csv")\nX = df[["size", "bedrooms", "age"]]\ny = df["price"]\n\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)\nmodel = LinearRegression()\nmodel.fit(X_train, y_train)\npredictions = model.predict(X_test)\nprint(f"R2 Score: {r2_score(y_test, predictions):.2f}")',
                hints: [
                  'Use train_test_split with test_size=0.2',
                  'Call model.fit() with training data',
                  'Use r2_score to evaluate predictions'
                ]
              }
            }
          }
        ]
      }
    ]
  },
  {
    id: 3,
    title: 'UI/UX Design Mastery',
    category: 'Design',
    level: 'Beginner',
    instructor: 'Kavya Reddy',
    about: 'Learn the principles of exceptional UI/UX design. From user research to prototyping in Figma, master the skills needed to create beautiful, user-centered digital products.',
    whatYouLearn: [
      'Conduct user research and create personas',
      'Design wireframes and high-fidelity prototypes in Figma',
      'Apply color theory and typography principles',
      'Create responsive designs for multiple devices',
      'Build and maintain design systems',
      'Conduct usability testing and iterate'
    ],
    requirements: [
      'No prior design experience needed',
      'A Figma account (free)',
      'Interest in creating great user experiences'
    ],
    modules: [
      {
        id: 1,
        title: 'Design Thinking & Research',
        lessons: [
          {
            id: '3-1-1',
            title: 'Introduction to Design Thinking',
            type: 'video',
            duration: '15 min',
            xp: 45,
            content: {
              overview: 'Explore the five stages of design thinking: Empathize, Define, Ideate, Prototype, and Test. Understand how this human-centered approach drives innovation.',
              keyPoints: [
                'Design thinking is a human-centered problem-solving approach',
                'The five stages are iterative, not linear',
                'Empathy is the foundation of good design',
                'Rapid prototyping validates ideas quickly'
              ],
              videoTitle: 'Design Thinking Framework',
              videoDuration: '15:30'
            }
          },
          {
            id: '3-1-2',
            title: 'User Research Methods',
            type: 'reading',
            duration: '12 min',
            xp: 30,
            content: {
              overview: 'Learn various user research methods including interviews, surveys, and contextual inquiry to understand your users deeply.',
              keyPoints: [
                'Qualitative research reveals user motivations',
                'Quantitative research validates assumptions at scale',
                'Personas synthesize research into actionable profiles',
                'Journey maps visualize the user experience'
              ]
            }
          },
          {
            id: '3-1-3',
            title: 'Design Principles Quiz',
            type: 'quiz',
            duration: '8 min',
            xp: 35,
            content: {
              overview: 'Test your understanding of design thinking and research methods.',
              keyPoints: ['Review design thinking concepts'],
              quiz: [
                {
                  id: 1,
                  question: 'What is the first stage of design thinking?',
                  options: ['Define', 'Ideate', 'Empathize', 'Prototype'],
                  correct: 2,
                  explanation: 'Empathize is the first stage where designers understand user needs through observation and engagement.'
                },
                {
                  id: 2,
                  question: 'What is a user persona?',
                  options: ['A real user profile', 'A fictional representation of a target user', 'A login avatar', 'A design template'],
                  correct: 1,
                  explanation: 'A persona is a fictional, data-driven representation of a target user that guides design decisions.'
                }
              ]
            }
          }
        ]
      }
    ]
  },
  {
    id: 4,
    title: 'Cloud Computing & DevOps with AWS',
    category: 'Cloud',
    level: 'Advanced',
    instructor: 'Vikram Patel',
    about: 'Master cloud infrastructure and DevOps practices using AWS. Learn to architect scalable systems, implement CI/CD pipelines, and manage containerized applications with Docker and Kubernetes.',
    whatYouLearn: [
      'Design scalable cloud architectures on AWS',
      'Implement CI/CD pipelines with GitHub Actions',
      'Containerize applications with Docker',
      'Orchestrate containers with Kubernetes',
      'Monitor and optimize cloud infrastructure',
      'Implement infrastructure as code with Terraform'
    ],
    requirements: [
      'Basic Linux command line skills',
      'Understanding of networking fundamentals',
      'An AWS account (free tier available)',
      'Familiarity with Git'
    ],
    modules: [
      {
        id: 1,
        title: 'AWS Fundamentals',
        lessons: [
          {
            id: '4-1-1',
            title: 'AWS Core Services Overview',
            type: 'video',
            duration: '20 min',
            xp: 50,
            content: {
              overview: 'Explore the essential AWS services including EC2, S3, RDS, Lambda, and VPC. Understand when and how to use each service.',
              keyPoints: [
                'EC2 provides virtual servers in the cloud',
                'S3 offers scalable object storage',
                'Lambda enables serverless computing',
                'VPC provides network isolation'
              ],
              videoTitle: 'AWS Services Deep Dive',
              videoDuration: '20:45'
            }
          },
          {
            id: '4-1-2',
            title: 'Docker & Containerization Lab',
            type: 'lab',
            duration: '35 min',
            xp: 90,
            content: {
              overview: 'Learn to containerize applications with Docker. Build, run, and manage containers for consistent deployment across environments.',
              keyPoints: [
                'Containers package apps with their dependencies',
                'Dockerfiles define container build steps',
                'Docker Compose manages multi-container apps',
                'Container registries store and distribute images'
              ],
              codeExample: '# Dockerfile\nFROM node:18-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci --only=production\nCOPY . .\nEXPOSE 3000\nCMD ["node", "server.js"]\n\n# docker-compose.yml\nversion: "3.8"\nservices:\n  app:\n    build: .\n    ports:\n      - "3000:3000"\n    environment:\n      - DATABASE_URL=postgres://db:5432/app\n  db:\n    image: postgres:15\n    volumes:\n      - pgdata:/var/lib/postgresql/data\nvolumes:\n  pgdata:'
            }
          },
          {
            id: '4-1-3',
            title: 'Cloud Architecture Exercise',
            type: 'exercise',
            duration: '25 min',
            xp: 75,
            content: {
              overview: 'Design a scalable, fault-tolerant architecture for a web application using AWS services.',
              keyPoints: [
                'High availability requires multi-AZ deployment',
                'Auto-scaling handles variable load',
                'Load balancers distribute traffic evenly',
                'CDN reduces latency for global users'
              ],
              exercise: {
                title: 'Design a Scalable E-commerce Architecture',
                description: 'Create an architecture diagram and configuration for a scalable e-commerce platform handling 10K concurrent users.',
                starterCode: '# Architecture Configuration\n# TODO: Define your AWS architecture\n\nservices:\n  frontend:\n    type: # Choose service\n  backend:\n    type: # Choose service\n  database:\n    type: # Choose service\n  cache:\n    type: # Choose service',
                solution: '# Architecture Configuration\nservices:\n  frontend:\n    type: CloudFront + S3\n    config: Global CDN distribution\n  backend:\n    type: ECS Fargate\n    config: Auto-scaling 2-10 tasks\n  database:\n    type: RDS PostgreSQL Multi-AZ\n    config: db.r5.large with read replicas\n  cache:\n    type: ElastiCache Redis\n    config: Cluster mode enabled\n  load_balancer:\n    type: Application Load Balancer\n    config: Path-based routing\n  monitoring:\n    type: CloudWatch + X-Ray\n    config: Custom dashboards and alarms',
                hints: [
                  'Use CloudFront for static asset delivery',
                  'ECS Fargate eliminates server management',
                  'Multi-AZ RDS provides automatic failover'
                ]
              }
            }
          }
        ]
      }
    ]
  }
]

export function getCourseById(id: number): CourseContent | undefined {
  return allCourses.find(c => c.id === id)
}

export function getLessonById(courseId: number, lessonId: string): Lesson | undefined {
  const course = getCourseById(courseId)
  if (!course) return undefined
  for (const mod of course.modules) {
    const lesson = mod.lessons.find(l => l.id === lessonId)
    if (lesson) return lesson
  }
  return undefined
}

export function getAllLessons(courseId: number): Lesson[] {
  const course = getCourseById(courseId)
  if (!course) return []
  return course.modules.flatMap(m => m.lessons)
}
