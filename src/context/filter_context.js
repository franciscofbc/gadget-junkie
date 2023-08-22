import React, { useEffect, useContext, useReducer } from 'react';
import reducer from '../reducers/filter_reducer';
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions';
import { useProductsContext } from './products_context';

const initialState = {
  filteredProducts: [],
  allProducts: [],
  gridView: true,
  sort: 'price-lowest',
  filters: {
    text: '',
    category: 'all',
    company: 'all',
    color: 'all',
    minPrice: 0,
    maxPrice: 0,
    price: 0,
    shipping: false,
  },
};

const FilterContext = React.createContext();

export const FilterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { products } = useProductsContext();

  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: { products } });
  }, [products]);

  useEffect(() => {
    dispatch({ type: FILTER_PRODUCTS });
    dispatch({ type: SORT_PRODUCTS });
  }, [products, state.sort, state.filters]);

  const setListView = () => {
    dispatch({ type: SET_LISTVIEW });
  };
  const setGridView = () => {
    dispatch({ type: SET_GRIDVIEW });
  };
  const updateSort = (event) => {
    //demonstration
    // const name = event.target.name;
    const value = event.target.value;
    dispatch({ type: UPDATE_SORT, payload: { value } });
  };

  const updateFilters = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    if (name === 'category') {
      value = event.target.textContent;
    }
    if (name === 'color') {
      value = event.target.dataset.color;
      // console.log(event.target.getAttribute('data-color'));
    }
    if (name === 'price') {
      value = Number(value);
    }
    if (name === 'shipping') {
      value = event.target.checked;
    }
    dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
  };
  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };

  return (
    <FilterContext.Provider
      value={{
        ...state,
        setListView,
        setGridView,
        updateSort,
        updateFilters,
        clearFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext);
};
