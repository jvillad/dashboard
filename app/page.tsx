import Dashboard from '@/components/Dashboard';
import Layout from '@/components/Layout';
import prisma from '@/lib/prisma';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export interface Counts {
  products: number;
  categories: number;
}
export default async function Home() {
  const products = (await prisma.item.findMany()).length;
  const categories = (await prisma.category.findMany()).length;
  const num: Counts = { products, categories };

  return (
    <Layout>
      <Dashboard products={num.products} categories={num.categories} />
    </Layout>
  );
}
