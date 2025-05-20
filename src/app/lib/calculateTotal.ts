const parsePrice = (priceString: string): number => {
  return parseFloat(priceString.replace('$', ''));
};

export const calculateTotal = (state) => {
  let total = 0;
  console.log(state, 'estado de state');
  // Base flight price from flightPrices in state
  const flightPriceInfo = state.travelInfo.flightPrices;
  console.log(flightPriceInfo);
  // console.log(JSON.stringify(state), 'stringiy');

  // const basePriceString = flightPriceInfo?.priceUSD;
  const basePrice = parsePrice(flightPriceInfo); // Usamos la función parsePrice
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
