import { format, parse, isToday, addDays, subDays } from 'date-fns';
import { Period, CurrentPeriodInfo } from '../types/timetable';

export const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(':');
  const date = new Date();
  date.setHours(parseInt(hours), parseInt(minutes), 0, 0);
  return format(date, 'h:mm a');
};

export const parseTime = (time: string): Date => {
  const [hours, minutes] = time.split(':');
  const date = new Date();
  date.setHours(parseInt(hours), parseInt(minutes), 0, 0);
  return date;
};

export const getCurrentPeriodInfo = (periods: Period[]): CurrentPeriodInfo => {
  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes();

  for (const period of periods) {
    const startMinutes = parseInt(period.startTime.split(':')[0]) * 60 + 
                        parseInt(period.startTime.split(':')[1]);
    const endMinutes = parseInt(period.endTime.split(':')[0]) * 60 + 
                      parseInt(period.endTime.split(':')[1]);

    if (currentTime >= startMinutes && currentTime <= endMinutes) {
      const totalDuration = endMinutes - startMinutes;
      const elapsed = currentTime - startMinutes;
      const progress = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));
      
      return {
        period,
        progress,
        isCurrent: true,
        isPast: false,
        isFuture: false
      };
    }
  }

  return {
    period: null,
    progress: 0,
    isCurrent: false,
    isPast: false,
    isFuture: false
  };
};

export const getPeriodStatus = (period: Period): 'past' | 'current' | 'future' => {
  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes();
  const startMinutes = parseInt(period.startTime.split(':')[0]) * 60 + 
                      parseInt(period.startTime.split(':')[1]);
  const endMinutes = parseInt(period.endTime.split(':')[0]) * 60 + 
                    parseInt(period.endTime.split(':')[1]);

  if (currentTime < startMinutes) return 'future';
  if (currentTime > endMinutes) return 'past';
  return 'current';
};

export const formatDate = (date: string): string => {
  const dateObj = parse(date, 'yyyy-MM-dd', new Date());
  if (isToday(dateObj)) {
    return 'Today';
  }
  return format(dateObj, 'EEEE, MMM d');
};

export const getDateKey = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
};

export const getNextDay = (date: string): string => {
  const dateObj = parse(date, 'yyyy-MM-dd', new Date());
  return format(addDays(dateObj, 1), 'yyyy-MM-dd');
};

export const getPreviousDay = (date: string): string => {
  const dateObj = parse(date, 'yyyy-MM-dd', new Date());
  return format(subDays(dateObj, 1), 'yyyy-MM-dd');
}; 