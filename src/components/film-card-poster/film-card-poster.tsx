import React from 'react';
import './film-card-poster.css';

type FilmCardPosterProps = {
  size?: string;
  src?: string;
  alt?: string;
};

function FilmCardPoster({
  size = '',
  src = '',
  alt = '',
}: FilmCardPosterProps): React.JSX.Element {
  const computedClass = `film-card__poster ${
    size ? `film-card__poster--${size}` : ''
  }`;

  return (
    <div className={computedClass} data-testid="poster">
      <img src={src} alt={alt} />
    </div>
  );
}

const FilmCardPosterMemo = React.memo(FilmCardPoster);

export default FilmCardPosterMemo;
