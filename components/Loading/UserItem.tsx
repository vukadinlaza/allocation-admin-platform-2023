import Line from './Line';
import Round from './Round';

export default function UserItem() {
  return (
    <div className="flex items-center justify-center gap-4">
      <div className="w-40 h-6">
        <Line />
      </div>
      <Round />
    </div>
  );
}
