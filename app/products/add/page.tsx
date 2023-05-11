import AddItem from '@/components/product/AddProduct';
import Layout from '@/components/Layout';
import prisma from '@/lib/prisma';

const page = async () => {
  const categories = await prisma.category.findMany();
  if (categories.length === 0) {
    console.log('No categories found');
  } else {
    console.log(`Found ${categories.length} categories:`);
  }
  console.log(categories);
  return (
    <Layout>
      <AddItem categories={categories} />
    </Layout>
  );
};

export default page;
