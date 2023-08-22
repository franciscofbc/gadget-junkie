import React from 'react';
import { useFilterContext } from '../context/filter_context';
import GridView from './GridView';
import ListView from './ListView';

const ProductList = () => {
  const { filteredProducts, gridView } = useFilterContext();

  if (filteredProducts.length < 1) {
    return <h5>sorry, no products matched your search</h5>;
  }

  if (gridView === false) {
    return <ListView filteredProducts={filteredProducts} />;
  }
  return <GridView filteredProducts={filteredProducts} />;
};

export default ProductList;
