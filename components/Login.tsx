'use client';
import { useSession, signIn, signOut } from 'next-auth/react';
import UserInfo from './UserInfo';

export default function Component() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <UserInfo user={session.user} />
      </>
    );
  }
  return (
    <>
      <button
        onClick={() => signIn('google')}
        className="bg-green-950 p-3 rounded-lg text-white hover:bg-green-800 px-5"
      >
        Login with Google
      </button>
    </>
  );
}
