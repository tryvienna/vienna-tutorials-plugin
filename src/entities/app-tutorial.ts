import { defineEntity } from '@tryvienna/sdk';
import { TutorialFeedCard } from '../ui/TutorialFeedCard';
import { PLUGIN_SVG } from '../icon';

export const appTutorialEntity = defineEntity({
  type: 'app_tutorial',
  name: 'App Tutorial',
  icon: { svg: PLUGIN_SVG },
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
