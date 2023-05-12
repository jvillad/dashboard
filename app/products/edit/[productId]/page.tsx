import EditItem from '@/components/product/EditProduct';
import Layout from '@/components/Layout';
import prisma from '@/lib/prisma';
import { ProductId } from '@/types/ProductInterface';

const page = async ({ params }: ProductId) => {
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
