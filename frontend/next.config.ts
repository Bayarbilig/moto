// domains: ["res.cloudinary.com"],
// next.config.js
const { i18n } = require("./next-i18next.config");
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
