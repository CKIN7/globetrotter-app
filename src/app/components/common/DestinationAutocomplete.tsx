'use client';

import { useState, useEffect, useRef } from 'react';
import { FlightData } from '@/app/lib/types';

export default function DestinationAutocomplete({
  value,
  onChange,
  required = false, // Nuevo prop para marcar como obligatorio
  onValidationChange, // Callback para notificar validez
}: {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  onValidationChange?: (isValid: boolean) => void;
}) {
  const [suggestions, setSuggestions] = useState<FlightData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isValid, setIsValid] = useState(!required); // Estado de validación
  const inputRef = useRef<HTMLInputElement>(null);

  // Efecto para validar el campo
  useEffect(() => {
    const valid = !required || value.trim().length > 0;
    setIsValid(valid);
    onValidationChange?.(valid);
  }, [value, required, onValidationChange]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (value.length > 2 && showSuggestions) {
        setIsLoading(true);
        try {
          const response = await fetch(`/api/flights?query=${value}`);
          const data = await response.json();
          setSuggestions(data);
        } catch (error) {
          console.error('Error fetching suggestions:', error);
          setSuggestions([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [value, showSuggestions]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);

    setShowSuggestions(true);
  };

  const handleSuggestionClick = (destination: string) => {
    onChange(destination);
    setSuggestions([]);
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
        className={`w-full p-3 border rounded-lg   ${
          required && !isValid && value === ''
            ? 'border-red-500'
            : 'border-gray-300'
        }`}
        placeholder="Search destination..."
        onFocus={() => value.length > 2 && setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        required={required}
      />
      {required && !isValid && value === '' && (
        <p className="mt-1 text-sm text-red-600">Please select a destination</p>
      )}
      {isLoading && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
        </div>
      )}
      {showSuggestions && suggestions.length > 0 && !isLoading && (
        <ul className="absolute z-10 mt-1 w-full bg-white border rounded-lg shadow-lg max-h-60 overflow-auto">
          {suggestions.map((flight) => (
            <li
              key={flight.id}
              className="p-3 hover:bg-gray-100 cursor-pointer"
              onMouseDown={() => handleSuggestionClick(flight.destination)}>
              {flight.destination} - from ${flight.priceUSD}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
