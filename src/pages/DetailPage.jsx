import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Heart } from 'lucide-react';
import { FavoritesContext } from '../contexts/FavoritesContext';
import { FilmContext } from '../contexts/FilmContext';

const DetailPage = () => {
  const { id } = useParams();
  const { toggleFavorite, isFavorite } = useContext(FavoritesContext);
  
  const [film, setFilm] = useState(null);
  const [loading, setLoading] = useState(true);

  const [characters, setCharacters] = useState([]);
  const [species, setSpecies] = useState([]);
  const [locations, setLocations] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchFilmDetails = async () => {
      setFilm(null);
      setCharacters([]);
      setSpecies([]);
      setLocations([]);
      setVehicles([]);
      
      try {
        setLoading(true);
        const filmResponse = await axios.get(`https://ghibliapi.vercel.app/films/${id}`);
        setFilm(filmResponse.data);

        const fetchDataFromUrls = (urls) => {
          const validUrls = urls.filter(url => url.includes('https://ghibliapi.vercel.app'));
          if (validUrls.length === 0) return Promise.resolve([]);
          return Promise.all(validUrls.map(url => axios.get(url).then(res => res.data)));
        }

        const [peopleData, speciesData, locationsData, vehiclesData] = await Promise.all([
          fetchDataFromUrls(filmResponse.data.people),
          fetchDataFromUrls(filmResponse.data.species),
          fetchDataFromUrls(filmResponse.data.locations),
          fetchDataFromUrls(filmResponse.data.vehicles),
        ]);
        
        setCharacters(peopleData.flat());
        setSpecies(speciesData.flat());
        setLocations(locationsData.flat());
        setVehicles(vehiclesData.flat());

      } catch (error) {
        console.error("Failed to find details for this entity:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFilmDetails();
  }, [id]);

  if (loading) return <div className="text-center p-10">Loading details...</div>; // <-- Diubah
  if (!film) return <div className="text-center p-10">Details not found.</div>; // <-- Diubah

  return (
    <div className="container mx-auto max-w-5xl bg-white/60 dark:bg-ghibli-text/80 backdrop-blur-sm rounded-lg shadow-xl overflow-hidden my-8">
      <img src={film.movie_banner} alt="Banner" className="w-full h-48 md:h-72 object-cover" />
      <div className="p-8">
        <Link to="/" className="inline-flex items-center gap-2 text-ghibli-header hover:underline mb-4 font-semibold">
          <ArrowLeft size={18} /> Back to List {/* <-- Diubah */}
        </Link>
        <div className="flex justify-between items-start gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold">{film.title}</h1>
            <p className="text-lg text-ghibli-text/70 dark:text-ghibli-bg/70 mt-1">{film.original_title_romanised}</p>
          </div>
          <button 
            onClick={() => toggleFavorite(film.id)}
            className="p-3 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700/50 transition-colors flex-shrink-0"
            aria-label="Toggle Favorite"
          >
            <Heart size={28} className="text-red-500" fill={isFavorite(film.id) ? 'currentColor' : 'none'} />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4 my-6 p-4 bg-gray-500/10 rounded-lg">
          <div>
            <p className="text-sm opacity-70">Director</p> {/* <-- Diubah */}
            <p className="font-semibold">{film.director}</p>
          </div>
          <div>
            <p className="text-sm opacity-70">Producer</p> {/* <-- Diubah */}
            <p className="font-semibold">{film.producer}</p>
          </div>
          <div>
            <p className="text-sm opacity-70">Release Year</p> {/* <-- Diubah */}
            <p className="font-semibold">{film.release_date}</p>
          </div>
          <div>
            <p className="text-sm opacity-70">Running Time</p> {/* <-- Diubah */}
            <p className="font-semibold">{film.running_time} min</p>
          </div>
          <div>
            <p className="text-sm opacity-70">RT Score</p> {/* <-- Diubah */}
            <p className="font-semibold">{film.rt_score} / 100</p>
          </div>
        </div>
        
        <p className="text-base md:text-lg leading-relaxed">{film.description}</p>
        
        {(characters.length > 0 || species.length > 0 || locations.length > 0 || vehicles.length > 0) &&
          <div className="mt-8 border-t dark:border-gray-500/50 pt-6">
            <h3 className="text-2xl font-serif font-bold mb-4">Related Information</h3> {/* <-- Diubah */}
            <div className="space-y-4">
              {characters.length > 0 && (
                <div>
                  <h4 className="font-semibold text-lg">Characters</h4> {/* <-- Diubah */}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {characters.map(char => <span key={char.id} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">{char.name}</span>)}
                  </div>
                </div>
              )}
              {species.length > 0 && (
                <div>
                  <h4 className="font-semibold text-lg">Species</h4> {/* <-- Diubah */}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {species.map(spec => <span key={spec.id} className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">{spec.name}</span>)}
                  </div>
                </div>
              )}
              {locations.length > 0 && (
                <div>
                  <h4 className="font-semibold text-lg">Locations</h4> {/* <-- Diubah */}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {locations.map(loc => <span key={loc.id} className="bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full text-sm font-medium">{loc.name}</span>)}
                  </div>
                </div>
              )}
              {vehicles.length > 0 && (
                <div>
                  <h4 className="font-semibold text-lg">Vehicles</h4> {/* <-- Diubah */}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {vehicles.map(veh => <span key={veh.id} className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm font-medium">{veh.name}</span>)}
                  </div>
                </div>
              )}
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default DetailPage;