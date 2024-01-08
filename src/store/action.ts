import {createAction} from '@reduxjs/toolkit';
import {AppRoute} from '../enums/app-route.ts';

export const redirectToRoute = createAction<AppRoute | string>('redirectToRoute');
