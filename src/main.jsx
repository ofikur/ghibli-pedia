import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from './contexts/ThemeContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { FilmProvider } from './contexts/FilmContext'; // <-- Impor kamus kita

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <FavoritesProvider>
        <FilmProvider> {/* <-- Bungkus App dengan kamus film */}
          <App />
        </FilmProvider>
      </FavoritesProvider>
    </ThemeProvider>
  </React.StrictMode>,
)