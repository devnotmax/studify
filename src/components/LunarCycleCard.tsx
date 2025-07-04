import React, { useEffect, useState } from "react";
import { LocationIcon } from "../icons/LocationIcon";
import BaseModal from "../components/modals/BaseModal/BaseModal";
import moonPhases from "../utils/moonPhases.json";
import { CalendarIcon } from "../icons/CalendarIcon";

const MOON_PHASE_IMAGES: Record<string, string> = {
  "New Moon": "/lunas/luna nueva.png",
  "Waxing Crescent": "/lunas/luna creciente.png",
  "First Quarter": "/lunas/cuarto creciente.png",
  "Waxing Gibbous": "/lunas/gibosa creciente.png",
  "Full Moon": "/lunas/luna llena.png",
  "Waning Gibbous": "/lunas/gibosa menguante.png",
  "Last Quarter": "/lunas/cuarto menguante.png",
  "Waning Crescent": "/lunas/luna menguante.png",
  Waxing: "/lunas/gibosa creciente.png",
  Waning: "/lunas/gibosa menguante.png",
};

const MOON_PHASE_EMOJIS: Record<string, string> = {
  "New Moon": "🌑",
  "Waxing Crescent": "🌒",
  "First Quarter": "🌓",
  "Waxing Gibbous": "🌔",
  "Full Moon": "🌕",
  "Waning Gibbous": "🌖",
  "Last Quarter": "🌗",
  "Waning Crescent": "🌘",
  Waxing: "🌔",
  Waning: "🌖",
};

const API_KEY = import.meta.env.VITE_LOCATION_API_KEY;
const FARMSENSE_API = "https://www.icalendar37.net/lunar/api/?";

// Definir el tipo para los días del calendario lunar
interface LunarDay {
  date: string;
  phaseName: string;
  isPhaseLimit?: boolean;
}

