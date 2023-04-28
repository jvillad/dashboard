import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <button className="bg-green-950 p-3 rounded-lg text-white hover:bg-green-800 px-5">
        Login with Google
      </button>
    </div>
  );
}
