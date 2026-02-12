import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { AnimationControls } from '../components/AnimationControls';
import { StepCaption } from '../components/StepCaption';
import { useStepper } from '../stepper/stepper';

interface Step {
  array: number[];
  key?: number;
  comparing?: number;
  sorted?: number;
  caption: string;
}

function generateInsertionSortSteps(arr: number[]): Step[] {
  const steps: Step[] = [];
  const array = [...arr];
  steps.push({ array: [...array], sorted: 0, caption: 'Initial array' });

  for (let i = 1; i < array.length; i++) {
    const key = array[i];
    steps.push({
      array: [...array],
      key: i,
      sorted: i - 1,
      caption: `Select key: ${key}`,
    });

    let j = i - 1;
    while (j >= 0 && array[j] > key) {
      steps.push({
        array: [...array],
        key: i,
        comparing: j,
        caption: `Comparing ${array[j]} > ${key}`,
      });
      array[j + 1] = array[j];
      j--;
    }
    array[j + 1] = key;
    steps.push({
      array: [...array],
      sorted: i,
      caption: `Inserted ${key} at position ${j + 1}`,
    });
  }

  steps.push({ array: [...array], caption: 'Array sorted!' });
  return steps;
}

export function InsertionSortViz() {
  const [inputArray, setInputArray] = useState('12, 11, 13, 5, 6');
  const [steps, setSteps] = useState<Step[]>([]);
  const { currentStep, isPlaying, speed, play, pause, stepForward, reset, setSpeed } = useStepper(steps.length);

  const handleStart = () => {
    const numbers = inputArray.split(',').map((n) => parseInt(n.trim())).filter((n) => !isNaN(n));
    if (numbers.length > 0) {
      const sortSteps = generateInsertionSortSteps(numbers);
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
            placeholder="e.g., 12, 11, 13, 5, 6"
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
              const isKey = currentStepData.key === index;
              const isComparing = currentStepData.comparing === index;
              const isSorted = currentStepData.sorted !== undefined && index <= currentStepData.sorted;
              return (
                <Card
                  key={index}
                  className={`w-16 flex flex-col items-center justify-end p-2 transition-all ${
                    isKey
                      ? 'bg-chart-1 text-white border-chart-1 border-2 scale-110'
                      : isComparing
                      ? 'bg-chart-2 text-white border-chart-2 border-2'
                      : isSorted
                      ? 'bg-accent border-2'
                      : 'bg-card border-2'
                  }`}
                  style={{ height: `${Math.max(value * 8, 40)}px` }}
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
