import { Card } from '@/components/ui/card';

interface GraphVizProps {
  data: {
    nodes: string[];
    edges: [string, string][];
  };
  visitedNodes?: Set<string>;
  activeNode?: string;
}

export function GraphViz({ data, visitedNodes, activeNode }: GraphVizProps) {
  const { nodes, edges } = data;

  const positions: Record<string, { x: number; y: number }> = {};
  const radius = 120;
  const centerX = 200;
  const centerY = 150;

  nodes.forEach((node, index) => {
    const angle = (2 * Math.PI * index) / nodes.length - Math.PI / 2;
    positions[node] = {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    };
  });

  return (
    <div className="w-full flex justify-center">
      <svg width="400" height="300" className="border rounded">
        {edges.map(([from, to], index) => {
          const fromPos = positions[from];
          const toPos = positions[to];
          return (
            <line
              key={index}
              x1={fromPos.x}
              y1={fromPos.y}
              x2={toPos.x}
              y2={toPos.y}
              stroke="currentColor"
              strokeWidth="2"
              className="text-muted-foreground"
            />
          );
        })}
        {nodes.map((node) => {
          const pos = positions[node];
          const isVisited = visitedNodes?.has(node);
          const isActive = activeNode === node;
          return (
            <g key={node}>
              <circle
                cx={pos.x}
                cy={pos.y}
                r="24"
                fill={isActive ? 'oklch(var(--primary))' : isVisited ? 'oklch(var(--accent))' : 'oklch(var(--card))'}
                stroke={isActive ? 'oklch(var(--primary))' : 'oklch(var(--border))'}
                strokeWidth={isActive ? '3' : '2'}
              />
              <text
                x={pos.x}
                y={pos.y}
                textAnchor="middle"
                dominantBaseline="middle"
                className={`font-bold ${isActive ? 'fill-primary-foreground' : 'fill-foreground'}`}
              >
                {node}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
