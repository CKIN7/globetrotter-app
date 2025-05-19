'use client';

import { useState, useEffect } from 'react';
import TravelerForm from '@/app/components/common/TravelerForm';
import Button from '@/app/components/ui/Button';

export default function Step2TravelerInfo({
  state,
  onUpdate,
  onNext,
  onPrev,
}: {
  state: any;
  onUpdate: (updates: any) => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  const [travelers, setTravelers] = useState(
    Array(state.numTravelers).fill({
      fullName: '',
      birthDate: null,
      documentType: 'passport',
      documentNumber: '',
    })
  );

  useEffect(() => {
    if (state.travelers.length === state.numTravelers) {
      setTravelers(state.travelers);
    } else {
      const newTravelers = Array(state.numTravelers).fill({
        fullName: '',
        birthDate: null,
        documentType: 'passport',
        documentNumber: '',
      });
      setTravelers(newTravelers);
    }
  }, [state.numTravelers, state.travelers]);

  const handleTravelerChange = (index: number, field: string, value: any) => {
    const updatedTravelers = [...travelers];
    updatedTravelers[index] = { ...updatedTravelers[index], [field]: value };
    setTravelers(updatedTravelers);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({ travelers });
    onNext();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Traveler Information
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Please provide details for all travelers
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Number of Travelers
            </label>
            <div className="flex items-center">
              <button
                type="button"
                onClick={() =>
                  onUpdate({
                    numTravelers: Math.max(1, state.numTravelers - 1),
                  })
                }
                className="p-2 border rounded-l-lg bg-gray-100 hover:bg-gray-200"
                disabled={state.numTravelers <= 1}>
                -
              </button>
              <div className="px-4 py-2 border-t border-b text-center">
                {state.numTravelers}
              </div>
              <button
                type="button"
                onClick={() =>
                  onUpdate({
                    numTravelers: Math.min(10, state.numTravelers + 1),
                  })
                }
                className="p-2 border rounded-r-lg bg-gray-100 hover:bg-gray-200"
                disabled={state.numTravelers >= 10}>
                +
              </button>
            </div>
          </div>

          {travelers.map((traveler, index) => (
            <div
              key={index}
              className="border rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-3">
                Traveler {index + 1}
              </h3>
              <TravelerForm
                traveler={traveler}
                onChange={(field, value) =>
                  handleTravelerChange(index, field, value)
                }
              />
            </div>
          ))}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-700">
                  Traveling with pets?
                </span>
                <input
                  type="checkbox"
                  checked={state.hasPets}
                  onChange={(e) => onUpdate({ hasPets: e.target.checked })}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </label>
              {state.hasPets && (
                <div className="mt-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Number of pets ($100 each)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={state.numPets}
                    onChange={(e) =>
                      onUpdate({ numPets: parseInt(e.target.value) || 0 })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-700">
                  Need extra luggage?
                </span>
                <input
                  type="checkbox"
                  checked={state.hasExtraLuggage}
                  onChange={(e) =>
                    onUpdate({ hasExtraLuggage: e.target.checked })
                  }
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </label>
              {state.hasExtraLuggage && (
                <div className="mt-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Number of extra luggage ($50 each)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={state.numExtraLuggage}
                    onChange={(e) =>
                      onUpdate({
                        numExtraLuggage: parseInt(e.target.value) || 0,
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={onPrev}>
            Back
          </Button>
          <Button type="submit">Next</Button>
        </div>
      </div>
    </form>
  );
}
