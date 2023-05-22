import DisplayProduct from '@/components/product/DisplayProduct';
import Layout from '@/components/Layout';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { redirect } from 'next/navigation';

const Products = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/unauthorized');
  }
  let products;
  try {
    products = await prisma.item.findMany();
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }

  return (
    <Layout>
      <div className="text-end py-5">
        <Link
          href={'/products/add'}
          type="button"
          className="rounded-md border-green-800 border-[1px] bg-[#171918] hover:bg-white hover:text-[#171918] hover:border-[#171918] hover:border-[1px] py-2 px-4 text-white font-light mb-4"
        >
          Add Item
        </Link>
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-white uppercase bg-[#171918]">
            <tr className="rounded-xl">
              <td>Name</td>
              <td>Description</td>
              <td>Price</td>
              <td>Stock</td>
              <td>Category</td>
              <td>Special</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr
                key={product.id}
                className=" border-b text-[#171918] dark:border-gray-400"
              >
                <DisplayProduct product={product} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Products;
