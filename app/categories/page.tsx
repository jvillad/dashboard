import Layout from '@/components/Layout';
import DisplayCategories from '@/components/categories/DisplayCategories';
import prisma from '@/lib/prisma';
import Link from 'next/link';

const page = async () => {
  const categories = await prisma.category.findMany();
  if (categories.length === 0) {
    console.log('No categories found');
  } else {
    console.log(`Found ${categories.length} categories:`);
  }
  return (
    <Layout>
      <div className="text-end py-5">
        <Link
          href={'/categories/add'}
          type="button"
          className="rounded-md border-green-500 border-[1px] bg-[#171918] hover:bg-white hover:text-[#171918] hover:border-[#171918] hover:border-[1px] py-2 px-4 text-white font-light mb-4"
        >
          Add Category
        </Link>
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-white uppercase bg-[#171918]">
            <tr className="rounded-xl">
              <td>Category Name</td>
              <td>Description</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {categories?.map((category) => (
              <tr
                key={category.name}
                className=" border-b text-[#171918] dark:border-gray-400"
              >
                <DisplayCategories category={category} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default page;
