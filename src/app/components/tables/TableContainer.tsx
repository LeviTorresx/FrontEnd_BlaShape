import { ReactNode, useState } from "react";

interface TableContainerProps<T> {
  title: string;
  data?: T[]; // 🔹 datos que se van a paginar
  itemsPerPage?: number;
  children: (paginatedData: T[]) => ReactNode; // 🔹 children recibe la data ya paginada
}

export default function TableContainer<T>({
  title,
  data = [],
  itemsPerPage = 5,
  children,
}: TableContainerProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <section className="w-full h-full bg-white rounded-2xl shadow-sm border border-gray-200 p-4 flex flex-col">
      {/* Título */}
      <h2 className="text-lg font-semibold text-gray-800 mb-4">{title}</h2>

      {/* Contenido (la tabla o cards) */}
      <div className="flex-1">{children(paginatedData)}</div>

      {/* Paginación (solo si hay más de una página) */}
      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center items-center gap-2 mt-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
              currentPage === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-purple-100 text-purple-700 hover:bg-purple-200"
            }`}
          >
            Anterior
          </button>

          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                currentPage === i + 1
                  ? "bg-purple-600 text-white shadow-sm"
                  : "bg-purple-100 text-purple-700 hover:bg-purple-200"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
              currentPage === totalPages
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-purple-100 text-purple-700 hover:bg-purple-200"
            }`}
          >
            Siguiente
          </button>
        </div>
      )}
    </section>
  );
}
