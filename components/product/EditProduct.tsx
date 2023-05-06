'use client';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';
import { ItemDetails } from '@/types/ItemProps';

const EditItem = ({ product }: ItemDetails) => {
  const router = useRouter();

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

  const [imageSrc, setImageSrc] = useState<string>('');

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

  // triggers when the file input changes
  const uploadImages = async (ev: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(ev.target?.files || []);
    console.log(files);
    if (files.length !== 0) {
      const formData = new FormData();
      let links = [];

      try {
        for (const file of files) {
          formData.append('file', file);
          formData.append('upload_preset', 'dashboard-product-img');
          const data = await fetch(
            'https://api.cloudinary.com/v1_1/supremevillad/image/upload',
            {
              method: 'POST',
              body: formData,
            }
          ).then((r) => r.json());
          if (data) {
            links.push(data);
            setImageSrc(data.secure_url);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <section>
      <form className="w-full" onSubmit={updateItem}>
        <div className="text-2xl mb-4 p-1 text-green-950">
          <h1>Update Product</h1>
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
