import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { authUser, Order, User } from '../types'

export interface userState {
  name:string,
  _id:string,
  picture:string
  email:string,
  orders: Array<Order>
  isLoading: boolean,
  address:string
  isAdmin:boolean

}

const initialState: userState = {
  _id:'',
  picture:'',
  email:'',
  orders:[],
  name:'',
  address:'',
  isLoading: false,
  isAdmin: false
}


const token = localStorage.getItem('token');
const userInfo:any = localStorage.getItem('authUser');
const userT=JSON.parse(userInfo);

export const fetchUserThunk = createAsyncThunk(
  'user/fetch',
  async () => {
    const URL = `http://localhost:4000/api/v1/users/${userT.id}`
    const response = await axios.get(URL,{
      headers:{
        Authorization:`Bearer ${token}`
      },
    })
    console.log(response)
    return {
      data: response.data,
      status: response.status,
    }
  }
)



export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
  },

  extraReducers: (builder) => {
    builder.addCase(fetchUserThunk.pending, (state) => {
      state.isLoading = true
    })

    builder.addCase(fetchUserThunk.fulfilled, (state, action) => {
      state.name = action.payload.data.name
      state._id = action.payload.data._id
      state.picture = action.payload.data.picture
      state.orders = action.payload.data.orders
      state.email = action.payload.data.email
      state.address = action.payload.data.address
      state.isLoading = false
      state.isAdmin = action.payload.data.isAdmin
    })
    
  },
  
})


export default user.reducer
