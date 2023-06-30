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
  images: {
    domains: [
      'w3s.link'
    ]
  },
  webpack:  (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    // Important: return the modified config
    config.module.rules.push({
      test: /\.cdc/,
      type: "asset/source",
    })
    return config
  },
};

module.exports = nextConfig;
