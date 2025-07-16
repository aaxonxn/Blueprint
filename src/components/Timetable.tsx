import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TimetableData } from '../types/timetable';
import { getCurrentPeriodInfo, getPeriodStatus, formatDate, getNextDay, getPreviousDay } from '../utils/timeUtils';
import PeriodCard from './PeriodCard';
import './Timetable.css';

interface TimetableProps {
  timetables: TimetableData[];
  currentTimetableId: string;
  setCurrentTimetableId: (id: string) => void;
}

const Timetable: React.FC<TimetableProps> = ({ 
  timetables, 
  currentTimetableId, 
  setCurrentTimetableId 
}) => {
  const [currentDate, setCurrentDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Auto-select first timetable if none selected
  useEffect(() => {
    if (timetables.length > 0 && !currentTimetableId) {
      setCurrentTimetableId(timetables[0].id);
    }
  }, [timetables, currentTimetableId, setCurrentTimetableId]);

  const currentTimetable = timetables.find(t => t.id === currentTimetableId);
  const currentDaySchedule = currentTimetable?.schedules.find(s => s.date === currentDate);
  const periods = currentDaySchedule?.periods || [];

  const currentPeriodInfo = getCurrentPeriodInfo(periods);

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      setCurrentDate(getNextDay(currentDate));
    } else {
      setCurrentDate(getPreviousDay(currentDate));
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleSwipe('left');
    } else if (isRightSwipe) {
      handleSwipe('right');
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  if (!currentTimetable) {
    return (
      <div className="timetable-empty">
        <div className="empty-state">
          <h2>No Timetable Selected</h2>
          <p>Go to Settings to create or select a timetable</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="timetable"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="timetable-header">
        <button 
          className="nav-button"
          onClick={() => handleSwipe('right')}
        >
          <ChevronLeft size={24} />
        </button>
        
        <div className="date-display">
          <h2>{formatDate(currentDate)}</h2>
          <p>{currentTimetable.name}</p>
        </div>
        
        <button 
          className="nav-button"
          onClick={() => handleSwipe('left')}
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="timetable-content">
        {periods.length === 0 ? (
          <div className="no-periods">
            <p>No periods scheduled for this day</p>
          </div>
        ) : (
          <div className="periods-list">
            {periods.map((period) => {
              const status = getPeriodStatus(period);
              const isCurrent = currentPeriodInfo.period?.id === period.id;
              
              return (
                <PeriodCard
                  key={period.id}
                  period={period}
                  status={status}
                  isCurrent={isCurrent}
                  progress={isCurrent ? currentPeriodInfo.progress : 0}
                />
              );
            })}
          </div>
        )}
      </div>

      {currentPeriodInfo.isCurrent && currentPeriodInfo.period && (
        <div className="current-period-indicator">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${currentPeriodInfo.progress}%` }}
            />
          </div>
          <p>Current: {currentPeriodInfo.period.name}</p>
        </div>
      )}
    </div>
  );
};

export default Timetable; 