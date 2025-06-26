import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default function FancyButton() {
  return (
    <button
      className="
        group
        flex items-center gap-2
        bg-gray-100 text-blue-700 font-semibold
        px-6 py-3 rounded-full shadow-lg
        hover:bg-red-700 hover:text-gray-100
        transition-colors duration-100 ease-in-out
        relative overflow-hidden
      "
      aria-label="Empezar ahora"
    >
      {/* Texto con animación de posición */}
      <span className="order-1 group-hover:order-2 transition-all duration-300 ease-in-out">
        Empezar ahora
      </span>

      {/* Icono con animación de posición y desplazamiento */}
      <ArrowRightIcon
        className="
          order-2 group-hover:order-1 
          w-5 h-5 
          transition-all duration-300 ease-in-out
          group-hover:translate-x-[-6px]
        "
      />
    </button>
  );
}
