import ItemDetails from '@/components/product/ProductDetails';
import prisma from '@/lib/prisma';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { ProductId } from '@/types/ProductInterface';
import { getServerSession } from 'next-auth';
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
    <div>
      <>
        <ItemDetails product={productDetail} />
      </>
    </div>
  );
};

export default page;
