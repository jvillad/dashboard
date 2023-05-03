import EditItem from '@/components/EditItem';
import Layout from '@/components/Layout';
import prisma from '@/lib/prisma';
import { ProductId } from '@/types/ItemProps';

const page = async ({ params }: ProductId) => {
  const productDetail = await prisma.item.findUnique({
    where: {
      id: `${params.productId}`,
    },
  });
  if (productDetail === null) return;

  return (
    <Layout>
      <>
        <EditItem product={productDetail} />
      </>
    </Layout>
  );
};

export default page;
