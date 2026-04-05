import { defineEntity } from '@tryvienna/sdk';
import { TutorialFeedCard } from '../ui/TutorialFeedCard';

const TUTORIAL_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`;

export const appTutorialEntity = defineEntity({
  type: 'app_tutorial',
  name: 'App Tutorial',
  icon: { svg: TUTORIAL_SVG },
  uri: ['id'],
  description: 'An interactive tutorial or onboarding guide for Vienna.',
  source: 'local',

  display: {
    emoji: '\uD83D\uDCDA',
    colors: { bg: '#6366F1', text: '#FFFFFF', border: '#4F46E5' },
    description: 'Interactive tutorial',
    outputFields: [
      { key: 'title', label: 'Title', metadataPath: 'title' },
      { key: 'category', label: 'Category', metadataPath: 'category' },
      { key: 'difficulty', label: 'Difficulty', metadataPath: 'difficulty' },
    ],
  },

  cache: { ttl: 60_000, maxSize: 50 },

  ui: {
    feedCard: TutorialFeedCard,
  },
});
