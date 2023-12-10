import {combineReducers} from '@reduxjs/toolkit';
import {userReducer} from './user-process/user-process.slice.ts';
import {NameSpace} from '../consts/name-space.ts';
import {filmReducer} from './film-process/film-process.slice.ts';
import {reviewReducer} from './review-process/review-process.slice.ts';

export const rootReducer = combineReducers({
  [NameSpace.Film]: filmReducer.reducer,
  [NameSpace.Review]: reviewReducer.reducer,
  [NameSpace.User]: userReducer.reducer,
});
