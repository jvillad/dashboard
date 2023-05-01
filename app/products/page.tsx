import Layout from '@/components/Layout';
import { PrismaClient } from '@prisma/client';
import Link from 'next/link';

const Products = async () => {
  const prisma = new PrismaClient();
  const products = await prisma.item.findMany();

  return (
    <Layout>
      <Link
        href={'/products/add'}
        type="button"
        className="rounded-full bg-blue-700 py-2 px-4 text-white font-light"
      >
        Add Item
      </Link>
      {products?.map((item) => (
        <p key={item.id}>{item.name}</p>
      ))}
    </Layout>
  );
};

export default Products;
