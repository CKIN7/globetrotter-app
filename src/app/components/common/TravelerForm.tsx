'use client';

import { useState } from 'react';

const documentTypes = [
  { id: 'passport', name: 'Passport' },
  { id: 'id-card', name: 'ID Card' },
  { id: 'driver-license', name: "Driver's License" },
];

export default function TravelerForm({
  traveler,
  onChange,
}: {
  traveler: any;
  onChange: (field: string, value: any) => void;
}) {
  const [showDatePicker, setShowDatePicker] = useState(false);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          type="text"
          value={traveler.fullName}
          onChange={(e) => onChange('fullName', e.target.value)}
          className="mt-1 pl-2 py-2 w-full text-gray-900 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          required
          placeholder="Enter your full name"
        />
      </div>

      <div className="relative">
        <label className="block text-sm font-medium text-gray-700">
          Date of Birth
        </label>
        <input
          type="date"
          value={
            traveler.birthDate
              ? traveler.birthDate.toISOString().split('T')[0]
              : ''
          }
          onChange={(e) => onChange('birthDate', new Date(e.target.value))}
          className="mt-1 pl-2 block py-2 w-full text-gray-900 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-800">
          Document Type
        </label>
        <select
          value={traveler.documentType}
          onChange={(e) => onChange('documentType', e.target.value)}
          className="mt-1 pl-2 py-2 block w-full text-gray-900 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          required>
          {documentTypes.map((type) => (
            <option
              key={type.id}
              value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Document Number
        </label>
        <input
          type="text"
          value={traveler.documentNumber}
          onChange={(e) => onChange('documentNumber', e.target.value)}
          className="mt-1 pl-2 py-2 block w-full text-gray-900 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          required
          placeholder="Enter your ID number"
        />
      </div>
    </div>
  );
}
