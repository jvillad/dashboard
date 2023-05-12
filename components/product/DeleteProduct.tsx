'use client';
import { Product } from '@/types/ProductInterface';
import { useRouter } from 'next/navigation';

const DeleteItem = ({ product }: Product) => {
  const router = useRouter();

  const handleDelete = async () => {
    await fetch(`/api/deleteItem?id=${product.id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    router.refresh();
    router.push('/products');
  };

  return (
    <div className="flex flex-col items-center justify-center py-20">
      <p className="py-4">
        Are you sure you want to delete this item
        <span className="text-red-700 font-bold"> {product.name}</span> ?
      </p>
      <div className="py-10 text-center">
        <p>Description: {product.shortDescription}</p>
        <p>Price: {product.price}</p>
        <p>Category: {product.categoryId}</p>
      </div>
      <div className="flex gap-10 items-center justify-center">
        <button
          className="bg-red-700 border-[1px] border-solid text-white p-2 rounded-xl w-20"
          onClick={handleDelete}
        >
          Delete
        </button>
        <button
          className="border-[1px] border-gray-800 p-2 rounded-xl w-20"
          onClick={() => {
            router.push('/products');
          }}
        >
          No
        </button>
      </div>
    </div>
  );
};

export default DeleteItem;
