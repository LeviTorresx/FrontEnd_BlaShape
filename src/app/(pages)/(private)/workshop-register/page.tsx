
import Stepper from "../../../components/ui/Stepper";

export default function WorkshopRegister() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <Stepper steps={[
    { step: "Seleccionar producto", content: <p>Contenido paso 1</p> },
    { step: "Revisar detalles", content: <p>Contenido paso 2</p> },
    { step: "Confirmar compra", content: <p>Contenido paso 3</p> },
  ]} />
    </div>
  )
}
