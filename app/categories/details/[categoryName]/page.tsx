import CategoryDetails from '@/components/categories/CategoryDetails';
import prisma from '@/lib/prisma';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { CategoryId } from '@/types/CategoryInterface';
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
    <div>
      <>
        <CategoryDetails category={categoryDetails} />
      </>
    </div>
  );
};

export default page;
