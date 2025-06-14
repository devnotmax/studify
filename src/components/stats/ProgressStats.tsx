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
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-light text-gray-400">
          {startTime} - {endTime}
        </span>
        <span className="text-xs font-light text-gray-400">
          {effectiveness}% effectiveness
        </span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full">
        <div
          className="h-2 bg-brown rounded-full transition-all duration-300"
          style={{ width: `${effectiveness}%` }}
        />
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-[4vh] w-full">
      <EffectivenessBar
        startTime="3:00 PM"
        endTime="6:00 PM"
        effectiveness={78}
      />
    </div>
  );
};

export default ProgressStats;
