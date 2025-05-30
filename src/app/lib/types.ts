export interface FlightData {
  id: string;
  destination: string;
  class: 'Economic | Business | FirstClass';
  priceUSD: number;
}

export interface TravelInfo {
  destination: string;
  departureDate: Date | null;
  returnDate: Date | null;
  flightClass: string;
  flightPrices: number;
}

export interface Traveler {
  id: string;
  fullName: string;
  birthDate: Date | null;
  documentType: string;
  documentNumber: string;
}

export interface BookingState {
  currentStep: number;
  travelInfo: TravelInfo;
  travelers: Traveler[];
  numTravelers: number;
  hasPets: boolean;
  numPets: number;
  hasExtraLuggage: boolean;
  numExtraLuggage: number;
  travelInsurance: boolean;
  preferredSeats: boolean;
  specialAssistance: boolean;
  specialAssistanceNote: string;
  priceUSD: number;
  flightPrices: string;
}
