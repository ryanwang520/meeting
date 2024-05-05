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
import { Topic, TopicForm, TopicFormData, topicSchema } from '@/lib/types';
import { useRef } from 'react';
const timeOptions = [1, 5, 10, 15, 20, 30, 60];
export default function Prepare({
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
