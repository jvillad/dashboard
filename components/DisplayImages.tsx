import { DisplayImagesProps } from '@/types/Interfaces';
import Image from 'next/image';

const DisplayImages = (imgs: DisplayImagesProps) => {
  return (
    <div>
      <Image
        src={imgs.imgToPreview}
        alt="prev image"
        width={225}
        height={330}
        style={{
          width: 225,
          height: 330,
        }}
      />
    </div>
  );
};

export default DisplayImages;
