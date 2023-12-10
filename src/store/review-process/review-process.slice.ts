import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../consts/name-space.ts';
import {fetchFilmReviews} from '../api-actions.ts';
import {ReviewsProcessState} from '../../types/state.ts';

const initialState: ReviewsProcessState = {
  reviews: [],
};

export const reviewReducer = createSlice({
  name: NameSpace.Review,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilmReviews.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(fetchFilmReviews.rejected, (state) => {
        state.reviews = [];
      });
  }
});
