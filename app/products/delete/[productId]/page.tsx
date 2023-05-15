import DeleteItem from '@/components/product/DeleteProduct';
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
  return (
    <Layout>
      <DeleteItem product={productDetail} />
    </Layout>
  );
};

export default page;
