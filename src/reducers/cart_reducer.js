import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions';

const cart_reducer = (state, action) => {
  //add to cart
  if (action.type === ADD_TO_CART) {
    const { id, color, amount, product } = action.payload;
    const tempItem = state.cart.find((cartItem) => cartItem.id === id + color);

    if (tempItem) {
      const tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === id + color) {
          let newAmount = cartItem.amount + amount;
          if (newAmount > cartItem.max) {
            newAmount = cartItem.max;
          }
          return { ...cartItem, amount: newAmount };
        } else {
          return cartItem;
        }
      });

      return { ...state, cart: tempCart };
    } else {
      const newItem = {
        id: id + color,
        name: product.name,
        color,
        amount,
        image: product.images[0].url,
        price: product.price,
        max: product.stock,
      };

      return { ...state, cart: [...state.cart, newItem] };
    }
  }

  //clear cart
  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] };
  }

  // remove cart
  if (action.type === REMOVE_CART_ITEM) {
    const tempCart = state.cart.filter(
      (cartItem) => cartItem.id !== action.payload.id
    );

    return { ...state, cart: tempCart };
  }

  //toggle cart item amount
  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = action.payload;

    const tempCart = state.cart.map((cartItem) => {
      if (cartItem.id === id) {
        if (value === 'increase') {
          let tempAmount = cartItem.amount + 1;
          if (tempAmount <= cartItem.max) {
            return { ...cartItem, amount: tempAmount };
          } else {
            return { ...cartItem };
          }
        }
        if (value === 'decrease') {
          let tempAmount = cartItem.amount - 1;
          if (tempAmount >= 1) {
            return { ...cartItem, amount: tempAmount };
          } else {
            return { ...cartItem };
          }
        }
      }
      return { ...cartItem };
    });

    return { ...state, cart: tempCart };
  }

  //count cart totals
  if (action.type === COUNT_CART_TOTALS) {
    const { totalItems, totalAmount } = state.cart.reduce(
      (accumulator, cartItem) => {
        //cartItem: currentValue
        const { amount, price } = cartItem;
        accumulator.totalItems += amount;
        accumulator.totalAmount += price * amount;
        return accumulator;
      },
      { totalItems: 0, totalAmount: 0 } //initialValue
    );

    return { ...state, totalItems, totalAmount };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
