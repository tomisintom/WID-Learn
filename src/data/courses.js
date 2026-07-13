export const categories = [
  "All",
  "Web2 Development",
  "Product Design",
  "Web3 Project Management",
  "Web3 Marketing",
  "Web3 Business Development",
  "Blockchain Development",
];

const img = (seed) =>
  `https://images.unsplash.com/${seed}?auto=format&fit=crop&w=800&q=80`;

function makeQuiz(topic) {
  return [
    {
      question: `Which of the following best describes a core principle of ${topic}?`,
      options: [
        "Consistent, iterative practice and feedback",
        "Avoiding any structured planning",
        "Working in isolation without review",
        "Ignoring user or audience needs",
      ],
      answer: "Consistent, iterative practice and feedback",
    },
    {
      question: `In ${topic}, what is generally the first step of a healthy workflow?`,
      options: [
        "Jumping straight to the final output",
        "Research and defining clear goals",
        "Skipping requirements entirely",
        "Publishing before testing",
      ],
      answer: "Research and defining clear goals",
    },
    {
      question: `Which habit most improves long-term results in ${topic}?`,
      options: [
        "Reviewing and iterating based on feedback",
        "Never revisiting past work",
        "Working without documentation",
        "Avoiding collaboration",
      ],
      answer: "Reviewing and iterating based on feedback",
    },
    {
      question: `What is a common beginner mistake in ${topic}?`,
      options: [
        "Practicing fundamentals",
        "Trying to skip fundamentals for advanced topics too soon",
        "Asking for feedback",
        "Setting small milestones",
      ],
      answer: "Trying to skip fundamentals for advanced topics too soon",
    },
    {
      question: `Why is community/peer feedback valuable in ${topic}?`,
      options: [
        "It has no real value",
        "It slows progress down unnecessarily",
        "It surfaces blind spots and accelerates learning",
        "It replaces the need to practice",
      ],
      answer: "It surfaces blind spots and accelerates learning",
    },
  ];
}

function makeSections(topic, lessonTitles) {
  return lessonTitles.map((group, gi) => ({
    id: `s${gi + 1}`,
    title: group.title,
    items: group.items.map((title, li) => ({
      id: `s${gi + 1}-l${li + 1}`,
      title,
      duration: `${8 + ((gi + li) % 5) * 3}min`,
      type:
        li === group.items.length - 1 && gi === lessonTitles.length - 1
          ? "video"
          : "video",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    })),
  }));
}

