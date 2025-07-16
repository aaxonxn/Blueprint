import { useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Timetable from './components/Timetable';
import Settings from './components/Settings';
import Navigation from './components/Navigation';
import { TimetableData } from './types/timetable';
import './App.css';

// Theme context
interface ThemeContextType {
  isDarkTheme: boolean;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  isDarkTheme: false,
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

function App() {
  const [timetables, setTimetables] = useState<TimetableData[]>([]);
  const [currentTimetableId, setCurrentTimetableId] = useState<string>('');
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
      <div className={`app ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
        <Router>
          <div className="app-content">
            <Routes>
              <Route 
                path="/" 
                element={
                  <Timetable 
                    timetables={timetables}
                    currentTimetableId={currentTimetableId}
                    setCurrentTimetableId={setCurrentTimetableId}
                  />
                } 
              />
              <Route 
                path="/settings" 
                element={
                  <Settings 
                    timetables={timetables}
                    setTimetables={setTimetables}
                    currentTimetableId={currentTimetableId}
                  />
                } 
              />
            </Routes>
          </div>
          <Navigation />
        </Router>
      </div>
    </ThemeContext.Provider>
  );
}

export default App; 