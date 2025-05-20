'use client';

import Button from '@/app/components/ui/Button';
import { calculateAge } from '@/app/lib/utils';
import { BookingState } from '@/app/lib/types'; // Import the BookingState type
import { calculateTotal } from '@/app/lib/calculateTotal';

export default function Step4Confirmation({
  state,
  onConfirm,
  onPrev,
}: {
  state: BookingState; // Explicitly type the 'state' prop as BookingState
  onConfirm: () => void;
  onPrev: () => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">
          Confirm Your Booking
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Please review your information before confirming
        </p>
      </div>

      <div className="space-y-4">
        <div className="border rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-3">Trip Details</h3>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <div>
              <p className="text-sm text-gray-800">Destination</p>
              <p className="font-medium text-gray-800">
                {state.travelInfo.destination}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-800">Flight Class</p>
              <p className="font-medium capitalize text-gray-800">
                {state.travelInfo.flightClass}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-800">Departure Date</p>
              <p className="font-medium text-gray-800">
                {state.travelInfo.departureDate?.toLocaleDateString() ||
                  'Not selected'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Return Date</p>
              <p className="font-medium text-gray-800">
                {state.travelInfo.returnDate?.toLocaleDateString() ||
                  'Not selected'}
              </p>
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-3">Travelers</h3>
          <p className="text-sm text-gray-800 mb-2">
            {state.numTravelers} traveler{state.numTravelers > 1 ? 's' : ''}
          </p>
          <div className="space-y-3">
            {state.travelers.map((traveler, index) => (
              <div
                key={index}
                className="border-t pt-3">
                <p className="font-medium text-gray-800">
                  {traveler.fullName || `Traveler ${index + 1}`}
                </p>
                <p className="text-sm text-gray-700">
                  {traveler.birthDate
                    ? `${calculateAge(traveler.birthDate)} years old`
                    : 'Age not specified'}
                </p>
                <p className="text-sm text-gray-700">
                  {traveler.documentType}: {traveler.documentNumber}
                </p>
              </div>
            ))}
          </div>
        </div>

        {(state.hasPets || state.hasExtraLuggage) && (
          <div className="border rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-3">Extras</h3>
            <div className="space-y-2">
              {state.hasPets && (
                <p className="text-sm">
                  Pets: {state.numPets} × $100 = ${state.numPets * 100}
                </p>
              )}
              {state.hasExtraLuggage && (
                <p className="text-sm">
                  Extra Luggage: {state.numExtraLuggage} × $50 = $
                  {state.numExtraLuggage * 50}
                </p>
              )}
            </div>
          </div>
        )}

        {(state.travelInsurance ||
          state.preferredSeats ||
          state.specialAssistance) && (
          <div className="border rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-3">
              Additional Services
            </h3>
            <div className="space-y-2 text-gray-900">
              {state.travelInsurance && (
                <p className="text-sm">Travel Insurance: $75</p>
              )}
              {state.preferredSeats && (
                <p className="text-sm">
                  Preferred Seats: {state.numTravelers} × $30 = $
                  {state.numTravelers * 30}
                </p>
              )}
              {state.specialAssistance && (
                <div>
                  <p className="text-sm">Special Assistance</p>
                  {state.specialAssistanceNote && (
                    <p className="text-sm text-gray-600 italic">
                      Note: {state.specialAssistanceNote}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        <div className="border-t pt-4">
          <div className="flex justify-between items-center">
            <p className="font-medium text-gray-900">Total</p>
            <p className="text-xl font-bold text-gray-900">
              ${calculateTotal(state)}
            </p>
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
        <Button
          type="button"
          onClick={onConfirm}>
          Confirm Booking
        </Button>
      </div>
    </div>
  );
}
