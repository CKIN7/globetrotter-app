const parsePrice = (priceString: string | number | undefined): number => {
  if (typeof priceString === 'string') {
    return parseFloat(priceString.replace('$', ''));
  }
  if (typeof priceString === 'number') {
    return priceString;
  }
  return 0; // Default to 0 if price is undefined or not a valid type
};

export const calculateTotal = (state: any): number => {
  let total = 0;
  console.log(state, 'estado de state');

  // Base flight price from flightPrices in state
  const flightPriceInfo = state.travelInfo?.flightPrices;
  console.log(flightPriceInfo);

  let basePrice = 0;
  if (flightPriceInfo && Array.isArray(flightPriceInfo)) {
    const selectedClass = state.travelInfo?.flightClass?.toLowerCase();
    const foundPriceInfo = flightPriceInfo.find(
      (item: any) => item?.class?.toLowerCase() === selectedClass
    );
    basePrice = parsePrice(foundPriceInfo?.priceUSD);
  }

  total += basePrice * state.numTravelers;

  // Pets (from Step 3)
  total += state.hasPets ? state.numPets * 100 : 0;

  // Extra luggage (from Step 3)
  total += state.hasExtraLuggage ? state.numExtraLuggage * 50 : 0;

  // Services (from Step 3)
  total += state.travelInsurance ? 75 : 0;
  total += state.preferredSeats ? 30 * state.numTravelers : 0;
  return total;
};
