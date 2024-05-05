import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { ParkingLotFormData, Topic } from '@/lib/types';
import { useId, useState } from 'react';
import { Button } from './ui/button';
import ParkingDialog from './ParkingDialog';
import ParkingForm from './ParkingForm';
type Props = {
  selectedTopic?: Topic;
  onStop: () => void;
  onMoveTopic: (payload: ParkingLotFormData) => void;
  goBack: () => void;
};
export default function MeetingTableActions({
  selectedTopic,
  onStop,
  onMoveTopic,
  goBack,
}: Props) {
  const [moving, setMoving] = useState(false);
  const movingFormId = useId();
  const selectedTopicId = selectedTopic?.uuid;
  return (
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
                onMoveTopic(payload);

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
            onStop();
          }}
          size="sm"
          variant="outline"
        >
          STOP
        </Button>
      </div>
    </div>
  );
}
