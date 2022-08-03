import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

export type SearchType = {
  image: string;
  sourceName: string;
  title: string;
  id: string;
};

interface SearchStateType {
  search: SearchType[];
}

type SearchProp = {
  search?: string;
};

export const fetchSearch = createAsyncThunk<SearchType[], SearchProp>(
  'search/fetchSearch',
  async ({ search }) => {
    const { data } = await axios(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=d9a8562166434e38ba6d72eba22fea04&query=${search}`,
    );
    return data.results;
  },
);

const searchState: SearchStateType = {
  search: [],
};

const searchSlice = createSlice({
  name: 'search',
  initialState: searchState,
  reducers: {
    setItems(state, action) {
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSearch.pending, (state) => {
      state.search = [];
    });
    builder.addCase(fetchSearch.fulfilled, (state, action) => {
      state.search = action.payload;
    });
    builder.addCase(fetchSearch.rejected, (state) => {
      state.search = [];
    });
  },
});

export const searchSelect = (state: RootState) => state.searchSlice.search;
export const { setItems } = searchSlice.actions;
export default searchSlice.reducer;
