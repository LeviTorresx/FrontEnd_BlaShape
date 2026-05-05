"use client";

import { useEffect, useRef, useState } from "react";
import { FaSearch, FaStoreAlt, FaMapMarkerAlt, FaTimes } from "react-icons/fa";
import { useLazySearchPublicWorkshopsQuery } from "@/app/services/workshopApi";
import { WorkshopPublic } from "@/app/types/Workshop";
import { getErrorMessage } from "@/app/services/getErrorMessages";

interface WorkshopSelectorProps {
  selected: WorkshopPublic | null;
  onSelect: (workshop: WorkshopPublic | null) => void;
}

const MIN_QUERY_LENGTH = 3;
const DEBOUNCE_MS = 350;

export default function WorkshopSelector({
  selected,
  onSelect,
}: WorkshopSelectorProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<WorkshopPublic[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const [search, { isFetching }] = useLazySearchPublicWorkshopsQuery();
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Cerrar al hacer click afuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Búsqueda con debounce
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (query.trim().length < MIN_QUERY_LENGTH) {
      setResults([]);
      setError(null);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      setError(null);
      try {
        const data = await search(query.trim()).unwrap();
        setResults(data);
        setIsOpen(true);
      } catch (err) {
        setError(getErrorMessage(err));
        setResults([]);
      }
    }, DEBOUNCE_MS);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, search]);

  const handleSelect = (workshop: WorkshopPublic) => {
    onSelect(workshop);
    setQuery("");
    setResults([]);
    setIsOpen(false);
  };

  const handleClear = () => {
    onSelect(null);
    setQuery("");
    setResults([]);
  };

  // Vista cuando ya hay un taller seleccionado
  if (selected) {
    return (
      <div className="bg-purple-50 border-2 border-purple-300 rounded-xl p-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-full bg-purple-200 flex items-center justify-center shrink-0">
            <FaStoreAlt className="text-purple-700" />
          </div>
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-wide text-purple-700 font-semibold">
              Taller seleccionado
            </p>
            <p className="font-semibold text-gray-900 truncate">
              {selected.name}
            </p>
            <p className="text-xs text-gray-600 flex items-center gap-1 mt-0.5 truncate">
              <FaMapMarkerAlt className="text-purple-500 shrink-0" />
              <span className="truncate">{selected.address}</span>
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleClear}
          className="shrink-0 text-purple-700 hover:bg-purple-200 rounded-full p-2 transition-colors"
          title="Cambiar taller"
        >
          <FaTimes />
        </button>
      </div>
    );
  }

  // Vista del buscador
  return (
    <div ref={containerRef} className="relative">
      <label className="block text-sm font-medium text-gray-800 mb-1">
        Taller destinatario
      </label>

      <div className="relative">
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-700" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setIsOpen(true)}
          placeholder="Escribe el nombre del taller (mín. 3 letras)"
          className="w-full pl-10 pr-4 py-2.5 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-purple-900"
        />
      </div>

      {/* Mensajes de estado */}
      {query.length > 0 && query.length < MIN_QUERY_LENGTH && (
        <p className="text-xs text-gray-500 mt-1">
          Escribe al menos {MIN_QUERY_LENGTH} caracteres
        </p>
      )}

      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}

      {/* Dropdown de resultados */}
      {isOpen && query.length >= MIN_QUERY_LENGTH && (
        <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-72 overflow-y-auto">
          {isFetching ? (
            <div className="p-4 text-center text-sm text-gray-500">
              Buscando...
            </div>
          ) : results.length === 0 ? (
            <div className="p-4 text-center text-sm text-gray-500">
              No encontramos talleres con ese nombre
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {results.map((w) => (
                <li key={w.workshopId}>
                  <button
                    type="button"
                    onClick={() => handleSelect(w)}
                    className="w-full text-left p-3 hover:bg-purple-50 transition-colors flex items-start gap-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center shrink-0 mt-0.5">
                      <FaStoreAlt className="text-purple-700 text-xs" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-gray-900 truncate">
                        {w.name}
                      </p>
                      <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                        <FaMapMarkerAlt className="text-gray-400 shrink-0" />
                        <span className="truncate">{w.address}</span>
                      </p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}