import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { AnimationControls } from '../components/AnimationControls';
import { StepCaption } from '../components/StepCaption';
import { useStepper } from '../stepper/stepper';
import { Play, Pause, SkipForward, RotateCcw } from 'lucide-react';

interface Step {
  array: number[];
  comparing?: [number, number];
  swapped?: boolean;
  caption: string;
}

function generateBubbleSortSteps(arr: number[]): Step[] {
  const steps: Step[] = [];
  const array = [...arr];
  steps.push({ array: [...array], caption: 'Initial array' });

  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      steps.push({
        array: [...array],
        comparing: [j, j + 1],
        swapped: false,
        caption: `Comparing ${array[j]} and ${array[j + 1]}`,
      });

      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        steps.push({
          array: [...array],
          comparing: [j, j + 1],
          swapped: true,
          caption: `Swapped ${array[j + 1]} and ${array[j]}`,
        });
      }
    }
  }

  steps.push({ array: [...array], caption: 'Array sorted!' });
  return steps;
}

export function BubbleSortViz() {
  const [inputArray, setInputArray] = useState('64, 34, 25, 12, 22, 11, 90');
  const [steps, setSteps] = useState<Step[]>([]);
  const { currentStep, isPlaying, speed, play, pause, stepForward, reset, setSpeed } = useStepper(steps.length);

  const handleStart = () => {
    const numbers = inputArray.split(',').map((n) => parseInt(n.trim())).filter((n) => !isNaN(n));
    if (numbers.length > 0) {
      const sortSteps = generateBubbleSortSteps(numbers);
      setSteps(sortSteps);
      reset();
    }
  };

  const currentStepData = steps[currentStep] || { array: [], caption: 'Enter numbers and click Start' };

  return (
    <div className="space-y-6">
      <div className="flex gap-4 items-end">
        <div className="flex-1">
          <Label htmlFor="array-input">Array (comma-separated)</Label>
          <Input
            id="array-input"
            value={inputArray}
            onChange={(e) => setInputArray(e.target.value)}
            placeholder="e.g., 64, 34, 25, 12, 22"
          />
        </div>
        <Button onClick={handleStart}>Start Sort</Button>
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

          <div className="flex flex-wrap gap-2 justify-center items-end min-h-[200px]">
            {currentStepData.array.map((value, index) => {
              const isComparing = currentStepData.comparing?.includes(index);
              const isSwapped = currentStepData.swapped && currentStepData.comparing?.includes(index);
              return (
                <Card
                  key={index}
                  className={`w-16 flex flex-col items-center justify-end p-2 transition-all ${
                    isSwapped
                      ? 'bg-chart-1 text-white border-chart-1 border-2 scale-110'
                      : isComparing
                      ? 'bg-chart-2 text-white border-chart-2 border-2'
                      : 'bg-card border-2'
                  }`}
                  style={{ height: `${Math.max(value * 2, 40)}px` }}
                >
                  <div className="font-bold">{value}</div>
                </Card>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
