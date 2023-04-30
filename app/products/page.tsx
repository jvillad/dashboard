import Layout from '@/components/Layout';
import Link from 'next/link';

const Products = () => {
  return (
    <Layout>
      <Link
        href={'/products/add'}
        type="button"
        className="rounded-full bg-blue-700 py-2 px-4 text-white font-light"
      >
        Add Item
      </Link>
    </Layout>
  );
};

export default Products;
