import {createAction} from '@reduxjs/toolkit';

export const setActiveGenre = createAction<{genre: string}>('setActiveGenre');

export const getFilmsByGenre = createAction('getFilmsByGenre');