export const courses = [
  {
    id: 1,
    slug: "modern-web-development-bootcamp",
    title: "Modern Web Development Bootcamp",
    category: "Web2 Development",
    level: "Beginner",
    description:
      "Learn to build fast, responsive websites and web apps from scratch using HTML, CSS, JavaScript, and React. By the end you will ship a full portfolio project.",
    instructor: {
      name: "Chinaza",
      title: "Senior Frontend Engineer",
      avatar: img("photo-1573496359142-b8d87734a5a2"),
    },
    rating: 4.8,
    reviews: 2140,
    students: 18420,
    duration: "12 Hours",
    price: 0,
    thumbnail: img("photo-1517694712202-14dd9538aa97"),
    whatYouWillLearn: [
      "Build responsive layouts with HTML & CSS",
      "Write modern JavaScript (ES6+)",
      "Create interactive UIs with React",
      "Deploy a production-ready portfolio site",
    ],
    sections: makeSections("web development", [
      {
        title: "Getting Started",
        items: [
          "Course overview & setup",
          "How the web works",
          "Your first HTML page",
        ],
      },
      {
        title: "Styling with CSS",
        items: [
          "CSS fundamentals",
          "Flexbox in depth",
          "Responsive design with Grid",
        ],
      },
      {
        title: "JavaScript Essentials",
        items: [
          "Variables & functions",
          "DOM manipulation",
          "Async JavaScript",
        ],
      },
      {
        title: "Building with React",
        items: [
          "Components & props",
          "State & hooks",
          "Final project walkthrough",
        ],
      },
    ]),
    quiz: makeQuiz("web development"),
  },
  {
    id: 2,
    slug: "product-design-fundamentals",
    title: "Product Design Fundamentals",
    category: "Product Design",
    level: "Beginner",
    description:
      "Master the fundamentals of user interface and user experience design, from wireframes to polished prototypes, using a modern design-thinking process.",
    instructor: {
      name: "Findy",
      title: "Product Design Lead",
      avatar: img("photo-1519085360753-af0119f7cbe7"),
    },
    rating: 4.9,
    reviews: 1580,
    students: 12300,
    duration: "9 Hours",
    price: 0,
    thumbnail: img("photo-1586717791821-3f44a563fa4c"),
    whatYouWillLearn: [
      "Apply core UX research methods",
      "Design wireframes and user flows",
      "Build high-fidelity prototypes",
      "Run usability tests",
    ],
    sections: makeSections("Product design", [
      {
        title: "Design Thinking",
        items: ["Intro to UX", "Empathy & research", "Defining problems"],
      },
      {
        title: "Wireframing",
        items: [
          "Low-fidelity wireframes",
          "Information architecture",
          "User flows",
        ],
      },
      {
        title: "Visual Design",
        items: ["Color & typography", "Design systems", "Prototyping in Figma"],
      },
    ]),
    quiz: makeQuiz("UI/UX design"),
  },
  {
    id: 3,
    slug: "Web3 project-management-fundamentals",
    title: "Web3 Project Management Fundamentals",
    category: "Web3 Project Management",
    level: "Intermediate",
    description:
      "A hands-on introduction to how projects are managed in the Web3 space.",
    instructor: {
      name: "Peace Ega",
      title: "Project Manager",
      avatar: img("photo-1544005313-94ddf0286df2"),
    },
    rating: 4.7,
    reviews: 3021,
    students: 24010,
    duration: "15 Hours",
    price: 0,
    thumbnail: img("photo-1551288049-bebda4e38f71"),
    whatYouWillLearn: [
      "Understand project lifecycle",
      "Plan project scope and timelines",
      "Manage risks and stakeholders",
      "Apply Agile and Scrum frameworks",
    ],
    sections: makeSections("project management", [
      {
        title: "Project Foundations",
        items: [
          "What is Project Management?",
          "Project Lifecycle",
          "Roles & Responsibilities",
        ],
      },
      {
        title: "Planning Projects",
        items: [
          "Creating Project Scope",
          "Scheduling & Milestones",
          "Risk Management",
        ],
      },
      {
        title: "Agile Project Management",
        items: ["Scrum Basics", "Sprint Planning", "Managing Teams"],
      },
    ]),

    quiz: makeQuiz("project management"),
  },
  {
    id: 4,
    slug: "web3-marketing-essentials",
    title: "Web3 Marketing Essentials",
    category: "Web3 Marketing",
    level: "Beginner",
    description:
      "Learn community-led marketing strategies used by successful blockchain startups, DAOs, and crypto projects.",
    instructor: {
      name: "Motolani",
      title: "Growth Marketing Consultant",
      avatar: img("photo-1500648767791-00dcc994a43e"),
    },
    rating: 4.6,
    reviews: 980,
    students: 9840,
    duration: "8 Hours",
    price: 0,
    thumbnail: img("photo-1460925895917-afdab827c52f"),
    whatYouWillLearn: [
      "Build Web3 communities",
      "Create engaging X (Twitter) campaigns",
      "Understand token launch marketing",
      "Measure campaign performance",
    ],
    sections: makeSections("Web3 marketing", [
      {
        title: "Introduction",
        items: [
          "Understanding Web3 Marketing",
          "Community First",
          "Marketing Funnels",
        ],
      },
      {
        title: "Content Strategy",
        items: ["Twitter Threads", "Discord & Telegram", "Content Calendars"],
      },
      {
        title: "Growth",
        items: ["Partnership Campaigns", "Airdrops", "Analytics"],
      },
    ]),

    quiz: makeQuiz("Web3 marketing"),
  },
  {
    id: 5,
    slug: "business-development-masterclass",
    title: "Business Development Masterclass",
    category: "Web3 Business Development",
    level: "Intermediate",
    description:
      "Develop the skills needed to identify opportunities, build partnerships, generate revenue, and scale businesses.",
    instructor: {
      name: "Sarah",
      title: "Strategy Consultant",
      avatar: img("photo-1487412720507-e7ab37603c6f"),
    },
    rating: 4.5,
    reviews: 612,
    students: 5210,
    duration: "7 Hours",
    price: 0,
    thumbnail: img("photo-1557804506-669a67965ba0"),
    whatYouWillLearn: [
      "Generate leads",
      "Build strategic partnerships",
      "Negotiate business deals",
      "Create growth strategies",
    ],
    sections: makeSections("business development", [
      {
        title: "Business Fundamentals",
        items: [
          "Understanding Business Development",
          "Finding Opportunities",
          "Customer Discovery",
        ],
      },
      {
        title: "Sales & Partnerships",
        items: [
          "Lead Generation",
          "Partnership Strategy",
          "Negotiation Skills",
        ],
      },
      {
        title: "Scaling Businesses",
        items: ["Growth Planning", "Revenue Models", "KPIs"],
      },
    ]),

    quiz: makeQuiz("business development"),
  },
  {
    id: 6,
    slug: "blockchain-development-bootcamp",
    title: "Blockchain Development Bootcamp",
    category: "Blockchain Development",
    level: "Advanced",
    description:
      "Learn blockchain fundamentals, smart contract development, Solidity, and how to build decentralized applications (dApps).",
    instructor: {
      name: "Koxy",
      title: "Blockchain Engineer",
      avatar: img("koxy"),
    },
    rating: 4.9,
    reviews: 1420,
    students: 8760,
    duration: "6 Hours",
    price: 0,
    thumbnail: img("photo-1639322537231-2f206e06af84"),
    whatYouWillLearn: [
      "Understand blockchain architecture",
      "Write Solidity smart contracts",
      "Deploy contracts on Ethereum",
      "Build your first dApp",
    ],
    sections: makeSections("blockchain development", [
      {
        title: "Blockchain Basics",
        items: [
          "What is Blockchain?",
          "Consensus Mechanisms",
          "Wallets & Transactions",
        ],
      },
      {
        title: "Smart Contracts",
        items: [
          "Introduction to Solidity",
          "Writing Smart Contracts",
          "Deploying Contracts",
        ],
      },
      {
        title: "Building dApps",
        items: ["Connecting Wallets", "Frontend Integration", "Final Project"],
      },
    ]),

    quiz: makeQuiz("blockchain development"),
  },
  {
    id: 7,
    slug: "advanced-react-patterns",
    title: "Advanced React Patterns",
    category: "Web Development",
    level: "Advanced",
    description:
      "Level up your React skills with advanced hooks, performance optimization, state management, and testing patterns used in production apps.",
    instructor: {
      name: "Findy",
      title: "Senior Frontend Engineer",
      avatar: img("photo-1573496359142-b8d87734a5a2"),
    },
    rating: 4.8,
    reviews: 890,
    students: 6100,
    duration: "10 Hours",
    price: 0,
    thumbnail: img("photo-1633356122544-f134324a6cee"),
    whatYouWillLearn: [
      "Design reusable custom hooks",
      "Optimize rendering performance",
      "Manage complex application state",
      "Write reliable component tests",
    ],
    sections: makeSections("advanced React", [
      {
        title: "Advanced Hooks",
        items: ["Custom hooks", "useReducer patterns"],
      },
      { title: "Performance", items: ["Memoization", "Code splitting"] },
      {
        title: "Testing",
        items: ["Unit testing components", "Integration testing"],
      },
    ]),
    quiz: makeQuiz("advanced React"),
  },
  {
    id: 8,
    slug: "graphic-design-with-figma",
    title: "Graphic Design with Figma",
    category: "Design",
    level: "Beginner",
    description:
      "Learn to design logos, social media graphics, and marketing assets using Figma\u2019s powerful and free design tools.",
    instructor: {
      name: "Ofure Ovuo",
      title: "Product Design Lead",
      avatar: img("photo-1519085360753-af0119f7cbe7"),
    },
    rating: 4.7,
    reviews: 730,
    students: 7400,
    duration: "5 Hours",
    price: 0,
    thumbnail: img("photo-1561070791-2526d30994b5"),
    whatYouWillLearn: [
      "Navigate the Figma interface",
      "Design reusable components",
      "Create social & marketing graphics",
      "Export assets for production",
    ],
    sections: makeSections("graphic design", [
      { title: "Figma Basics", items: ["Interface tour", "Shapes & layers"] },
      {
        title: "Design Projects",
        items: ["Logo design", "Social media templates"],
      },
    ]),
    quiz: makeQuiz("graphic design"),
  },
];

export function getCourseBySlug(slug) {
  return courses.find((c) => c.slug === slug);
}

export function getCourseById(id) {
  return courses.find((c) => String(c.id) === String(id));
}

export function totalLessons(course) {
  return course.sections.reduce((sum, s) => sum + s.items.length, 0);
}

export function allLessonsFlat(course) {
  return course.sections.flatMap((s) =>
    s.items.map((l) => ({ ...l, sectionTitle: s.title })),
  );
}
