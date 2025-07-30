import { useState, useEffect } from 'react';
import axios from 'axios';
import PersonCard from '../components/PersonCard';

const PeoplePage = () => {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const response = await axios.get('https://ghibliapi.vercel.app/people');
        setPeople(response.data);
      } catch (error) {
        console.error("Gagal memanggil arwah para karakter:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPeople();
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-bold text-center mb-8">People of Ghibli</h2>
      {loading ? (
        <p className="text-center">Loading characters...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {people.map(person => (
            <PersonCard key={person.id} person={person} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PeoplePage;