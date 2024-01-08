import { AuthorizationStatus } from '../../enums/AuthorizationStatus';
import { makeUser } from '../../utils/mocks';
import { checkAuthStatus, loginUser, logoutUser } from '../api-actions';
import { userReducer } from './user-process.slice';

describe('User process slice', () => {
  const initialState = {
    authorizationStatus: AuthorizationStatus.NoAuth,
    user: null,
    hasError: false,
  };
  it('should return initial state', () => {
    const emptyAction = {type: ''};
    const expectedState = initialState;

    const result = userReducer.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return initial state', () => {
    const emptyAction = {type: ''};
    const expectedState = initialState;

    const result = userReducer.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  describe('set loginUser test', () => {
    const user = makeUser;
    const expectedState = {
      user,
      authorizationStatus: AuthorizationStatus.Auth,
      hasError: false,
    };

    it('should login and set user in state', () => {
      expect(userReducer.reducer(initialState, { type: loginUser.fulfilled.type, payload: user }))
        .toEqual(expectedState);
    });
  });

  describe('logoutUser test', () => {
    const user = makeUser;
    const state = {
      user,
      authorizationStatus: AuthorizationStatus.Auth,
      hasError: false,
    };

    it('should logout, change status and remove user in state', () => {
      expect(userReducer.reducer(state, logoutUser.fulfilled))
        .toEqual(initialState);
    });
  });
  describe('checkASuthStatus test', () => {
    const user = makeUser;
    const expectedState = {
      user,
      authorizationStatus: AuthorizationStatus.Auth,
      hasError: false,
    };

    it('should set user and auth status in state', () => {
      expect(userReducer.reducer(initialState, { type: checkAuthStatus.fulfilled.type, payload: user }))
        .toEqual(expectedState);
    });
    it('should set user and auth status in state', () => {
      expect(userReducer.reducer(initialState, { type: checkAuthStatus.rejected.type, payload: user }))
        .toEqual(initialState);
    });
  });
});
