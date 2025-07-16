import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Calendar, Settings } from 'lucide-react';
import { useTheme } from '../App';
import './Navigation.css';

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkTheme } = useTheme();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="navigation">
      <button
        className={`nav-item ${isActive('/') ? 'active' : ''}`}
        onClick={() => navigate('/')}
      >
        <Calendar size={24} />
        <span>Timetable</span>
      </button>
      <button
        className={`nav-item ${isActive('/settings') ? 'active' : ''}`}
        onClick={() => navigate('/settings')}
      >
        <Settings size={24} />
        <span>Settings</span>
      </button>
    </nav>
  );
};

export default Navigation; 