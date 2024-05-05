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
