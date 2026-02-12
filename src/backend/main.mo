import Map "mo:core/Map";
import Array "mo:core/Array";
import Text "mo:core/Text";

actor {
  type Topic = {
    id : Text;
    title : Text;
    description : Text;
    lessons : [Lesson];
  };

  type Lesson = {
    id : Text;
    title : Text;
    content : Text;
  };

  type ExamplePreset = {
    id : Text;
    title : Text;
    topicId : Text;
    description : Text;
    sampleInput : Text;
    expectedOutput : Text;
  };

  let topics = Map.empty<Text, Topic>();
  let examplePresets = Map.empty<Text, ExamplePreset>();

  public shared ({ caller }) func addTopic(id : Text, title : Text, description : Text) : async () {
    let newTopic : Topic = {
      id;
      title;
      description;
      lessons = [];
    };
    topics.add(id, newTopic);
  };

  public shared ({ caller }) func addLessonToTopic(topicId : Text, lessonId : Text, lessonTitle : Text, content : Text) : async () {
    switch (topics.get(topicId)) {
      case (null) { () };
      case (?topic) {
        let newLesson : Lesson = {
          id = lessonId;
          title = lessonTitle;
          content;
        };
        let updatedLessons = topic.lessons.concat([newLesson]);
        let updatedTopic : Topic = { topic with lessons = updatedLessons };
        topics.add(topicId, updatedTopic);
      };
    };
  };

  public shared ({ caller }) func addExamplePreset(id : Text, title : Text, topicId : Text, description : Text, sampleInput : Text, expectedOutput : Text) : async () {
    let newPreset : ExamplePreset = {
      id;
      title;
      topicId;
      description;
      sampleInput;
      expectedOutput;
    };
    examplePresets.add(id, newPreset);
  };

  public query ({ caller }) func getTopic(id : Text) : async ?Topic {
    topics.get(id);
  };

  public query ({ caller }) func getAllTopics() : async [Topic] {
    topics.values().toArray();
  };

  public query ({ caller }) func getLessonsForTopic(topicId : Text) : async [Lesson] {
    switch (topics.get(topicId)) {
      case (null) { [] };
      case (?topic) { topic.lessons };
    };
  };

  public query ({ caller }) func getExamplePresetsForTopic(topicId : Text) : async [ExamplePreset] {
    examplePresets.values().toArray().filter(
      func(preset) {
        preset.topicId == topicId;
      }
    );
  };
};
