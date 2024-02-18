import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    results: {},
    searchQueryResults: null,
  },
  reducers: {
    cacheResutls: (state, action) => {
      state.results = Object.assign(state.results, action.payload);
    },
    addSearchQueryResults: (state, action) => {
      state.searchQueryResults = action.payload;
    },
    clearSearchQueryResults: (state, action) => {
      state.searchQueryResults = null;
    },
  },
});

export default searchSlice.reducer;
export const { cacheResutls, addSearchQueryResults, clearSearchQueryResults } =
  searchSlice.actions;
