import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Code2, Layers, ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="container py-8">
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-accent/5 to-background border mb-12">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="relative px-6 py-16 md:py-24 text-center">
          <img
            src="/assets/generated/dsvis-hero.dim_1600x600.png"
            alt="Data Structures Visualization"
            className="mx-auto mb-8 max-w-3xl w-full h-auto rounded-lg shadow-lg"
          />
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Master Data Structures Visually
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Learn data structures and algorithms through interactive visualizations and hands-on practice
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/data-structures">
              <Button size="lg" className="gap-2">
                Start Learning <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/playground">
              <Button size="lg" variant="outline" className="gap-2">
                Try Playground <Layers className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-6 mb-12">
        <Card className="border-2 hover:border-primary/50 transition-colors">
          <CardHeader>
            <BookOpen className="h-10 w-10 mb-2 text-primary" />
            <CardTitle>Concept Lessons</CardTitle>
            <CardDescription>
              Learn data structures with clear explanations and live visual demonstrations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/data-structures">
              <Button variant="ghost" className="w-full gap-2">
                Explore Lessons <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border-2 hover:border-primary/50 transition-colors">
          <CardHeader>
            <Code2 className="h-10 w-10 mb-2 text-primary" />
            <CardTitle>Algorithm Animations</CardTitle>
            <CardDescription>
              Watch sorting and graph traversal algorithms in action with step-by-step controls
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/algorithms">
              <Button variant="ghost" className="w-full gap-2">
                View Algorithms <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border-2 hover:border-primary/50 transition-colors">
          <CardHeader>
            <Layers className="h-10 w-10 mb-2 text-primary" />
            <CardTitle>Interactive Playground</CardTitle>
            <CardDescription>
              Experiment with data structures hands-on and see changes in real-time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/playground">
              <Button variant="ghost" className="w-full gap-2">
                Open Playground <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      <section className="bg-muted/30 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Why Visual Learning?</h2>
        <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Visual learning helps students understand complex data structures by seeing how they work in real-time.
          Our interactive visualizations make abstract concepts concrete, helping you build intuition and master
          the fundamentals of computer science.
        </p>
      </section>
    </div>
  );
}
