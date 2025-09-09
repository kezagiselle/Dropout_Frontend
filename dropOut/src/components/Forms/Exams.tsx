import { useState } from 'react';
import { FaArrowLeft, FaDownload, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface ExamsProps {
  onBack: () => void;
}

interface Event {
  subject: string;
  room: string;
  color: string;
}

interface DaySchedule {
  [time: string]: Event;
}

interface Schedule {
  [day: string]: DaySchedule;
}

function Exams({ onBack }: ExamsProps) {
  const [currentWeek, setCurrentWeek] = useState(new Date('2024-11-18'));

  const timeSlots = ['8:00 AM', '10:00 AM', '12:00 PM', '2:00 PM'];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const dates = [18, 19, 20, 21, 22, 23, 24];

  const schedule: Schedule = {
    'Mon 18': {
      '8:00 AM': { subject: 'Mathematics', room: 'Room 201', color: 'bg-blue-100' },
      '2:00 PM': { subject: 'Physics', room: 'Room 401', color: 'bg-purple-100' }
    },
    'Tue 19': {
      '10:00 AM': { subject: 'Chemistry', room: 'Lab 203', color: 'bg-yellow-100' }
    },
    'Wed 20': {
      '8:00 AM': { subject: 'Biology', room: 'Lab 101', color: 'bg-green-100' },
      '2:00 PM': { subject: 'Art', room: 'Studio A', color: 'bg-pink-100' }
    },
    'Thu 21': {
      '10:00 AM': { subject: 'English', room: 'Room 102', color: 'bg-red-100' }
    },
    'Fri 22': {
      '8:00 AM': { subject: 'History', room: 'Room 305', color: 'bg-purple-100' }
    }
  };

  const getWeekRange = (date: Date) => {
    const start = new Date(date);
    const day = start.getDay();
    const diff = start.getDate() - day + (day === 0 ? -6 : 1);
    start.setDate(diff);
    
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    
    return { start, end };
  };

  const { start, end } = getWeekRange(currentWeek);
  const weekRange = `Week of November ${start.getDate()}-${end.getDate()}, 2024`;

  const goToPreviousWeek = () => {
    const newDate = new Date(currentWeek);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentWeek(newDate);
  };

  const goToNextWeek = () => {
    const newDate = new Date(currentWeek);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentWeek(newDate);
  };

  const goToToday = () => {
    setCurrentWeek(new Date());
  };

  const isToday = (dayIndex: number) => {
    const today = new Date();
    const dayDate = new Date(2024, 10, 18 + dayIndex); // November 2024
    return today.getDate() === dayDate.getDate() && today.getMonth() === dayDate.getMonth();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-2 sm:p-4 pt-8 sm:pt-12">
      {/* Main Content Card */}
      <div className="w-full max-w-full bg-gray-50 rounded-lg border border-gray-200 p-6 sm:p-8 lg:p-12">
        {/* Title Section - Inside Gray Div */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 sm:p-8 mb-8">
          <div className="flex items-center justify-between">
            {/* Title Section - Left Side */}
            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                Exams & Grades Management
              </h1>
              <p className="text-sm text-gray-600">
                Monitor and manage student's grades to dropout risk factors
              </p>
            </div>
            
            {/* Action Buttons - Right Side */}
            <div className="flex gap-2 sm:gap-3">
              <button className="bg-black hover:bg-gray-800 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200 text-sm">
                <FaDownload className="text-sm" />
                <span className="hidden xs:inline">Export</span>
              </button>
              <button 
                onClick={onBack}
                className="bg-black hover:bg-gray-800 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200 text-sm"
              >
                <FaArrowLeft className="text-sm" />
                Back
              </button>
            </div>
          </div>
        </div>
        {/* Week Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 sm:mb-10 gap-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">
            {weekRange}
          </h2>
          <div className="flex items-center gap-2 sm:gap-4">
            <button 
              onClick={goToPreviousWeek}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <FaChevronLeft className="text-gray-600" />
            </button>
            <button 
              onClick={goToToday}
              className="px-3 sm:px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200 text-sm sm:text-base"
            >
              Today
            </button>
            <button 
              onClick={goToNextWeek}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <FaChevronRight className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="overflow-x-auto">
          <div className="min-w-[600px] border border-gray-300 rounded-lg">
            {/* Days Header */}
            <div className="grid grid-cols-8">
              <div className="p-2 text-center font-semibold text-gray-600 text-sm bg-gray-200 border-r border-gray-300 border-b border-gray-300">
                Time
              </div>
              {days.map((day, index) => (
                <div 
                  key={day}
                  className={`p-2 text-center font-semibold text-sm border-r border-gray-300 border-b border-gray-300 last:border-r-0 ${
                    isToday(index) 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  <div>{day}</div>
                  <div className="text-xs font-normal">{dates[index]}</div>
                </div>
              ))}
            </div>

            {/* Time Slots and Events */}
            <div>
              {timeSlots.map((time, timeIndex) => (
                <div key={time} className="grid grid-cols-8 border-b border-gray-300 last:border-b-0">
                  {/* Time Column */}
                  <div className="p-2 text-center text-sm font-medium text-gray-600 bg-gray-200 border-r border-gray-300">
                    {time}
                  </div>
                  
                  {/* Day Columns */}
                  {days.map((day, dayIndex) => {
                    const dayKey = `${day} ${dates[dayIndex]}`;
                    const daySchedule = schedule[dayKey];
                    const event = daySchedule?.[time];
                    
                    return (
                      <div key={`${day}-${time}`} className="min-h-[60px] sm:min-h-[80px] border-r border-gray-300 last:border-r-0">
                        {event ? (
                          <div className={`${event.color} text-gray-800 p-2 h-full flex flex-col justify-center`}>
                            <div className="font-bold text-xs mb-1">
                              {event.subject}
                            </div>
                            <div className="font-semibold text-xs opacity-90">
                              {event.room}
                            </div>
                          </div>
                        ) : time === '12:00 PM' && dayIndex < 5 ? (
                          <div className="bg-gray-200 text-gray-600 p-2 h-full flex items-center justify-center text-xs font-medium">
                            Lunch Break
                          </div>
                        ) : (
                          <div className="bg-gray-50 h-full"></div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-end mt-8 sm:mt-10">
          <button className="px-4 sm:px-6 py-2 sm:py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm sm:text-base font-medium">
            Cancel
          </button>
          <button className="px-4 sm:px-6 py-2 sm:py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors duration-200 text-sm sm:text-base font-medium">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default Exams;