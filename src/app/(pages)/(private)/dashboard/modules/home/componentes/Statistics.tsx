import { ReactNode } from "react";

interface Stats {
  label: string;
  value: string;
  color: string;
  icon?: ReactNode;
}

type StatisticsProps = {
  stats: Stats[];
};

export default function Statistics({ stats }: StatisticsProps) {
  return (
    <section className="w-full h-full p-3 flex flex-col overflow-hidden">
      {/* 🔹 Título */}
      <h2 className="text-sm sm:text-base font-semibold text-gray-700 mb-2 text-center sm:text-left tracking-tight">
        Estadísticas Generales del Taller
      </h2>

      {/* 🔹 Grid de estadísticas */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 h-full overflow-hidden">
        {stats.map((item) => (
          <div
            key={item.label}
            className={`
              flex flex-col justify-center items-center
              bg-gradient-to-br ${item.color}
              text-purple-950 rounded-xl p-3 sm:p-4
              shadow-sm hover:shadow-md
              transition-all duration-300 hover:-translate-y-1
              h-full
            `}
          >
            {item.icon && (
              <div className="flex items-center justify-center rounded-full bg-white/70 p-2 shadow-inner">
                <span className="text-purple-800 text-2xl sm:text-3xl">
                  {item.icon}
                </span>
              </div>
            )}

            <p className="text-xs sm:text-sm font-medium  tracking-wide text-center">
              {item.label}
            </p>
            <p className="text-xl sm:text-2xl font-semibold mt-1">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
