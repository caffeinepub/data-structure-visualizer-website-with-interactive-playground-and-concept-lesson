import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { usePresets } from '@/lib/queries/presets';
import { LoadingState } from '@/components/common/LoadingState';
import { ErrorState } from '@/components/common/ErrorState';
import type { ExamplePreset } from '@/backend';

interface SamplePresetPickerProps {
  topicId: string;
  onLoadPreset: (preset: ExamplePreset) => void;
}

const DEFAULT_PRESETS: Record<string, ExamplePreset[]> = {
  array: [
    {
      id: 'array-1',
      title: 'Small Array',
      topicId: 'array',
      description: 'A small array with 5 elements',
      sampleInput: '[1, 2, 3, 4, 5]',
      expectedOutput: 'Array with 5 elements',
    },
    {
      id: 'array-2',
      title: 'Sorted Array',
      topicId: 'array',
      description: 'A sorted array for binary search',
      sampleInput: '[10, 20, 30, 40, 50, 60, 70]',
      expectedOutput: 'Sorted array',
    },
  ],
  'linked-list': [
    {
      id: 'll-1',
      title: 'Simple List',
      topicId: 'linked-list',
      description: 'A basic linked list',
      sampleInput: '1 -> 2 -> 3 -> 4',
      expectedOutput: 'Linked list with 4 nodes',
    },
  ],
  stack: [
    {
      id: 'stack-1',
      title: 'Number Stack',
      topicId: 'stack',
      description: 'Stack with numbers',
      sampleInput: '[5, 10, 15, 20]',
      expectedOutput: 'Stack with 4 elements',
    },
  ],
  queue: [
    {
      id: 'queue-1',
      title: 'Task Queue',
      topicId: 'queue',
      description: 'Queue of tasks',
      sampleInput: '[A, B, C, D]',
      expectedOutput: 'Queue with 4 elements',
    },
  ],
  bst: [
    {
      id: 'bst-1',
      title: 'Balanced BST',
      topicId: 'bst',
      description: 'A balanced binary search tree',
      sampleInput: '[50, 30, 70, 20, 40, 60, 80]',
      expectedOutput: 'Balanced BST',
    },
  ],
  heap: [
    {
      id: 'heap-1',
      title: 'Max Heap',
      topicId: 'heap',
      description: 'A max heap example',
      sampleInput: '[90, 80, 70, 60, 50]',
      expectedOutput: 'Max heap',
    },
  ],
  graph: [
    {
      id: 'graph-1',
      title: 'Simple Graph',
      topicId: 'graph',
      description: 'A small connected graph',
      sampleInput: 'A-B, B-C, C-D, D-A',
      expectedOutput: 'Graph with 4 nodes',
    },
  ],
};

export function SamplePresetPicker({ topicId, onLoadPreset }: SamplePresetPickerProps) {
  const { data: presets, isLoading, error, refetch } = usePresets(topicId);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Sample Presets</CardTitle>
        </CardHeader>
        <CardContent>
          <LoadingState message="Loading presets..." />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Sample Presets</CardTitle>
        </CardHeader>
        <CardContent>
          <ErrorState message="Failed to load presets" onRetry={refetch} />
        </CardContent>
      </Card>
    );
  }

  const displayPresets = presets && presets.length > 0 ? presets : DEFAULT_PRESETS[topicId] || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sample Presets</CardTitle>
        <CardDescription>Load example scenarios</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[200px]">
          <div className="space-y-2 p-4 pt-0">
            {displayPresets.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">No presets available</p>
            ) : (
              displayPresets.map((preset) => (
                <Button
                  key={preset.id}
                  variant="outline"
                  className="w-full justify-start text-left h-auto py-3"
                  onClick={() => onLoadPreset(preset)}
                >
                  <div className="w-full">
                    <div className="font-medium">{preset.title}</div>
                    <div className="text-xs text-muted-foreground">{preset.description}</div>
                  </div>
                </Button>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
