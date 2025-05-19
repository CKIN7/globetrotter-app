'use client';

import { useState } from 'react';
import DestinationAutocomplete from '@/app/components/common/DestinationAutocomplete';
import FlightClassSelector from '@/app/components/common/FlightClassSelector';
import Button from '@/app/components/ui/Button';

export default function Step1TravelInfo({
  data,
  onUpdate,
  onNext,
}: {
  data: any;
  onUpdate: (updates: any) => void;
  onNext: () => void;
}) {
  const [departureDate, setDepartureDate] = useState<Date | null>(
    data.departureDate
  );
  const [returnDate, setReturnDate] = useState<Date | null>(data.returnDate);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({ departureDate, returnDate });
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
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Destination
            </label>
            <DestinationAutocomplete
              value={data.destination}
              onChange={(value) => onUpdate({ destination: value })}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
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
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              />
            </div>
          </div>

          <FlightClassSelector
            value={data.flightClass}
            onChange={(value) => onUpdate({ flightClass: value })}
          />
        </div>

        <div className="flex justify-end pt-4">
          <Button type="submit">Next</Button>
        </div>
      </div>
    </form>
  );
}
