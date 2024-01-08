import {State} from '../../types/state.ts';
import {AuthorizationStatus} from '../../enums/AuthorizationStatus.ts';
import {NameSpace} from '../../consts/name-space.ts';
import { UserData } from '../../types/auth.ts';

export const getAuthStatus = (state: Pick<State, NameSpace.User>): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getUser = (state: Pick<State, NameSpace.User>): UserData | null => state[NameSpace.User].user;
export const getAuthHasError = (state: Pick<State, NameSpace.User>): boolean => state[NameSpace.User].hasError;
