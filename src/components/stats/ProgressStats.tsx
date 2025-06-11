const ProgressStats = () => {
  // Componente de barra de efectividad
  const EffectivenessBar = ({
    startTime,
    endTime,
    effectiveness,
  }: {
    startTime: string;
    endTime: string;
    effectiveness: number;
  }) => (
    <div className="w-full">
      <div className="flex justify-between items-center mt-1 mb-2">
        <span className="text-sm font-light text-gray-400">
          {startTime} - {endTime}
        </span>
        <span className="text-sm font-light text-gray-400">
          {effectiveness}% effectiveness
        </span>
      </div>
      <div className="w-full h-3 bg-gray-200 rounded-full">
        <div
          className="h-3 bg-brown rounded-full transition-all duration-300"
          style={{ width: `${effectiveness}%` }}
        />
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-[6vh] w-full">
      <EffectivenessBar
        startTime="3:00 PM"
        endTime="6:00 PM"
        effectiveness={78}
      />
    </div>
  );
};

export default ProgressStats;
