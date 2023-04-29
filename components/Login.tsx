'use client';
import { useSession, signIn } from 'next-auth/react';
import Dashboard from './Dashboard';
export default function Login() {
  const { data: session } = useSession();
  return (
    <div className="w-screen">
      {session ? (
        <Dashboard user={session?.user} />
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
