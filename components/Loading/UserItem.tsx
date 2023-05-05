import Line from './Line';
import Round from './Round';

export default function UserItem() {
  return (
    <div className="grid items-center grid-cols-6 my-3 align">
      <div className="col-span-5 mr-2">
        <Line />
      </div>
      <Round />
    </div>
  );
}
