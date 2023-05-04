import ItemDetails from '@/components/ItemDetails';
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
    <div>
      <>
        <ItemDetails product={productDetail} />
      </>
    </div>
  );
};

export default page;
