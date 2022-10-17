import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { authUser, Order } from '../types'

export interface productsState {
  items: Order[],
  _id:'',
  isLoading: boolean
}

const initialState: productsState = {
  items: [],
  _id:'',
  isLoading: false,
}

const token = localStorage.getItem('token');
const userInfo:any = localStorage.getItem('authUser');
const user=JSON.parse(userInfo);

export const fetchOrdersThunk = createAsyncThunk(
  'orders/fetch',
  async () => {
    const URL = `http://localhost:4000/api/v1/users/${user.id}`
    const response = await axios.get(URL,{
      headers:{
        Authorization:`Bearer ${token}`
      },
    })
    return {
      data: response.data.orders,
      status: response.status,
    }
  }
)



export const orders = createSlice({
  name: 'orders',
  initialState,
  reducers: {

    /*addProduct: (state, action) => {
      const { product, quantity } = action.payload.productToAdd
      const order = { product, quantity }

      state.items = [...state.items, order]
    },*/

    /*removeCountry: (state, action) => {
      const filteredCountries = state.items.filter(
        (item) => item.name.common !== action.payload.name.common
      )

      state.items = filteredCountries
    },*/
  },

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
