import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import productsReducer from './productSlice';
import ordersReducer from './orderSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    orders: ordersReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
