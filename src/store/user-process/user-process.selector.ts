import {State} from '../../types/state.ts';
import {AuthorizationStatus} from '../../enums/AuthorizationStatus.ts';
import {NameSpace} from '../../consts/name-space.ts';


export const getAuthStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
