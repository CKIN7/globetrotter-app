'use client';

import { useState } from 'react';
import Stepper from '@/app/components/common/Stepper';
import Step1TravelInfo from './steps/Step1TravelInfo';
import Step2TravelerInfo from './steps/Step2TravelerInfo';
import Step3AdditionalServices from './steps/Step3TravelInfo';
import Step4Confirmation from './steps/Step4Confirmation';
import { BookingState } from '@/app/lib/types';

export default function BookingPage() {
  const [bookingState, setBookingState] = useState<BookingState>({
    currentStep: 1,
    travelInfo: {
      destination: '',
      departureDate: null,
      returnDate: null,
      flightClass: 'economy',
    },
    travelers: [],
    numTravelers: 1,
    hasPets: false,
    numPets: 0,
    hasExtraLuggage: false,
    numExtraLuggage: 0,
    travelInsurance: false,
    preferredSeats: false,
    specialAssistance: false,
    specialAssistanceNote: '',
  });

  const nextStep = () => {
    setBookingState((prev) => ({
      ...prev,
      currentStep: Math.min(prev.currentStep + 1, 4),
    }));
  };

  const prevStep = () => {
    setBookingState((prev) => ({
      ...prev,
      currentStep: Math.max(prev.currentStep - 1, 1),
    }));
  };

  const updateBookingState = (updates: Partial<BookingState>) => {
    setBookingState((prev) => ({ ...prev, ...updates }));
  };

  const renderStep = () => {
    switch (bookingState.currentStep) {
      case 1:
        return (
          <Step1TravelInfo
            data={bookingState.travelInfo}
            onUpdate={(updates) =>
              updateBookingState({
                travelInfo: { ...bookingState.travelInfo, ...updates },
              })
            }
            onNext={nextStep}
          />
        );
      case 2:
        return (
          <Step2TravelerInfo
            state={bookingState}
            onUpdate={updateBookingState}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 3:
        return (
          <Step3AdditionalServices
            state={bookingState}
            onUpdate={updateBookingState}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 4:
        return (
          <Step4Confirmation
            state={bookingState}
            onConfirm={() => alert('¡Reserva confirmada!')}
            onPrev={prevStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Globetrotter</h1>
          <p className="mt-2 text-lg text-gray-600">
            Your personalized travel booking experience
          </p>
        </div>

        <Stepper currentStep={bookingState.currentStep} />

        <div className="mt-8 bg-white shadow rounded-lg p-6 sm:p-8">
          {renderStep()}
        </div>
      </div>
    </div>
  );
}
