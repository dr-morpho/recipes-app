import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

export type PopularType = {
  image: string;
  sourceName: string;
  title: string;
  id: string;
};

export interface PopularStateType {
  popular: PopularType[];
}

export const fetchPopular = createAsyncThunk<PopularType[]>('popular/fetchPopular', async () => {
  const { data } = await axios(
    'https://api.spoonacular.com/recipes/random?apiKey=d9a8562166434e38ba6d72eba22fea04&number=8',
  );
  return data.recipes;
});

const popularState: PopularStateType = {
  popular: [],
};

const popularSlice = createSlice({
  name: 'popular',
  initialState: popularState,
  reducers: {
    setItems(state, action) {
      state.popular = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPopular.pending, (state) => {
      state.popular = [];
    });
    builder.addCase(fetchPopular.fulfilled, (state, action) => {
      state.popular = action.payload;
    });
    builder.addCase(fetchPopular.rejected, (state) => {
      state.popular = [];
    });
  },
});

export const popularSelect = (state: RootState) => state.popularSlice.popular;
export const { setItems } = popularSlice.actions;
export default popularSlice.reducer;
