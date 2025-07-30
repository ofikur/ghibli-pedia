import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FilmContext } from '../contexts/FilmContext';

const SpeciesCard = ({ species }) => {
  const { getFilmDataByUrls } = useContext(FilmContext);
  const filmsData = getFilmDataByUrls(species.films);

  return (
    <div className="bg-white/60 dark:bg-ghibli-text/80 backdrop-blur-sm rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-5 flex flex-col h-full">
      <h3 className="text-xl font-serif font-bold text-yellow-600 dark:text-yellow-400 mb-3">{species.name}</h3>
      <div className="text-sm text-left space-y-1 text-ghibli-text dark:text-ghibli-bg">
        <p><span className="font-semibold opacity-70">Classification:</span> {species.classification || 'N/A'}</p>
        <p><span className="font-semibold opacity-70">Eye Colors:</span> {species.eye_colors || 'N/A'}</p>
        <p><span className="font-semibold opacity-70">Hair Colors:</span> {species.hair_colors || 'N/A'}</p>
      </div>
      <div className="border-t dark:border-gray-500/50 mt-3 pt-3 text-xs flex-grow flex flex-col">
        <p className="font-bold mb-1 opacity-70">Appears In:</p>
        {filmsData.length > 0 ? (
          <ul className="list-disc list-inside space-y-1">
            {filmsData.map(film => (
              <li key={film.id}>
                <Link to={`/film/${film.id}`} className="hover:underline hover:text-ghibli-header">
                  {film.title}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="opacity-70">N/A</p>
        )}
      </div>
    </div>
  );
};

export default SpeciesCard;