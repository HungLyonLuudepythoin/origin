import React from 'react';
import { NavLink } from 'react-router-dom'; // Thêm NavLink
import '../styles/topbar.css';

const Topbar = () => {
  return (
    <header className="topbar">
      <nav className="nav">
        <ul className="nav-list">
          <li><NavLink to="/">Trang chủ</NavLink></li>
          <li><NavLink to="/community">Cộng đồng</NavLink></li>
          <li><NavLink to="/activity">Hoạt động</NavLink></li>
          <li><NavLink to="/donate">Quyên góp</NavLink></li>
          <li><NavLink to="/about">Về chúng tôi</NavLink></li>
        </ul>
      </nav>
    </header>
  );
};

export default Topbar;
