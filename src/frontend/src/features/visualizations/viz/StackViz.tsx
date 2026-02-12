import { Card } from '@/components/ui/card';

interface StackVizProps {
  data: any[];
}

export function StackViz({ data }: StackVizProps) {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="text-sm text-muted-foreground mb-2">← Top</div>
      <div className="flex flex-col-reverse gap-1 w-32">
        {data.map((value, index) => (
          <Card
            key={index}
            className={`h-14 flex items-center justify-center border-2 transition-all ${
              index === data.length - 1
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-card'
            }`}
          >
            <div className="font-bold">{value}</div>
          </Card>
        ))}
      </div>
      <div className="w-32 h-2 bg-muted mt-1 rounded" />
      {data.length > 0 && (
        <p className="text-center text-sm text-muted-foreground mt-4">
          Top: {data[data.length - 1]} | Size: {data.length}
        </p>
      )}
    </div>
  );
}
