export default function MeetingCost({
  timeSpent,
  dollars,
}: {
  timeSpent: string;
  dollars: number;
}) {
  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="flex flex-col">
        <label className="font-semibold mb-2" htmlFor="timeSpent">
          Time Spent
        </label>
        <div className="w-32 h-10 border flex items-center justify-center">
          ${timeSpent}
        </div>
      </div>
      <div className="">
        <label className="font-semibold mb-2" htmlFor="dollarsCost">
          Dollars Cost
        </label>
        <div className="w-32 h-10 border flex items-center justify-center">
          ${dollars.toFixed(2)}
        </div>
      </div>
    </div>
  );
}
