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

import { useEffect } from 'react';
import { ParkingLotFormData, parkintLotSchema } from '@/lib/types';

export default function ParkingForm({
  formId,
  name,
  description,
  onOk,
}: {
  formId: string;
  name?: string;
  description?: string;
  onOk(form: z.infer<typeof parkintLotSchema>): void;
}) {
  const form = useForm<ParkingLotFormData>({
    resolver: zodResolver(parkintLotSchema),
    defaultValues: {
      name,
      description,
      owners: '',
    },
  });
  // 2. Define a submit handler.
  function onSubmit(payload: ParkingLotFormData) {
    // setTopics((topics) => [...topics, { ...topic, uuid: uuidv4() }]);
    onOk(payload);
    form.reset();
  }
  useEffect(() => {
    console.log('mount');
  }, []);
  return (
    <Form {...form}>
      <form id={formId} onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem className="">
                <div className="flex items-baseline">
                  <FormLabel className="w-32">Topic:</FormLabel>
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
          <FormField
            name="owners"
            control={form.control}
            render={({ field }) => (
              <FormItem className="">
                <div className="flex items-baseline">
                  <FormLabel className="w-32">Owners:</FormLabel>
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
        </div>
      </form>
    </Form>
  );
}
