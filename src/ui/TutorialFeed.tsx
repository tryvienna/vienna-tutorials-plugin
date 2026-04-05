/**
 * TutorialFeed — Feed canvas component for vienna_tutorials.
 *
 * Renders a featured video on the home feed with detachable PiP support
 * and playback markers for automated workstream actions.
 * Referenced in feed.md as: @vienna//plugin/vienna_tutorials
 */

import { useMemo, useCallback } from 'react';
import type { FeedCanvasProps } from '@tryvienna/sdk';
import { usePluginClient } from '@tryvienna/sdk/react';
import {
  GET_PROJECTS,
  CREATE_WORKSTREAM,
  SEND_WORKSTREAM_MESSAGE,
  SET_WORKSTREAM_IN_FOCUS,
} from '@tryvienna/sdk/graphql';
import type {
  GetProjectsResult,
  CreateWorkstreamResult,
  CreateWorkstreamVariables,
  SendWorkstreamMessageVariables,
  SendWorkstreamMessageResult,
  SetWorkstreamInFocusVariables,
  SetWorkstreamInFocusResult,
} from '@tryvienna/sdk/graphql';
import { DetachableCard, YouTubeEmbed, usePlaybackMarkers } from '@tryvienna/ui/feed';
import type { PlaybackMarker } from '@tryvienna/ui/feed';
import { gql } from 'graphql-tag';
import { Play } from 'lucide-react';

const UPDATE_APPEARANCE_SETTINGS = gql`
  mutation UpdateAppearanceSettings($input: UpdateAppearanceSettingsInput!) {
    updateAppearanceSettings(input: $input) {
      appearance { theme }
    }
  }
`;

const FEATURED_VIDEO_ID = 'a2wERrLIYmI';
const CARD_ID = 'tutorials-featured-video';

// Module-level state — survives component remounts (e.g. navigation away and back)
let themeToggled = false;
let candyPaintId: string | null = null;
let candyPaintCreating = false;
let candyPaintMessageSent = false;

export function TutorialFeed({ data, onNavigate }: FeedCanvasProps) {
  const client = usePluginClient();

  const toggleTheme = useCallback(async () => {
    if (themeToggled) return;
    themeToggled = true;

    const isDark = document.documentElement.classList.contains('dark');
    await client.mutate({
      mutation: UPDATE_APPEARANCE_SETTINGS,
      variables: { input: { theme: isDark ? 'light' : 'dark' } },
    });
  }, [client]);

  const createWorkstream = useCallback(async () => {
    if (candyPaintId || candyPaintCreating) return;
    candyPaintCreating = true;

    try {
      const { data: projectsData } = await client.query<GetProjectsResult>({
        query: GET_PROJECTS,
      });
      const projectId = projectsData?.projects?.[0]?.id;
      if (!projectId) {
        console.warn('[TutorialFeed] No project found, cannot create workstream');
        return;
      }

      const { data: result } = await client.mutate<CreateWorkstreamResult, CreateWorkstreamVariables>({
        mutation: CREATE_WORKSTREAM,
        variables: {
          input: { projectId, title: 'candy paint' },
        },
      });

      const wsId = result?.createWorkstream?.workstream?.id;
      if (wsId) {
        candyPaintId = wsId;
        console.log('[TutorialFeed] Created workstream "candy paint":', wsId);

        // Set the new workstream as active
        await client.mutate<SetWorkstreamInFocusResult, SetWorkstreamInFocusVariables>({
          mutation: SET_WORKSTREAM_IN_FOCUS,
          variables: { id: wsId },
        });
      }
    } finally {
      if (!candyPaintId) candyPaintCreating = false;
    }
  }, [client]);

  const sendMessage = useCallback(async () => {
    const wsId = candyPaintId;
    if (!wsId || candyPaintMessageSent) return;
    candyPaintMessageSent = true;

    await client.mutate<SendWorkstreamMessageResult, SendWorkstreamMessageVariables>({
      mutation: SEND_WORKSTREAM_MESSAGE,
      variables: { workstreamId: wsId, text: 'say hello' },
    });
    console.log('[TutorialFeed] Sent "say hello" to workstream:', wsId);
  }, [client]);

  const markers = useMemo<PlaybackMarker[]>(() => [
    { time: 4, action: () => { toggleTheme(); } },
    { time: 7, action: (ctx) => ctx.detach(CARD_ID) },
    { time: 10, action: () => { createWorkstream(); } },
    { time: 15, action: () => { sendMessage(); } },
  ], [toggleTheme, createWorkstream, sendMessage]);

  usePlaybackMarkers(CARD_ID, markers);

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm dark:bg-surface-interactive">
      <div className="flex items-center gap-2 px-4 py-3">
        <Play className="h-3.5 w-3.5 text-muted-foreground" />
        <h3 className="text-sm font-medium">Featured</h3>
      </div>
      <DetachableCard
        id="tutorials-featured-video"
        title="Featured"
        floatingSize={{ width: 320, height: 180 }}
      >
        <YouTubeEmbed
          videoId={FEATURED_VIDEO_ID}
          cardId="tutorials-featured-video"
          title="Featured tutorial video"
        />
      </DetachableCard>
    </div>
  );
}
