'use client';

import { useState, useEffect } from 'react';
import { FlightData } from '@/app/lib/types';

export default function DestinationAutocomplete({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [suggestions, setSuggestions] = useState<FlightData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (value.length > 2) {
        setIsLoading(true);
        const response = await fetch(`/api/flights?query=${value}`);
        const data = await response.json();
        setSuggestions(data);
        setIsLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Search destination..."
      />
      {isLoading && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
        </div>
      )}
      {suggestions.length > 0 && !isLoading && (
        <ul className="absolute z-10 mt-1 w-full bg-white border rounded-lg shadow-lg max-h-60 overflow-auto">
          {suggestions.map((flight) => (
            <li
              key={flight.id}
              className="p-3 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                onChange(flight.destination);
                setSuggestions([]);
              }}>
              {flight.destination} - from ${flight.economy}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
