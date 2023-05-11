import Layout from '@/components/Layout';
import UploadImage from '@/components/UploadImage';
import prisma from '@/lib/prisma';
import { ProductId } from '@/types/Interfaces';
import Link from 'next/link';

const page = async ({ params }: ProductId) => {
  const product = await prisma.item.findUnique({
    where: {
      id: Number(params.productId),
    },
  });
  return (
    <Layout>
      <div className="flex justify-center items-center my-10">
        <div className="">
          <p>Product Name: {product?.name}</p>
          <p>Product Description: {product?.shortDescription}</p>
          <div className="my-10">
            <UploadImage />
          </div>
          <Link
            href={`/products`}
            className="p-2 border-gray-500 text-[#171918] border-solid border-[1px] rounded-md"
          >
            Upload Later
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default page;
