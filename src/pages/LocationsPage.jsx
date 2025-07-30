import { useState, useEffect } from 'react';
import axios from 'axios';
import LocationCard from '../components/LocationCard';

const LocationsPage = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get('https://ghibliapi.vercel.app/locations');
        setLocations(response.data);
      } catch (error) {
        console.error("Gagal memanggil arwah para lokasi:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLocations();
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-bold text-center mb-8">Locations of Ghibli</h2>
      {loading ? (
        <p className="text-center">Loading locations...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {locations.map(location => (
            <LocationCard key={location.id} location={location} />
          ))}
        </div>
      )}
    </div>
  );
};
export default LocationsPage;