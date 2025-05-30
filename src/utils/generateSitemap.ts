import env from '@/config/env';

interface SitemapUrl {
  url: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

const generateSitemap = (urls: SitemapUrl[], baseUrl: string): string => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.map(({ url, lastmod, changefreq, priority }) => `
    <url>
      <loc>${baseUrl}${url}</loc>
      ${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}
      ${changefreq ? `<changefreq>${changefreq}</changefreq>` : ''}
      ${priority ? `<priority>${priority}</priority>` : ''}
    </url>
  `).join('')}
</urlset>`;

  return sitemap;
};

export default generateSitemap; 