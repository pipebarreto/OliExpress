import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { Product } from '../types'

export interface productsState {
  items: Product[]
  isLoading: boolean
}

const initialState: productsState = {
  items: [],
  isLoading: false,
}

const token = localStorage.getItem('token');


export const fetchProductsThunk = createAsyncThunk(
  'products/fetch',
  async () => {
    const URL = `http://localhost:4000/api/v1/products`
    const response = await axios.get(URL)
    return {
      data: response.data,
      status: response.status,
    }
  }
)

export const products = createSlice({
  name: 'products',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchProductsThunk.pending, (state) => {
      state.isLoading = true
    })

    builder.addCase(fetchProductsThunk.fulfilled, (state, action) => {
      state.items = action.payload.data
      state.isLoading = false
    })
  },
})


export default products.reducer
