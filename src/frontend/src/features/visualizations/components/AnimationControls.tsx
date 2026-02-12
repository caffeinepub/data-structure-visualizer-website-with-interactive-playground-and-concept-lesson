import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Play, Pause, SkipForward, RotateCcw } from 'lucide-react';

interface AnimationControlsProps {
  isPlaying: boolean;
  speed: number;
  currentStep: number;
  totalSteps: number;
  onPlay: () => void;
  onPause: () => void;
  onStepForward: () => void;
  onReset: () => void;
  onSpeedChange: (speed: number) => void;
}

export function AnimationControls({
  isPlaying,
  speed,
  currentStep,
  totalSteps,
  onPlay,
  onPause,
  onStepForward,
  onReset,
  onSpeedChange,
}: AnimationControlsProps) {
  return (
    <div className="flex flex-col gap-4 p-4 bg-muted/30 rounded-lg">
      <div className="flex items-center justify-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={isPlaying ? onPause : onPlay}
                disabled={currentStep >= totalSteps - 1}
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isPlaying ? 'Pause animation' : 'Play animation'}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={onStepForward}
                disabled={currentStep >= totalSteps - 1}
                aria-label="Step forward"
              >
                <SkipForward className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Step forward</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" onClick={onReset} aria-label="Reset">
                <RotateCcw className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Reset to start</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="speed-slider" className="text-sm">
            Speed: {speed}x
          </Label>
          <span className="text-xs text-muted-foreground">
            Step {currentStep + 1} / {totalSteps}
          </span>
        </div>
        <Slider
          id="speed-slider"
          min={0.5}
          max={3}
          step={0.5}
          value={[speed]}
          onValueChange={([value]) => onSpeedChange(value)}
          aria-label="Animation speed"
        />
      </div>
    </div>
  );
}
