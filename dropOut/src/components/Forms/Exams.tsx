import { useState } from 'react';
import { FaArrowLeft, FaDownload, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface ExamsProps {
  onBack: () => void;
}

interface Event {
  subject: string;
  room: string;
  color: string;
  accentColor: string;
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
      '8:00 AM': { subject: 'Mathematics', room: 'Room 201', color: 'bg-blue-100', accentColor: 'bg-blue-600' },
      '2:00 PM': { subject: 'Physics', room: 'Room 401', color: 'bg-purple-100', accentColor: 'bg-purple-600' }
    },
    'Tue 19': {
      '10:00 AM': { subject: 'Chemistry', room: 'Lab 203', color: 'bg-yellow-100', accentColor: 'bg-yellow-600' }
    },
    'Wed 20': {
      '8:00 AM': { subject: 'Biology', room: 'Lab 101', color: 'bg-green-100', accentColor: 'bg-green-600' },
      '2:00 PM': { subject: 'Art', room: 'Studio A', color: 'bg-pink-100', accentColor: 'bg-pink-600' }
    },
    'Thu 21': {
      '10:00 AM': { subject: 'English', room: 'Room 102', color: 'bg-red-100', accentColor: 'bg-red-600' }
    },
    'Fri 22': {
      '8:00 AM': { subject: 'History', room: 'Room 305', color: 'bg-purple-100', accentColor: 'bg-purple-600' }
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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-2 sm:p-4 pt-12 sm:pt-16 md:pt-20">
      {/* Main Content Card */}
      <div className="w-full max-w-full bg-gray-50 rounded-lg border border-gray-200 p-3 sm:p-6 lg:p-8 xl:p-12">
        {/* Title Section - Inside Gray Div */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Title Section - Left Side */}
            <div className="flex-1 min-w-0">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">
                Exams & Grades Management
              </h1>
              <p className="text-xs sm:text-sm text-gray-600">
                Monitor and manage student's grades to dropout risk factors
              </p>
            </div>
            
            {/* Action Buttons - Right Side */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full lg:w-auto">
              <button className="bg-black hover:bg-gray-800 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200 text-xs sm:text-sm w-full sm:w-auto">
                <FaDownload className="text-xs sm:text-sm" />
                <span>Export</span>
              </button>
              <button 
                onClick={onBack}
                className="bg-black hover:bg-gray-800 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200 text-xs sm:text-sm w-full sm:w-auto"
              >
                <FaArrowLeft className="text-xs sm:text-sm" />
                Back
              </button>
            </div>
          </div>
        </div>
        {/* Week Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 lg:mb-10 gap-4 sm:gap-6">
          <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">
            {weekRange}
          </h2>
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            <button 
              onClick={goToPreviousWeek}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <FaChevronLeft className="text-gray-600 text-sm sm:text-base" />
            </button>
            <button 
              onClick={goToToday}
              className="px-3 sm:px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200 text-xs sm:text-sm md:text-base"
            >
              Today
            </button>
            <button 
              onClick={goToNextWeek}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <FaChevronRight className="text-gray-600 text-sm sm:text-base" />
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="overflow-x-auto -mx-2 sm:mx-0">
          <div className="min-w-[500px] sm:min-w-[600px] md:min-w-[700px] border border-gray-300 rounded-lg">
            {/* Days Header */}
            <div className="grid grid-cols-8">
              <div className="p-1.5 sm:p-2 text-center font-semibold text-gray-600 text-xs sm:text-sm bg-gray-200 border-r border-gray-300 border-b border-gray-300">
                Time
              </div>
              {days.map((day, index) => (
                <div 
                  key={day}
                  className={`p-1.5 sm:p-2 text-center font-semibold text-xs sm:text-sm border-r border-gray-300 border-b border-gray-300 last:border-r-0 ${
                    isToday(index) 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  <div className="text-xs sm:text-sm">{day}</div>
                  <div className="text-xs font-normal">{dates[index]}</div>
                </div>
              ))}
            </div>

            {/* Time Slots and Events */}
    <div>
              {timeSlots.map((time) => (
                <div key={time} className="grid grid-cols-8 border-b border-gray-300 last:border-b-0">
                  {/* Time Column */}
                  <div className="p-1.5 sm:p-2 text-center text-xs sm:text-sm font-medium text-gray-600 bg-gray-200 border-r border-gray-300">
                    {time}
                  </div>
                  
                  {/* Day Columns */}
                  {days.map((day, dayIndex) => {
                    const dayKey = `${day} ${dates[dayIndex]}`;
                    const daySchedule = schedule[dayKey];
                    const event = daySchedule?.[time];
                    
                    return (
                      <div key={`${day}-${time}`} className="min-h-[50px] sm:min-h-[60px] md:min-h-[80px] border-r border-gray-300 last:border-r-0">
                        {event ? (
                          <div className={`${event.color} text-gray-800 p-1.5 sm:p-2 h-full flex flex-col justify-center relative`}>
                            <div className={`absolute left-0 top-0 bottom-0 w-1 ${event.accentColor} rounded-l`}></div>
                            <div className="font-bold text-xs mb-1 ml-2">
                              {event.subject}
                            </div>
                            <div className="font-semibold text-xs opacity-90 ml-2">
                              {event.room}
                            </div>
                          </div>
                        ) : time === '12:00 PM' && dayIndex < 5 ? (
                          <div className="bg-gray-200 text-gray-600 p-1.5 sm:p-2 h-full flex items-center justify-center text-xs font-medium">
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
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-end mt-6 sm:mt-8 lg:mt-10">
          <button className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-xs sm:text-sm md:text-base font-medium w-full sm:w-auto">
            Cancel
          </button>
          <button className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors duration-200 text-xs sm:text-sm md:text-base font-medium w-full sm:w-auto">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default Exams;