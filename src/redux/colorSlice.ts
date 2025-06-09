import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

// Part1: Define Slice (including reducers and actions)
interface ColorState {
  lightMode: boolean;
}

const initialState: ColorState = {
  lightMode: localStorage.getItem('theme') === 'light', // 默認 light
};

const colorSlice = createSlice({
  name: 'color',
  initialState,
  reducers: {
    setColorMode: (state, action: PayloadAction<boolean>) => {
      state.lightMode = action.payload;
      const theme = action.payload ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', theme); // 更新 HTML 屬性
      localStorage.setItem('theme', theme); // 存入 localStorage
    },
  },
});

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  document.documentElement.setAttribute('data-theme', savedTheme);
}

// export state to global
export const selectLightMode = (state: RootState) => state.color?.lightMode;

// export actions to global
export const { setColorMode } = colorSlice.actions;

// export reducer to global
export default colorSlice.reducer;
