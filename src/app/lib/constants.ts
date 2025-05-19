// src/lib/constants.ts

/**
 * Tipos de documento de identidad aceptados
 */
export const DOCUMENT_TYPES = [
  { id: 'passport', name: 'Passport' },
  { id: 'id-card', name: 'National ID' },
  { id: 'driver-license', name: "Driver's License" },
] as const;

/**
 * Clases de vuelo disponibles
 */
export const FLIGHT_CLASSES = [
  {
    id: 'economy',
    name: 'Economy',
    description: 'Standard seating',
    icon: '🪑',
  },
  {
    id: 'business',
    name: 'Business',
    description: 'Extra legroom and comfort',
    icon: '✨',
  },
  {
    id: 'first',
    name: 'First Class',
    description: 'Luxury experience',
    icon: '🌟',
  },
] as const;

/**
 * Precios de servicios adicionales
 */
export const SERVICE_PRICES = {
  PET: 100,
  EXTRA_LUGGAGE: 50,
  TRAVEL_INSURANCE: 75,
  PREFERRED_SEAT: 30,
} as const;

/**
 * Límites del formulario
 */
export const FORM_LIMITS = {
  MIN_TRAVELERS: 1,
  MAX_TRAVELERS: 10,
  MAX_PETS: 5,
  MAX_LUGGAGE: 5,
  SPECIAL_ASSISTANCE_MAX_CHARS: 200,
} as const;

/**
 * Textos para UI
 */
export const UI_TEXT = {
  COMMON: {
    NEXT: 'Next',
    BACK: 'Back',
    CONFIRM: 'Confirm Booking',
    REQUIRED_FIELD: 'This field is required',
  },
  STEP_1: {
    TITLE: 'Travel Information',
    SUBTITLE: 'Please provide details about your trip',
  },
  STEP_2: {
    TITLE: 'Traveler Details',
    SUBTITLE: 'Tell us about the travelers',
  },
  STEP_3: {
    TITLE: 'Additional Services',
    SUBTITLE: 'Customize your travel experience',
  },
  STEP_4: {
    TITLE: 'Confirmation',
    SUBTITLE: 'Review your booking details',
    SUCCESS_MESSAGE: '🎉 Your booking has been confirmed!',
  },
} as const;

/**
 * Opciones para servicios adicionales
 */
export const ADDITIONAL_SERVICES = [
  {
    id: 'travel-insurance',
    name: 'Travel Insurance',
    description: 'Coverage for medical emergencies and trip cancellations',
    price: SERVICE_PRICES.TRAVEL_INSURANCE,
  },
  {
    id: 'preferred-seats',
    name: 'Preferred Seats',
    description: 'Select your preferred seats in advance',
    price: SERVICE_PRICES.PREFERRED_SEAT,
    perPerson: true,
  },
  {
    id: 'special-assistance',
    name: 'Special Assistance',
    description: 'Request special assistance if needed',
  },
] as const;

/**
 * Configuración de pasos del formulario
 */
export const FORM_STEPS = [
  { id: 1, name: 'Travel Info', path: 'travel-info' },
  { id: 2, name: 'Traveler Details', path: 'traveler-details' },
  { id: 3, name: 'Services', path: 'additional-services' },
  { id: 4, name: 'Confirmation', path: 'confirmation' },
] as const;

// Tipos derivados de las constantes
export type DocumentType = (typeof DOCUMENT_TYPES)[number]['id'];
export type FlightClass = (typeof FLIGHT_CLASSES)[number]['id'];
export type AdditionalService = (typeof ADDITIONAL_SERVICES)[number]['id'];
