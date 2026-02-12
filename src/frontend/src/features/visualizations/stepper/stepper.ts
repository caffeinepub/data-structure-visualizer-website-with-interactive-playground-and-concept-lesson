import { useState, useEffect, useRef } from 'react';

export function useStepper(totalSteps: number) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying && currentStep < totalSteps - 1) {
      intervalRef.current = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= totalSteps - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1000 / speed);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, speed, currentStep, totalSteps]);

  const play = () => setIsPlaying(true);
  const pause = () => setIsPlaying(false);
  const stepForward = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };
  const reset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  return {
    currentStep,
    isPlaying,
    speed,
    play,
    pause,
    stepForward,
    reset,
    setSpeed,
  };
}