function formatPhaseName(phase: string | null): string {
  if (!phase) return "";
  return phase
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function getFarmsenseUrl(
  year: number,
  month: number,
  lat: number,
  lon: number
) {
  // month: 1-based (enero=1)
  return `${FARMSENSE_API}year=${year}&month=${month}&lat=${lat}&lng=${lon}&lang=en`;
}

const monthNames = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

const LunarCycleCard: React.FC = () => {
  const [moonPhase, setMoonPhase] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [debug, setDebug] = useState<unknown>(null);
  const [requestUrl, setRequestUrl] = useState<string | null>(null);
  const [place, setPlace] = useState<string | null>(null);
  const [lunarCalendar, setLunarCalendar] = useState<LunarDay[]>([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [nextPhase, setNextPhase] = useState<{
    name: string;
    date: string;
  } | null>(null);
  const [calendarMonth, setCalendarMonth] = useState<number>(
    new Date().getMonth() + 1
  ); // 1-based
  const [calendarYear, setCalendarYear] = useState<number>(
    new Date().getFullYear()
  );

  // Placeholders para fechas, energía y ritual
  let phaseStart = "";
  let phaseEnd = "";
  // Obtener info de la fase actual
  let phaseInfo: (typeof moonPhases)["new moon"] | null = null;
  let phaseKey: keyof typeof moonPhases | null = null;
  if (moonPhase) {
    phaseKey = normalizePhaseKey(moonPhase);
    if (!phaseKey && moonPhase === "Waxing") phaseKey = "waxing gibbous";
    if (!phaseKey && moonPhase === "Waning") phaseKey = "waning gibbous";
  }
  phaseInfo = phaseKey ? moonPhases[phaseKey] : null;
  // Selecciono aleatoriamente una frase y un ritual
  const energyQuote = phaseInfo?.phrases
    ? phaseInfo.phrases[Math.floor(Math.random() * phaseInfo.phrases.length)]
    : "";
  const ritual = phaseInfo?.rituals
    ? phaseInfo.rituals[Math.floor(Math.random() * phaseInfo.rituals.length)]
    : "";
  const emotions = phaseInfo?.emotions || [];

  console.log("moonPhase actual:", moonPhase);
  console.log("phaseKey:", phaseKey);
  console.log("phaseInfo:", phaseInfo);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        // Obtener ciudad y país usando la API de OpenStreetMap Nominatim
        fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
        )
          .then((res) => res.json())
          .then((geo) => {
            const city =
              geo.address.city ||
              geo.address.town ||
              geo.address.village ||
              geo.address.hamlet ||
              geo.address.state ||
              "";
            const country = geo.address.country || "";
            setPlace(`${city}${city && country ? ", " : ""}${country}`);
          })
          .catch(() => setPlace(null));
        const url = `https://api.ipgeolocation.io/astronomy?apiKey=${API_KEY}&lat=${lat}&long=${lon}`;
        setRequestUrl(url);
        fetch(url)
          .then(async (response) => {
            let data;
            try {
              data = await response.json();
            } catch {
              setError("Failed to parse JSON response.");
              setDebug({
                status: response.status,
                statusText: response.statusText,
              });
              setLoading(false);
              return;
            }
            setDebug({
              status: response.status,
              statusText: response.statusText,
              data,
            });
            if (!response.ok) {
              setError("API request failed.");
              setLoading(false);
              return;
            }
            setMoonPhase(data.moon_phase);
            setLoading(false);
            // Obtener calendario lunar del mes actual
            fetchLunarCalendar(
              calendarYear,
              calendarMonth,
              lat,
              lon,
              data.moon_phase
            );
          })
          .catch((fetchErr) => {
            setError("Failed to fetch lunar data.");
            setDebug(fetchErr);
            setLoading(false);
          });
      },
      (geoErr) => {
        setError("Failed to get your location.");
        setDebug(geoErr);
        setLoading(false);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calendarMonth, calendarYear]);

  function fetchLunarCalendar(
    year: number,
    month: number,
    lat: number,
    lon: number,
    moonPhase?: string
  ) {
    const farmsenseUrl = getFarmsenseUrl(year, month, lat, lon);
    fetch(farmsenseUrl)
      .then((res) => res.json())
      .then((calendarData) => {
        const days: LunarDay[] = Array.isArray(calendarData)
          ? calendarData.map((d, i) => ({
              ...d,
              date: `${year}-${String(month).padStart(2, "0")}-${String(
                i + 1
              ).padStart(2, "0")}`,
            }))
          : Object.values(calendarData.phase).map((d: unknown, i) => ({
              ...(d as LunarDay),
              date: `${year}-${String(month).padStart(2, "0")}-${String(
                i + 1
              ).padStart(2, "0")}`,
            }));
        setLunarCalendar(days);
        // Buscar la próxima fase lunar SOLO si es el mes actual
        if (
          moonPhase &&
          year === new Date().getFullYear() &&
          month === new Date().getMonth() + 1
        ) {
          const currentIdx = days.findIndex(
            (d) =>
              d.phaseName &&
              d.phaseName.toLowerCase().replace(/ /g, "_") ===
                moonPhase.toLowerCase()
          );
          let next = null;
          for (let i = currentIdx + 1; i < days.length; i++) {
            if (days[i]?.isPhaseLimit) {
              next = days[i];
              break;
            }
          }
          if (!next) {
            // Si no hay más en el mes, buscar desde el inicio
            next = days.find((d) => d.isPhaseLimit);
          }
          if (next) {
            setNextPhase({ name: next.phaseName, date: next.date });
          }
        } else {
          setNextPhase(null);
        }
      })
      .catch(() => setLunarCalendar([]));
  }

  // Calcular el rango de fechas de la fase lunar actual
  if (moonPhase && lunarCalendar.length > 0) {
    const idxs = lunarCalendar
      .map((d, idx) => ({ d, idx }))
      .filter(
        ({ d }) =>
          d.phaseName &&
          d.phaseName.toLowerCase().replace(/ /g, "_") ===
            moonPhase.toLowerCase()
      )
      .map(({ idx }) => idx);
    const validIdxs = idxs.filter(
      (idx) => typeof idx === "number" && lunarCalendar[idx]
    );
    if (
      validIdxs.length > 0 &&
      typeof validIdxs[0] === "number" &&
      typeof validIdxs[validIdxs.length - 1] === "number"
    ) {
      phaseStart = lunarCalendar[validIdxs[0] as number]?.date || "";
      phaseEnd =
        lunarCalendar[validIdxs[validIdxs.length - 1] as number]?.date || "";
    }
  }

  let debugString = "";
  if (debug) {
    debugString =
      typeof debug === "string" ? debug : JSON.stringify(debug, null, 2);
  }

  return (
    <div className="w-full mt-4 text-text">
      <h1 className="text-3xl mb-2">lunar cycle</h1>
      <p className="text-xl text-secondaryText mb-2">
        explore the phases of the moon and their influence on your energies and
        emotions.
      </p>
      {place && (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: 14,
            color: "#444",
            marginBottom: 24,
          }}
        >
          <LocationIcon fill="#62d75f" />
          based on {place}
        </span>
      )}
      {requestUrl && (
        <div
          style={{
            fontSize: 12,
            color: "#888",
            marginBottom: 8,
            display: "none",
          }}
        >
          <b>Request URL:</b> <code>{requestUrl}</code>
        </div>
      )}
      {(loading || !moonPhase || lunarCalendar.length === 0) && (
        <div className="bg-white rounded-xl shadow-lg p-6 w-full flex flex-row gap-8 animate-pulse min-h-[220px]">
          {/* Izquierda skeleton */}
          <div className="flex flex-col items-center w-1/4 min-w-[180px]">
            <div className="w-28 h-28 bg-gray-200 rounded-full mb-4" />
            <div className="h-6 w-24 bg-gray-200 rounded mb-2" />
            <div className="flex flex-row py-2 px-4 rounded-xl bg-gray-100 items-center mt-2 w-32 h-8" />
            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              <div className="bg-gray-100 text-xs rounded-full px-3 py-1 w-16 h-5" />
              <div className="bg-gray-100 text-xs rounded-full px-3 py-1 w-16 h-5" />
              <div className="bg-gray-100 text-xs rounded-full px-3 py-1 w-20 h-5" />
            </div>
          </div>
          {/* Derecha skeleton */}
          <div className="flex flex-col justify-center w-2/3 gap-4 relative">
            <div>
              <div className="h-4 w-32 bg-gray-200 rounded mb-2" />
              <div className="h-4 w-24 bg-gray-200 rounded" />
            </div>
            <div className="bg-gray-50 rounded-xl p-4 flex flex-col gap-2 border border-gray-100">
              <div className="h-5 w-48 bg-gray-200 rounded mb-2" />
            </div>
            <div className="bg-[#F6DFD5] rounded-xl p-4 flex flex-col gap-2 border border-[#f3cbb2]">
              <div className="h-4 w-32 bg-gray-200 rounded mb-2" />
              <div className="h-4 w-40 bg-gray-200 rounded" />
            </div>
            <div className="mt-2 h-4 w-40 bg-gray-200 rounded" />
            <div className="absolute top-0 right-0 bg-gray-200 rounded-xl shadow w-36 h-10" />
          </div>
        </div>
      )}
      {error && (
        <div style={{ color: "red", marginBottom: 8 }}>
          <p>{error}</p>
          {debugString && (
            <pre
              style={{
                background: "#f5f5f5",
                color: "#333",
                padding: 8,
                borderRadius: 4,
                overflowX: "auto",
              }}
            >
              {debugString}
            </pre>
          )}
        </div>
      )}
      {!loading && !error && moonPhase && lunarCalendar.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6 w-full flex flex-row gap-8">
          {/* Izquierda */}
          <div className="flex flex-col items-center w-1/4 min-w-[180px]">
            <h2 className="text-lg font-bold mb-2">current phase</h2>
            <img
              src={
                MOON_PHASE_IMAGES[formatPhaseName(moonPhase)] ||
                MOON_PHASE_IMAGES["New Moon"]
              }
              alt={moonPhase}
              className="w-28 h-28 object-contain"
            />
            <div className="flex flex-row py-2 px-4 rounded-xl bg-[#F6DFD5] items-center mt-2">
              <span className="text-base font-semibold">
                {formatPhaseName(moonPhase)}
              </span>
              <span className="text-3xl mt-1">
                {MOON_PHASE_EMOJIS[moonPhase] || "🌑"}
              </span>
            </div>
            {/* Emociones */}
            {emotions.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2 justify-center">
                {emotions.map((e: string) => (
                  <span
                    key={e}
                    className="bg-gray-100 text-xs rounded-full px-3 py-1 text-gray-600 border border-gray-200"
                  >
                    {e}
                  </span>
                ))}
              </div>
            )}
          </div>
          {/* Derecha */}
          <div className="flex flex-col justify-center w-2/3 gap-4 relative">
            <div>
              <span className="font-semibold">from:</span> {phaseStart}
              <br />
              <span className="font-semibold">to:</span> {phaseEnd}
            </div>
            <div className="bg-gray-50 rounded-xl p-4 flex flex-col gap-2 border border-gray-100">
              <span className="text-lg font-medium text-gray-800">
                {energyQuote}
              </span>
            </div>
            <div className="bg-[#F6DFD5] rounded-xl p-4 flex flex-col gap-2 border border-[#f3cbb2]">
              <span className="font-semibold text-[#a05a2c]">
                recommended ritual:
              </span>
              <span className="text-gray-700">{ritual}</span>
            </div>
            {/* Próxima fase lunar */}
            {nextPhase && (
              <div className="mt-2 text-sm text-gray-700">
                <b>next phase:</b> {formatPhaseName(nextPhase.name)} on{" "}
                {formatPrettyDate(nextPhase.date)}
              </div>
            )}
            {/* Botón para abrir el calendario lunar */}
            <button
              className="flex gap-2 absolute top-0 right-0 bg-[#F6DFD5] hover:bg-[#f3cbb2] text-[#a05a2c] font-semibold py-2 px-4 rounded-xl shadow transition"
              onClick={() => setShowCalendar(true)}
            >
              <CalendarIcon />
              lunar calendar
            </button>
          </div>
          {/* Modal calendario lunar */}
          <BaseModal
            isOpen={showCalendar}
            onClose={() => setShowCalendar(false)}
            title="lunar calendar"
          >
            <div className="flex flex-row items-center justify-between mb-4">
              <button
                className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold"
                onClick={() => {
                  if (calendarMonth === 1) {
                    setCalendarMonth(12);
                    setCalendarYear((y) => y - 1);
                  } else {
                    setCalendarMonth((m) => m - 1);
                  }
                }}
              >
                ◀
              </button>
              <span className="text-lg font-semibold">
                {monthNames[calendarMonth - 1]} {calendarYear}
              </span>
              <button
                className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold"
                onClick={() => {
                  if (calendarMonth === 12) {
                    setCalendarMonth(1);
                    setCalendarYear((y) => y + 1);
                  } else {
                    setCalendarMonth((m) => m + 1);
                  }
                }}
              >
                ▶
              </button>
            </div>
            <LunarMonthGrid lunarCalendar={lunarCalendar} />
          </BaseModal>
        </div>
      )}
    </div>
  );
};

