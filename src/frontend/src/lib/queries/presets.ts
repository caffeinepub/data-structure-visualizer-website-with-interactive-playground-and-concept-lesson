import { useQuery } from '@tanstack/react-query';
import { useActor } from '@/hooks/useActor';
import type { ExamplePreset } from '@/backend';

export function usePresets(topicId: string) {
  const { actor, isFetching } = useActor();

  return useQuery<ExamplePreset[]>({
    queryKey: ['presets', topicId],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getExamplePresetsForTopic(topicId);
    },
    enabled: !!actor && !isFetching && !!topicId,
  });
}
