/**
 * Static tutorial data — local, no external API needed.
 */

export interface Tutorial {
  id: string;
  title: string;
  description: string;
  category: 'getting-started' | 'plugins' | 'feed' | 'workstreams' | 'integrations';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedMinutes: number;
  steps: TutorialStep[];
}

export interface TutorialStep {
  title: string;
  content: string;
}

export const TUTORIALS: Tutorial[] = [
  {
    id: 'welcome-to-vienna',
    title: 'Welcome to Vienna',
    description: 'Learn the basics of Vienna — your AI-powered productivity hub.',
    category: 'getting-started',
    difficulty: 'beginner',
    estimatedMinutes: 5,
    steps: [
      { title: 'Overview', content: 'Vienna is an AI-powered workspace that helps you stay on top of your work.' },
      { title: 'Navigation', content: 'Use the sidebar to switch between workstreams, projects, and plugins.' },
      { title: 'Quick Actions', content: 'Press Cmd+K to open the command palette for quick access to any feature.' },
    ],
  },
  {
    id: 'setup-your-feed',
    title: 'Set Up Your Feed',
    description: 'Create a personalized home screen with AI-generated cards.',
    category: 'feed',
    difficulty: 'beginner',
    estimatedMinutes: 3,
    steps: [
      { title: 'Create feed.md', content: 'Open Settings → Feed and create a new feed.md file.' },
      { title: 'Write Instructions', content: 'Write natural language prompts like "Show my open PRs" or "Display today\'s calendar".' },
      { title: 'Refresh', content: 'Click Refresh to see your AI-generated cards appear.' },
    ],
  },
  {
    id: 'build-your-first-plugin',
    title: 'Build Your First Plugin',
    description: 'Create a Vienna plugin with a sidebar, drawer, and entity.',
    category: 'plugins',
    difficulty: 'intermediate',
    estimatedMinutes: 15,
    steps: [
      { title: 'Scaffold', content: 'Run `vcli plugin scaffold --name my_plugin --canvas sidebar,drawer` to generate boilerplate.' },
      { title: 'Define Entity', content: 'Use defineEntity() to create a data type with URI patterns and display metadata.' },
      { title: 'Add Integration', content: 'Use defineIntegration() to connect to an external API with OAuth or API key auth.' },
      { title: 'Build UI', content: 'Create React components for the sidebar and drawer canvases using @tryvienna/ui.' },
    ],
  },
  {
    id: 'working-with-workstreams',
    title: 'Working with Workstreams',
    description: 'Manage parallel conversations and tasks with workstreams.',
    category: 'workstreams',
    difficulty: 'beginner',
    estimatedMinutes: 5,
    steps: [
      { title: 'Create a Workstream', content: 'Click the + button in the sidebar to start a new workstream.' },
      { title: 'Organize Work', content: 'Use workstreams to keep different tasks separate — one per feature, bug, or question.' },
      { title: 'Switch Context', content: 'Click any workstream in the sidebar to switch back to it. Your conversation history is preserved.' },
    ],
  },
  {
    id: 'connect-linear',
    title: 'Connect Linear',
    description: 'Integrate Linear to track issues directly in Vienna.',
    category: 'integrations',
    difficulty: 'intermediate',
    estimatedMinutes: 5,
    steps: [
      { title: 'Enable Plugin', content: 'Open Settings → Plugins and enable the Linear plugin.' },
      { title: 'Authorize', content: 'Click "Connect" to start the OAuth flow and authorize Vienna to access your Linear workspace.' },
      { title: 'Browse Issues', content: 'Your Linear issues appear in the sidebar. Click any issue to view and edit details.' },
    ],
  },
  {
    id: 'feed-plugin-canvas',
    title: 'Add Plugin Cards to Feed',
    description: 'Learn how to render plugin components directly on the home feed.',
    category: 'plugins',
    difficulty: 'advanced',
    estimatedMinutes: 10,
    steps: [
      { title: 'Define Feed Canvas', content: 'Add a `feed` canvas to your plugin definition with a React component.' },
      { title: 'Reference in feed.md', content: 'Use @vienna//plugin/your_plugin in feed.md to render the component inline.' },
      { title: 'Entity Feed Cards', content: 'Add a feedCard to your entity definition for rich entity rendering in the feed.' },
    ],
  },
];

/** Get tutorials filtered by category. */
export function getTutorialsByCategory(category?: string): Tutorial[] {
  if (!category) return TUTORIALS;
  return TUTORIALS.filter((t) => t.category === category);
}

/** Get a single tutorial by ID. */
export function getTutorialById(id: string): Tutorial | undefined {
  return TUTORIALS.find((t) => t.id === id);
}
