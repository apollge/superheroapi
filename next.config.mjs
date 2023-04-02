/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env.mjs"));

/** @type {import("next").NextConfig} */
const config = {
  env: {
    ACCESS_TOKEN: "",
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.superherodb.com",
      },
    ],
  },

  reactStrictMode: true,

  // Set default page from '/' to '/search'
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/search",
        permanent: true,
      },
    ];
  },

  /**
   * If you have the "experimental: { appDir: true }" setting enabled, then you
   * must comment the below `i18n` config out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
};
export default config;
