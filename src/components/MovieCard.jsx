import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { FavoritesContext } from '../contexts/FavoritesContext';
import { Heart } from 'lucide-react';

const MovieCard = ({ film }) => {
  const { toggleFavorite, isFavorite } = useContext(FavoritesContext);

  const handleFavoriteClick = (e) => {
    e.preventDefault(); 
    e.stopPropagation();
    toggleFavorite(film.id);
  };

  return (
    <div className="relative group">
      <Link to={`/film/${film.id}`} className="block">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform transform group-hover:-translate-y-2 duration-300">
          <img src={film.image} alt={film.title} className="w-full h-96 object-cover" />
          <div className="p-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">
              {film.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{film.release_date}</p>
          </div>
        </div>
      </Link>

      <button onClick={handleFavoriteClick} className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-black/75 transition-colors duration-300" aria-label="Toggle Favorite">
        <Heart fill={isFavorite(film.id) ? '#ff0000' : 'none'} stroke="white" />
      </button>
    </div>
  );
};

export default MovieCard;