import { useQuery } from '@tanstack/react-query';
import { useActor } from '@/hooks/useActor';
import type { Topic } from '@/backend';

export function useTopics() {
  const { actor, isFetching } = useActor();

  return useQuery<Topic[]>({
    queryKey: ['topics'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllTopics();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useTopic(id: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Topic | null>({
    queryKey: ['topic', id],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getTopic(id);
    },
    enabled: !!actor && !isFetching && !!id,
  });
}
