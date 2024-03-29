'use client';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';
import { ICategory } from '@/types/CategoryInterface';
import UploadImage from '../UploadImage';
import DisplayImages from '../DisplayImages';

const AddItem = ({ categories }: ICategory) => {
  const router = useRouter();
  const [name, setName] = useState<string>('');
  const [shortDescription, setShortDescription] = useState<string>('');
  const [longDescription, setLongDescription] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [stock, setStock] = useState<string>('');
  const [categoryId, setCategoryId] = useState<string>('');
  const [special, setSpecial] = useState<boolean>(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const saveItem = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    // set all the the item details to a variable
    const itemDetails = {
      name,
      shortDescription,
      longDescription,
      price,
      stock: price.toString(),
      categoryId,
      special,
      imageUrls,
    };

    let itemId;
    // make a post to db and create an endpoint
    const data = await fetch('/api/createItem', {
      method: 'POST',
      body: JSON.stringify(itemDetails),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => (itemId = data.id))
      .catch((error) => console.error(error));
    router.refresh();
    router.push(`/products/`);
  };

  return (
    <section>
      <div className="text-2xl mb-4 p-1 text-green-950">
        <h1>New Product</h1>
      </div>
      <div className="flex justify-center">
        <UploadImage setIsLoading={setIsLoading} setImageUrls={setImageUrls} />
      </div>
      <div className="flex justify-center items-center gap-5">
        {imageUrls.map((imgs) => (
          <div key={imgs}>
            <DisplayImages imgToPreview={imgs} />
          </div>
        ))}
      </div>
      <form className="text-center w-full" onSubmit={saveItem}>
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
            required
          >
            <option placeholder="Select Category">Select Category</option>
            {categories.map((option) => (
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
          {isLoading ? (
            <p>Uploading images...</p>
          ) : (
            <button
              type="submit"
              className="rounded-full bg-blue-500 py-[7px] px-6 text-white font-light"
            >
              Next
            </button>
          )}
        </div>
      </form>
    </section>
  );
};

export default AddItem;
