import { Routes, Route } from 'react-router-dom';
import Donate from './pages/donate.jsx';
import Community from './pages/community.jsx';
import './styles/App.css';

function App() {
  return (
    <main className="Main">
        <Routes>
          <Route path="/donate" element={<Donate />} />
          <Route path="/community" element={<Community />} />
        </Routes>
    </main>
  );
}

export default App;
