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

const initialState = {
  cart: [],
  payment: null,
  address: null,
};

const shoppingCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const {
        product,
        size = null,
        color = null,
        count = 1,
      } = action.payload || {};
      if (!product || !product.id) return state;

      // Aynı ürün (ve varyasyon) sepette varsa adet artır
      const existingIndex = state.cart.findIndex(
        (item) =>
          item.product?.id === product.id &&
          (item.size ?? null) === (size ?? null) &&
          (item.color ?? null) === (color ?? null),
      );

      if (existingIndex !== -1) {
        const updatedCart = state.cart.map((item, index) =>
          index === existingIndex
            ? { ...item, count: item.count + count }
            : item,
        );
        return { ...state, cart: updatedCart };
      }

      const newItem = {
        count: count,
        checked: true,
        size: size,
        color: color,
        product: product,
      };
      return { ...state, cart: [...state.cart, newItem] };
    }
    case INCREMENT_CART_ITEM: {
      const {
        productId,
        size = null,
        color = null,
        step = 1,
      } = action.payload || {};
      const updated = state.cart.map((item) => {
        const isMatch =
          item.product?.id === productId &&
          (item.size ?? null) === (size ?? null) &&
          (item.color ?? null) === (color ?? null);
        return isMatch ? { ...item, count: item.count + step } : item;
      });
      return { ...state, cart: updated };
    }
    case DECREMENT_CART_ITEM: {
      const {
        productId,
        size = null,
        color = null,
        step = 1,
      } = action.payload || {};
      const updated = state.cart
        .map((item) => {
          const isMatch =
            item.product?.id === productId &&
            (item.size ?? null) === (size ?? null) &&
            (item.color ?? null) === (color ?? null);
          if (!isMatch) return item;
          const nextCount = item.count - step;
          return nextCount > 0 ? { ...item, count: nextCount } : null;
        })
        .filter(Boolean);
      return { ...state, cart: updated };
    }
    case REMOVE_FROM_CART: {
      const { productId, size = null, color = null } = action.payload || {};
      const updated = state.cart.filter(
        (item) =>
          !(
            item.product?.id === productId &&
            (item.size ?? null) === (size ?? null) &&
            (item.color ?? null) === (color ?? null)
          ),
      );
      return { ...state, cart: updated };
    }
    case TOGGLE_CART_ITEM: {
      const { productId, size = null, color = null } = action.payload || {};
      const updated = state.cart.map((item) => {
        const isMatch =
          item.product?.id === productId &&
          (item.size ?? null) === (size ?? null) &&
          (item.color ?? null) === (color ?? null);
        return isMatch ? { ...item, checked: !item.checked } : item;
      });
      return { ...state, cart: updated };
    }
    case SET_CART:
      return { ...state, cart: action.payload };
    case SET_PAYMENT:
      return { ...state, payment: action.payload };
    case SET_ADDRESS:
      return { ...state, address: action.payload };
    default:
      return state;
  }
};

export default shoppingCartReducer;
