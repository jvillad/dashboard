import { Category } from '@/types/CategoryInterface';
import React from 'react';
import Layout from '../Layout';

const CategoryDetails = ({ category }: Category) => {
  return <Layout>{category.name}</Layout>;
};

export default CategoryDetails;
