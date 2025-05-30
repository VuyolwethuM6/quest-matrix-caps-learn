import fs from 'fs';
import path from 'path';
import { config } from 'dotenv';
import generateSitemap from '../src/utils/generateSitemap';

// Load environment variables from .env file
config();

// Default URL for development
const BASE_URL = process.env.VITE_APP_URL || 'https://viva-vts.vercel.app';

const urls = [
  {
    url: '/',
    changefreq: 'daily',
    priority: 1.0
  },
  {
    url: '/login',
    changefreq: 'monthly',
    priority: 0.8
  },
  {
    url: '/dashboard',
    changefreq: 'daily',
    priority: 0.9
  },
  {
    url: '/curriculum',
    changefreq: 'weekly',
    priority: 0.9
  },
  {
    url: '/profile',
    changefreq: 'weekly',
    priority: 0.7
  },
  {
    url: '/tutor',
    changefreq: 'weekly',
    priority: 0.8
  },
  {
    url: '/badges',
    changefreq: 'weekly',
    priority: 0.7
  },
  {
    url: '/exams',
    changefreq: 'weekly',
    priority: 0.8
  },
  {
    url: '/topics',
    changefreq: 'weekly',
    priority: 0.8
  },
  {
    url: '/caps-buddy',
    changefreq: 'weekly',
    priority: 0.8
  }
];

try {
  const sitemap = generateSitemap(urls, BASE_URL);
  const outputPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  
  // Ensure the public directory exists
  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  fs.writeFileSync(outputPath, sitemap);
  console.log('Sitemap generated successfully at:', outputPath);
} catch (error) {
  console.error('Error generating sitemap:', error);
  process.exit(1);
} 