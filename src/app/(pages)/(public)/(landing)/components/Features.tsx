import FeatureCard from "@/app/components/ui/FeatureCard";
import { FaRecycle } from "react-icons/fa6";
import { FaStopwatch } from "react-icons/fa6";
import { FaNewspaper } from "react-icons/fa6";
import { FaScissors } from "react-icons/fa6";

const features = [
  {
    title: "Cortes optimizados automáticamente",
    icon: <FaScissors size={30} />,
  },
  { title: "Reducción de desperdicios", icon: <FaRecycle size={30} /> },
  { title: "Ahorra en tiempo y costos", icon: <FaStopwatch size={30} /> },
  { title: "Historial de todos tus cortes", icon: <FaNewspaper size={30} /> },
];

export default function Features() {
  return (
    <div className="grid grid-cols-2 gap-6 px-10 mt-10">
      {features.map((f, i) => (
        <FeatureCard key={i} title={f.title} icon={f.icon} />
      ))}
    </div>
  );
}
