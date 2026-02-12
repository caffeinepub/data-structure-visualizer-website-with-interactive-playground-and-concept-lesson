import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlaygroundControls } from '@/components/playground/PlaygroundControls';
import { SamplePresetPicker } from '@/components/playground/SamplePresetPicker';
import { DataStructureDemoPanel } from '@/features/visualizations/demos/DataStructureDemoPanel';
import { usePlaygroundState } from '@/features/playground/models/usePlaygroundState';

const DATA_STRUCTURES = [
  { id: 'array', label: 'Array' },
  { id: 'linked-list', label: 'Linked List' },
  { id: 'stack', label: 'Stack' },
  { id: 'queue', label: 'Queue' },
  { id: 'bst', label: 'Binary Search Tree' },
  { id: 'heap', label: 'Heap' },
  { id: 'graph', label: 'Graph' },
];

export default function PlaygroundPage() {
  const [selectedDS, setSelectedDS] = useState<string>('array');
  const { state, dispatch } = usePlaygroundState(selectedDS);

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Interactive Playground</h1>
        <p className="text-muted-foreground text-lg">
          Experiment with data structures and see changes in real-time
        </p>
      </div>

      <div className="grid lg:grid-cols-[320px_1fr] gap-6">
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Data Structure</CardTitle>
              <CardDescription>Choose a structure to work with</CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={selectedDS} onValueChange={setSelectedDS}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {DATA_STRUCTURES.map((ds) => (
                    <SelectItem key={ds.id} value={ds.id}>
                      {ds.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <PlaygroundControls dataStructure={selectedDS} state={state} dispatch={dispatch} />

          <SamplePresetPicker topicId={selectedDS} onLoadPreset={(preset) => dispatch({ type: 'LOAD_PRESET', preset })} />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Visualization</CardTitle>
            <CardDescription>Watch your data structure update in real-time</CardDescription>
          </CardHeader>
          <CardContent>
            <DataStructureDemoPanel topicId={selectedDS} playgroundState={state} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
