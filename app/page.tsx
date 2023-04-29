import Login from '@/components/Login';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <div className="w-screen h-screen flex items-center ">
      <Login />
    </div>
  );
}
