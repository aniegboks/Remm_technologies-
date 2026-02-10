import type { NextConfig } from "next";

// Define which sources we trust
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
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: ${trustedSources.join(' ')};
    font-src 'self' data:;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'self' https://*.prismic.io;
    block-all-mixed-content;
    upgrade-insecure-requests;
`;

const nextConfig: NextConfig = {
  images: {
    // Note: 'domains' is deprecated in newer Next.js. Use 'remotePatterns' instead.
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'images.prismic.io' },
      { protocol: 'https', hostname: '**.vercel.app' },
    ],
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader.replace(/\s{2,}/g, ' ').trim(),
          },
          {
            key: 'X-Frame-Options',
            // Changed from DENY to SAMEORIGIN to allow internal framing 
            // The 'frame-ancestors' in CSP above handles the Prismic preview security.
            value: 'SAMEORIGIN', 
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          }
        ],
      },
    ];
  },
};

export default nextConfig;