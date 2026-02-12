import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { GraphViz } from '../viz/GraphViz';
import { AnimationControls } from '../components/AnimationControls';
import { StepCaption } from '../components/StepCaption';
import { useStepper } from '../stepper/stepper';

interface Step {
  visited: Set<string>;
  active: string;
  frontier: string[];
  caption: string;
}

const SAMPLE_GRAPH = {
  nodes: ['A', 'B', 'C', 'D', 'E', 'F'],
  edges: [
    ['A', 'B'],
    ['A', 'C'],
    ['B', 'D'],
    ['C', 'E'],
    ['D', 'F'],
    ['E', 'F'],
  ] as [string, string][],
};

function generateBFSSteps(): Step[] {
  const steps: Step[] = [];
  const visited = new Set<string>();
  const queue: string[] = ['A'];

  steps.push({ visited: new Set(), active: 'A', frontier: ['A'], caption: 'Start BFS from node A' });

  while (queue.length > 0) {
    const node = queue.shift()!;
    if (visited.has(node)) continue;

    visited.add(node);
    steps.push({
      visited: new Set(visited),
      active: node,
      frontier: [...queue],
      caption: `Visit node ${node}`,
    });

    const neighbors = SAMPLE_GRAPH.edges
      .filter(([from]) => from === node)
      .map(([, to]) => to)
      .filter((n) => !visited.has(n));

    neighbors.forEach((neighbor) => {
      if (!queue.includes(neighbor)) {
        queue.push(neighbor);
      }
    });

    if (neighbors.length > 0) {
      steps.push({
        visited: new Set(visited),
        active: node,
        frontier: [...queue],
        caption: `Add neighbors: ${neighbors.join(', ')}`,
      });
    }
  }

  steps.push({ visited, active: '', frontier: [], caption: 'BFS complete!' });
  return steps;
}

function generateDFSSteps(): Step[] {
  const steps: Step[] = [];
  const visited = new Set<string>();
  const stack: string[] = ['A'];

  steps.push({ visited: new Set(), active: 'A', frontier: ['A'], caption: 'Start DFS from node A' });

  while (stack.length > 0) {
    const node = stack.pop()!;
    if (visited.has(node)) continue;

    visited.add(node);
    steps.push({
      visited: new Set(visited),
      active: node,
      frontier: [...stack],
      caption: `Visit node ${node}`,
    });

    const neighbors = SAMPLE_GRAPH.edges
      .filter(([from]) => from === node)
      .map(([, to]) => to)
      .filter((n) => !visited.has(n))
      .reverse();

    neighbors.forEach((neighbor) => {
      if (!stack.includes(neighbor)) {
        stack.push(neighbor);
      }
    });

    if (neighbors.length > 0) {
      steps.push({
        visited: new Set(visited),
        active: node,
        frontier: [...stack],
        caption: `Push neighbors: ${neighbors.join(', ')}`,
      });
    }
  }

  steps.push({ visited, active: '', frontier: [], caption: 'DFS complete!' });
  return steps;
}

interface GraphTraversalVizProps {
  algorithm: 'bfs' | 'dfs';
}

export function GraphTraversalViz({ algorithm }: GraphTraversalVizProps) {
  const [steps, setSteps] = useState<Step[]>([]);
  const { currentStep, isPlaying, speed, play, pause, stepForward, reset, setSpeed } = useStepper(steps.length);

  const handleStart = () => {
    const traversalSteps = algorithm === 'bfs' ? generateBFSSteps() : generateDFSSteps();
    setSteps(traversalSteps);
    reset();
  };

  const currentStepData = steps[currentStep] || {
    visited: new Set(),
    active: '',
    frontier: [],
    caption: 'Click Start to begin traversal',
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <Button onClick={handleStart}>Start {algorithm.toUpperCase()}</Button>
      </div>

      {steps.length > 0 && (
        <>
          <AnimationControls
            isPlaying={isPlaying}
            speed={speed}
            currentStep={currentStep}
            totalSteps={steps.length}
            onPlay={play}
            onPause={pause}
            onStepForward={stepForward}
            onReset={reset}
            onSpeedChange={setSpeed}
          />

          <StepCaption caption={currentStepData.caption} step={currentStep + 1} totalSteps={steps.length} />

          <GraphViz data={SAMPLE_GRAPH} visitedNodes={currentStepData.visited} activeNode={currentStepData.active} />

          <div className="text-center text-sm">
            <div className="text-muted-foreground">
              {algorithm === 'bfs' ? 'Queue' : 'Stack'}: [{currentStepData.frontier.join(', ')}]
            </div>
          </div>
        </>
      )}
    </div>
  );
}
