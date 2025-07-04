interface StepIndicatorProps {
  currentStep: number;
}

const steps = ["اطلاعات شخصی", "مهارت‌ها", "مرور و ارسال"];

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  return (
    <div className="relative flex items-center justify-between mb-20 px-2">
      
      <div className="absolute top-5 left-0 right-0 h-1 bg-gray-300 z-0 rounded-full rotate-180" />
      <div
        className="absolute top-5 right-0 h-1 bg-blue-500 z-10 rounded-full transition-all rotate-180 duration-300"
        style={{
          width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
        }}
      />

      {steps.map((label, index) => {
        const stepNumber = index + 1;
        const isActive = currentStep === stepNumber;
        const isCompleted = currentStep > stepNumber;

        return (
          <div key={index} className="flex flex-col items-center z-20 flex-1">
            <div
              className={`
                w-10 h-10 flex items-center justify-center rounded-full border-2
                ${
                  isActive
                    ? "bg-white  border-blue-500  text-lg font-semibold text-blue-500"
                    : isCompleted
                    ? "bg-blue-500 text-white border-blue-500 "
                    : "bg-white text-gray-600 border-gray-300"
                }
              `}
            >
              {stepNumber}
            </div>
            <div
              className={`mt-2  text-center ${
                isActive
                  ? "text-blue-500 font-bold text-lg"
                  : isCompleted
                  ? " text-blue-500  text-sm"
                  : "text-sm"
              }`}
            >
              {label}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;
