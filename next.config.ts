import type { NextConfig } from "next";

// Define trusted external sources
const trustedSources = [
  "'self'",
  "https://static.cdn.prismic.io",
  "https://images.prismic.io",
  "https://*.prismic.io",
  "https://images.unsplash.com",
  "https://*.vercel.app",
];

const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' ${trustedSources.join(' ')};
  style-src 'self' 'unsafe-inline' ${trustedSources.join(' ')};
  img-src 'self' blob: data: ${trustedSources.join(' ')};
  font-src 'self' data:;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-src 'self' https://*.prismic.io;
  frame-ancestors 'self';
  block-all-mixed-content;
  upgrade-insecure-requests;
`;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.prismic.io" },
      { protocol: "https", hostname: "**.vercel.app" },
    ],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: cspHeader.replace(/\s{2,}/g, " ").trim(),
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN", // allows framing within your own site
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
