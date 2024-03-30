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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from '@/components/ui/table';

export default function Component() {
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
              <Select>
                <SelectTrigger id="participants">
                  <SelectValue placeholder="3" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="rate">
                Fictional Hourly Rate ($/hr):
              </label>
              <Input id="rate" placeholder="$" />
            </div>
            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2">Agenda Items</h2>
              <div className="mb-2">
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="topic"
                >
                  Topic:
                </label>
                <Input id="topic" placeholder="" />
              </div>
              <div className="mb-2">
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="time"
                >
                  Time:
                </label>
                <Select>
                  <SelectTrigger id="time">
                    <SelectValue placeholder="15 Minutes" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="5">5 Minutes</SelectItem>
                    <SelectItem value="10">10 Minutes</SelectItem>
                    <SelectItem value="15">15 Minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="description"
                >
                  Description (optional):
                </label>
                <Textarea id="description" placeholder="" />
              </div>
              <Button className="bg-blue-500 hover:bg-blue-700 text-white">{`Add >`}</Button>
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
