import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TopicSidebar } from '@/components/lessons/TopicSidebar';
import { LessonViewer } from '@/components/lessons/LessonViewer';
import { DataStructureDemoPanel } from '@/features/visualizations/demos/DataStructureDemoPanel';
import { useTopics } from '@/lib/queries/topics';
import { LoadingState } from '@/components/common/LoadingState';
import { ErrorState } from '@/components/common/ErrorState';

export default function DataStructuresPage() {
  const [selectedTopicId, setSelectedTopicId] = useState<string>('array');
  const { data: topics, isLoading, error, refetch } = useTopics();

  if (isLoading) {
    return (
      <div className="container py-8">
        <LoadingState message="Loading data structures..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-8">
        <ErrorState message="Failed to load data structures" onRetry={refetch} />
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Data Structures</h1>
        <p className="text-muted-foreground text-lg">
          Learn fundamental data structures through interactive lessons and visualizations
        </p>
      </div>

      <div className="grid lg:grid-cols-[280px_1fr] gap-6">
        <TopicSidebar
          topics={topics || []}
          selectedTopicId={selectedTopicId}
          onSelectTopic={setSelectedTopicId}
        />

        <div className="space-y-6">
          <Tabs defaultValue="lesson" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="lesson">Lesson</TabsTrigger>
              <TabsTrigger value="demo">Live Demo</TabsTrigger>
            </TabsList>

            <TabsContent value="lesson" className="mt-6">
              <LessonViewer topicId={selectedTopicId} />
            </TabsContent>

            <TabsContent value="demo" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Interactive Demonstration</CardTitle>
                  <CardDescription>
                    Watch how this data structure works with a sample scenario
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DataStructureDemoPanel topicId={selectedTopicId} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
