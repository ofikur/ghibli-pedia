import { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from '../components/MovieCard';

const HomePage = () => {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await axios.get('https://ghibliapi.vercel.app/films?limit=250');
        setFilms(response.data);
      } catch (error) {
        console.error("Failed to fetch Ghibli films:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFilms();
  }, []);

  const filteredFilms = films.filter(film =>
    film.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8 md:px-8">
      <div className="text-center mb-10">
        <input
          type="text"
          placeholder="Search for your favorite film..."
          className="w-full max-w-md p-3 border border-gray-300 dark:border-gray-600 rounded-full bg-ghibli-bg dark:bg-ghibli-text/80 text-ghibli-text dark:text-ghibli-bg focus:outline-none focus:ring-2 focus:ring-ghibli-header transition-colors"
          onChange={e => setSearchTerm(e.target.value)}
          aria-label="Search for a film"
        />
      </div>

      {loading ? (
        <p className="text-center text-ghibli-text/80 dark:text-ghibli-bg/80">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {filteredFilms.length > 0 ? (
            filteredFilms.map(film => (
              <MovieCard key={film.id} film={film} />
            ))
          ) : (
            <p className="col-span-full text-center text-ghibli-text/80 dark:text-ghibli-bg/80">
              The film you're looking for could not be found.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;