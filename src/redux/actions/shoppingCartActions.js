import {
  SET_CART,
  SET_PAYMENT,
  SET_ADDRESS,
  ADD_TO_CART,
  INCREMENT_CART_ITEM,
  DECREMENT_CART_ITEM,
  REMOVE_FROM_CART,
  TOGGLE_CART_ITEM,
} from "../actionTypes/shoppingCartTypes";

export const setCart = (cart) => ({ type: SET_CART, payload: cart });
export const setPayment = (payment) => ({
  type: SET_PAYMENT,
  payload: payment,
});
export const setAddress = (address) => ({
  type: SET_ADDRESS,
  payload: address,
});

// Sepete ürün ekleme (aynı ürün tekrar eklenirse adet artırılır)
export const addToCart = ({
  product,
  size = null,
  color = null,
  count = 1,
}) => ({
  type: ADD_TO_CART,
  payload: { product, size, color, count },
});

export const incrementCartItem = ({
  productId,
  size = null,
  color = null,
  step = 1,
}) => ({
  type: INCREMENT_CART_ITEM,
  payload: { productId, size, color, step },
});

export const decrementCartItem = ({
  productId,
  size = null,
  color = null,
  step = 1,
}) => ({
  type: DECREMENT_CART_ITEM,
  payload: { productId, size, color, step },
});

export const removeFromCart = ({ productId, size = null, color = null }) => ({
  type: REMOVE_FROM_CART,
  payload: { productId, size, color },
});

export const toggleCartItem = ({ productId, size = null, color = null }) => ({
  type: TOGGLE_CART_ITEM,
  payload: { productId, size, color },
});
