import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { authUser, Order, User } from '../types'

export interface userState {
  user: User,
  _id:'',
  
  isLoading: boolean
}

const initialState: userState = {
  user: {email:'', _id:'', picture:'', name:''},
  _id:'',
  isLoading: false,
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
      state.user = action.payload.data
      state.isLoading = false
    })
    
  },
  
})


export default user.reducer
