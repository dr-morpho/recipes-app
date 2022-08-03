import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

export type VegetarianType = {
  image: string;
  sourceName: string;
  title: string;
  id: string;
};

export interface VegitarianStateType {
  vegitarian: VegetarianType[];
}

export const fetchVegetarian = createAsyncThunk<VegetarianType[]>(
  'vegetarian/fetchPopular',
  async () => {
    const { data } = await axios(
      'https://api.spoonacular.com/recipes/random?apiKey=d9a8562166434e38ba6d72eba22fea04&number=8&tags=vegetarian',
    );
    return data.recipes;
  },
);

const vegitarianState: VegitarianStateType = {
  vegitarian: [],
};

const vegetarianSlice = createSlice({
  name: 'vegetarian',
  initialState: vegitarianState,
  reducers: {
    setItems(state, action) {
      state.vegitarian = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchVegetarian.pending, (state) => {
      state.vegitarian = [];
    });
    builder.addCase(fetchVegetarian.fulfilled, (state, action) => {
      state.vegitarian = action.payload;
    });
    builder.addCase(fetchVegetarian.rejected, (state) => {
      state.vegitarian = [];
    });
  },
});

export const vegetarianSelect = (state: RootState) => state.vegetarianSlice.vegitarian;
export const { setItems } = vegetarianSlice.actions;
export default vegetarianSlice.reducer;
