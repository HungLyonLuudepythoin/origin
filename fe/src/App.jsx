import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Donate from './pages/donate.jsx';
import Activity from './pages/activity.jsx';
import Term from './pages/term.jsx';
import Policy from './pages/policy.jsx';
import Privacy from './pages/privacy.jsx';
import AboutUs from './pages/aboutUs.jsx';
import ThankYou from './pages/thankYou.jsx';
import Home from './pages/Home.jsx';
import Community from './pages/community.jsx';

import Topbar from './components/topbar.jsx';
import Footer from './components/footer.jsx';
import './styles/App.css';
import Login from './pages/login.jsx';

function App() {
  const location = useLocation();
  const noFooter = ['/paymentConfirm', '/paymentInfo'];
  useEffect(() => {window.scrollTo(0, 0);}, [location])
  const showFooter = !noFooter.includes(location.pathname);

  return (
    <main className="Main">
      <Topbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/donate" element={<Donate />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/community" element={<Community />}></Route>
        <Route path="/terms" element={<Term />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/thank" element={<ThankYou />} />
        <Route path="/login" element={<Login />} />
      
      </Routes>
      {showFooter && <Footer />}
    </main>
  );
}

export default App;
