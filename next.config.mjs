/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      'synonymous-knee.localsite.io',
      'via.placeholder.com',
      'placehold.co',
      'images.unsplash.com',
      'plus.unsplash.com',
    ],
    unoptimized: true,
  },
  // Nuova posizione della proprietà
  serverExternalPackages: ["node:https", "sharp"],
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Configurazione per ignorare gli errori SSL in ambiente di sviluppo
      config.experiments = {
        ...config.experiments,
        topLevelAwait: true,
      }
    }
    return config
  },
}

export default nextConfig
