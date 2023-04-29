// Default session TYPE
import { DefaultSession } from 'next-auth';
import SideNav from './SideNav';

const Dashboard = ({ user }: { user: DefaultSession['user'] }) => {
  return (
    <div className="min-h-screen flex bg-[#171918]">
      <SideNav user={user} />
      <div className="bg-slate-100 flex-grow rounded-md my-4 mr-4">
        <div className="p-5">test</div>
      </div>
    </div>
  );
};

export default Dashboard;
