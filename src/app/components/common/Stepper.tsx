'use client';

export default function Stepper({ currentStep }: { currentStep: number }) {
  const steps = [
    { id: '1', name: 'Travel Info' },
    { id: '2', name: 'Traveler Details' },
    { id: '3', name: 'Services' },
    { id: '4', name: 'Confirmation' },
  ];

  return (
    <nav
      className="flex items-center justify-center"
      aria-label="Progress">
      <ol className="flex space-x-8">
        {steps.map((step) => (
          <li
            key={step.id}
            className="flex items-center">
            {currentStep > parseInt(step.id) ? (
              <div className="flex items-center">
                <span className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full">
                  <svg
                    className="w-5 h-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <span className="ml-3 text-sm font-medium text-blue-600">
                  {step.name}
                </span>
              </div>
            ) : currentStep === parseInt(step.id) ? (
              <div
                className="flex items-center"
                aria-current="step">
                <span className="flex items-center justify-center w-8 h-8 border-2 border-blue-600 rounded-full">
                  <span className="text-blue-600">{step.id}</span>
                </span>
                <span className="ml-3 text-sm font-medium text-blue-600">
                  {step.name}
                </span>
              </div>
            ) : (
              <div className="flex items-center">
                <span className="flex items-center justify-center w-8 h-8 border-2 border-gray-300 rounded-full">
                  <span className="text-gray-500">{step.id}</span>
                </span>
                <span className="ml-3 text-sm font-medium text-gray-500">
                  {step.name}
                </span>
              </div>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
