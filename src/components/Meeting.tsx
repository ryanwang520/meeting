import { ParkingLot, ParkingLotFormData, Topic } from '@/lib/types';
import { v4 as uuidv4 } from 'uuid';
import { formatTime } from '@/lib/utils';
import { useCallback, useEffect, useRef, useState } from 'react';
import MeetingTableActions from './MeetingTableActions';
import MeetingTable from './MeetingTable';
import MeetingCost from './MeetingCost';
import Notes from './Notes';
import ParkingSection from './ParkingSection';

export default function Meeting({
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
