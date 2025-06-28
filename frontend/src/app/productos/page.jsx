'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PencilSquareIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/solid';

export default function ProductosPage() {
  const [productos, setProductos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [productoEliminar, setProductoEliminar] = useState(null);
  const router = useRouter();
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  const fetchProductos = async () => {
    try {
      const res = await fetch(BASE_URL);
      if (!res.ok) throw new Error('Error al obtener productos');
      const data = await res.json();
      setProductos(data);
    } catch (error) {
      console.error(error);
      alert('No se pudieron cargar los productos.');
    }
  };

  const abrirModalEliminar = (codProducto) => {
    setProductoEliminar(codProducto);
    setModalOpen(true);
  };

  const cerrarModal = () => {
    setModalOpen(false);
    setProductoEliminar(null);
  };

  const eliminarProducto = async () => {
    try {
      const res = await fetch(`${BASE_URL}/${productoEliminar}`, {
        method: 'DELETE',
      });

      if (res.status === 204) {
        alert('Producto eliminado');
        fetchProductos();
      } else {
        const data = await res.json();
        alert('Error al eliminar: ' + data.message);
      }
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      alert('Error al eliminar producto');
    }
    cerrarModal();
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  return (
    <div className="p-6 relative">
      <h1 className="text-4xl font-bold mb-6 text-black text-center">Lista de Productos</h1>

      <div className="flex justify-center mb-6">
        <button
          className="rounded-full px-6 py-3 bg-black text-white hover:bg-white hover:text-black hover:border hover:border-black/50 shadow-md transition duration-300 ease-in-out"
          onClick={() => router.push('/productos/new')}
        >
          + Agregar Producto
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-700 mt-10">
        <table className="min-w-full border-collapse text-black">
          <thead className="bg-[#0d0d0d] text-white">
            <tr>
              {['Código', 'Nombre', 'Precio', 'Stock', 'Acciones'].map((title) => (
                <th key={title} className="border border-gray-700 px-4 py-3 text-left font-semibold">
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {productos.length === 0 && (
              <tr>
                <td colSpan={5} className="p-6 text-center text-gray-400">
                  No hay productos disponibles.
                </td>
              </tr>
            )}

            {productos.map((prod) => (
              <tr key={prod.codProducto} className="bg-white hover:bg-[#e3eff2] transition-colors duration-300">
                <td className="border border-gray-700 px-4 py-3">{prod.codProducto}</td>
                <td className="border border-gray-700 px-4 py-3">{prod.nomPro}</td>
                <td className="border border-gray-700 px-4 py-3">${prod.precioProducto}</td>
                <td className="border border-gray-700 px-4 py-3">{prod.stockProducto}</td>
                <td className="border border-gray-700 px-4 py-3 space-x-2 flex justify-center">
                  <button
                    onClick={() => router.push(`/productos/${prod.codProducto}/edit`)}
                    className="flex items-center gap-1 px-3 py-1 bg-yellow-500 hover:bg-yellow-600 rounded transition-colors duration-300"
                    aria-label={`Editar producto ${prod.nomPro}`}
                  >
                    <PencilSquareIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => abrirModalEliminar(prod.codProducto)}
                    className="flex items-center gap-1 px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded transition-colors duration-300"
                    aria-label={`Eliminar producto ${prod.nomPro}`}
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <>
          <div className="fixed inset-0 backdrop-blur-md z-50" onClick={cerrarModal} />
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full text-center relative">
              <button
                onClick={cerrarModal}
                className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 transition"
                aria-label="Cerrar modal"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
              <h2 className="text-xl font-bold mb-4">Confirmar eliminación</h2>
              <p className="mb-6">¿Estás seguro que deseas eliminar este producto?</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={cerrarModal}
                  className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
                <button
                  onClick={eliminarProducto}
                  className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
