import {createAction} from '@reduxjs/toolkit';
import {AppRoute} from '../enums/AppRoute.ts';

export const redirectToRoute = createAction<AppRoute | string>('redirectToRoute');
