import { definePlugin } from '@tryvienna/sdk';
import { appTutorialEntity } from './entities';
import { TutorialFeed } from './ui/TutorialFeed';

const TUTORIALS_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`;

export const viennaTutorialsPlugin = definePlugin({
  id: 'vienna_tutorials',
  name: 'Vienna Tutorials',
  description: 'Interactive tutorials and onboarding guides for learning Vienna.',
  icon: { svg: TUTORIALS_SVG },

  entities: [appTutorialEntity],

  canvases: {
    feed: {
      component: TutorialFeed,
      label: 'Tutorials',
      description: 'Renders interactive tutorial cards. Use when the user wants to see available tutorials or learning resources.',
      priority: 30,
    },
  },
});

export { appTutorialEntity } from './entities';
