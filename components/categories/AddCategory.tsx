'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const AddItem = () => {
  const router = useRouter();

  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const saveItem = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    // set all the the item details to a variable
    const categoryDetails = {
      name,
      description,
    };

    // make a post to db and create an endpoint
    await fetch('/api/category/createCategory', {
      method: 'POST',
      body: JSON.stringify(categoryDetails),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));

    router.refresh();
    router.push('/categories');
  };

  return (
    <section>
      <form className="text-center w-full" onSubmit={saveItem}>
        <div className="text-2xl mb-4 p-1 text-green-950">
          <h1>New Category</h1>
        </div>
        <div className="mb-4">
          <input
            placeholder="Item Name"
            type="text"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
        </div>
        <div className="mb-4">
          <textarea
            placeholder="Item Description"
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
          ></textarea>
        </div>
        <div>
          <button
            type="submit"
            className="rounded-full bg-blue-500 py-[7px] px-6 text-white font-light"
          >
            Save Category
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddItem;
