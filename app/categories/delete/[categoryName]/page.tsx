import Layout from '@/components/Layout';
import prisma from '@/lib/prisma';
import { CategoryId } from '@/types/CategoryInterface';
import DeleteCategory from '@/components/categories/DeleteCategory';

const page = async ({ params }: CategoryId) => {
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
