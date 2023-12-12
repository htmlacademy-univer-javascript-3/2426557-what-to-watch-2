import {configureStore} from '@reduxjs/toolkit';
import {createApi} from '../services/api.ts';
import {redirect} from './middlewares/redirect.ts';
import { rootReducer } from './root-reducer.ts';

export const api = createApi();
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api
      }
    }).concat(redirect)
});
