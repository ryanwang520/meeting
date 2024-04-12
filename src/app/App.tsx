'use client';
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/3Hszke86Sbq
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
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

const timeOptions = [1, 5, 10, 15, 20, 30, 60];

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  description: z.string(),
  time: z.string().min(1, {
    message: 'Username must be at least 2 characters.',
  }),
});

export default function App() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      time: '15',
      description: '',
    },
  });
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-xl font-bold mb-4">
          The ArcSite Meeting tool – setup screen
        </h1>
        <div className="flex gap-8">
          <div className="flex-1">
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="participants"
              >
                Number of Participants:
              </label>
              <Input type="number" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="rate">
                Fictional Hourly Rate ($/hr):
              </label>
              <Input type="number" id="rate" placeholder="$" />
            </div>
            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2">Agenda Items</h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField
                    name="name"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="flex items-baseline">
                        <FormLabel className="w-24">Topic:</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
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
            <Button className="w-full bg-green-500 hover:bg-green-700 text-white">
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
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Topic 1</TableCell>
                  <TableCell>30 minutes</TableCell>
                  <TableCell />
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Topic 2</TableCell>
                  <TableCell>15 minutes</TableCell>
                  <TableCell />
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Topic 3</TableCell>
                  <TableCell>15 minutes</TableCell>
                  <TableCell>
                    We need to decide on this www.notion.com/bigdecision
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
