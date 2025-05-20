'use client';

import { FlightData } from '@/app/lib/types';

const flightClassesConfig = [
  { id: 'economy', name: 'Economy', description: 'Standard seating' },
  { id: 'business', name: 'Business', description: 'Extra legroom' },
  { id: 'first', name: 'First Class', description: 'Luxury experience' },
];

interface FlightClassSelectorProps {
  value: string;
  onChange: (value: string, price: string) => void;
  flightPrices?: FlightData[];
}

export default function FlightClassSelector({
  value,
  onChange,
  flightPrices,
}: FlightClassSelectorProps) {
  return (
    <div className="mt-4">
      <label className="block text-sm font-medium text-gray-700">
        Flight Class
      </label>
      <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {flightClassesConfig.map((flightClassConfig) => {
          const priceInfo = flightPrices?.find((flight) =>
            flight.class.toLowerCase().includes(flightClassConfig.id)
          );

          const priceUSD = priceInfo
            ? `$${priceInfo.priceUSD}`
            : 'Price not available.';
          return (
            <div
              key={flightClassConfig.id}
              onClick={() => onChange(flightClassConfig.id, priceUSD)}
              className={`cursor-pointer rounded-lg border p-4 ${
                value === flightClassConfig.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}>
              <div className="flex items-center">
                <input
                  type="radio"
                  className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={value === flightClassConfig.id}
                  onChange={() => onChange(flightClassConfig.id, priceUSD)}
                />
                <label className="ml-3 block text-sm font-medium text-gray-700">
                  {flightClassConfig.name}
                </label>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                {flightClassConfig.description} ({priceUSD})
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
