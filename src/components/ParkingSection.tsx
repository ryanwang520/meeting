import { Dialog, DialogTrigger } from '@/components/ui/dialog';

import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from '@/components/ui/table';
import { useId, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ParkingLot, ParkingLotFormData } from '@/lib/types';
import { Button } from './ui/button';
import ParkingDialog from './ParkingDialog';
import ParkingForm from './ParkingForm';
import { useCopyToClipboard } from 'react-use';

type Props = {
  parkingLots: ParkingLot[];
  onAddParkingLot: (payload: ParkingLotFormData) => void;
  onDeleteParkingLot: (lot: ParkingLot) => void;
};

export default function ParkingSection({
  parkingLots,
  onAddParkingLot,
  onDeleteParkingLot,
}: Props) {
  const [adding, setAdding] = useState(false);
  const [_, copyToClipboard] = useCopyToClipboard();
  const addingFormId = useId();
  return (
    <div className="">
      <h2 className="font-bold mb-2">Parking Lot</h2>
      <ScrollArea className="h-[300px] w-full rounded-md border mb-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="bg-blue-500 text-white">Topic</TableHead>
              <TableHead className="bg-blue-500 text-white">
                Description
              </TableHead>
              <TableHead className="bg-blue-500 text-white">Owners</TableHead>
              <TableHead className="bg-blue-500 text-white">Action</TableHead>
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
                    onClick={() => {
                      onDeleteParkingLot(lot);
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
                onAddParkingLot(payload);

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
                  (lot) => `${lot.name} - ${lot.description} - ${lot.owners}`
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
  );
}
