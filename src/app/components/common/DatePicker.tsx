'use client';

import { useState, useEffect } from 'react';
import { format, addDays, isBefore, isAfter, isSameDay } from 'date-fns';

interface DatePickerProps {
  selectedDate?: Date | null;
  onChange: (date: Date | null) => void;
  minDate?: Date;
  maxDate?: Date;
  placeholder?: string;
  className?: string;
  id?: string;
  required?: boolean;
}

export default function DatePicker({
  selectedDate,
  onChange,
  minDate,
  maxDate,
  placeholder = 'Select date',
  className = '',
  id,
  required = false,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Format selected date for display
  useEffect(() => {
    if (selectedDate) {
      setInputValue(format(selectedDate, 'yyyy-MM-dd'));
    } else {
      setInputValue('');
    }
  }, [selectedDate]);

  const handleDateSelect = (date: Date) => {
    if (
      (minDate && isBefore(date, minDate)) ||
      (maxDate && isAfter(date, maxDate))
    ) {
      return;
    }
    onChange(date);
    setIsOpen(false);
  };

  const renderDays = () => {
    const startDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    );
    const endDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    );
    const days = [];

    // Add previous month's days if needed
    const startDay = startDate.getDay();
    for (let i = 0; i < startDay; i++) {
      days.push(
        <div
          key={`prev-${i}`}
          className="h-10"></div>
      );
    }

    // Add current month's days
    for (let day = 1; day <= endDate.getDate(); day++) {
      const date = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        day
      );
      const isDisabled =
        (minDate && isBefore(date, minDate)) ||
        (maxDate && isAfter(date, maxDate));
      const isSelected = selectedDate && isSameDay(date, selectedDate);

      days.push(
        <button
          key={`day-${day}`}
          type="button"
          onClick={() => handleDateSelect(date)}
          disabled={isDisabled}
          className={`h-10 w-10 rounded-full flex items-center justify-center text-sm
            ${isSelected ? 'bg-blue-600 text-white' : ''}
            ${
              isDisabled
                ? 'text-gray-400 cursor-not-allowed'
                : 'hover:bg-gray-100'
            }
            ${!isSelected && !isDisabled ? 'text-gray-900' : ''}
          `}>
          {day}
        </button>
      );
    }

    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + (direction === 'prev' ? -1 : 1),
        1
      )
    );
  };

  return (
    <div className={`relative ${className}`}>
      <input
        id={id}
        type="text"
        readOnly
        value={inputValue}
        placeholder={placeholder}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
        required={required}
      />
      {isOpen && (
        <div className="absolute z-10 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-64">
          <div className="flex justify-between items-center mb-4">
            <button
              type="button"
              onClick={() => navigateMonth('prev')}
              className="p-1 rounded hover:bg-gray-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-600"
                viewBox="0 0 20 20"
                fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <span className="font-medium">
              {format(currentMonth, 'MMMM yyyy')}
            </span>
            <button
              type="button"
              onClick={() => navigateMonth('next')}
              className="p-1 rounded hover:bg-gray-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-600"
                viewBox="0 0 20 20"
                fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
              <div
                key={day}
                className="h-10 w-10 flex items-center justify-center text-sm font-medium text-gray-500">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">{renderDays()}</div>
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={() => {
                onChange(null);
                setIsOpen(false);
              }}
              className="text-sm text-gray-600 hover:text-gray-900 mr-3">
              Clear
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-sm text-blue-600 hover:text-blue-800">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
