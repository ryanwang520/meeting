'use client';
import { v4 as uuidv4 } from 'uuid';
import { useCopyToClipboard } from 'react-use';

import { Dialog, DialogTrigger } from '@/components/ui/dialog';
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
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import ParkingDialog from '@/components/ParkingDialog';
import ParkingForm from '@/components/ParkingForm';

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

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">ArcSite Meeting App</h1>
      {status == 'setup' ? (
        <Prepare
          topics={topics}
          setTopics={setTopics}
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

type ParkingLot = {
  name: string;
  description: string;
  owners: string;
  uuid: string;
};

function formatTime(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600); // Compute total hours
  const minutes = Math.floor((totalSeconds % 3600) / 60); // Compute remaining minutes
  const seconds = totalSeconds % 60; // Compute remaining seconds

  // Pad the minutes and seconds with leading zeros if needed
  const paddedHours = String(hours).padStart(2, '0');
  const paddedMinutes = String(minutes).padStart(2, '0');
  const paddedSeconds = String(seconds.toFixed(0)).padStart(2, '0');

  // Format the time string in hh:mm:ss format
  if (hours > 0) {
    const paddedHours = String(hours).padStart(2, '0');
    return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
  } else {
    return `${paddedMinutes}:${paddedSeconds}`;
  }
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
  const [notes, setNotes] = useState('');
  const [_, copyToClipboard] = useCopyToClipboard();
  const [moving, setMoving] = useState(false);
  const [adding, setAdding] = useState(false);
  const movingFormId = useId();
  const addingFormId = useId();
  const selectedTopic = topics.find((t) => t.uuid === selectedTopicId);

  const [seconds, setSeconds] = useState(0);

  const dollars = (participants * rate * seconds) / 3600;

  const timeSpent = formatTime(seconds);

  const timer = useRef<NodeJS.Timeout | null>(null);
  function clearTimer() {
    if (timer.current) {
      clearInterval(timer.current);
    }
  }

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

  function renderTopicStatus(topic: Topic) {
    // assign topics with index less than this one to varialbe prevTopics
    const prevTopics = topics.slice(0, topics.indexOf(topic));
    const prevSeconds = prevTopics.reduce(
      (acc, t) => acc + Number(t.time) * 60,
      0
    );
    const topicEndSeconds = prevSeconds + Number(topic.time) * 60;
    if (prevSeconds > seconds) {
      return '';
    }
    if (topicEndSeconds < seconds) {
      return 'Done';
    }
    const countdownSeconds = topicEndSeconds - seconds;
    function applyStyle(seconds: number) {
      if (seconds < 60) {
        return { backgroundColor: '#ea3323', color: 'white' };
      }
      if (seconds < 60 * 3) {
        return { backgroundColor: '#ffff54', color: 'black' };
      }
      return {};
    }
    return (
      <TableCell className="" style={applyStyle(countdownSeconds)}>
        {formatTime(countdownSeconds)}
      </TableCell>
    );
  }
  function isStarted(topic: Topic) {
    const prevTopics = topics.slice(0, topics.indexOf(topic));
    const prevSeconds = prevTopics.reduce(
      (acc, t) => acc + Number(t.time) * 60,
      0
    );
    return seconds > prevSeconds;
  }

  return (
    <div>
      <div
        className="max-w-4xl mx-auto my-8 p-4 grid gap-4"
        style={{
          gridTemplateColumns: '2fr 1fr',
        }}
      >
        <div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex flex-col">
              <label className="font-semibold mb-2" htmlFor="timeSpent">
                Time Spent
              </label>
              <div className="w-32 h-10 border flex items-center justify-center">
                ${timeSpent}
              </div>
            </div>
            <div className="">
              <label className="font-semibold mb-2" htmlFor="dollarsCost">
                Dollars Cost
              </label>
              <div className="w-32 h-10 border flex items-center justify-center">
                ${dollars.toFixed(2)}
              </div>
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
                    <Checkbox
                      disabled={isStarted(topic)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedTopicId(topic.uuid);
                        } else {
                          setSelectedTopicId(null);
                        }
                      }}
                      checked={selectedTopicId === topic.uuid}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{topic.name}</TableCell>
                  <TableCell>{topic.time} minutes</TableCell>
                  <TableCell>{topic.description}</TableCell>
                  {renderTopicStatus(topic)}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex-1 mt-8">
            <Dialog open={moving} onOpenChange={setMoving}>
              <DialogTrigger asChild>
                <Button
                  disabled={!selectedTopicId}
                  className="mr-2"
                  variant="outline"
                  onClick={() => {}}
                >
                  Move to Parking Lot
                </Button>
              </DialogTrigger>
              <ParkingDialog formId={movingFormId}>
                {selectedTopic ? (
                  <ParkingForm
                    key={selectedTopicId}
                    onOk={(payload) => {
                      setParkingLots((lots) => [
                        ...lots,
                        { ...payload, uuid: uuidv4() },
                      ]);
                      setTopics((topics) =>
                        topics.filter((t) => t.uuid !== selectedTopicId)
                      );
                      setSelectedTopicId(null);
                      setMoving(false);
                    }}
                    name={selectedTopic.name}
                    description={selectedTopic.description}
                    formId={movingFormId}
                  />
                ) : null}
              </ParkingDialog>
            </Dialog>

            <div className="flex justify-center gap-4 mt-8">
              <Button onClick={() => goBack()} size="sm" variant="outline">
                &lt;EDIT
              </Button>
              <Button
                onClick={() => {
                  clearTimer();
                }}
                size="sm"
                variant="outline"
              >
                STOP
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <div>
            <h2 className="font-bold mb-2">Notes</h2>
            <div className="">
              <Textarea
                onChange={(e) => {
                  setNotes(e.target.value);
                }}
                value={notes}
                className="mb-2"
                placeholder="Type your notes here."
              />
              <div className="flex justify-end">
                <Button
                  onClick={() => {
                    copyToClipboard(notes);
                  }}
                  className=""
                  variant="outline"
                >
                  COPY
                </Button>
              </div>
            </div>
          </div>
          <div className="">
            <h2 className="font-bold mb-2">Parking Lot</h2>
            <ScrollArea className="h-[300px] w-full rounded-md border mb-2">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="bg-blue-500 text-white">
                      Topic
                    </TableHead>
                    <TableHead className="bg-blue-500 text-white">
                      Description
                    </TableHead>
                    <TableHead className="bg-blue-500 text-white">
                      Owners
                    </TableHead>
                    <TableHead className="bg-blue-500 text-white">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {parkingLots.map((lot) => (
                    <TableRow key={lot.uuid}>
                      <TableCell className="font-medium">{lot.name}</TableCell>
                      <TableCell>{lot.description}</TableCell>
                      <TableCell>{lot.owners}</TableCell>

                      <TableCell>
                        <Button
                          onClick={(log) => {
                            setParkingLots(
                              parkingLots.filter((t) => t.uuid !== lot.uuid)
                            );
                          }}
                          variant="destructive"
                          size="sm"
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>

            <div className="flex justify-between">
              <Dialog open={adding} onOpenChange={setAdding}>
                <DialogTrigger asChild>
                  <Button className="mr-2" variant="outline">
                    ADD ITEM
                  </Button>
                </DialogTrigger>
                <ParkingDialog formId={addingFormId}>
                  <ParkingForm
                    onOk={(payload) => {
                      setParkingLots((lots) => [
                        ...lots,
                        { ...payload, uuid: uuidv4() },
                      ]);
                      setAdding(false);
                    }}
                    formId={addingFormId}
                  />
                </ParkingDialog>
              </Dialog>

              <Button
                onClick={() => {
                  // copy all parking lots text content to clipboard
                  copyToClipboard(
                    parkingLots
                      .map(
                        (lot) =>
                          `${lot.name} - ${lot.description} - ${lot.owners}`
                      )
                      .join('\n')
                  );
                }}
                variant="outline"
              >
                COPY
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
