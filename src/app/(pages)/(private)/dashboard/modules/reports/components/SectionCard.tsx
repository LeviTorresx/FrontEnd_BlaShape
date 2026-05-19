"use client";

import { ReactNode } from "react";

interface SectionCardProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  className?: string;
}

export default function SectionCard({
  title,
  icon,
  children,
  className = "",
}: SectionCardProps) {
  return (
    <div
      className={`bg-white border border-gray-100 rounded-2xl shadow-sm p-6 flex flex-col gap-4 ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
        <span className="text-purple-600 text-lg">{icon}</span>
        <h3 className="text-base font-semibold text-gray-800 tracking-tight">
          {title}
        </h3>
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}