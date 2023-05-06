'use client';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';
import { Category } from '@prisma/client';
import { ICategory } from '@/types/ItemProps';
import { stringify } from 'querystring';

const AddItem = ({ categories }: ICategory) => {
  // TODO: Image URL
  // TODO: PROMO DURATION
  // TODO: Confirmation that item is added (Priority)
  const router = useRouter();
  const [name, setName] = useState<string>('');
  const [shortDescription, setShortDescription] = useState<string>('');
  const [longDescription, setLongDescription] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [stock, setStock] = useState<string>('');
  const [categoryId, setCategoryId] = useState<string>('');
  const [special, setSpecial] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<string>('');

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

    router.push(`/products/uploadImage/${itemId}`);
  };

  // triggers when the file input changes
  const uploadImages = async (ev: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(ev.target?.files || []);
    console.log(files);
    if (files.length !== 0) {
      const formData = new FormData();
      for (const file of files) {
        formData.append('file', file);
      }

      formData.append('upload_preset', 'dashboard-product-img');

      const data = await fetch(
        'https://api.cloudinary.com/v1_1/supremevillad/image/upload',
        {
          method: 'POST',
          body: formData,
        }
      ).then((r) => r.json());
      if (data) {
        setImageSrc(data.secure_url);
      }
    }
  };

  return (
    <section>
      <form className="text-center w-full" onSubmit={saveItem}>
        <div className="text-2xl mb-4 p-1 text-green-950">
          <h1>New Product</h1>
        </div>
        <label className="p-1">Photos</label>
        <div className="mb-4">
          <label className="w-40 h-36 bg-gray-200 rounded-xl flex justify-center items-center gap-2 hover:cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-upload"
              viewBox="0 0 16 16"
            >
              <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
              <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" />
            </svg>
            Upload Image
            <input
              type="file"
              name="file"
              multiple={true}
              className="hidden"
              onChange={uploadImages}
            />
          </label>
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
          <button
            type="submit"
            className="rounded-full bg-blue-500 py-[7px] px-6 text-white font-light"
          >
            Next
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddItem;
