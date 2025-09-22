/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'yndfyuqieittgxiauokw.supabase.co', // ← 프로젝트 ref
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  serverActions: {
    bodySizeLimit: '1mb',
  },
};

export default nextConfig;
