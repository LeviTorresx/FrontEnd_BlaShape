import { ReactNode } from "react";

type Props = {
  title: string;
  icon: ReactNode;
};

export default function FeatureCard({ title, icon }: Props) {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-purple-900 border border-purple-700 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
      <div className="flex items-center justify-center w-14 h-14 text-white mb-4">
        {icon}
      </div>
      <h3 className="text-sm font-semibold text-white">{title}</h3>
    </div>
  );
}
