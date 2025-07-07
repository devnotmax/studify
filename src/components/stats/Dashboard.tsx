import React from "react";
import { useStats } from "../../hooks/useStats";
import StatsCard from "./StatsCard";
import ChartCard from "./ChartCard";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import StreakCard from "./StreakCard";
import { TimerIcon, BrainIcon } from "../../icons";

const Dashboard: React.FC = () => {
  const { stats, loading, error, refreshStats } = useStats();

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brown"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <p className="text-red-500 text-lg mb-4">
              Error al cargar las estadísticas
            </p>
            <p className="text-secondaryText mb-4">{error}</p>
            <button
              onClick={refreshStats}
              className="bg-brown text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
            >
              Intentar de nuevo
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text mb-2">
            Dashboard de Productividad
          </h1>
          <p className="text-secondaryText">
            Analiza tu progreso y mejora tu rendimiento de estudio
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Duración Promedio"
            value={`${stats.averageSessionDuration?.overall || 0} min`}
            subtitle="por sesión"
            icon={
              <TimerIcon
                style={{ width: 20, height: 20 }}
                fill="currentColor"
              />
            }
          />

          <StatsCard
            title="Sesiones Completadas"
            value={
              stats.dailyHistory?.datasets[0]?.data.reduce(
                (a, b) => a + b,
                0
              ) || 0
            }
            subtitle="total"
            icon={
              <BrainIcon
                style={{ width: 20, height: 20 }}
                fill="currentColor"
              />
            }
          />

          <StatsCard
            title="Días Activos"
            value={
              stats.dailyHistory?.datasets[0]?.data.filter((hours) => hours > 0)
                .length || 0
            }
            subtitle="últimos 30 días"
            icon={
              <TimerIcon
                style={{ width: 20, height: 20 }}
                fill="currentColor"
              />
            }
          />

          {/* <StatsCard
            title="Logros Desbloqueados"
            value={stats.achievements?.length || 0}
            subtitle="total"
            icon={
              <TrophyIcon
                style={{ width: 20, height: 20 }}
                fill="currentColor"
              />
            }
          /> */}
        </div>

        {/* Streak Card */}
        {stats.streak && (
          <div className="mb-8">
            <StreakCard streak={stats.streak} />
          </div>
        )}

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Productividad por Día de la Semana */}
          <ChartCard
            title="Productividad Semanal"
            subtitle="Horas de estudio por día de la semana"
          >
            {stats.weeklyProductivity && (
              <BarChart data={stats.weeklyProductivity} height={300} />
            )}
          </ChartCard>

          {/* Productividad por Hora del Día */}
          <ChartCard
            title="Productividad por Hora"
            subtitle="Horas de estudio por franja horaria"
          >
            {stats.productivityHours && (
              <BarChart data={stats.productivityHours} height={300} />
            )}
          </ChartCard>

          {/* Historial Diario */}
          <ChartCard
            title="Historial de Sesiones"
            subtitle="Sesiones completadas en los últimos 30 días"
          >
            {stats.dailyHistory && (
              <LineChart data={stats.dailyHistory} height={300} />
            )}
          </ChartCard>

          {/* Productividad Mensual */}
          <ChartCard
            title="Productividad Mensual"
            subtitle="Horas de estudio por mes del año"
          >
            {stats.monthlyProductivity && (
              <BarChart data={stats.monthlyProductivity} height={300} />
            )}
          </ChartCard>

          {/* Distribución de Tipos de Sesión */}
          {/* <ChartCard
            title="Tipos de Sesión"
            subtitle="Distribución de Focus, Short Break y Long Break"
          >
            {stats.typeDistribution && (
              <DoughnutChart data={stats.typeDistribution} height={300} />
            )}
          </ChartCard> */}
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Estado de Sesiones */}
          {/* <ChartCard
            title="Estado de Sesiones"
            subtitle="Distribución de sesiones por estado"
          >
            {stats.sessionStatus && (
              <DoughnutChart data={stats.sessionStatus} height={300} />
            )}
          </ChartCard> */}
        </div>

        {/* Refresh Button */}
        <div className="mt-8 text-center">
          <button
            onClick={refreshStats}
            className="bg-brown text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors"
          >
            Actualizar Estadísticas
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
