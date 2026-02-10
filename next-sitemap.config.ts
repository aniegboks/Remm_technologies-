import type { IConfig } from 'next-sitemap';

const config: IConfig = {
  siteUrl: 'https://remm-technologies-partner.vercel.app', // your canonical URL
  generateRobotsTxt: true,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
};

export default config;
