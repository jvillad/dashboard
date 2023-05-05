'use client';
import { useSession } from 'next-auth/react';

const Dashboard = () => {
  const session = useSession();
  // TODO: modify names that are all caps as well
  let words = session?.data?.user?.name?.split(' ');
  if (words) {
    words = words?.map((word) => word[0].toUpperCase() + word.substring(1));
  }
  const titleCaseName = words?.join(' ');

  return (
    <div>
      <div className="p-5">
        <p>
          👋🏼 Hello there,
          <span className="text-gray-800 font-bold"> {titleCaseName}</span>
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
