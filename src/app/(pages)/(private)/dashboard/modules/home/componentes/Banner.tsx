import Image from "next/image";

export default function Banner() {
  return (
    <section className="bg-gradient-to-r from-purple-600 via-purple-800 to-purple-950 rounded-2xl p-6 sm:p-8 text-white shadow-md h-full flex flex-col justify-center">
      <div className="flex items-center gap-3 sm:gap-4">
        <Image
          src="/images/logo2W.webp" // 🔹 Reemplaza con la ruta de tu logotipo
          alt="Logo del taller"
          width={48}
          height={48}
          className=" shadow-sm"
        />
        <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
          Bienvenido a tu espacio de trabajo
        </h2>
      </div>

      <p className="mt-3 text-sm sm:text-base opacity-90 leading-relaxed">
        Gestiona tus muebles, clientes y reportes desde un solo lugar.
      </p>
    </section>
  );
}
