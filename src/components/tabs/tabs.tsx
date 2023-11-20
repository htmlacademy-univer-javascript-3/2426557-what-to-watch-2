import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FilmInfoProps } from '../../types/film-types.ts';
import Overview from '../overview/overview.tsx';
import FilmDetails from '../film-details/film-details.tsx';
import FilmReviews from '../film-review/film-reviews.tsx';
// import { reviewsInfo } from '../../mocks/reviews.ts';

const TABS = ['Overview', 'Details', 'Reviews'];

type TTabs = (typeof TABS)[number];

type TabsProps = {
  film: FilmInfoProps;
};
export default function Tabs({ film }: TabsProps): React.JSX.Element {
  const [activeTab, setActiveTab] = useState<TTabs>(TABS[0]);

  const handleSetActiveTab = useCallback(
    (tab: TTabs) => () => {
      setActiveTab(tab);
    },
    []
  );

  useEffect(() => {
    setActiveTab(TABS[0]);
  }, [film.id]);

  const component = useMemo(() => {
    switch (activeTab) {
      case TABS[0]:
        return <Overview film={film} />;
      case TABS[1]:
        return <FilmDetails film={film} />;
      case TABS[2]:
        return <FilmReviews reviews={[]} />;
      default:
        return null;
    }
  }, [activeTab, film]);

  return (
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          {TABS.map((tab) => (
            <li
              key={tab}
              className={`film-nav__item ${
                tab === activeTab ? 'film-nav__item--active' : ''
              }`}
            >
              <div className="film-nav__link" onClick={handleSetActiveTab(tab)}>
                {tab}
              </div>
            </li>
          ))}
        </ul>
      </nav>
      {component}
    </div>
  );
}
