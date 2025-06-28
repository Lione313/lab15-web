/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  images: {
    domains: ['lab15-web-n72m.onrender.com'], // Agrega otros si usas imágenes externas
  },
};

module.exports = nextConfig;
