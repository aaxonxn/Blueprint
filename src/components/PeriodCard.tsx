import React from 'react';
import { Clock, MapPin, User } from 'lucide-react';
import { Period } from '../types/timetable';
import { formatTime } from '../utils/timeUtils';
import { useTheme } from '../App';
import './PeriodCard.css';

interface PeriodCardProps {
  period: Period;
  status: 'past' | 'current' | 'future';
  isCurrent: boolean;
  progress: number;
}

const PeriodCard: React.FC<PeriodCardProps> = ({ 
  period, 
  status, 
  isCurrent, 
  progress 
}) => {
  const { isDarkTheme } = useTheme();

  const getStatusClass = () => {
    switch (status) {
      case 'past':
        return 'period-past';
      case 'current':
        return 'period-current';
      case 'future':
        return 'period-future';
      default:
        return '';
    }
  };

  const getOpacity = () => {
    if (status === 'past') return 0.6;
    if (status === 'current') return 1;
    return 0.8;
  };

  return (
    <div 
      className={`period-card ${getStatusClass()} ${isCurrent ? 'current' : ''}`}
      style={{ opacity: getOpacity() }}
    >
      <div className="period-header">
        <div className="period-time">
          <Clock size={16} />
          <span>{formatTime(period.startTime)} - {formatTime(period.endTime)}</span>
        </div>
        {isCurrent && (
          <div className="current-indicator">
            <div className="pulse-dot" />
            <span>Now</span>
          </div>
        )}
      </div>

      <div className="period-content">
        <h3 className="period-name">{period.name}</h3>
        <p className="period-subject">{period.subject}</p>
        
        <div className="period-details">
          <div className="detail-item">
            <User size={14} />
            <span>{period.teacher}</span>
          </div>
          <div className="detail-item">
            <MapPin size={14} />
            <span>{period.room}</span>
          </div>
        </div>
      </div>

      {isCurrent && (
        <div className="progress-overlay">
          <div 
            className="progress-fill"
            style={{ 
              height: `${progress}%`,
              backgroundColor: period.color || '#007bff'
            }}
          />
        </div>
      )}

      <div 
        className="period-color-accent"
        style={{ backgroundColor: period.color || '#007bff' }}
      />
    </div>
  );
};

export default PeriodCard; 