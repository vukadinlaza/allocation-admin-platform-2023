import Line from './Line';
import List from './List';
import UserItem from './UserItem';

export default function LoadingApp() {
  return (
    <div className="w-full h-full">
      <header className="flex items-center justify-between w-full gap-4 p-4 border-b">
        <div className="h-8 w-96">
          <Line />
        </div>
        <div>
          <UserItem />
        </div>
      </header>
      <div className="flex items-center gap-4 p-4 mb-6 border-b">
        {Array.from({ length: 6 }).map((x, i) => (
          <div key={i} className="w-24 h-5 gap-4">
            <Line />
          </div>
        ))}
      </div>
      <div>
        <header className="flex items-start justify-between w-full gap-4 p-4 mb-6">
          <div className="flex flex-col items-start gap-4">
            <div className="w-64 h-8">
              <Line />
            </div>
            <div className="w-48 h-8">
              <Line />
            </div>
            <div className="w-24 h-6">
              <Line />
            </div>
          </div>
          <div className="w-40 h-8">
            <Line />
          </div>
        </header>
        <List />
      </div>
    </div>
  );
}
