import Image from "next/image";

export default function ImageSection() {
  const image = "/images/despiece_draw.jpg";

  return (
    <div className="relative flex justify-center">
      {/* Fondo duplicado desenfocado */}
      <div className="absolute inset-0 flex justify-center items-center">
        <Image
          src={image}
          alt="Imagen de corte desenfocada"
          width={600}
          height={350}
          className="rounded-lg blur-lg opacity-70 scale-x-110 scale-y-105"
        />
      </div>

      {/* Imagen principal */}
      <Image
        src={image}
        alt="Imagen de corte"
        width={600}
        height={350}
        className="relative rounded-lg shadow-xl"
      />
    </div>
  );
}
