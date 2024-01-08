import { render, screen } from '@testing-library/react';
import { MemoryHistory, createMemoryHistory } from 'history';
import App from './app';
import { withHistory, withStore } from '../../utils/mock-component';
import {
  makeCurrentFilm,
  makeFakeStore,
  makeFilm,
  makePromoFilm,
  makeUser,
} from '../../utils/mocks';
import { AppRoute } from '../../enums/AppRoute';
import { AuthorizationStatus } from '../../enums/AuthorizationStatus';
import { ALL_GENRES } from '../../consts/genres';

describe('Application Routing', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render "WelcomeScreen" when user navigate to "/"', () => {
    const fakeFilm = makePromoFilm();
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        FILMS: {
          films: [],
          activeGenre: ALL_GENRES,
          genreFilms: [],
          promoFilm: fakeFilm,
          isLoadingList: true,
          favoriteFilms: [],
        },
      })
    );
    mockHistory.push(AppRoute.Main);

    render(withStoreComponent);

    expect(screen.getByText(fakeFilm.name)).toBeInTheDocument();
    expect(screen.getByText('All genres')).toBeInTheDocument();
  });

  it('should render "Sign in" when user navigate to "/login"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore()
    );
    mockHistory.push(AppRoute.Login);

    render(withStoreComponent);

    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  it('should render "My list" when user navigate to "/my-list"', () => {
    const fakeFilm = makeFilm();

    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        USER: {
          authorizationStatus: AuthorizationStatus.Auth,
          user: makeUser,
          hasError: false,
        },
        FILMS: {
          films: [],
          activeGenre: ALL_GENRES,
          genreFilms: [],
          promoFilm: null,
          isLoadingList: false,
          favoriteFilms: [fakeFilm],
        },
      })
    );
    mockHistory.push(AppRoute.MyList);

    render(withStoreComponent);

    expect(screen.getByText('My list')).toBeInTheDocument();
    expect(screen.getByText(fakeFilm.name)).toBeInTheDocument();
  });

  it('should render "Movie page" when user navigate to "/films/:id"', () => {
    const fakeFilm = makeCurrentFilm();

    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        USER: {
          authorizationStatus: AuthorizationStatus.Auth,
          user: makeUser,
          hasError: false,
        },
        FILM: {
          currentFilm: fakeFilm,
          isLoadingFilm: false,
          similarFilms: [],
          reviews: [],
        },
      })
    );
    mockHistory.push(`${AppRoute.Films}/123`);

    render(withStoreComponent);

    expect(screen.getByText(fakeFilm.name)).toBeInTheDocument();
    expect(screen.getByText(fakeFilm.genre)).toBeInTheDocument();
    expect(screen.getByText(/Overview/i)).toBeInTheDocument();
    expect(screen.getByText(/Details/i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
  });

  it('should render "Add review page" when user navigate to "/films/:id/review"', () => {
    const fakeFilm = makeCurrentFilm();

    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        USER: {
          authorizationStatus: AuthorizationStatus.Auth,
          user: makeUser,
          hasError: false,
        },
        FILM: {
          currentFilm: fakeFilm,
          isLoadingFilm: false,
          similarFilms: [],
          reviews: [],
        },
      })
    );
    mockHistory.push(`${AppRoute.Films}/123/review`);

    render(withStoreComponent);

    expect(screen.getByText('Add review')).toBeInTheDocument();
  });

  it('should render "Player page" when user navigate to "/player/:id"', () => {
    const fakeFilm = makeCurrentFilm();

    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        FILM: {
          currentFilm: fakeFilm,
          isLoadingFilm: false,
          similarFilms: [],
          reviews: [],
        },
      })
    );
    mockHistory.push(`${AppRoute.Player}/123`);

    render(withStoreComponent);

    expect(screen.getByText('Exit')).toBeInTheDocument();
    expect(screen.getByText('Toggler')).toBeInTheDocument();
  });

  it('should render "Page not found" when user navigate to non-existent route', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore()
    );
    const unknownRoute = '/unknown-route';
    mockHistory.push(unknownRoute);

    render(withStoreComponent);

    expect(
      screen.getByText('Ошибка 404. Страница не найдена.')
    ).toBeInTheDocument();
    expect(screen.getByText('Вернуться на главную')).toBeInTheDocument();
  });
});
