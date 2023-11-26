import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state.ts';
import {AxiosInstance} from 'axios';
import {FilmInfoProps, FilmPromo, FilmProps} from '../types/film-types.ts';
import {
  getFilmsByGenre, loadFavorites,
  loadFilmReviews,
  loadFilms, redirectToRoute,
  setActiveGenre,
  setAuthStatus,
  setCurrentFilm,
  setIsLoadingFilm,
  setIsLoadingList,
  setPromoFilm, setSimilarFilms
} from './action.ts';
import {ALL_GENRES} from '../consts/genres.ts';
import {ReviewProps} from '../types/review-types.ts';
import {AuthorizationStatus} from '../enums/AuthorizationStatus.ts';
import {AuthData, UserData} from '../types/auth.ts';
import {AppRoute} from '../enums/AppRoute.ts';
import {removeToken, setToken} from '../services/token.ts';


export const fetchFilms = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  '/films',
  async (_arg, {dispatch, extra: api}) => {
    try {
      dispatch(setIsLoadingList(true));

      const { data } = await api.get<FilmProps[]>('/films');

      dispatch(loadFilms(data));
      dispatch(setActiveGenre({genre: ALL_GENRES}));
      dispatch(getFilmsByGenre());
    } catch(e) {
      console.log(e);
    } finally {
      dispatch(setIsLoadingList(false));
    }
  },
);

export const fetchFilmById = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
  '/films/id',
  async (id: string, { dispatch, extra: api}) => {
    try {
      dispatch(setIsLoadingFilm(true));

      const { data } = await api.get<FilmInfoProps>(`/films/${id}`);

      dispatch(setCurrentFilm(data));
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setIsLoadingFilm(false));
    }
  },
);

export const fetchSimilarFilms = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    '/films/id/similar',
    async (id: string, { dispatch, extra: api}) => {
      try {
        const { data } = await api.get<FilmProps[]>(`/films/${id}/similar`);

        dispatch(setSimilarFilms(data));
      } catch (e) {
        console.log(e);
      }
    },
  );

export const fetchFavorite = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    '/favorite',
    async (_arg, { dispatch, extra: api}) => {
      try {
        const {data} = await api.get<FilmProps[]>('/favorite');
        dispatch(loadFavorites(data));
      } catch (e) {
        console.error(e);
      }
    }
  );

export const fetchFilmPromo = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    '/promo',
    async (_arg, { dispatch, extra: api}) => {
      const { data } = await api.get<FilmPromo>('/promo');
      dispatch(setPromoFilm(data));
    },
  );

export const fetchFilmReviews = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
  '/comments/id',
  async (id, {dispatch, extra: api}) => {
    try {
      dispatch(setIsLoadingList(true));

      const { data } = await api.get<ReviewProps[]>(`/comments/${id}`);

      dispatch(loadFilmReviews(data));
    } catch(e) {
      console.log(e);
    } finally {
      dispatch(setIsLoadingList(false));
    }
  },
);

export const checkAuthStatus = createAsyncThunk<
  void,
  undefined,
  {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
  }
  >(
    '/login',
    async (_arg, { dispatch, extra: api}) => {
      try {
        await api.get('/login');
        dispatch(setAuthStatus(AuthorizationStatus.Auth));
      } catch (e) {
        dispatch(setAuthStatus(AuthorizationStatus.NoAuth));
      }
    },
  );

export const loginUser = createAsyncThunk<
  void,
  AuthData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  '/login',
  async ({email, password}, { dispatch, extra: api}) => {
    try {
      const {data} = await api.post<UserData>(
        '/login',
        {
          email,
          password,
        }
      );
      setToken(data.token);
      dispatch(setAuthStatus(AuthorizationStatus.Auth));
      dispatch(redirectToRoute(AppRoute.Main));
    } catch (e) {
      dispatch(setAuthStatus(AuthorizationStatus.NoAuth));
    }
  },
);

export const logoutUser = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  '/logout',
  async (_arg, { dispatch, extra: api}) => {
    try {
      await api.delete('/logout');
      removeToken();
      dispatch(setAuthStatus(AuthorizationStatus.NoAuth));
    } catch (e) {
      dispatch(setAuthStatus(AuthorizationStatus.Unknown));
    }
  },
);
