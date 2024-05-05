import { useCopyToClipboard } from 'react-use';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { useState } from 'react';

export default function Notes() {
  const [_, copyToClipboard] = useCopyToClipboard();
  const [notes, setNotes] = useState('');
  return (
    <div>
      <h2 className="font-bold mb-2">Notes</h2>
      <div className="">
        <Textarea
          onChange={(e) => {
            setNotes(e.target.value);
          }}
          value={notes}
          className="mb-2"
          placeholder="Type your notes here."
        />
        <div className="flex justify-end">
          <Button
            onClick={() => {
              copyToClipboard(notes);
            }}
            className=""
            variant="outline"
          >
            COPY
          </Button>
        </div>
      </div>
    </div>
  );
}
