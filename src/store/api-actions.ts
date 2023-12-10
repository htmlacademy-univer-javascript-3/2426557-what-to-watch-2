import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state.ts';
import {AxiosInstance} from 'axios';
import {FilmInfoProps, FilmPromo, FilmProps} from '../types/film-types.ts';
// import {redirectToRoute,
//   // setActiveGenre,
// } from './action.ts';
// import {ALL_GENRES} from '../consts/genres.ts';
import {AddUserReview, ReviewProps, UserReview} from '../types/review-types.ts';
// import {AuthorizationStatus} from '../enums/AuthorizationStatus.ts';
import {AuthData, UserData} from '../types/auth.ts';
// import {AppRoute} from '../enums/AppRoute.ts';
// import {removeToken, setToken} from '../services/token.ts';

export const fetchFilms = createAsyncThunk<FilmProps[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  '/films',
  async (_arg, {extra: api}) => {
    // try {

    const { data } = await api.get<FilmProps[]>('/films');

    return data;

    // dispatch(loadFilms(data));
    // dispatch(setActiveGenre({genre: ALL_GENRES}));
    // dispatch(getFilmsByGenre());
    // }
    // catch(e) {
    //   console.log(e);
    // }
  }
);

export const fetchFilmById = createAsyncThunk<
FilmInfoProps,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
  '/films/id',
  async (id: string, {extra: api}) => {
    // try {
    // dispatch(setIsLoadingFilm(true));

    const { data } = await api.get<FilmInfoProps>(`/films/${id}`);
    return data;

    // dispatch(setCurrentFilm(data));
    // }
    // catch (e) {
    //   console.log(e);
    // } finally {
    //   dispatch(setIsLoadingFilm(false));
    // }
  },
);

export const fetchSimilarFilms = createAsyncThunk<
  FilmProps[],
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    '/films/id/similar',
    async (id: string, { extra: api}) => {
      // try {
      const { data } = await api.get<FilmProps[]>(`/films/${id}/similar`);

      return data;

      // dispatch(setSimilarFilms(data));
      // } catch (e) {
      //   console.log(e);
      // }
    },
  );

export const fetchFavorite = createAsyncThunk<
  FilmProps[],
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    '/favorite',
    async (_arg, { extra: api}) => {
      // try {
      const {data} = await api.get<FilmProps[]>('/favorite');

      return data;
      //   dispatch(loadFavorites(data));
      // } catch (e) {
      //   console.error(e);
      // }
    }
  );

export const fetchFilmPromo = createAsyncThunk<
  FilmPromo,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    '/promo',
    async (_arg, { extra: api}) => {
      const { data } = await api.get<FilmPromo>('/promo');
      // dispatch(setPromoFilm(data));

      return data;
    },
  );

export const fetchFilmReviews = createAsyncThunk<
  ReviewProps[],
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
  '/comments/id',
  async (id, { extra: api}) => {
    // try {
    //   dispatch(setIsLoadingList(true));

    const { data } = await api.get<ReviewProps[]>(`/comments/${id}`);

    return data;

    //   dispatch(loadFilmReviews(data));
    // } catch(e) {
    //   console.log(e);
    // } finally {
    //   dispatch(setIsLoadingList(false));
    // }
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
    async (_arg, { extra: api}) => {
      // try {
      await api.get('/login');
      //   dispatch(setAuthStatus(AuthorizationStatus.Auth));
      // } catch (e) {
      //   dispatch(setAuthStatus(AuthorizationStatus.NoAuth));
      // }
    },
  );

export const loginUser = createAsyncThunk<
  UserData,
  AuthData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  '/login',
  async ({email, password}, { extra: api}) => {
    // try {
    const {data} = await api.post<UserData>(
      '/login',
      {
        email,
        password,
      }
    );

    return data;
    //   setToken(data.token);
    //   dispatch(setAuthStatus(AuthorizationStatus.Auth));
    //   dispatch(redirectToRoute(AppRoute.Main));
    // } catch (e) {
    //   dispatch(setAuthStatus(AuthorizationStatus.NoAuth));
    // }
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
  async (_arg, { extra: api}) => {
    // try {
    await api.delete('/logout');
    // removeToken();
    // dispatch(setAuthStatus(AuthorizationStatus.NoAuth));
    // } catch (e) {
    //   dispatch(setAuthStatus(AuthorizationStatus.Unknown));
    // }
  },
);

export const addCommentAction = createAsyncThunk<void, AddUserReview, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'addCommentAction',
  async ({filmId, comment, rating}, {extra: api}) => {
    // try {
    await api.post<UserReview>(`comments/${filmId}`, {comment, rating});
    //   dispatch(redirectToRoute(`${AppRoute.Films}/${filmId}`));
    // } catch (e) {
    //   console.error(e);
    // }
  },
);
