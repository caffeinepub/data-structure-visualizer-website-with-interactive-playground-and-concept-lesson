import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { Topic } from '@/backend';

interface TopicSidebarProps {
  topics: Topic[];
  selectedTopicId: string;
  onSelectTopic: (topicId: string) => void;
}

const DEFAULT_TOPICS = [
  { id: 'array', title: 'Array', description: 'Contiguous memory storage' },
  { id: 'linked-list', title: 'Linked List', description: 'Node-based sequential structure' },
  { id: 'stack', title: 'Stack', description: 'LIFO data structure' },
  { id: 'queue', title: 'Queue', description: 'FIFO data structure' },
  { id: 'bst', title: 'Binary Search Tree', description: 'Hierarchical sorted structure' },
  { id: 'heap', title: 'Heap', description: 'Priority queue structure' },
  { id: 'graph', title: 'Graph', description: 'Network of connected nodes' },
];

export function TopicSidebar({ topics, selectedTopicId, onSelectTopic }: TopicSidebarProps) {
  const displayTopics = topics.length > 0 ? topics : DEFAULT_TOPICS;

  return (
    <Card className="h-fit sticky top-20">
      <CardHeader>
        <CardTitle>Topics</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[600px]">
          <div className="space-y-1 p-4 pt-0">
            {displayTopics.map((topic) => (
              <Button
                key={topic.id}
                variant={selectedTopicId === topic.id ? 'default' : 'ghost'}
                className="w-full justify-start text-left h-auto py-3"
                onClick={() => onSelectTopic(topic.id)}
              >
                <div>
                  <div className="font-medium">{topic.title}</div>
                  <div className="text-xs opacity-80 font-normal">{topic.description}</div>
                </div>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
