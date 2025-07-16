export interface Period {
  id: string;
  name: string;
  subject: string;
  teacher: string;
  room: string;
  startTime: string; // Format: "HH:MM"
  endTime: string;   // Format: "HH:MM"
  color: string;     // Hex color code
}

export interface DaySchedule {
  date: string; // Format: "YYYY-MM-DD"
  periods: Period[];
}

export interface TimetableData {
  id: string;
  name: string;
  schedules: DaySchedule[];
}

export interface CurrentPeriodInfo {
  period: Period | null;
  progress: number; // 0-100
  isCurrent: boolean;
  isPast: boolean;
  isFuture: boolean;
} 