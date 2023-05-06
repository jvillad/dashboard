import Layout from '@/components/Layout';
import UploadImage from '@/components/product/UploadImage';
import prisma from '@/lib/prisma';
import { ProductId } from '@/types/ItemProps';

const page = async ({ params }: ProductId) => {
  await prisma.item.findUnique({
    where: {
      id: Number(params.productId),
    },
  });
  return (
    <Layout>
      <UploadImage />
    </Layout>
  );
};

export default page;
