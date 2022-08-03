import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface InputStateType {
  theme: boolean;
  text: string;
  mood: 'light' | 'dark';
}

const inputState: InputStateType = {
  mood: 'light',
  theme: false,
  text: '',
};

const inputSlice = createSlice({
  name: 'input',
  initialState: inputState,
  reducers: {
    setMood(state, action: PayloadAction<'light' | 'dark'>) {
      state.mood = action.payload;
    },
    setTheme(state, action: PayloadAction<boolean>) {
      state.theme = action.payload;
    },
    setText(state, action: PayloadAction<string>) {
      state.text = action.payload;
    },
  },
});

export const themeSelector = (state: RootState) => state.inputSlice.theme;
export const textSelector = (state: RootState) => state.inputSlice.text;
export const moodSelector = (state: RootState) => state.inputSlice.mood;
export const { setTheme, setText, setMood } = inputSlice.actions;
export default inputSlice.reducer;