// Componente auxiliar para mostrar el calendario mensual en cuadrícula
function LunarMonthGrid({ lunarCalendar }: { lunarCalendar: LunarDay[] }) {
  console.log("lunarCalendar", lunarCalendar);
  if (!lunarCalendar.length || !lunarCalendar[0] || !lunarCalendar[0].date)
    return (
      <div style={{ color: "red", padding: 16 }}>
        No hay datos de calendario lunar
      </div>
    );
  const firstDay = new Date(lunarCalendar[0].date);
  const startWeekDay = (firstDay.getDay() + 6) % 7; // Lunes=0, Domingo=6
  const weeks: (LunarDay | null)[][] = [];
  let week: (LunarDay | null)[] = Array(startWeekDay).fill(null);
  lunarCalendar.forEach((d) => {
    week.push(d);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  });
  if (week.length > 0) {
    while (week.length < 7) week.push(null);
    weeks.push(week);
  }
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return (
    <div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((wd) => (
          <div key={wd} className="text-center font-bold text-sm py-1">
            {wd}
          </div>
        ))}
      </div>
      {weeks.map((w, i) => (
        <div key={i} className="grid grid-cols-7 gap-1 mb-1">
          {w.map((d, j) =>
            d && typeof d.phaseName === "string" ? (
              <div
                key={j}
                className={`rounded-lg p-2 text-center text-xs flex flex-col items-center justify-center ${
                  d.isPhaseLimit ? "bg-[#F6DFD5] font-bold" : "bg-gray-50"
                }`}
                style={{ minHeight: 56 }}
              >
                <div className="font-semibold text-base">
                  {d.date ? Number(d.date.split("-")[2]) : ""}
                </div>
                <div>{d.phaseName ? formatPhaseName(d.phaseName) : ""}</div>
                <div style={{ fontSize: 20 }}>
                  {d.phaseName ? MOON_PHASE_EMOJIS[d.phaseName] || "🌑" : ""}
                </div>
              </div>
            ) : (
              <div key={j} />
            )
          )}
        </div>
      ))}
    </div>
  );
}

function normalizePhaseKey(phase: string): keyof typeof moonPhases | null {
  // Convierte a minúsculas y reemplaza _ por espacio
  const formatted = phase.toLowerCase().replace(/_/g, " ");
  return formatted in moonPhases
    ? (formatted as keyof typeof moonPhases)
    : null;
}

function formatPrettyDate(dateStr: string): string {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-");
  const date = new Date(Number(year), Number(month) - 1, Number(day));
  return date
    .toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    .toLowerCase();
}

export default LunarCycleCard;
