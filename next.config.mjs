/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  webpack: (config, { dev, isServer }) => {
    // Deaktiviere Source Maps in der Produktion
    if (!dev) {
      config.devtool = false;
    }
    
    // MongoDB-spezifische Konfiguration
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        mongodb: false,
      };
    }
    
    return config;
  },
  // ESLint-Konfiguration
  eslint: {
    // Warnung: Dies ignoriert ESLint-Fehler während des Builds.
    // Verwenden Sie dies nur vorübergehend und beheben Sie die Fehler später.
    ignoreDuringBuilds: true,
  },
  // Umgebungsvariablen
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
  },
  // Zusätzliche Konfigurationen können hier hinzugefügt werden
}

export default nextConfig;