import AddItem from '@/components/product/AddProduct';
import Layout from '@/components/Layout';
import prisma from '@/lib/prisma';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/unauthorized');
  }
  const categories = await prisma.category.findMany();
  if (categories.length === 0) {
    console.log('No categories found');
  } else {
    console.log(`Found ${categories.length} categories:`);
  }
  console.log(categories);
  return (
    <Layout>
      <AddItem categories={categories} />
    </Layout>
  );
};

export default page;
