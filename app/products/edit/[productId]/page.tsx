import EditItem from '@/components/product/EditProduct';
import Layout from '@/components/Layout';
import prisma from '@/lib/prisma';
import { ProductId } from '@/types/ProductInterface';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { redirect } from 'next/navigation';

const page = async ({ params }: ProductId) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/unauthorized');
  }
  const productDetail = await prisma.item.findUnique({
    where: {
      id: Number(params.productId),
    },
  });
  if (productDetail === null) return;

  const categories = await prisma.category.findMany();
  if (categories.length === 0) return;

  const data = {
    ...productDetail,
    categories,
  };
  return (
    <Layout>
      <>
        <EditItem product={data} />
      </>
    </Layout>
  );
};

export default page;
