import { DisplayImagesProps } from '@/types/ImageProps';
import Image from 'next/image';
import React from 'react';

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

// used react memo instead of useEffect to avoid unnecessary re-renders.
export default React.memo(DisplayImages);
