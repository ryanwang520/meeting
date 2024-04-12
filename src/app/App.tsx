'use client';
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/3Hszke86Sbq
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { v4 as uuidv4 } from 'uuid';

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
import Link from 'next/link';

import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
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
import { Dispatch, SetStateAction, useReducer, useRef, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';

const timeOptions = [1, 5, 10, 15, 20, 30, 60];

const topicSchema = z.object({
  name: z.string().min(1, {
    message: 'Please enter a topic name.',
  }),
  description: z.string(),
  time: z.string(),
});

type TopicForm = z.infer<typeof topicSchema>;

type Topic = TopicForm & { uuid: string };
type Status = 'setup' | 'meeting';

export default function App() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [status, setStatus] = useState<Status>('setup');

  return status == 'setup' ? (
    <Prepare
      topics={topics}
      setTopics={setTopics}
      startMeeting={({ participants, rate }) => {
        // setParticipants(participants);
        // setRate(rate)
        console.log(participants, rate);
        setStatus('meeting');
      }}
    />
  ) : (
    <Meeting topics={topics} />
  );
}

function Prepare({
  topics,
  setTopics,
  startMeeting,
}: {
  topics: Topic[];
  setTopics: Dispatch<SetStateAction<Topic[]>>;
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
  function onSubmit(topic: z.infer<typeof topicSchema>) {
    setTopics((topics) => [...topics, { ...topic, uuid: uuidv4() }]);
    form.reset();
  }
  const settingsForm = useRef<HTMLFormElement | null>(null);
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-xl font-bold mb-4">
          The ArcSite Meeting tool – setup screen
        </h1>
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
                            defaultValue={field.value}
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
                          setTopics(
                            topics.filter((t) => t.uuid !== topic.uuid)
                          );
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

function Meeting({ topics }: { topics: Topic[] }) {
  const [selectedTopicIds, setSelectedTopicIds] = useState<string[]>([]);
  function renderTopicStatus(topic: Topic) {
    return 'Done';
  }
  return (
    <div className="max-w-4xl mx-auto my-8 p-4">
      <h1 className="text-2xl font-bold mb-6">
        The ArcSite Meeting tool – Usage Screen
      </h1>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex flex-col">
          <label className="font-semibold mb-2" htmlFor="timeSpent">
            Time Spent
          </label>
          <Input id="timeSpent" placeholder="44:00" />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold mb-2" htmlFor="dollarsCost">
            Dollars Cost
          </label>
          <Input id="dollarsCost" placeholder="600" />
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead />
            <TableHead>Name</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Clock</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {topics.map((topic) => (
            <TableRow key={topic.uuid}>
              <TableCell>
                <Checkbox id="topic1" />
              </TableCell>
              <TableCell className="font-medium">Topic 1</TableCell>
              <TableCell>{topic.time} minutes</TableCell>
              <TableCell>{topic.description}</TableCell>
              <TableCell>{renderTopicStatus(topic)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-between items-start my-6">
        <div className="flex-1">
          <Button className="mr-2" variant="outline">
            Move to Parking Lot
          </Button>
          <Button variant="destructive">STOP</Button>
        </div>
        <div className="w-1/3">
          <Textarea className="mb-2" placeholder="Type your notes here." />
          <Button variant="outline">COPY</Button>
        </div>
      </div>
      <div className="flex justify-between items-start">
        <Button variant="outline">EDIT</Button>
        <div className="w-1/3">
          <h2 className="font-bold mb-2">Parking Lot</h2>
          <ScrollArea className="h-32 w-full rounded-md border mb-2">
            <p>Item 1</p>
            <p>Item 2</p>
            <p>Item 3</p>
          </ScrollArea>
          <Button className="mr-2" variant="outline">
            ADD ITEM
          </Button>
          <Button variant="outline">COPY</Button>
        </div>
      </div>
    </div>
  );
}
