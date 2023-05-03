export type ItemProps = {
  id: string;
  name: string;
  description: string;
  price: string;
  stock: string;
  category: string;
  special: boolean;
};

export interface Product {
  product: {
    id: string;
    name: string;
    description: string | null;
    price: string;
    stock: string;
    category: string;
    special: boolean;
  };
}

export interface EditItemProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: string;
    stock: string;
    category: string;
    special: boolean;
  };
}

export interface ProductId {
  params: {
    productId: string;
  };
}
