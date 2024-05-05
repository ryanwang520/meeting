'use client';
import { v4 as uuidv4 } from 'uuid';

import { useCallback, useState } from 'react';
import { Topic, TopicFormData } from '@/lib/types';
import Prepare from '@/components/Prepare';
import Meeting from '@/components/Meeting';

type Status = 'setup' | 'meeting';

// generate some test topic data
// const mockTopics: Topic[] = [
//   {
//     name: 'Topic 1',
//     description: 'Description of topic 1',
//     time: '15',
//     uuid: '1',
//   },
//   {
//     name: 'Topic 2',
//     description: 'Description of topic 2',
//     time: '30',
//     uuid: '2',
//   },
//   {
//     name: 'Topic 3',
//     description: 'Description of topic 3',
//     time: '10',
//     uuid: '3',
//   },
// ];
export default function App() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [status, setStatus] = useState<Status>('setup');
  const [participants, setParticipants] = useState<number>(1);
  const [rate, setRate] = useState<number>(100);

  const onAddTopic = useCallback((topic: TopicFormData) => {
    setTopics((topics) => [...topics, { ...topic, uuid: uuidv4() }]);
  }, []);
  const onDeleteTopic = useCallback((topic: Topic) => {
    setTopics((topics) => topics.filter((t) => t.uuid !== topic.uuid));
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">ArcSite Meeting App</h1>
      {status == 'setup' ? (
        <Prepare
          topics={topics}
          onAddTopic={onAddTopic}
          onDeleteTopic={onDeleteTopic}
          startMeeting={({ participants, rate }) => {
            setParticipants(participants);
            setRate(rate);
            setStatus('meeting');
          }}
        />
      ) : (
        <Meeting
          goBack={() => {
            setStatus('setup');
          }}
          participants={participants}
          rate={rate}
          initialTopics={topics}
        />
      )}
    </div>
  );
}
