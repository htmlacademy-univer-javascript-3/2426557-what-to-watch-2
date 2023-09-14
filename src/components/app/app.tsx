import MainPage from '../../pages/main/main';

type AppProps = {
  filmName: string;
  genre: string;
  releaseDate: string;
};

export default function App({
  filmName,
  genre,
  releaseDate,
}: AppProps): JSX.Element {
  return (
    <MainPage filmName={filmName} genre={genre} releaseDate={releaseDate} />
  );
}
