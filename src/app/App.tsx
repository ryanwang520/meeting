'use client';
import { v4 as uuidv4 } from 'uuid';
import { formatTime } from '@/lib/utils';

import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea } from '@/components/ui/textarea';

import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from '@/components/ui/table';
import { useCallback, useEffect, useRef, useState } from 'react';
import MeetingTable from '@/components/MeetingTable';
import {
  ParkingLot,
  ParkingLotFormData,
  Topic,
  TopicForm,
  topicSchema,
} from '@/lib/types';
import Notes from '@/components/Notes';
import ParkingSection from '@/components/ParkingSection';
import MeetingTableActions from '@/components/MeetingTableActions';
import MeetingCost from '@/components/MeetingCost';

const timeOptions = [1, 5, 10, 15, 20, 30, 60];

type Status = 'setup' | 'meeting';

// generate some test topic data
const mockTopics: Topic[] = [
  {
    name: 'Topic 1',
    description: 'Description of topic 1',
    time: '15',
    uuid: '1',
  },
  {
    name: 'Topic 2',
    description: 'Description of topic 2',
    time: '30',
    uuid: '2',
  },
  {
    name: 'Topic 3',
    description: 'Description of topic 3',
    time: '10',
    uuid: '3',
  },
];
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

type TopicFormData = z.infer<typeof topicSchema>;

function Prepare({
  topics,
  onAddTopic,
  onDeleteTopic,
  startMeeting,
}: {
  topics: Topic[];
  onAddTopic: (topic: TopicFormData) => void;
  onDeleteTopic: (topic: Topic) => void;
  startMeeting: (params: { participants: number; rate: number }) => void;
}) {
  const form = useForm<TopicForm>({
    resolver: zodResolver(topicSchema),
    defaultValues: {
      name: '',
      time: '15',
      description: '',
    },
  });
  // 2. Define a submit handler.
  function onSubmit(topic: TopicFormData) {
    onAddTopic(topic);
    form.reset();
  }
  const settingsForm = useRef<HTMLFormElement | null>(null);
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex gap-8">
          <div className="flex-1">
            <form
              id="settings"
              ref={settingsForm}
              onSubmit={(e) => {
                e.preventDefault();
                const participants = Number(
                  settingsForm.current!.participants.value
                );
                const rate = Number(settingsForm.current!.rate.value);
                startMeeting({ participants, rate });
              }}
            >
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="participants"
                >
                  Number of Participants:
                </label>
                <Input required name="participants" type="number" />
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="rate"
                >
                  Fictional Hourly Rate ($/hr):
                </label>
                <Input
                  required
                  name="rate"
                  type="number"
                  id="rate"
                  placeholder="$"
                />
              </div>
            </form>
            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2">Agenda Items</h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField
                    name="name"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="">
                        <div className="flex items-baseline">
                          <FormLabel className="w-24">Topic:</FormLabel>
                          <div className="w-full">
                            <FormControl>
                              <Input placeholder="" {...field} />
                            </FormControl>
                            <FormMessage />
                          </div>
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="time"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="flex items-baseline">
                        <FormLabel className="w-24">Time:</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger id="time">
                              <SelectValue placeholder="15 Minutes" />
                            </SelectTrigger>
                            <SelectContent position="popper">
                              {timeOptions.map((time) => (
                                <SelectItem key={time} value={time.toString()}>
                                  {time} Minutes
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="description"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="flex items-baseline">
                        <FormLabel className="w-32 break-words whitespace-normal">
                          Description (optional):
                        </FormLabel>
                        <FormControl>
                          <Textarea placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button className="bg-blue-500 hover:bg-blue-700 text-white">{`Add >`}</Button>
                </form>
              </Form>
            </div>
            <Button
              type="submit"
              form="settings"
              className="w-full bg-green-500 hover:bg-green-700 text-white"
            >
              START
            </Button>
          </div>
          <div className="flex-1">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="bg-blue-500 text-white">Name</TableHead>
                  <TableHead className="bg-blue-500 text-white">Time</TableHead>
                  <TableHead className="bg-blue-500 text-white">
                    Description
                  </TableHead>
                  <TableHead className="bg-blue-500 text-white">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topics.map((topic) => (
                  <TableRow key={topic.uuid}>
                    <TableCell className="font-medium">{topic.name}</TableCell>
                    <TableCell>{topic.time} minutes</TableCell>
                    <TableCell>{topic.description}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => {
                          onDeleteTopic(topic);
                        }}
                        variant="destructive"
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

function Meeting({
  initialTopics,
  goBack,
  participants,
  rate,
}: {
  participants: number;
  rate: number;
  initialTopics: Topic[];
  goBack: () => void;
}) {
  const [topics, setTopics] = useState<Topic[]>(initialTopics);
  const [parkingLots, setParkingLots] = useState<ParkingLot[]>([]);
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const selectedTopic = topics.find((t) => t.uuid === selectedTopicId);

  const [seconds, setSeconds] = useState(0);

  const dollars = (participants * rate * seconds) / 3600;

  const timeSpent = formatTime(seconds);

  const onMoveTopic = useCallback(
    (payload: ParkingLotFormData) => {
      setParkingLots((lots) => [...lots, { ...payload, uuid: uuidv4() }]);
      setTopics((topics) => topics.filter((t) => t.uuid !== selectedTopicId));
      setSelectedTopicId(null);
    },
    [selectedTopicId]
  );

  const onAddParkingLot = useCallback((payload: ParkingLotFormData) => {
    setParkingLots((lots) => [...lots, { ...payload, uuid: uuidv4() }]);
  }, []);
  const onDeleteParkingLot = useCallback((lot: ParkingLot) => {
    setParkingLots((parkingLots) =>
      parkingLots.filter((t) => t.uuid !== lot.uuid)
    );
  }, []);

  const timer = useRef<NodeJS.Timeout | null>(null);
  function clearTimer() {
    if (timer.current) {
      clearInterval(timer.current);
    }
  }
  const onStop = useCallback(() => {
    clearTimer();
  }, []);

  useEffect(() => {
    const startTime = new Date().getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      setSeconds((now - startTime) / 1000);
    }, 1000);
    timer.current = interval;

    return () => {
      clearInterval(interval);
    };
  }, [participants, rate]);

  return (
    <div>
      <div
        className="max-w-4xl mx-auto my-8 p-4 grid gap-4"
        style={{
          gridTemplateColumns: '2fr 1fr',
        }}
      >
        <div>
          <MeetingCost timeSpent={timeSpent} dollars={dollars} />

          <MeetingTable
            topics={topics}
            seconds={seconds}
            selectedTopicId={selectedTopicId}
            setSelectedTopicId={setSelectedTopicId}
          />
          <MeetingTableActions
            selectedTopic={selectedTopic}
            onMoveTopic={onMoveTopic}
            goBack={goBack}
            onStop={onStop}
          />
        </div>
        <div className="flex flex-col gap-8">
          <Notes />
          <ParkingSection
            parkingLots={parkingLots}
            onAddParkingLot={onAddParkingLot}
            onDeleteParkingLot={onDeleteParkingLot}
          />
        </div>
      </div>
    </div>
  );
}
