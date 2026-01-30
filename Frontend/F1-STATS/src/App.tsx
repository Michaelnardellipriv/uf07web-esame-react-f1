import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ReactQueryProvider from './components/ReactQueryProvider';
import HomePage from './app/Home/page';
import CircuitsPage from './app/circuits/page';
import DriversPage from './app/drivers/page';
import RacesPage from './app/races/page';
import SeasonsPage from './app/seasons/page';
import TeamsPage from './app/teams/page';
import NotFound from './app/404/not-found';
import './App.css';

function App() {
  return (
    <ReactQueryProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/circuits" element={<CircuitsPage />} />
          <Route path="/drivers" element={<DriversPage />} />
          <Route path="/races" element={<RacesPage />} />
          <Route path="/seasons" element={<SeasonsPage />} />
          <Route path="/teams" element={<TeamsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ReactQueryProvider>
  );
}

export default App;