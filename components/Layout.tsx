'use client';
import { useSession, signIn } from 'next-auth/react';
import SideNav from './SideNav';
type Props = {
  children: React.ReactNode;
};
export default function Layout({ children }: Props) {
  const { data: session } = useSession();
  return (
    <div className="w-screen">
      {session ? (
        <div className="min-h-screen flex bg-[#171918]">
          <SideNav user={session.user} />
          <div className="bg-slate-100 flex-grow rounded-md my-4 mr-4">
            <div className="p-5">{children}</div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => signIn('google')}
          className="bg-green-950 p-3 rounded-lg text-white hover:bg-green-800 px-5"
        >
          Login with Google
        </button>
      )}
    </div>
  );
}
