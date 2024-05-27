import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalPrice: 0,
    delivery: 0,
    addressD: undefined,
    orderStatus: false,

    itemsShop: [],
    totalPriceShop: 0,
    payment: "Cash",

    // shopStatus: true,
  },
  reducers: {
    addItem(state, action) {
      if (state.orderStatus !== true) {
        let updatedTotalPrice =
          state.totalPrice + action.payload.amount * action.payload.price;
        const existingItemIndex = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        const existingItem = state.items[existingItemIndex];
        let updatedItems;
        // Item already exist => update quantity and price.
        if (existingItem) {
          const updatedItem = {
            ...existingItem,
            amount: existingItem.amount + action.payload.amount,
          };
          updatedItems = [...state.items];
          updatedItems[existingItemIndex] = updatedItem;
        } else {
          updatedItems = state.items.concat(action.payload);
        }
        return {
          ...state,
          items: updatedItems,
          totalPrice: updatedTotalPrice,
        };
      }
      return state;
    },
    addAll(state, action) {
      const newitems = action.payload.food;
      newitems !== undefined && (state.items = [...newitems]);
      state.totalPrice = action?.payload?.totalPrice;
      state.orderStatus = action.payload.orderStatus;
    },
    addOneItem(state, action) {
      if (state.orderStatus !== true) {
        const updatedTotalPrice = state.totalPrice + action.payload.price;

        const existingItemIndex = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        const existingItem = state.items[existingItemIndex];
        let updatedItems;
        updatedItems = [...state.items];
        // If the item already exist => Update quantity and price.
        if (existingItem) {
          const updatedItem = {
            ...existingItem,
            amount: existingItem.amount + 1,
          };
          updatedItems[existingItemIndex] = updatedItem;
        } else {
          updatedItems = state.items.concat(action.payload);
        }
        console.log("Food Added, Name: ", action.payload.name);
        return {
          ...state,
          items: updatedItems,
          totalPrice: updatedTotalPrice,
        };
      }
      return state;
    },

    removeItem(state, action) {
      if (state.orderStatus !== true) {
        const existingItemIndex = state.items.findIndex(
          (item) => item.id === action.payload
        );
        const existingItem = state.items[existingItemIndex];
        let updatedTotalPrice = state.totalPrice - existingItem.price;

        let updatedItems;
        if (existingItem.amount === 1) {
          updatedItems = state.items.filter(
            (item) => item.id !== action.payload
          );
        } else {
          const updatedItem = {
            ...existingItem,
            amount: existingItem.amount - 1,
          };
          updatedItems = [...state.items];
          updatedItems[existingItemIndex] = updatedItem;
        }
        return {
          ...state,
          items: updatedItems,
          totalPrice: updatedTotalPrice,
        };
      }
      return state;
    },
    emptyCart(state) {
      state.items = [];
      state.totalPrice = 0;
      state.orderStatus = false;
    },

    orderPlaced(state) {
      state.orderStatus = true;
    },
    setDelivery(state, action) {
      state.delivery = action.payload;
    },
    setAddressD(state, action) {
      if (!state.addressD) {
        state.addressD = action.payload;
      }
    },
    // setShop(state) {
    //   state.shopStatus = !state.shopStatus;
    // },
    addItemShop(state, action) {
      if (state.orderStatus !== true) {
        let updatedTotalPrice =
          state.totalPriceShop + action.payload.amount * action.payload.price;
        const existingItemIndex = state.itemsShop.findIndex(
          (item) => item.id === action.payload.id
        );
        const existingItem = state.itemsShop[existingItemIndex];
        let updatedItems;
        // Item already exist => update quantity and price.
        if (existingItem) {
          const updatedItem = {
            ...existingItem,
            amount: existingItem.amount + action.payload.amount,
          };
          updatedItems = [...state.itemsShop];
          updatedItems[existingItemIndex] = updatedItem;
        } else {
          updatedItems = state.itemsShop.concat(action.payload);
        }
        return {
          ...state,
          itemsShop: updatedItems,
          totalPriceShop: updatedTotalPrice,
        };
      }
      return state;
    },
    emptyCartShop(state) {
      state.itemsShop = [];
      state.totalPriceShop = 0;
    },
    setPayment(state, action) {
      state.payment = action.payload;
    },
  },
});

export default cartSlice;
