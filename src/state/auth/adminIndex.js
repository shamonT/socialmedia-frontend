import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

// Get user from localStorage
const admin = JSON.parse(localStorage.getItem('admin'))

// Register user
export const register = createAsyncThunk(
  'auth/register',
  async (admin, thunkAPI) => {
    try {
      return await authService.register(admin)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message,'hehehe')
    }
  }
)

// Login user
export const login = createAsyncThunk('auth/login', async (admin, thunkAPI) => {
  try {
    console.log('hllo this is login function at store')
    return await authService.login(admin)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message,'hiiiii')
  }
})

export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout()
  
})

export const adminAuthSlice = createSlice({
  name: 'adminAuth',
  initialState:{
    admin: admin ? admin : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
  },
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        console.log(action.payload,'fullfilled')
        state.isLoading = false
        state.isSuccess = true
        state.admin = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        console.log('rehchredtecrwwew');
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.admin = null
      })
      .addCase(login.pending, (state) => {
        console.log('pendinggggg');
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log('login success');
        state.isLoading = false
        state.isSuccess = true
        state.admin = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        console.log('login rejected');
        
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.admin = null
        localStorage.clear()
      })
      .addCase(logout.fulfilled, (state) => {
        console.log('logout success');
        state.admin = null
      })
  },
})

export const { reset } = adminAuthSlice.actions
export default adminAuthSlice.reducer
