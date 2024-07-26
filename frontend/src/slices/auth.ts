import { createSlice } from "@reduxjs/toolkit";
import { signup, login } from '../asyncActions/auth';

//Retrieve user and token from local storage if available
const storedUser = localStorage.getItem("user") || null;
const parsedUser = storedUser ? JSON.parse(storedUser) : null;
const storedToken = localStorage.getItem("token") || null;
const parsedToken = storedToken ? JSON.parse(storedToken) : null;

const initialState = {
  user: parsedUser,
  token: parsedToken,
  loading: false,
  message: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
    setSignupData: (state, action) => {
      state.user = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(login.pending, (state) => {
      state.loading = true;
    })
    .addCase(login.fulfilled, (state, action) => {
        localStorage.setItem('user',JSON.stringify(action.payload.user)),
        localStorage.setItem('token',JSON.stringify(action.payload.token))
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
    })
    .addCase(login.rejected, (state, action) => {
      state.loading = false;
      console.error('Error data:', action.error.response?.data);
      state.error = action.error.message;
    })
      .addCase(signup.pending, (state) => {
        state.loading = true;
      })
      .addCase(signup.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

// Export actions and reducer
export const { logout, setSignupData, setUser} = authSlice.actions;
export default authSlice.reducer;
