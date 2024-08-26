import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BasketItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    img: string; // This line should be included
  }

  interface BasketState {
  items: BasketItem[];
}
  
const initialState: BasketState = {
    items: [],
  };

  const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
      addToBasket: (state, action: PayloadAction<BasketItem>) => {
        const itemExists = state.items.find((item) => item.id === action.payload.id);
        if (itemExists) {
          itemExists.quantity++;
        } else {
          state.items.push({ ...action.payload, quantity: 1 });
        }
      },
      incrementQuantity: (state, action: PayloadAction<string>) => {
        const item = state.items.find((item) => item.id === action.payload);
        if (item) {
          item.quantity++;
        }
      },
      decrementQuantity: (state, action: PayloadAction<string>) => {
        const item = state.items.find((item) => item.id === action.payload);
        if (item && item.quantity > 1) {
          item.quantity--;
        }
      },
      removeFromBasket: (state, action: PayloadAction<string>) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      },
    },
  });
  

export const { addToBasket, removeFromBasket, incrementQuantity, decrementQuantity } = basketSlice.actions;

export default basketSlice.reducer;

