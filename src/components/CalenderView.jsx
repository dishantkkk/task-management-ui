// src/components/CalendarView.jsx
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
        const dueDate = new Date(task.dueDate);
        return dueDate.toDateString() === date.toDateString();
      });

      return hasTask ? (
        <div className="w-2 h-2 bg-blue-500 rounded-full mx-auto mt-1" />
      ) : null;
    }
  };

  return (
    <div className="mb-6 bg-white p-4 shadow rounded">
      <Calendar
        value={selectedDate}
        onChange={handleDateChange}
        tileContent={tileContent}
      />
    </div>
  );
};

export default CalendarView;
