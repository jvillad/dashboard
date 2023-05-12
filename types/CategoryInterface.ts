export interface Category {
  category: {
    name: string;
    description: string;
    item?: number[];
  };
}

export interface CategoryId {
  params: {
    categoryName: string;
  };
}

export interface ICategory {
  categories: {
    name: string;
    description: string;
  }[];
}
