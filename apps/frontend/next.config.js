/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: "",
  transpilePackages: [
    "@excluence-repo/discord-connector"
  ]
};

module.exports = nextConfig;
