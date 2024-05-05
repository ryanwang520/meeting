import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Topic } from '@/lib/types';
import { formatTime } from '@/lib/utils';
type Props = {
  topics: Topic[];
  seconds: number;
  selectedTopicId: string | null;
  setSelectedTopicId: (id: string | null) => void;
};
export default function MeetingTable({
  topics,
  seconds,
  selectedTopicId,
  setSelectedTopicId,
}: Props) {
  function isStarted(topic: Topic) {
    const prevTopics = topics.slice(0, topics.indexOf(topic));
    const prevSeconds = prevTopics.reduce(
      (acc, t) => acc + Number(t.time) * 60,
      0
    );
    return seconds > prevSeconds;
  }
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
  return (
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
          <TableRow key={topic.uuid} className="h-16">
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
  );
}
