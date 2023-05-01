'use client';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';

const AddItem = () => {
  const router = useRouter();

  // TODO: Image URL
  // TODO: PROMO DURATION
  // TODO: Confirmation that item is added (Priority)
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [stock, setStock] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [special, setSpecial] = useState<boolean>(false);

  const roasts = ['Seasonal Blend', 'Code Black', 'Filter Roast', 'City Roast'];

  const saveItem = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    // set all the the item details to a variable
    const itemDetails = {
      name,
      description,
      price,
      stock,
      category,
      special,
    };

    // make a post to db and create an endpoint
    await fetch('/api/createItem', {
      method: 'POST',
      body: JSON.stringify(itemDetails),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));

    router.push('/products');
  };

  return (
    <section>
      <form className="text-center w-full" onSubmit={saveItem}>
        <div className="text-2xl mb-4 p-1 text-green-950">
          <h1>New Product</h1>
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
        <div className="mb-4">
          <input
            placeholder="Price"
            type="text"
            value={price}
            onChange={(ev) => setPrice(ev.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            placeholder="Stock"
            type="text"
            value={stock}
            onChange={(ev) => setStock(ev.target.value)}
          />
        </div>

        <div className="mb-4">
          <select
            value={category}
            onChange={(ev) => setCategory(ev.target.value)}
          >
            {roasts.map((option) => (
              <option key={uuidv4()}>{option}</option>
            ))}
          </select>
        </div>

        <div className="mb-8 flex items-center justify-evenly w-1/3 mx-auto">
          Set Special:
          <input
            className="w-5 h-10"
            type="checkbox"
            id="special"
            name="special"
            checked={special}
            onChange={() => setSpecial(!special)}
          />
        </div>

        <div>
          <button
            type="submit"
            className="rounded-full bg-blue-500 py-[7px] px-6 text-white font-light"
          >
            Add Item
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddItem;
