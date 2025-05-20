'use client';

import { useState, useEffect, useRef } from 'react';
import { FlightData } from '@/app/lib/types';

export default function DestinationAutocomplete({
  value,
  onChange,
  suggestions: propSuggestions,
  isLoading: propIsLoading,
  required = false,
  onValidationChange,
}: {
  value: string;
  onChange: (value: string) => void;
  suggestions?: FlightData[];
  isLoading?: boolean;
  required?: boolean;
  onValidationChange?: (isValid: boolean) => void;
}) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isValid, setIsValid] = useState(!required);
  const inputRef = useRef<HTMLInputElement>(null);
  const [internalSuggestions, setInternalSuggestions] = useState<FlightData[]>(
    []
  );
  const [internalIsLoading, setInternalIsLoading] = useState(false);

  // Update internal suggestions and loading state from props
  useEffect(() => {
    if (propSuggestions && propSuggestions.length > 0) {
      setInternalSuggestions([propSuggestions[0]]); // Show only the first suggestion
    } else {
      setInternalSuggestions([]);
    }
  }, [propSuggestions]);

  useEffect(() => {
    if (propIsLoading !== undefined) {
      setInternalIsLoading(propIsLoading);
    }
  }, [propIsLoading]);

  // Effect to validate the field
  useEffect(() => {
    const valid = !required || value.trim().length > 0;
    setIsValid(valid);
    onValidationChange?.(valid);
  }, [value, required, onValidationChange]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (destination: string) => {
    onChange(destination);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleInputChange}
        className={`w-full p-3 border rounded-lg  ${
          required && !isValid && value === ''
            ? 'border-red-500'
            : 'border-gray-300'
        }`}
        placeholder="Search destination..."
        onFocus={() => value.length > 2 && setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        required={required}
      />
      {/* {required && !isValid && value === '' && (
        <p className="mt-1 text-sm text-red-600">Please select a destination</p>
      )} */}
      {internalIsLoading && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
        </div>
      )}
      {showSuggestions &&
        internalSuggestions.length > 0 &&
        !internalIsLoading && (
          <ul className="absolute z-10 mt-1 w-full bg-white border rounded-lg shadow-lg max-h-60 overflow-auto">
            {internalSuggestions.map((flight) => (
              <li
                key={flight.id}
                className="p-3 hover:bg-gray-100 cursor-pointer"
                onMouseDown={() => handleSuggestionClick(flight.destination)}>
                {flight.destination}
                {/* - from ${flight.priceUSD} */}
              </li>
            ))}
          </ul>
        )}
    </div>
  );
}
