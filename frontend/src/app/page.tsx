import Image from "next/image";
import { SunIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import  FancyButton from '../components/FancyButton';
export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-start items-center bg-white text-gray-800 p-8 gap-8 pt4">
      <h1 className="flex items-center text-5xl font-extrabold tracking-tight drop-shadow-lg animate-fadeIn gap-4">
        <SunIcon className="w-12 h-12 text-yellow-400" />
        ¡Bienvenido a Mi Aplicación!
      </h1>
      <p className="text-lg max-w-xl text-center opacity-90 animate-fadeIn delay-200">
        Aquí podrás explorar todas las funcionalidades increíbles que hemos preparado para ti. ¡Disfruta la experiencia!
      </p>
      <FancyButton></FancyButton>
    </main>
  );
}
