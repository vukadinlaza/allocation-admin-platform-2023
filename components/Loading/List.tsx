import Line from './Line';

export default function List() {
  return (
    <div className="flex flex-col items-center gap-4 p-4">
      {Array.from({ length: 6 }).map((x, i) => (
        <div key={i} className="w-full h-10 gap-4">
          <Line />
        </div>
      ))}
    </div>
  );
}
