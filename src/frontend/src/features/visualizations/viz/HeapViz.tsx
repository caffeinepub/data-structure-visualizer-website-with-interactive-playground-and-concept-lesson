import { Card } from '@/components/ui/card';

interface HeapVizProps {
  data: number[];
}

export function HeapViz({ data }: HeapVizProps) {
  const getLevel = (index: number) => Math.floor(Math.log2(index + 1));
  const maxLevel = data.length > 0 ? getLevel(data.length - 1) : 0;

  const renderLevel = (level: number) => {
    const startIndex = Math.pow(2, level) - 1;
    const endIndex = Math.min(Math.pow(2, level + 1) - 1, data.length);
    const nodesInLevel = endIndex - startIndex;

    return (
      <div key={level} className="flex justify-center gap-4 mb-4">
        {Array.from({ length: nodesInLevel }, (_, i) => {
          const index = startIndex + i;
          return (
            <Card
              key={index}
              className="w-14 h-14 flex items-center justify-center bg-primary text-primary-foreground border-2 border-primary"
            >
              <div className="font-bold">{data[index]}</div>
            </Card>
          );
        })}
      </div>
    );
  };

  return (
    <div className="w-full">
      <div className="flex flex-col items-center">
        {Array.from({ length: maxLevel + 1 }, (_, level) => renderLevel(level))}
      </div>
      <p className="text-center text-sm text-muted-foreground mt-4">
        Heap with {data.length} elements (Array representation)
      </p>
    </div>
  );
}
