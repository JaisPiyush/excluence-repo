const CadencePlugin = require('cadence-webpack-plugin')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: "",
  transpilePackages: [
    "@excluence-repo/discord-connector",
    "@excluence-repo/flow",
    "@excluence-repo/db"
  ],
  webpack:  (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    // Important: return the modified config
    config.plugins = [
      new CadencePlugin(),
      ...config.plugins
    ]
    return config
  },
};

module.exports = nextConfig;
