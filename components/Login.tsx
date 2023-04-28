'use client';

import { useSession, signIn, signOut } from 'next-auth/react';

const Login = () => {
  // get session from nextAuth
  const { data: session } = useSession();

  // useSession uses React Context

  // if the user exists -> show a Sign Out button and their information

  // if a user doesn't exist -> show a Sign In button

  return (
    <div>
      <button
        onClick={session ? () => signOut() : () => signIn()}
        className="bg-green-950 p-3 rounded-lg text-white hover:bg-green-800 px-5"
      >
        {session ? 'Sign Out' : 'Login'}
      </button>
    </div>
  );
};

export default Login;
