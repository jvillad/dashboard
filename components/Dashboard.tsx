'use client';
import { Counts } from '@/app/page';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const Dashboard = (count: Counts) => {
  const session = useSession();
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
      <div>
        <div className="flex gap-2 align-middle ">
          <div>
            <p className="mb-4">
              Current Number of Products:
              <span className="font-bold"> {count.products}</span>
            </p>
          </div>
          <div>
            <Link
              href={'/products'}
              className="bg-gray-800 text-white p-2 rounded-md"
            >
              View Products
            </Link>
          </div>
        </div>
        <div className="flex gap-2 align-middle ">
          <div>
            <p className="mb-4">
              Current Categories:
              <span className="font-bold"> {count.categories}</span>
            </p>
          </div>
          <div>
            <Link
              href={'/categories'}
              className="bg-gray-800 text-white p-2 rounded-md"
            >
              View Categories
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
