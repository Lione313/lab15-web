'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { getProducto, updateProducto } from '@/lib/api';

import { TagIcon, CurrencyDollarIcon, ArchiveBoxIcon } from '@heroicons/react/24/solid';

export default function EditarProducto() {
  const router = useRouter();
  const { codProducto } = useParams();

  const [form, setForm] = useState({
    nomPro: '',
    precioProducto: '',
    stockProducto: ''
  });

  useEffect(() => {
    getProducto(codProducto).then(data => setForm(data));
  }, [codProducto]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await updateProducto(codProducto, {
      ...form,
      precioProducto: parseFloat(form.precioProducto),
      stockProducto: parseInt(form.stockProducto),
    });

    router.push('/productos');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full space-y-6"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Editar Producto</h2>

        {/* Nombre */}
        <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-green-500">
          <TagIcon className="w-5 h-5 text-gray-400 mr-3" />
          <input
            className="flex-grow outline-none"
            placeholder="Nombre"
            value={form.nomPro}
            onChange={(e) => setForm({ ...form, nomPro: e.target.value })}
            required
          />
        </div>

        {/* Precio */}
        <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-green-500">
          <CurrencyDollarIcon className="w-5 h-5 text-gray-400 mr-3" />
          <input
            className="flex-grow outline-none"
            placeholder="Precio"
            type="number"
            step="0.01"
            min="0"
            value={form.precioProducto}
            onChange={(e) => setForm({ ...form, precioProducto: e.target.value })}
            required
          />
        </div>

        {/* Stock */}
        <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-green-500">
          <ArchiveBoxIcon className="w-5 h-5 text-gray-400 mr-3" />
          <input
            className="flex-grow outline-none"
            placeholder="Stock"
            type="number"
            min="0"
            value={form.stockProducto}
            onChange={(e) => setForm({ ...form, stockProducto: e.target.value })}
            required
          />
        </div>

        {/* Botón */}
       <button
  type="submit"
  className="w-full text-white font-semibold py-3 rounded-md shadow-md
    bg-gradient-to-r from-red-600 via-blue-600 to-black
    hover:from-red-700 hover:via-blue-700 hover:to-gray-900
    transition-colors duration-300"
>
  Guardar Cambios
</button>

      </form>
    </div>
  );
}
