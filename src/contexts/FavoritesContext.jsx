import { createContext, useState, useEffect } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (filmId) => {
    setFavorites(prevFavorites => {
      if (prevFavorites.includes(filmId)) {
        return prevFavorites.filter(id => id !== filmId);
      } else {
        return [...prevFavorites, filmId];
      }
    });
  };

  const isFavorite = (filmId) => favorites.includes(filmId);

  return (
    <FavoritesContext.Provider value={{ toggleFavorite, isFavorite, favorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};
