import { Card } from '@/components/ui/card';

interface ArrayVizProps {
  data: any[];
  highlightIndex?: number;
}

export function ArrayViz({ data, highlightIndex }: ArrayVizProps) {
  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-2 justify-center items-center">
        {data.map((value, index) => (
          <Card
            key={index}
            className={`w-16 h-16 flex flex-col items-center justify-center transition-all ${
              highlightIndex === index
                ? 'bg-primary text-primary-foreground border-primary border-2 scale-110'
                : 'bg-card border-2'
            }`}
          >
            <div className="text-xs text-muted-foreground">{index}</div>
            <div className="font-bold">{value}</div>
          </Card>
        ))}
      </div>
      {highlightIndex !== undefined && (
        <p className="text-center text-sm text-muted-foreground mt-4">
          Highlighted: Index {highlightIndex}
        </p>
      )}
    </div>
  );
}
