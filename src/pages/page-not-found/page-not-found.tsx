import { Link } from 'react-router-dom';
import { AppRoute } from '../../enums/app-route.ts';
import React from 'react';

export default function PageNotFound(): React.JSX.Element {
  return (
    <>
      <h1>Ошибка 404. Страница не найдена.</h1>
      <Link to={AppRoute.Main}>Вернуться на главную</Link>
    </>
  );
}
