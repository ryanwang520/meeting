import {
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { DialogFooter } from './ui/dialog';
import { Button } from './ui/button';

export default function ParkingDialog({
  children,
  formId,
}: {
  children: React.ReactNode;
  formId: string;
}) {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Add to Parking Lot</DialogTitle>
      </DialogHeader>

      <div className="grid gap-4 py-4">{children}</div>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant={'outline'}>Cancel</Button>
        </DialogClose>
        <Button form={formId} type="submit">
          Save changes
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
