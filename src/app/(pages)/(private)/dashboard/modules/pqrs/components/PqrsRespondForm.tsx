"use client";

import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { Pqrs } from "@/app/types/Pqrs";
import Button from "@/app/components/ui/Button";

interface Props {
  pqrs: Pqrs;
  onSubmit: (response: string) => void | Promise<void>;
}

export default function PqrsRespondForm({ pqrs, onSubmit }: Props) {
  const [response, setResponse] = useState(pqrs.response ?? "");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!response.trim()) {
      setError("La respuesta no puede estar vacía");
      return;
    }
    setError(null);
    setIsSubmitting(true);
    try {
      await onSubmit(response.trim());
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Resumen del mensaje original */}
      <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm">
        <p className="text-xs text-gray-400 uppercase tracking-wide">
          Mensaje del usuario
        </p>
        <p className="text-gray-700 mt-1 whitespace-pre-wrap line-clamp-4">
          {pqrs.message}
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tu respuesta
        </label>
        <textarea
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          rows={6}
          maxLength={2000}
          placeholder="Escribe una respuesta clara y concreta..."
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-900 resize-y"
        />
        <p className="text-xs text-gray-400 mt-1 text-right">
          {response.length}/2000
        </p>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <Button
        type="submit"
        label={isSubmitting ? "Enviando..." : "Enviar respuesta"}
        icon={<FaPaperPlane />}
        disabled={isSubmitting}
        className="w-full"
      />
    </form>
  );
}