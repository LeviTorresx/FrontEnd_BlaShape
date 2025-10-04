interface WorkshopProps {
  name: string;
  nit: string;
  phone: string;
  address: string;
}

type Props = {
  workshop: WorkshopProps;
};

export default function SummaryWorkshop({ workshop }: Props) {
  return (
    <div className="bg-gray-200 p-6 rounded-xl shadow-sm">
      <h3 className="font-semibold text-gray-700 mb-4">Resumen del taller</h3>
      <ul className="text-sm text-gray-600 space-y-1">
        <li>
          <strong>Nombre:</strong> {workshop.name}
        </li>
        <li>
          <strong>NIT:</strong> {workshop.nit}
        </li>
        <li>
          <strong>Teléfono:</strong> {workshop.phone}
        </li>
        <li>
          <strong>Direccion:</strong> {workshop.address}
        </li>
      </ul>
    </div>
  );
}
