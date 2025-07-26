import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/axios.config';


export const fetchUser = createAsyncThunk('user/fetchUser', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/common');
    return response.data.user;
  } catch (error) {
    console.log(error);

    return rejectWithValue(error.response?.data?.message || 'Failed to fetch user');
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    error: null,
    loading: false,
    updateError: null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.user = null;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.error = null;
      state.updateError = null;
    },
    update: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      state.updateError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});



export const { login, loginFailure, logout, update } = userSlice.actions;

export default userSlice.reducer;