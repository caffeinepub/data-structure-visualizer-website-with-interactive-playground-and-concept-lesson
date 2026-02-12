import { Card, CardContent } from '@/components/ui/card';

interface StepCaptionProps {
  caption: string;
  step: number;
  totalSteps: number;
}

export function StepCaption({ caption, step, totalSteps }: StepCaptionProps) {
  return (
    <Card className="bg-muted/50">
      <CardContent className="py-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">{caption}</p>
          <span className="text-xs text-muted-foreground">
            {step} / {totalSteps}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
