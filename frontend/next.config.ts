import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/sign-in",
        destination: "/login",
        permanent: true,
      },
      {
        source: "/login/sign-in",
        destination: "/login",
        permanent: true,
      },
      {
        source: "/sign-up",
        destination: "/register",
        permanent: true,
      },
      {
        source: "/course-list",
        destination: "/course-all",
        permanent: true,
      },
      {
        source: "/student-index",
        destination: "/student/dashboard",
        permanent: true,
      },
      {
        source: "/student-course-list",
        destination: "/student/courses",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
