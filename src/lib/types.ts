import { z } from 'zod';

export const topicSchema = z.object({
  name: z.string().min(1, {
    message: 'Please enter a topic name.',
  }),
  description: z.string(),
  time: z.string(),
});
export type TopicForm = z.infer<typeof topicSchema>;
export type Topic = TopicForm & { uuid: string };

export type ParkingLot = {
  name: string;
  description: string;
  owners: string;
  uuid: string;
};

export const parkintLotSchema = z.object({
  name: z.string().min(1, {
    message: 'Please enter a topic name.',
  }),
  description: z.string(),
  owners: z.string().min(1, {
    message: 'Please enter at least one owner.',
  }),
});

export type ParkingLotFormData = z.infer<typeof parkintLotSchema>;

export type TopicFormData = z.infer<typeof topicSchema>;
