import Layout from '@/components/Layout';
import AddCategory from '@/components/categories/AddCategory';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/unauthorized');
  }
  return (
    <Layout>
      <AddCategory />
    </Layout>
  );
};

export default page;
