/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow mobile devices on local network to access dev server
  allowedDevOrigins: [
    '192.168.1.*',
    '192.168.0.*',
    '10.0.0.*',
    '10.0.1.*',
  ],
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'http',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'images.tokopedia.net',
      },
      {
        protocol: 'http',
        hostname: 'images.tokopedia.net',
      }
    ],
  },
}

export default nextConfig
