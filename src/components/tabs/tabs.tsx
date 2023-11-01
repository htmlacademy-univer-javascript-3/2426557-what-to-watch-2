import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FilmInfoProps } from '../../types/film-types.ts';
import OverviewComponent from '../overview/overview.tsx';
import FilmDetailsComponent from '../film-details/film-details.tsx';
import FilmReviewsComponent from '../film-review/film-reviews.tsx';
import { reviewsInfo } from '../../mocks/reviews.ts';

const TABS = ['Overview', 'Details', 'Reviews'];

type TabsProps = {
  film: FilmInfoProps;
};
export default function Tabs({ film }: TabsProps): React.JSX.Element {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  const handleSetActiveTab = useCallback(
    (tab: string) => () => {
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
        return <OverviewComponent film={film} />;
      case TABS[1]:
        return <FilmDetailsComponent film={film} />;
      case TABS[2]:
        return <FilmReviewsComponent reviews={reviewsInfo} />;
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
