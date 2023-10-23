import { Link } from 'react-router-dom';
import './card.css';
import { FilmInfoProps } from '../../types/film-types';

type CardProps = {
  film: FilmInfoProps;
};

export default function Card({ film }: CardProps): React.JSX.Element {
  return (
    <article className="small-film-card catalog__films-card">
      <div className="small-film-card__image">
        <img src={film.posterImage} alt={film.alt} />
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/films/${film.id}`}>
          {film.name}
        </Link>
      </h3>
    </article>
  );
}
