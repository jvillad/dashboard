import Layout from '@/components/Layout';
import prisma from '@/lib/prisma';
import { CategoryId } from '@/types/CategoryInterface';
import DeleteCategory from '@/components/categories/DeleteCategory';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const page = async ({ params }: CategoryId) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/unauthorized');
  }
  const { categoryName } = params;
  const categoryDetails = await prisma.category.findUnique({
    where: {
      name: categoryName,
    },
  });
  if (categoryDetails === null) return;
  return (
    <Layout>
      <DeleteCategory category={categoryDetails} />
    </Layout>
  );
};

export default page;
