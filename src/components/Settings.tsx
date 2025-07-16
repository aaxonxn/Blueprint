import React, { useState } from 'react';
import { Plus, Edit, Trash2, Calendar, Clock, ChevronDown, ChevronUp, Coffee, Sun, Moon } from 'lucide-react';
import { TimetableData, Period, DaySchedule } from '../types/timetable';
import { useTheme } from '../App';
import './Settings.css';

interface SettingsProps {
  timetables: TimetableData[];
  setTimetables: (timetables: TimetableData[]) => void;
  currentTimetableId: string;
  setCurrentTimetableId: (id: string) => void;
}

const Settings: React.FC<SettingsProps> = ({
  timetables,
  setTimetables,
  currentTimetableId,
  setCurrentTimetableId
}) => {
  const { isDarkTheme, toggleTheme } = useTheme();
  const [showWeeklyTimetable, setShowWeeklyTimetable] = useState(false);
  const [showAddPeriod, setShowAddPeriod] = useState(false);
  const [selectedDay, setSelectedDay] = useState<string>('');
  const [newPeriod, setNewPeriod] = useState<Partial<Period>>({
    name: '',
    subject: '',
    teacher: '',
    room: '',
    startTime: '',
    endTime: '',
    color: '#007bff'
  });

  const daysOfWeek = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 
    'Friday', 'Saturday', 'Sunday'
  ];

  const handleAddPeriod = () => {
    if (!selectedDay || !newPeriod.name || !newPeriod.startTime || !newPeriod.endTime) return;

    const period: Period = {
      id: Date.now().toString(),
      name: newPeriod.name!,
      subject: newPeriod.subject || '',
      teacher: newPeriod.teacher || '',
      room: newPeriod.room || '',
      startTime: newPeriod.startTime!,
      endTime: newPeriod.endTime!,
      color: newPeriod.color || '#007bff'
    };

    // Get today's date and find the next occurrence of the selected day
    const today = new Date();
    const targetDayIndex = daysOfWeek.indexOf(selectedDay);
    const currentDayIndex = today.getDay() - 1; // Monday = 0
    const daysUntilTarget = (targetDayIndex - currentDayIndex + 7) % 7;
    
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + daysUntilTarget);
    const targetDateString = targetDate.toISOString().split('T')[0];

    const updatedTimetables = timetables.map(t => {
      if (t.id === currentTimetableId) {
        const existingSchedule = t.schedules.find(s => s.date === targetDateString);
        if (existingSchedule) {
          existingSchedule.periods.push(period);
        } else {
          t.schedules.push({
            date: targetDateString,
            periods: [period]
          });
        }
      }
      return t;
    });

    setTimetables(updatedTimetables);
    setNewPeriod({
      name: '',
      subject: '',
      teacher: '',
      room: '',
      startTime: '',
      endTime: '',
      color: '#007bff'
    });
    setShowAddPeriod(false);
  };

  const handleDeletePeriod = (periodId: string, date: string) => {
    const updatedTimetables = timetables.map(t => {
      if (t.id === currentTimetableId) {
        return {
          ...t,
          schedules: t.schedules.map(s => {
            if (s.date === date) {
              return {
                ...s,
                periods: s.periods.filter(p => p.id !== periodId)
              };
            }
            return s;
          })
        };
      }
      return t;
    });
    setTimetables(updatedTimetables);
  };

  const getDayPeriods = (dayName: string) => {
    if (!currentTimetableId) return [];
    
    const timetable = timetables.find(t => t.id === currentTimetableId);
    if (!timetable) return [];

    // Get today's date and find the next occurrence of the selected day
    const today = new Date();
    const targetDayIndex = daysOfWeek.indexOf(dayName);
    const currentDayIndex = today.getDay() - 1; // Monday = 0
    const daysUntilTarget = (targetDayIndex - currentDayIndex + 7) % 7;
    
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + daysUntilTarget);
    const targetDateString = targetDate.toISOString().split('T')[0];

    const schedule = timetable.schedules.find(s => s.date === targetDateString);
    return schedule?.periods || [];
  };

  return (
    <div className="settings">
      <div className="settings-header">
        <h1>Settings</h1>
        <div className="header-actions">
          <button 
            className="theme-toggle"
            onClick={toggleTheme}
          >
            {isDarkTheme ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>

      <div className="settings-content">
        <div className="weekly-timetable-section">
          <button 
            className="weekly-timetable-toggle"
            onClick={() => setShowWeeklyTimetable(!showWeeklyTimetable)}
          >
            <Calendar size={20} />
            <span>Weekly Timetable</span>
            {showWeeklyTimetable ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>

          {showWeeklyTimetable && (
            <div className="weekly-timetable-content">
              {daysOfWeek.map(day => {
                const periods = getDayPeriods(day);
                return (
                  <div key={day} className="day-item">
                    <div className="day-header">
                      <h3>{day}</h3>
                      <div className="day-actions">
                        <button 
                          className="add-break-button"
                          onClick={() => {
                            setSelectedDay(day);
                            setShowAddPeriod(true);
                          }}
                        >
                          <Coffee size={16} />
                        </button>
                        <button 
                          className="add-period-button"
                          onClick={() => {
                            setSelectedDay(day);
                            setShowAddPeriod(true);
                          }}
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                    
                    <div className="day-content">
                      {periods.length === 0 ? (
                        <p className="no-periods">No periods or breaks scheduled</p>
                      ) : (
                        <div className="day-periods">
                          {periods.map(period => (
                            <div key={period.id} className="day-period-item">
                              <div className="period-info">
                                <h4>{period.name}</h4>
                                <p>{period.subject} • {period.teacher}</p>
                                <p className="period-time">
                                  <Clock size={12} />
                                  {period.startTime} - {period.endTime}
                                </p>
                              </div>
                              <button 
                                className="delete-period-button"
                                onClick={() => {
                                  const today = new Date();
                                  const targetDayIndex = daysOfWeek.indexOf(day);
                                  const currentDayIndex = today.getDay() - 1;
                                  const daysUntilTarget = (targetDayIndex - currentDayIndex + 7) % 7;
                                  
                                  const targetDate = new Date(today);
                                  targetDate.setDate(today.getDate() + daysUntilTarget);
                                  const targetDateString = targetDate.toISOString().split('T')[0];
                                  
                                  handleDeletePeriod(period.id, targetDateString);
                                }}
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Add Period Modal */}
      {showAddPeriod && selectedDay && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add New Period for {selectedDay}</h2>
            <input
              type="text"
              placeholder="Period name"
              value={newPeriod.name}
              onChange={(e) => setNewPeriod({...newPeriod, name: e.target.value})}
            />
            <input
              type="text"
              placeholder="Subject"
              value={newPeriod.subject}
              onChange={(e) => setNewPeriod({...newPeriod, subject: e.target.value})}
            />
            <input
              type="text"
              placeholder="Teacher"
              value={newPeriod.teacher}
              onChange={(e) => setNewPeriod({...newPeriod, teacher: e.target.value})}
            />
            <input
              type="text"
              placeholder="Room"
              value={newPeriod.room}
              onChange={(e) => setNewPeriod({...newPeriod, room: e.target.value})}
            />
            <div className="time-inputs">
              <input
                type="time"
                value={newPeriod.startTime}
                onChange={(e) => setNewPeriod({...newPeriod, startTime: e.target.value})}
              />
              <span>to</span>
              <input
                type="time"
                value={newPeriod.endTime}
                onChange={(e) => setNewPeriod({...newPeriod, endTime: e.target.value})}
              />
            </div>
            <input
              type="color"
              value={newPeriod.color}
              onChange={(e) => setNewPeriod({...newPeriod, color: e.target.value})}
            />
            <div className="modal-actions">
              <button onClick={() => setShowAddPeriod(false)}>Cancel</button>
              <button onClick={handleAddPeriod}>Add</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings; 