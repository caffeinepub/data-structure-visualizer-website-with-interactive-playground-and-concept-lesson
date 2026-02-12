import { Card } from '@/components/ui/card';

interface BSTVizProps {
  data: number[];
}

interface TreeNode {
  value: number;
  left?: TreeNode;
  right?: TreeNode;
}

function buildBST(values: number[]): TreeNode | null {
  if (values.length === 0) return null;
  
  let root: TreeNode | null = null;
  
  const insert = (node: TreeNode | null, value: number): TreeNode => {
    if (!node) return { value };
    if (value < node.value) {
      node.left = insert(node.left || null, value);
    } else {
      node.right = insert(node.right || null, value);
    }
    return node;
  };
  
  values.forEach(value => {
    root = insert(root, value);
  });
  
  return root;
}

function TreeNodeComponent({ node, level = 0 }: { node: TreeNode; level?: number }) {
  return (
    <div className="flex flex-col items-center">
      <Card className="w-12 h-12 flex items-center justify-center bg-primary text-primary-foreground border-2 border-primary mb-2">
        <div className="font-bold text-sm">{node.value}</div>
      </Card>
      {(node.left || node.right) && (
        <div className="flex gap-8">
          <div className="flex flex-col items-center">
            {node.left ? (
              <TreeNodeComponent node={node.left} level={level + 1} />
            ) : (
              <div className="w-12 h-12 flex items-center justify-center border-2 border-dashed rounded text-muted-foreground text-xs">
                null
              </div>
            )}
          </div>
          <div className="flex flex-col items-center">
            {node.right ? (
              <TreeNodeComponent node={node.right} level={level + 1} />
            ) : (
              <div className="w-12 h-12 flex items-center justify-center border-2 border-dashed rounded text-muted-foreground text-xs">
                null
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export function BSTViz({ data }: BSTVizProps) {
  const root = buildBST(data);
  
  if (!root) {
    return (
      <div className="text-center text-muted-foreground py-8">
        Empty tree
      </div>
    );
  }
  
  return (
    <div className="w-full overflow-x-auto">
      <div className="flex justify-center min-w-max px-4 py-4">
        <TreeNodeComponent node={root} />
      </div>
      <p className="text-center text-sm text-muted-foreground mt-4">
        Binary Search Tree with {data.length} nodes
      </p>
    </div>
  );
}
