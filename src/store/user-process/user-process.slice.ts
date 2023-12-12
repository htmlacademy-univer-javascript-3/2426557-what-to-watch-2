import {AuthorizationStatus} from '../../enums/AuthorizationStatus.ts';
import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../consts/name-space.ts';
import {checkAuthStatus, loginUser, logoutUser} from '../api-actions.ts';
import {removeToken, setToken } from '../../services/token.ts';
import {UserProcessState} from '../../types/state.ts';

const initialState: UserProcessState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
};

export const userReducer = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthStatus.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        removeToken();
        state.user = null;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        setToken(action.payload.token);
        state.user = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
      });
  }
});
