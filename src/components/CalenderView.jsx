import React, { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

const CalendarView = ({ tasks, onDateSelect }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onDateSelect(date);
  };

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const hasTask = tasks.some((task) => {
        if (!task.dueDate) return false;
        const dueDate = new Date(task.dueDate);
        return dueDate.toDateString() === date.toDateString();
      });

      return hasTask ? (
        <div className="w-2 h-2 bg-blue-500 rounded-full mx-auto mt-1" />
      ) : null;
    }
  };

  const tileClassName = ({ date, view }) => {
    if (
      view === "month" &&
      selectedDate &&
      date.toDateString() === selectedDate.toDateString()
    ) {
      return "bg-blue-100 text-blue-800 font-semibold rounded";
    }
  };

  return (
    <div className="mb-6 bg-white p-4 shadow rounded">
      <Calendar
        value={selectedDate}
        onChange={handleDateChange}
        tileContent={tileContent}
        tileClassName={tileClassName}
      />
    </div>
  );
};

export default CalendarView;
