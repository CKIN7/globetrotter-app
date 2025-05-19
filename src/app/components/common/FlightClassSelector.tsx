'use client';

const flightClasses = [
  { id: 'economy', name: 'Economy', description: 'Standard seating' },
  { id: 'business', name: 'Business', description: 'Extra legroom' },
  { id: 'first', name: 'First Class', description: 'Luxury experience' },
];

export default function FlightClassSelector({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="mt-4">
      <label className="block text-sm font-medium text-gray-700">
        Flight Class
      </label>
      <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {flightClasses.map((flightClass) => (
          <div
            key={flightClass.id}
            onClick={() => onChange(flightClass.id)}
            className={`cursor-pointer rounded-lg border p-4 ${
              value === flightClass.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}>
            <div className="flex items-center">
              <input
                type="radio"
                className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                checked={value === flightClass.id}
                onChange={() => onChange(flightClass.id)}
              />
              <label className="ml-3 block text-sm font-medium text-gray-700">
                {flightClass.name}
              </label>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              {flightClass.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
