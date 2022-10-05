import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { Order } from '../types'

export interface productsState {
  items: Order[]
  isLoading: boolean
}

const initialState: productsState = {
  items: [],
  isLoading: false,
}

export const fetchOrdersThunk = createAsyncThunk(
  'orders/fetch',
  async () => {
    const URL = `http://localhost:4000/api/v1/orders`
    const response = await axios.get(URL)
    return {
      data: response.data,
      status: response.status,
    }
  }
)

export const orders = createSlice({
  name: 'orders',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchOrdersThunk.pending, (state) => {
      state.isLoading = true
    })

    builder.addCase(fetchOrdersThunk.fulfilled, (state, action) => {
      state.items = action.payload.data
      state.isLoading = false
    })
  },
})


export default orders.reducer
