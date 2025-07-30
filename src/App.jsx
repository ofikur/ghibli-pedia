import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout'; 
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import NotFoundPage from './pages/NotFoundPage';

import PeoplePage from './pages/PeoplePage';
import LocationsPage from './pages/LocationsPage';
import SpeciesPage from './pages/SpeciesPage';
import VehiclesPage from './pages/VehiclesPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="film/:id" element={<DetailPage />} />
          
          <Route path="people" element={<PeoplePage />} />
          <Route path="locations" element={<LocationsPage />} />
          <Route path="species" element={<SpeciesPage />} />
          <Route path="vehicles" element={<VehiclesPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;