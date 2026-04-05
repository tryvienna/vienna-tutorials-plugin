import { definePlugin } from '@tryvienna/sdk';
import { appTutorialEntity } from './entities';
import { TutorialFeed } from './ui/TutorialFeed';
import { PLUGIN_SVG } from './icon';

export const viennaTutorialsPlugin = definePlugin({
  id: 'vienna_tutorials',
  name: 'Vienna Tutorials',
  description: 'Interactive tutorials and onboarding guides for learning Vienna.',
  icon: { svg: PLUGIN_SVG },

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
