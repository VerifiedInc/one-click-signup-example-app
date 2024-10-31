/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  transpilePackages: ['@verifiedinc/shared-ui-elements'],

  async headers() {
    return [
      {
        source: '/animations/:all*(json|lottie)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            // Cache for 1 year
            value: 'public, max-age=31536000, must-revalidate',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
