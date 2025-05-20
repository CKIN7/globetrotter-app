'use client';

import { useState, useEffect, useCallback } from 'react';
import DestinationAutocomplete from '@/app/components/common/DestinationAutocomplete';
import FlightClassSelector from '@/app/components/common/FlightClassSelector';
import Button from '@/app/components/ui/Button';
import { FlightData, TravelInfo } from '@/app/lib/types';

export default function Step1TravelInfo({
  data,
  onUpdate,
  onNext,
}: {
  data: TravelInfo;
  onUpdate: (updates: Partial<TravelInfo>) => void;
  onNext: () => void;
}) {
  const [departureDate, setDepartureDate] = useState<Date | null>(
    data.departureDate
  );
  const [returnDate, setReturnDate] = useState<Date | null>(data.returnDate);
  const [destinationSuggestions, setDestinationSuggestions] = useState<
    FlightData[]
  >([]);
  const [isDestinationValid, setIsDestinationValid] = useState(false);
  const [, setShowDestinationError] = useState(false);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [flightPrices, setFlightPrices] = useState<FlightData[]>([]);

  const fetchDestinationsAndPrices = useCallback(async (query: string) => {
    if (query.length > 2) {
      setIsLoadingSuggestions(true);
      try {
        const response = await fetch(`/api/flights?query=${query}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const flightData: FlightData[] = await response.json();
        setDestinationSuggestions(flightData);
        setFlightPrices(flightData);
      } catch (error) {
        console.error('Error fetching suggestions and prices:', error);
        setDestinationSuggestions([]);
        setFlightPrices([]);
      } finally {
        setIsLoadingSuggestions(false);
      }
    } else {
      setDestinationSuggestions([]);
      setFlightPrices([]);
    }
  }, []);

  useEffect(() => {
    if (data.destination) {
      fetchDestinationsAndPrices(data.destination);
    } else {
      setDestinationSuggestions([]);
      setFlightPrices([]);
    }
  }, [data.destination, fetchDestinationsAndPrices]);

  const handleDestinationChange = (value: string) => {
    onUpdate({ destination: value });
    setShowDestinationError(false);
    fetchDestinationsAndPrices(value);
  };

  const handleDestinationValidationChange = (isValid: boolean) => {
    setIsDestinationValid(isValid);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!data.destination?.trim()) {
      setShowDestinationError(true);
      return;
    }

    onUpdate({
      departureDate,
      returnDate,
      flightClass: data.flightClass,
      flightPrices: flightPrices, // Use the fetched flight prices
    });
    onNext();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Travel Information
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Please provide details about your trip
          </p>
        </div>

        <div className="space-y-4">
          <div className="text-gray-900">
            <label className="block text-sm font-medium text-gray-800">
              Destination
            </label>
            <DestinationAutocomplete
              value={data.destination}
              onChange={handleDestinationChange}
              suggestions={destinationSuggestions}
              isLoading={isLoadingSuggestions}
              onValidationChange={handleDestinationValidationChange}
              required
            />
            {/* {showDestinationError && (
              <p className="mt-1 text-sm text-red-600">
                Please select a destination
              </p>
            )} */}
          </div>

          <div className="grid grid-cols-1 py-4 gap-4 sm:grid-cols-2 text-gray-800">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Departure Date
              </label>
              <input
                type="date"
                value={
                  departureDate ? departureDate.toISOString().split('T')[0] : ''
                }
                onChange={(e) =>
                  setDepartureDate(
                    e.target.value ? new Date(e.target.value) : null
                  )
                }
                min={new Date().toISOString().split('T')[0]}
                className="mt-1 py-4 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Return Date
              </label>
              <input
                type="date"
                value={returnDate ? returnDate.toISOString().split('T')[0] : ''}
                onChange={(e) =>
                  setReturnDate(
                    e.target.value ? new Date(e.target.value) : null
                  )
                }
                min={
                  departureDate
                    ? departureDate.toISOString().split('T')[0]
                    : new Date().toISOString().split('T')[0]
                }
                className="mt-1 py-4 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              />
            </div>
          </div>

          <FlightClassSelector
            value={data.flightClass}
            onChange={(value) => onUpdate({ flightClass: value })}
            flightPrices={flightPrices}
          />
        </div>

        <div className="flex justify-end pt-4">
          <Button
            type="submit"
            disabled={!isDestinationValid}>
            Next
          </Button>
        </div>
      </div>
    </form>
  );
}
