'use client';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';
import { ItemDetails } from '@/types/ItemProps';

const EditItem = ({ product }: ItemDetails) => {
  const router = useRouter();

  // TODO: Image URL
  // TODO: PROMO DURATION
  // TODO: Confirmation that item is added (Priority)
  const id = product.id;
  const [name, setName] = useState<string>(product.name);
  const [shortDescription, setShortDescription] = useState(
    product.shortDescription
  );
  const [longDescription, setLongDescription] = useState(
    product.longDescription
  );
  const [price, setPrice] = useState<number>(product.price);
  const [stock, setStock] = useState<string>(product.stock);
  const [categoryId, setCategoryId] = useState<string>(product.categoryId);
  const [special, setSpecial] = useState<boolean>(product.special);

  const updateItem = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    // set all the the item details to a variable
    const itemDetails = {
      id,
      name,
      shortDescription,
      longDescription,
      price,
      stock,
      special,
      categoryId,
    };

    // make a post to db and create an endpoint
    await fetch('/api/updateItem', {
      method: 'PUT',
      body: JSON.stringify(itemDetails),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
    router.refresh();
    router.push('/products');
  };

  return (
    <section>
      <form className="text-center w-full" onSubmit={updateItem}>
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
            placeholder="Short Description"
            value={shortDescription}
            onChange={(ev) => setShortDescription(ev.target.value)}
          ></textarea>
        </div>
        <div className="mb-4">
          <textarea
            placeholder="Long Description"
            value={longDescription}
            onChange={(ev) => setLongDescription(ev.target.value)}
          ></textarea>
        </div>
        <div className="mb-4">
          <input
            placeholder="Price"
            type="number"
            value={price}
            onChange={(ev) => setPrice(Number(ev.target.value))}
          />
        </div>
        <div className="mb-4">
          <input
            placeholder="Stock"
            type="number"
            value={stock}
            onChange={(ev) => setStock(ev.target.value)}
          />
        </div>

        <div className="mb-4">
          <select
            value={categoryId}
            onChange={(ev) => setCategoryId(ev.target.value)}
          >
            {product.categories?.map((option) => (
              <option key={uuidv4()}>{option.name}</option>
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
            Update Item
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditItem;
