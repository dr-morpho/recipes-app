import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

type CuisineType = {
  image: string;
  title: string;
  id: string;
};

interface CuisineStateType {
  cuisine: CuisineType[];
}

type PropType = {
  cuisine?: string;
};

export const fetchCuisine = createAsyncThunk<CuisineType[], PropType>(
  'cuisine/fetchCuisine',
  async ({ cuisine }) => {
    const { data } = await axios(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=d9a8562166434e38ba6d72eba22fea04&cuisine=${cuisine}`,
    );
    return data.results;
  },
);

const cuisineState: CuisineStateType = {
  cuisine: [],
};

const cuisineSlice = createSlice({
  name: 'popular',
  initialState: cuisineState,
  reducers: {
    setItems(state, action) {
      state.cuisine = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCuisine.pending, (state) => {
      state.cuisine = [];
    });
    builder.addCase(fetchCuisine.fulfilled, (state, action) => {
      state.cuisine = action.payload;
    });
    builder.addCase(fetchCuisine.rejected, (state) => {
      state.cuisine = [];
    });
  },
});

export const cuisineSelect = (state: RootState) => state.cuisineSlice.cuisine;
export const { setItems } = cuisineSlice.actions;
export default cuisineSlice.reducer;
