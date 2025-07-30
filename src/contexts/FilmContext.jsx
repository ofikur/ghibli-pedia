import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const FilmContext = createContext();

export const FilmProvider = ({ children }) => {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllFilms = async () => {
      try {
        const response = await axios.get('https://ghibliapi.vercel.app/films?limit=250');
        setFilms(response.data);
      } catch (error) {
        console.error("Gagal membuat kamus film:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllFilms();
  }, []);

  const getFilmDataByUrls = (filmUrls) => {
    if (loading || !filmUrls || filmUrls.length === 0) {
      return [];
    }
    return filmUrls
      .map(url => {
        if (!url.includes('https://ghibliapi.vercel.app')) return null;
        const filmId = url.split('/').pop();
        const foundFilm = films.find(film => film.id === filmId);
        return foundFilm ? { id: foundFilm.id, title: foundFilm.title } : null;
      })
      .filter(Boolean);
  };

  return (
    <FilmContext.Provider value={{ getFilmDataByUrls, isLoading: loading }}>
      {children}
    </FilmContext.Provider>
  );
};