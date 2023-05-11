import ItemDetails from '@/components/product/ProductDetails';
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
    <div>
      <>
        <ItemDetails product={productDetail} />
      </>
    </div>
  );
};

export default page;
