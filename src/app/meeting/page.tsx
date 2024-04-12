import { Input } from '@/components/ui/input';
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function Metting() {
  return (
    <div className="max-w-4xl mx-auto my-8 p-4">
      <h1 className="text-2xl font-bold mb-6">
        The ArcSite Meeting tool – Usage Screen
      </h1>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex flex-col">
          <label className="font-semibold mb-2" htmlFor="timeSpent">
            Time Spent
          </label>
          <Input id="timeSpent" placeholder="44:00" />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold mb-2" htmlFor="dollarsCost">
            Dollars Cost
          </label>
          <Input id="dollarsCost" placeholder="600" />
        </div>
      </div>
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
          <TableRow>
            <TableCell>
              <Checkbox id="topic1" />
            </TableCell>
            <TableCell className="font-medium">Topic 1</TableCell>
            <TableCell>30 minutes</TableCell>
            <TableCell>Description of Topic 1</TableCell>
            <TableCell>
              <Button variant="outline">DONE</Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Checkbox id="topic2" />
            </TableCell>
            <TableCell className="font-medium">Topic 2</TableCell>
            <TableCell>15 minutes</TableCell>
            <TableCell>Description of Topic 2</TableCell>
            <TableCell>
              <Button variant="outline">DONE</Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Checkbox id="topic3" />
            </TableCell>
            <TableCell className="font-medium">Topic 3</TableCell>
            <TableCell>15 minutes</TableCell>
            <TableCell>
              We need to decide on this{' '}
              <Link href="#">www.notion.com/bigdecision</Link>
            </TableCell>
            <TableCell>
              <div className="flex flex-col items-center">
                <Button variant="outline">DONE</Button>
                <span className="text-sm mt-1">1 minute left</span>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div className="flex justify-between items-start my-6">
        <div className="flex-1">
          <Button className="mr-2" variant="outline">
            Move to Parking Lot
          </Button>
          <Button variant="destructive">STOP</Button>
        </div>
        <div className="w-1/3">
          <Textarea className="mb-2" placeholder="Type your notes here." />
          <Button variant="outline">COPY</Button>
        </div>
      </div>
      <div className="flex justify-between items-start">
        <Button variant="outline">EDIT</Button>
        <div className="w-1/3">
          <h2 className="font-bold mb-2">Parking Lot</h2>
          <ScrollArea className="h-32 w-full rounded-md border mb-2">
            <p>Item 1</p>
            <p>Item 2</p>
            <p>Item 3</p>
          </ScrollArea>
          <Button className="mr-2" variant="outline">
            ADD ITEM
          </Button>
          <Button variant="outline">COPY</Button>
        </div>
      </div>
    </div>
  );
}
