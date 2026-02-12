import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Topic {
    id: string;
    title: string;
    description: string;
    lessons: Array<Lesson>;
}
export interface ExamplePreset {
    id: string;
    title: string;
    expectedOutput: string;
    description: string;
    sampleInput: string;
    topicId: string;
}
export interface Lesson {
    id: string;
    title: string;
    content: string;
}
export interface backendInterface {
    addExamplePreset(id: string, title: string, topicId: string, description: string, sampleInput: string, expectedOutput: string): Promise<void>;
    addLessonToTopic(topicId: string, lessonId: string, lessonTitle: string, content: string): Promise<void>;
    addTopic(id: string, title: string, description: string): Promise<void>;
    getAllTopics(): Promise<Array<Topic>>;
    getExamplePresetsForTopic(topicId: string): Promise<Array<ExamplePreset>>;
    getLessonsForTopic(topicId: string): Promise<Array<Lesson>>;
    getTopic(id: string): Promise<Topic | null>;
}
