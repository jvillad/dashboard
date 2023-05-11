import DeleteItem from '@/components/product/DeleteProduct';
import Layout from '@/components/Layout';
import prisma from '@/lib/prisma';
import { ProductId } from '@/types/Interfaces';

const page = async ({ params }: ProductId) => {
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
