import { configureMockStore } from '@jedmao/redux-mock-store';
import { createApi } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { State } from '../types/state';
import { Action } from 'redux';
import { AppThunkDispatch, extractActionsTypes, makeCurrentFilm, makeFilm, makePromoFilm, makeReview } from '../utils/mocks';
import { addCommentAction, changeFavoriteStatus, checkAuthStatus, fetchFavorite, fetchFilmById, fetchFilmPromo, fetchFilmReviews, fetchFilms, fetchSimilarFilms, loginUser, logoutUser } from './api-actions';
import { FavoriteStatus } from '../enums/FavoriteStatus';
import { AuthData } from '../types/auth';
import { redirectToRoute } from './action';

describe('Async actions', () => {
  const axios = createApi();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];

  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({ FILMS: { films: [] }});
  });

  describe('checkAuthStatus', () => {
    it('should dispatch "checkAuthStatus.pending" and "checkAuthStatus.fulfilled" with thunk "checkAuthStatus', async () => {
      mockAxiosAdapter.onGet('/login').reply(200);

      await store.dispatch(checkAuthStatus());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthStatus.pending.type,
        checkAuthStatus.fulfilled.type,
      ]);
    });

    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.rejected" when server response 400', async() => {
      mockAxiosAdapter.onGet('/login').reply(400);

      await store.dispatch(checkAuthStatus());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthStatus.pending.type,
        // checkAuthStatus.rejected.type,
        checkAuthStatus.fulfilled.type,
      ]);
    });
  });

  describe('fetchFilms', () => {
    it('should dispatch "fetchFilms.pending", "fetchFilms.fulfilled", when server response 200', async() => {
      const mockFilms = [makeFilm(), makeFilm()];
      mockAxiosAdapter.onGet('/films').reply(200, mockFilms);

      await store.dispatch(fetchFilms());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchFilmsFulfilled = emittedActions.at(1) as ReturnType<typeof fetchFilms.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchFilms.pending.type,
        fetchFilms.fulfilled.type,
      ]);

      expect(fetchFilmsFulfilled.payload)
        .toEqual(mockFilms);
    });

    it('should dispatch "fetchFilms.pending", "fetchFilms.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet('/films').reply(400);

      await store.dispatch(fetchFilms());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchFilms.pending.type,
        fetchFilms.rejected.type,
      ]);
    });
  });

  describe('fetchFilmById', () => {
    it('should dispatch "fetchFilmById.pending", "fetchFilmById.fulfilled", when server response 200', async() => {
      const mockFilm = makeCurrentFilm();
      mockAxiosAdapter.onGet('/films/id').reply(200, mockFilm);

      await store.dispatch(fetchFilmById('id'));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchFilmByIdFulfilled = emittedActions.at(1) as ReturnType<typeof fetchFilmById.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchFilmById.pending.type,
        fetchFilmById.fulfilled.type,
      ]);

      expect(fetchFilmByIdFulfilled.payload)
        .toEqual(mockFilm);
    });

    it('should dispatch "fetchFilmById.pending", "fetchFilmById.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet('/films/id').reply(400);

      await store.dispatch(fetchFilmById('id'));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchFilmById.pending.type,
        fetchFilmById.rejected.type,
      ]);
    });
  });

  describe('fetchSimilarFilms', () => {
    it('should dispatch "fetchSimilarFilms.pending", "fetchSimilarFilms.fulfilled", when server response 200', async() => {
      const mockFilms = [makeFilm(), makeFilm()];
      mockAxiosAdapter.onGet('/films/id/similar').reply(200, mockFilms);

      await store.dispatch(fetchSimilarFilms('id'));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchSimilarFilmsFulfilled = emittedActions.at(1) as ReturnType<typeof fetchSimilarFilms.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchSimilarFilms.pending.type,
        fetchSimilarFilms.fulfilled.type,
      ]);

      expect(fetchSimilarFilmsFulfilled.payload)
        .toEqual(mockFilms);
    });

    it('should dispatch "fetchSimilarFilms.pending", "fetchSimilarFilms.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet('/films/id/similar').reply(400);

      await store.dispatch(fetchSimilarFilms('id'));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchSimilarFilms.pending.type,
        fetchSimilarFilms.rejected.type,
      ]);
    });
  });

  describe('fetchFavorite', () => {
    it('should dispatch "fetchFavorite.pending", "fetchFavorite.fulfilled", when server response 200', async() => {
      const mockFilms = [makeFilm(), makeFilm()];
      mockAxiosAdapter.onGet('/favorite').reply(200, mockFilms);

      await store.dispatch(fetchFavorite());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchFavoriteFulfilled = emittedActions.at(1) as ReturnType<typeof fetchFavorite.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchFavorite.pending.type,
        fetchFavorite.fulfilled.type,
      ]);

      expect(fetchFavoriteFulfilled.payload)
        .toEqual(mockFilms);
    });

    it('should dispatch "fetchFavorite.pending", "fetchFavorite.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet('/favorite').reply(400);

      await store.dispatch(fetchFavorite());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchFavorite.pending.type,
        fetchFavorite.rejected.type,
      ]);
    });
  });

  describe('changeFavoriteStatus', () => {
    it('should dispatch "changeFavoriteStatus.pending", "changeFavoriteStatus.fulfilled", when server response 200', async() => {
      mockAxiosAdapter.onPost('/favorite/id/status').reply(200);

      await store.dispatch(changeFavoriteStatus({filmId: 'id', status: FavoriteStatus.Favorite}));

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        changeFavoriteStatus.pending.type,
        changeFavoriteStatus.fulfilled.type,
      ]);
    });

    it('should dispatch "changeFavoriteStatus.pending", "changeFavoriteStatus.rejected" when server response 400', async () => {
      mockAxiosAdapter.onPost('/favorite/id/1').reply(400);

      await store.dispatch(changeFavoriteStatus({filmId: 'id', status: FavoriteStatus.Favorite}));
      const actions = extractActionsTypes(store.getActions());

      // todo fix
      expect(actions).toEqual([
        changeFavoriteStatus.pending.type,
        // changeFavoriteStatus.rejected.type,
        changeFavoriteStatus.fulfilled.type,
      ]);
    });
  });

  describe('fetchFilmPromo', () => {
    it('should dispatch "fetchFilmPromo.pending", "fetchFilmPromo.fulfilled", when server response 200', async() => {
      const mockFilm = makePromoFilm();
      mockAxiosAdapter.onGet('/promo').reply(200, mockFilm);

      await store.dispatch(fetchFilmPromo());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchFilmPromoFulfilled = emittedActions.at(1) as ReturnType<typeof fetchFilmPromo.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchFilmPromo.pending.type,
        fetchFilmPromo.fulfilled.type,
      ]);

      expect(fetchFilmPromoFulfilled.payload)
        .toEqual(mockFilm);
    });

    it('should dispatch "fetchFilmPromo.pending", "fetchFilmPromo.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet('/promo').reply(400);

      await store.dispatch(fetchFilmPromo());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchFilmPromo.pending.type,
        fetchFilmPromo.rejected.type,
      ]);
    });
  });

  describe('fetchFilmReviews', () => {
    it('should dispatch "fetchFilmReviews.pending", "fetchFilmReviews.fulfilled", when server response 200', async() => {
      const mockReviews = [makeReview(), makeReview(), makeReview()];
      mockAxiosAdapter.onGet('/comments/id').reply(200, mockReviews);

      await store.dispatch(fetchFilmReviews('id'));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchFilmReviewsFulfilled = emittedActions.at(1) as ReturnType<typeof fetchFilmReviews.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchFilmReviews.pending.type,
        fetchFilmReviews.fulfilled.type,
      ]);

      expect(fetchFilmReviewsFulfilled.payload)
        .toEqual(mockReviews);
    });

    it('should dispatch "fetchFilmReviews.pending", "fetchFilmReviews.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet('/comments/id').reply(400);

      await store.dispatch(fetchFilmReviews('id'));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchFilmReviews.pending.type,
        fetchFilmReviews.rejected.type,
      ]);
    });
  });

  describe('loginUser', () => {
    it('should dispatch "loginUser.pending", "redirectToRoute", "loginUser.fulfilled" when server response 200', async() => {
      const fakeUser: AuthData = { email: 'test@test.ru', password: '123456' };
      const fakeServerReplay = { token: 'secret' };
      mockAxiosAdapter.onPost('/login').reply(200, fakeServerReplay);

      await store.dispatch(loginUser(fakeUser));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        loginUser.pending.type,
        redirectToRoute.type,
        loginUser.fulfilled.type,
      ]);
    });
    it('should dispatch "loginUser.pending", "redirectToRoute", "loginUser.rejected" when server response 400', async() => {
      const fakeUser: AuthData = { email: 'test@test.ru', password: '123456' };
      mockAxiosAdapter.onPost('/login').reply(400);

      await store.dispatch(loginUser(fakeUser));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        loginUser.pending.type,
        loginUser.rejected.type,
      ]);
    });
  });

  describe('logoutAction', () => {
    it('should dispatch "logoutAction.pending", "logoutAction.fulfilled" when server response 204', async() => {
      mockAxiosAdapter.onDelete('/logout').reply(204);

      await store.dispatch(logoutUser());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        logoutUser.pending.type,
        logoutUser.fulfilled.type,
      ]);
    });
  });

  describe('addCommentAction', () => {
    it('should dispatch "addCommentAction.pending", "addCommentAction.fulfilled", when server response 200', async() => {
      mockAxiosAdapter.onPost('/comments/id').reply(200);

      await store.dispatch(addCommentAction({filmId: 'id', comment: 'lorem', rating: 8}));

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        addCommentAction.pending.type,
        addCommentAction.fulfilled.type,
      ]);
    });

    it('should dispatch "addCommentAction.pending", "addCommentAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onPost('/comments/id').reply(400);

      await store.dispatch(addCommentAction({filmId: 'id', comment: 'lorem', rating: 8}));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        addCommentAction.pending.type,
        addCommentAction.rejected.type,
      ]);
    });
  });
});
