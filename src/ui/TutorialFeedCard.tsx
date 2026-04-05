/**
 * TutorialFeedCard — Entity feedCard component for app_tutorial.
 *
 * Renders a single tutorial as a rich card when referenced in the feed
 * via @vienna//app_tutorial/<id>. Also used by the TutorialFeed canvas
 * as a reusable card component.
 */

import type { EntityFeedCardProps } from '@tryvienna/sdk';
import { getTutorialById } from '../data';
import { BookOpen, Clock, ChevronRight } from 'lucide-react';

const DIFFICULTY_COLORS: Record<string, string> = {
  beginner: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  intermediate: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  advanced: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400',
};

export function TutorialFeedCard({ uri, onNavigate }: EntityFeedCardProps) {
  // Extract tutorial ID from URI: @vienna//app_tutorial/<id>
  const id = uri.split('/').pop() ?? '';
  const tutorial = getTutorialById(id);

  if (!tutorial) {
    return (
      <div className="rounded-xl border border-border bg-card p-4 shadow-sm dark:bg-surface-interactive">
        <p className="text-sm text-muted-foreground">Tutorial not found: {id}</p>
      </div>
    );
  }

  const handleClick = () => {
    onNavigate?.(uri);
  };

  return (
    <button
      onClick={handleClick}
      className="w-full rounded-xl border border-border bg-card p-4 text-left shadow-sm transition-colors hover:bg-accent/50 dark:bg-surface-interactive"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/30">
            <BookOpen className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div className="min-w-0">
            <h3 className="text-sm font-medium">{tutorial.title}</h3>
            <p className="mt-0.5 text-xs text-muted-foreground">{tutorial.description}</p>
            <div className="mt-2 flex items-center gap-2">
              <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${DIFFICULTY_COLORS[tutorial.difficulty] ?? ''}`}>
                {tutorial.difficulty}
              </span>
              <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <Clock className="h-3 w-3" />
                {tutorial.estimatedMinutes} min
              </span>
              <span className="text-[10px] text-muted-foreground">
                {tutorial.steps.length} steps
              </span>
            </div>
          </div>
        </div>
        <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
      </div>
    </button>
  );
}
