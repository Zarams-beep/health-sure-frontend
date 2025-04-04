import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from '../store';
import { SidebarSection } from "@/types/sidebar";

interface ActiveState {
    active: SidebarSection
    parentNav: string
}
const initialState: ActiveState = {
    active: 'landing-page',
    parentNav: '',
}

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setActivePage: (state, action: PayloadAction<ActiveState>) => {
      state.active = action.payload.active; 
      state.parentNav = action.payload.parentNav; 
    },
  },
});

export const { setActivePage } = sidebarSlice.actions;

export const activePage = (state: RootState) => state.sidebar
export default sidebarSlice.reducer;
