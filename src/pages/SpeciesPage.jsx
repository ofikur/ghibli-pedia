import { useState, useEffect } from 'react';
import axios from 'axios';
import SpeciesCard from '../components/SpeciesCard';

const SpeciesPage = () => {
  const [species, setSpecies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpecies = async () => {
      try {
        const response = await axios.get('https://ghibliapi.vercel.app/species');
        setSpecies(response.data);
      } catch (error) {
        console.error("Gagal memanggil arwah para spesies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSpecies();
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-bold text-center mb-8">Species of Ghibli</h2>
      {loading ? (
        <p className="text-center">Loading species...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {species.map(spec => (
            <SpeciesCard key={spec.id} species={spec} />
          ))}
        </div>
      )}
    </div>
  );
};
export default SpeciesPage;