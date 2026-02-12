import { useQuery } from '@tanstack/react-query';
import { useActor } from '@/hooks/useActor';
import type { Lesson } from '@/backend';

export function useLessons(topicId: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Lesson[]>({
    queryKey: ['lessons', topicId],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getLessonsForTopic(topicId);
    },
    enabled: !!actor && !isFetching && !!topicId,
  });
}
