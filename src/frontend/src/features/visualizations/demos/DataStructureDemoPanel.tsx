import { ArrayViz } from '../viz/ArrayViz';
import { LinkedListViz } from '../viz/LinkedListViz';
import { StackViz } from '../viz/StackViz';
import { QueueViz } from '../viz/QueueViz';
import { BSTViz } from '../viz/BSTViz';
import { HeapViz } from '../viz/HeapViz';
import { GraphViz } from '../viz/GraphViz';
import type { PlaygroundState } from '@/features/playground/models/usePlaygroundState';

interface DataStructureDemoPanelProps {
  topicId: string;
  playgroundState?: PlaygroundState;
}

interface GraphData {
  nodes: string[];
  edges: [string, string][];
}

function isGraphData(data: any): data is GraphData {
  return (
    data &&
    typeof data === 'object' &&
    Array.isArray(data.nodes) &&
    Array.isArray(data.edges)
  );
}

export function DataStructureDemoPanel({ topicId, playgroundState }: DataStructureDemoPanelProps) {
  const renderVisualization = () => {
    switch (topicId) {
      case 'array':
        return <ArrayViz data={playgroundState?.data || [1, 2, 3, 4, 5]} />;
      case 'linked-list':
        return <LinkedListViz data={playgroundState?.data || [1, 2, 3, 4]} />;
      case 'stack':
        return <StackViz data={playgroundState?.data || [5, 10, 15, 20]} />;
      case 'queue':
        return <QueueViz data={playgroundState?.data || ['A', 'B', 'C', 'D']} />;
      case 'bst':
        return <BSTViz data={playgroundState?.data || [50, 30, 70, 20, 40, 60, 80]} />;
      case 'heap':
        return <HeapViz data={playgroundState?.data || [90, 80, 70, 60, 50]} />;
      case 'graph': {
        const defaultGraphData: GraphData = {
          nodes: ['A', 'B', 'C', 'D'],
          edges: [['A', 'B'], ['B', 'C'], ['C', 'D'], ['D', 'A']],
        };
        const graphData = playgroundState?.data && isGraphData(playgroundState.data)
          ? playgroundState.data
          : defaultGraphData;
        return <GraphViz data={graphData} />;
      }
      default:
        return <div className="text-center text-muted-foreground py-8">Select a data structure to visualize</div>;
    }
  };

  return <div className="min-h-[400px] flex items-center justify-center">{renderVisualization()}</div>;
}
