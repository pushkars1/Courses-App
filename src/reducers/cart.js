import { actionTypes } from '../actions';

const initialState = {
  cartItems: [],
  addedItems: [],
  cartCount: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      return {
        ...state,
        cartItems: state.cartItems.concat(action.payload),
        addedItems: state.addedItems.concat(action.payload.id),
        cartCount: state.cartCount + 1
      };
    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.id !== action.payload),
        addedItems: state.addedItems.filter(id => id !== action.payload),
        cartCount: state.cartCount - 1
      };
    default:
      return state;
  }
};
