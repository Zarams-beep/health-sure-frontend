import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  fullName: string;
  image: string | null; // New: Store user image
}

const initialState: AuthState = {
  fullName: "",
  image: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<{ fullName: string; image: string | null }>) => {
      state.fullName = action.payload.fullName;
      state.image = action.payload.image;
    },
  },
});

export const { setUserData } = authSlice.actions;
export default authSlice.reducer;
