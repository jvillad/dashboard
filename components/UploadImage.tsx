'use client';
import { UploadImageProps } from '@/types/Interfaces';

const UploadImage = (props: UploadImageProps) => {
  const uploadImages = async (ev: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(ev.target?.files || []);

    if (files.length !== 0) {
      const formData = new FormData();
      try {
        for (const file of files) {
          props.setIsLoading(true);
          formData.append('file', file);
          formData.append('upload_preset', 'dashboard-product-img');
          const data = await fetch(
            'https://api.cloudinary.com/v1_1/supremevillad/image/upload',
            {
              method: 'POST',
              body: formData,
            }
          ).then((r) => r.json());
          props.setImageUrls((prevUrls) => [...prevUrls, data.secure_url]);
        }
        props.setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
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
    </>
  );
};

export default UploadImage;
