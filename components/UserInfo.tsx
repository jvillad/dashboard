'use client';
// Default session TYPE
import { DefaultSession } from 'next-auth';
import { signOut } from 'next-auth/react';

const UserInfo = ({ user }: { user: DefaultSession['user'] }) => {
  return (
    <div className="text-center">
      <h2>👋🏼 Hello there {user?.name}!</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora itaque
        officiis molestias amet porro iusto at reiciendis. Rem inventore quaerat
        amet nemo rerum reprehenderit. Quod est natus non quis atque!
      </p>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
};

export default UserInfo;
