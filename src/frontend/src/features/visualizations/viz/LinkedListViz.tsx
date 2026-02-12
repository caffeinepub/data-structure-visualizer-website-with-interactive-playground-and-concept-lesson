import { Card } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

interface LinkedListVizProps {
  data: any[];
  highlightIndex?: number;
}

export function LinkedListViz({ data, highlightIndex }: LinkedListVizProps) {
  return (
    <div className="w-full overflow-x-auto">
      <div className="flex items-center gap-2 justify-center min-w-max px-4">
        {data.map((value, index) => (
          <div key={index} className="flex items-center gap-2">
            <Card
              className={`w-20 h-20 flex flex-col items-center justify-center transition-all ${
                highlightIndex === index
                  ? 'bg-primary text-primary-foreground border-primary border-2 scale-110'
                  : 'bg-card border-2'
              }`}
            >
              <div className="font-bold text-lg">{value}</div>
              <div className="text-xs text-muted-foreground">Node {index}</div>
            </Card>
            {index < data.length - 1 && (
              <ArrowRight className={`h-6 w-6 ${highlightIndex === index ? 'text-primary' : 'text-muted-foreground'}`} />
            )}
          </div>
        ))}
        <div className="w-16 h-16 flex items-center justify-center border-2 border-dashed rounded text-muted-foreground">
          null
        </div>
      </div>
      {highlightIndex !== undefined && (
        <p className="text-center text-sm text-muted-foreground mt-4">
          Active Node: {highlightIndex}
        </p>
      )}
    </div>
  );
}
