// Detecta si hay una URL definida en entorno (producción). Si no, usa localhost:3001
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/productos";

// Obtiene todos los productos (GET /api/productos)
export async function getProductos() {
  const res = await fetch(BASE_URL);
  return res.json();
}

export async function getProducto(id) {
  const res = await fetch(`${BASE_URL}/${id}`);
  return res.json();
}

export async function createProducto(producto) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(producto)
  });
  return res.json();
}

export async function updateProducto(id, producto) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(producto)
  });
  return res.json();
}

export async function deleteProducto(id) {
  await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE'
  });
}
