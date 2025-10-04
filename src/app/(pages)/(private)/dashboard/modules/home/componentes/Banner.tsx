
export default function Banner() {
  return (
   <section className="bg-gradient-to-r from-purple-950 to-purple-500 rounded-xl p-8 text-white shadow-md mb-4">
        <h2 className="text-2xl font-semibold mb-2">
          Bienvenido al Panel de Control 
        </h2>
        <p className="text-sm opacity-90">
          Gestiona tus muebles, clientes y reportes desde un solo lugar.
        </p>
        <button className="mt-6 px-5 py-2 bg-white text-purple-700 font-medium rounded-xl hover:bg-purple-50 transition">
          Ver más
        </button>
      </section>
  )
}
