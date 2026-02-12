import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useLessons } from '@/lib/queries/lessons';
import { LoadingState } from '@/components/common/LoadingState';
import { ErrorState } from '@/components/common/ErrorState';

interface LessonViewerProps {
  topicId: string;
}

const DEFAULT_LESSONS: Record<string, { title: string; sections: Array<{ title: string; content: string }> }> = {
  array: {
    title: 'Array',
    sections: [
      {
        title: 'Overview',
        content:
          'An array is a contiguous block of memory that stores elements of the same type. Elements are accessed by their index, starting from 0. Arrays provide O(1) random access but have fixed size in most languages.',
      },
      {
        title: 'Operations',
        content:
          'Access: O(1) - Direct index access\nSearch: O(n) - Linear scan required\nInsert: O(n) - May require shifting elements\nDelete: O(n) - May require shifting elements',
      },
      {
        title: 'Complexity',
        content:
          'Time: Access O(1), Search O(n), Insert/Delete O(n)\nSpace: O(n) for n elements\nArrays excel at random access but struggle with insertions and deletions in the middle.',
      },
      {
        title: 'Common Pitfalls',
        content:
          '• Index out of bounds errors\n• Fixed size limitations\n• Expensive insertions/deletions\n• Memory waste if oversized\n• Cache-friendly but inflexible',
      },
    ],
  },
  'linked-list': {
    title: 'Linked List',
    sections: [
      {
        title: 'Overview',
        content:
          'A linked list is a linear data structure where elements (nodes) are connected via pointers. Each node contains data and a reference to the next node. Unlike arrays, linked lists have dynamic size and efficient insertions/deletions.',
      },
      {
        title: 'Operations',
        content:
          'Access: O(n) - Must traverse from head\nSearch: O(n) - Linear traversal\nInsert: O(1) - At known position\nDelete: O(1) - At known position\nPrepend: O(1) - Add to front',
      },
      {
        title: 'Complexity',
        content:
          'Time: Access/Search O(n), Insert/Delete O(1) at known position\nSpace: O(n) plus pointer overhead\nLinked lists excel at insertions/deletions but lack random access.',
      },
      {
        title: 'Common Pitfalls',
        content:
          '• Losing references (memory leaks)\n• Null pointer errors\n• Poor cache locality\n• Extra memory for pointers\n• No random access',
      },
    ],
  },
  stack: {
    title: 'Stack',
    sections: [
      {
        title: 'Overview',
        content:
          'A stack is a Last-In-First-Out (LIFO) data structure. Elements are added and removed from the same end (top). Think of a stack of plates - you can only add or remove from the top.',
      },
      {
        title: 'Operations',
        content:
          'Push: O(1) - Add element to top\nPop: O(1) - Remove element from top\nPeek: O(1) - View top element\nIsEmpty: O(1) - Check if empty',
      },
      {
        title: 'Complexity',
        content:
          'Time: All operations O(1)\nSpace: O(n) for n elements\nStacks are perfect for function calls, undo operations, and expression evaluation.',
      },
      {
        title: 'Common Pitfalls',
        content:
          '• Stack overflow (too many pushes)\n• Stack underflow (pop on empty)\n• Not checking isEmpty before pop\n• Forgetting to handle edge cases',
      },
    ],
  },
  queue: {
    title: 'Queue',
    sections: [
      {
        title: 'Overview',
        content:
          'A queue is a First-In-First-Out (FIFO) data structure. Elements are added at the rear and removed from the front. Think of a line at a store - first person in line is served first.',
      },
      {
        title: 'Operations',
        content:
          'Enqueue: O(1) - Add element to rear\nDequeue: O(1) - Remove element from front\nPeek: O(1) - View front element\nIsEmpty: O(1) - Check if empty',
      },
      {
        title: 'Complexity',
        content:
          'Time: All operations O(1)\nSpace: O(n) for n elements\nQueues are ideal for task scheduling, breadth-first search, and buffering.',
      },
      {
        title: 'Common Pitfalls',
        content:
          '• Queue overflow (too many enqueues)\n• Queue underflow (dequeue on empty)\n• Circular queue wraparound logic\n• Not handling full/empty states',
      },
    ],
  },
  bst: {
    title: 'Binary Search Tree',
    sections: [
      {
        title: 'Overview',
        content:
          'A binary search tree (BST) is a hierarchical structure where each node has at most two children. For each node, all values in the left subtree are smaller, and all values in the right subtree are larger.',
      },
      {
        title: 'Operations',
        content:
          'Search: O(log n) average, O(n) worst\nInsert: O(log n) average, O(n) worst\nDelete: O(log n) average, O(n) worst\nTraversal: O(n) - Visit all nodes',
      },
      {
        title: 'Complexity',
        content:
          'Time: O(log n) average for balanced tree, O(n) for skewed tree\nSpace: O(n) for n nodes\nBSTs provide efficient search, insert, and delete when balanced.',
      },
      {
        title: 'Common Pitfalls',
        content:
          '• Unbalanced trees degrade to O(n)\n• Complex deletion logic\n• Duplicate handling varies\n• Recursion stack overflow\n• Not maintaining BST property',
      },
    ],
  },
  heap: {
    title: 'Heap',
    sections: [
      {
        title: 'Overview',
        content:
          'A heap is a complete binary tree that satisfies the heap property: in a max heap, parent nodes are greater than children; in a min heap, parent nodes are smaller. Heaps are typically implemented as arrays.',
      },
      {
        title: 'Operations',
        content:
          'Insert: O(log n) - Add and bubble up\nExtract: O(log n) - Remove root and heapify\nPeek: O(1) - View root element\nHeapify: O(n) - Build heap from array',
      },
      {
        title: 'Complexity',
        content:
          'Time: Insert/Extract O(log n), Peek O(1), Build O(n)\nSpace: O(n) for n elements\nHeaps are perfect for priority queues and heap sort.',
      },
      {
        title: 'Common Pitfalls',
        content:
          '• Confusing max heap vs min heap\n• Array index calculations\n• Not maintaining heap property\n• Inefficient heapify\n• Edge cases with single element',
      },
    ],
  },
  graph: {
    title: 'Graph',
    sections: [
      {
        title: 'Overview',
        content:
          'A graph is a collection of nodes (vertices) connected by edges. Graphs can be directed or undirected, weighted or unweighted. They model relationships and networks like social connections, maps, and dependencies.',
      },
      {
        title: 'Operations',
        content:
          'Add Vertex: O(1)\nAdd Edge: O(1)\nRemove Vertex: O(V + E)\nRemove Edge: O(E)\nTraversal (BFS/DFS): O(V + E)',
      },
      {
        title: 'Complexity',
        content:
          'Time: Traversal O(V + E), where V = vertices, E = edges\nSpace: Adjacency list O(V + E), Adjacency matrix O(V²)\nGraphs are versatile but require careful traversal algorithms.',
      },
      {
        title: 'Common Pitfalls',
        content:
          '• Cycles causing infinite loops\n• Not tracking visited nodes\n• Choosing wrong representation\n• Memory overhead with dense graphs\n• Handling disconnected components',
      },
    ],
  },
};

export function LessonViewer({ topicId }: LessonViewerProps) {
  const { data: lessons, isLoading, error, refetch } = useLessons(topicId);

  if (isLoading) {
    return <LoadingState message="Loading lesson..." />;
  }

  if (error) {
    return <ErrorState message="Failed to load lesson" onRetry={refetch} />;
  }

  const lessonData = DEFAULT_LESSONS[topicId];

  if (!lessonData) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-muted-foreground">
          Select a topic to view its lesson
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{lessonData.title}</CardTitle>
        <CardDescription>Learn the fundamentals and best practices</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
          {lessonData.sections.map((section, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">{section.title}</AccordionTrigger>
              <AccordionContent>
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <p className="whitespace-pre-line">{section.content}</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
