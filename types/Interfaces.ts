export type ItemProps = {
  id: string;
  name: string;
  longDescription: string;
  shortDescription: string;
  price: number;
  stock: number;
  special: boolean;
  categoryId: number;
  category: string[];
};

export interface Product {
  product: {
    id: number;
    name: string;
    longDescription: string;
    shortDescription: string;
    price: number;
    stock: string;
    special: boolean;
    categoryId: string;
    imageUrls: string[];
  };
}

export interface EditItemProps {
  product: {
    id: string;
    name: string;
    longDescription: string;
    shortDescription: string;
    price: number;
    stock: number;
    special: boolean;
    categoryId: number;
  };
}

export interface ProductId {
  params: {
    productId: number;
  };
}

export interface Category {
  category: {
    name: string;
    description: string;
  };
}
export interface ICategory {
  categories: {
    name: string;
    description: string;
  }[];
}

export interface ItemDetails {
  product: {
    id: number;
    name: string;
    longDescription: string;
    shortDescription: string;
    price: number;
    stock: string;
    special: boolean;
    categoryId: string;
    categories: {
      name: string;
      description: string;
    }[];
    imageUrls: string[];
  };
}

export interface DisplayImagesProps {
  imgToPreview: string;
}

export interface UploadImageProps {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setImageUrls: React.Dispatch<React.SetStateAction<string[]>>;
}
