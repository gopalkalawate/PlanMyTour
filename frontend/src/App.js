import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import HomePage from './pages/HomePage';
import CityPage from './pages/CityPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:cityName" element={<CityPage />} />
      </Routes>
    </Router>
  );
};

export default App;
