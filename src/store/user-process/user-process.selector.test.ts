import { NameSpace } from '../../consts/name-space';
import { AuthorizationStatus } from '../../enums/AuthorizationStatus';
// import { makeUser } from '../../utils/mocks';
import { getAuthStatus, getUser } from './user-process.selector';

describe('User process selectors', () => {
  const state = {
    [NameSpace.User]: {
      // user: makeUser,
      user: null,
      authorizationStatus: AuthorizationStatus.Unknown,
    }
  };

  it('should return user from state', () => {
    const { user } = state[NameSpace.User];
    const result = getUser(state);
    expect(result).toEqual(user);
  });
  it('should return authorization status from state', () => {
    const { authorizationStatus } = state[NameSpace.User];
    const result = getAuthStatus(state);
    expect(result).toEqual(authorizationStatus);
  });
});
