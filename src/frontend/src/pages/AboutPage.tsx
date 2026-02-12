import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Code2, Layers, Zap } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="container py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">About DS Visualizer</h1>
        <p className="text-muted-foreground text-lg">
          A comprehensive learning platform for data structures and algorithms
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm dark:prose-invert max-w-none">
            <p>
              DS Visualizer is designed to help students understand data structures and algorithms through
              interactive visualizations. We believe that seeing how these concepts work in real-time makes
              learning more intuitive and effective.
            </p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <BookOpen className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>Concept Lessons</CardTitle>
              <CardDescription>Learn the fundamentals</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Each data structure includes detailed lessons covering overview, operations, time complexity,
                and common pitfalls. Visual demonstrations accompany every concept.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Layers className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>Interactive Playground</CardTitle>
              <CardDescription>Learn by doing</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Experiment with data structures hands-on. Insert, delete, search, and manipulate elements
                while watching the structure update in real-time.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Code2 className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>Algorithm Animations</CardTitle>
              <CardDescription>See algorithms in action</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Watch sorting and graph traversal algorithms work step by step. Control playback speed and
                step through operations at your own pace.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Zap className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>Step-by-Step Controls</CardTitle>
              <CardDescription>Learn at your pace</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                All visualizations include play/pause, step forward, and speed controls. Each step shows
                exactly what's happening with clear captions.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>How to Use This Tool</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">1. Start with Lessons</h3>
              <p className="text-sm text-muted-foreground">
                Visit the Data Structures page to learn about each structure. Read the overview, understand
                the operations, and watch the live demonstrations.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">2. Explore Algorithms</h3>
              <p className="text-sm text-muted-foreground">
                Check out the Algorithms page to see sorting and graph traversal in action. Use the animation
                controls to step through each operation.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">3. Practice in the Playground</h3>
              <p className="text-sm text-muted-foreground">
                Head to the Playground to experiment hands-on. Try different operations, load sample scenarios,
                and build your intuition through practice.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
