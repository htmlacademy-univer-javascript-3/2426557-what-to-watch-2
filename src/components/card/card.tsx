import { Link } from 'react-router-dom';
import './card.css';
import { FilmProps } from '../../types/film-types';
import { AppRoute } from '../../enums/AppRoute';
import VideoPlayer from '../videoplayer/videoplayer';
import { useCallback } from 'react';
import React from 'react';

type CardProps = {
  film: FilmProps;
  isActive?: boolean;
  isMuted?: boolean;
  onMouseEnter: (id: number) => void;
  onMouseLeave: () => void;
};

function Card({
  film,
  isActive,
  isMuted = true,
  onMouseEnter,
  onMouseLeave,
}: CardProps): React.JSX.Element {
  const { name, previewImage, alt, id, previewVideoLink } = film;

  const handleMouseEnter = useCallback(() => {
    onMouseEnter(id);
  }, [id, onMouseEnter]);

  return (
    <article
      className="small-film-card catalog__films-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={onMouseLeave}
      data-active={isActive}
    >
      <div className="small-film-card__image">
        {isActive ? (
          <VideoPlayer
            link={previewVideoLink}
            posterImage={previewImage}
            isMuted={isMuted}
          />
        ) : (
          <img src={previewImage} alt={alt} width="280" height="175" />
        )}
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`${AppRoute.Films}/${id}`}>
          {name}
        </Link>
      </h3>
    </article>
  );
}

const CardMemo = React.memo(Card);

export default CardMemo;
