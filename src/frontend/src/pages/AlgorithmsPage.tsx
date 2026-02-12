import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BubbleSortViz } from '@/features/visualizations/algorithms/BubbleSortViz';
import { InsertionSortViz } from '@/features/visualizations/algorithms/InsertionSortViz';
import { GraphTraversalViz } from '@/features/visualizations/algorithms/GraphTraversalViz';

export default function AlgorithmsPage() {
  const [sortAlgorithm, setSortAlgorithm] = useState<'bubble' | 'insertion'>('bubble');
  const [traversalAlgorithm, setTraversalAlgorithm] = useState<'bfs' | 'dfs'>('bfs');

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Algorithm Visualizations</h1>
        <p className="text-muted-foreground text-lg">
          Watch algorithms in action with step-by-step animations
        </p>
      </div>

      <Tabs defaultValue="sorting" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="sorting">Sorting</TabsTrigger>
          <TabsTrigger value="traversal">Graph Traversal</TabsTrigger>
        </TabsList>

        <TabsContent value="sorting" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Sorting Algorithms</CardTitle>
                  <CardDescription>
                    Visualize how sorting algorithms organize data step by step
                  </CardDescription>
                </div>
                <Select value={sortAlgorithm} onValueChange={(v) => setSortAlgorithm(v as 'bubble' | 'insertion')}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bubble">Bubble Sort</SelectItem>
                    <SelectItem value="insertion">Insertion Sort</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              {sortAlgorithm === 'bubble' ? <BubbleSortViz /> : <InsertionSortViz />}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="traversal" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Graph Traversal</CardTitle>
                  <CardDescription>
                    See how BFS and DFS explore graphs differently
                  </CardDescription>
                </div>
                <Select value={traversalAlgorithm} onValueChange={(v) => setTraversalAlgorithm(v as 'bfs' | 'dfs')}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bfs">Breadth-First Search</SelectItem>
                    <SelectItem value="dfs">Depth-First Search</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <GraphTraversalViz algorithm={traversalAlgorithm} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
