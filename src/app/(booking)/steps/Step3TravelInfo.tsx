'use client';

import Button from '@/app/components/ui/Button';

export default function Step3AdditionalServices({
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
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Additional Services
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Customize your travel experience
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Travel Insurance
              </label>
              <p className="text-sm text-gray-500">
                Coverage for medical emergencies and trip cancellations ($75)
              </p>
            </div>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={state.travelInsurance}
                onChange={(e) =>
                  onUpdate({ travelInsurance: e.target.checked })
                }
                className="sr-only peer"
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Preferred Seats
              </label>
              <p className="text-sm text-gray-500">
                Select your preferred seats in advance ($30 per traveler)
              </p>
            </div>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={state.preferredSeats}
                onChange={(e) => onUpdate({ preferredSeats: e.target.checked })}
                className="sr-only peer"
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-start justify-between">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Special Assistance
              </label>
              <p className="text-sm text-gray-500">
                Request special assistance if needed
              </p>
            </div>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={state.specialAssistance}
                onChange={(e) =>
                  onUpdate({ specialAssistance: e.target.checked })
                }
                className="sr-only peer"
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {state.specialAssistance && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Assistance Note (max 200 characters)
              </label>
              <textarea
                value={state.specialAssistanceNote}
                onChange={(e) =>
                  onUpdate({
                    specialAssistanceNote: e.target.value.slice(0, 200),
                  })
                }
                rows={3}
                maxLength={200}
                className="mt-1 block w-full text-gray-800 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              <p className="mt-1 text-xs text-gray-500">
                {state.specialAssistanceNote.length}/200 characters
              </p>
            </div>
          )}
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
