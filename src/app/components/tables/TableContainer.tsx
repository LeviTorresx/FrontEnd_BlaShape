import { ReactNode, useState } from "react";
import { HiOutlineTable } from "react-icons/hi";

interface TableContainerProps<T> {
  title: string;
  data?: T[];
  icon?: ReactNode;
  itemsPerPage?: number;
  children: (paginatedData: T[]) => ReactNode; 
}

export default function TableContainer<T>({
  title,
  data = [],
  itemsPerPage = 5,
  icon = <HiOutlineTable className="text-purple-600 text-xl" />,
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
     <section className="w-full h-full bg-white rounded-2xl shadow-md border border-gray-100 p-6 flex flex-col transition-all">
      {/* 🔹 Encabezado mejorado */}
      <div className="flex items-center gap-3 ">
        <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-purple-100 to-purple-200 shadow-sm">
          {icon}
        </div>
        <h2 className="text-xl font-semibold text-gray-800 tracking-tight">
          {title}
        </h2>
      </div>

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
                : "bg-purple-100 text-purple-900 hover:bg-purple-200"
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
                  ? "bg-purple-900 text-white shadow-sm"
                  : "bg-purple-100 text-purple-900 hover:bg-purple-200"
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
                : "bg-purple-100 text-purple-900 hover:bg-purple-200"
            }`}
          >
            Siguiente
          </button>
        </div>
      )}
    </section>
  );
}
