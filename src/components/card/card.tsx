import { Link } from 'react-router-dom';
import './card.css';

export default function Card(): React.JSX.Element {
  return (
    <article className="small-film-card catalog__films-card">
      <div className="small-film-card__image">
        <img
          src="img/fantastic-beasts-the-crimes-of-grindelwald.jpg"
          alt="Fantastic Beasts: The Crimes of Grindelwald"
        />
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to="/films:id">
          Fantastic Beasts: The Crimes of Grindelwald
        </Link>
      </h3>
    </article>
  );
}
