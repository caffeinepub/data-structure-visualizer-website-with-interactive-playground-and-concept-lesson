import { Card } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

interface QueueVizProps {
  data: any[];
}

export function QueueViz({ data }: QueueVizProps) {
  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-2 justify-center">
        <div className="text-sm text-muted-foreground">Front →</div>
        <div className="flex-1" />
        <div className="text-sm text-muted-foreground">← Rear</div>
      </div>
      <div className="flex items-center gap-2 justify-center">
        {data.map((value, index) => (
          <div key={index} className="flex items-center gap-2">
            <Card
              className={`w-16 h-16 flex items-center justify-center border-2 transition-all ${
                index === 0
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-card'
              }`}
            >
              <div className="font-bold">{value}</div>
            </Card>
            {index < data.length - 1 && <ArrowRight className="h-4 w-4 text-muted-foreground" />}
          </div>
        ))}
      </div>
      {data.length > 0 && (
        <p className="text-center text-sm text-muted-foreground mt-4">
          Front: {data[0]} | Rear: {data[data.length - 1]} | Size: {data.length}
        </p>
      )}
    </div>
  );
}
