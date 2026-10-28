import type { APIRoute } from "astro";

const isPreview = import.meta.env.STORYBLOK_IS_PREVIEW === "yes";

// The sitemap is only generated for static builds. Server (preview) builds
// would advertise a sitemap that returns a 500, so leave it out there.
const getRobotsTxt = (sitemapURL: URL | null) => `
User-agent: *
Allow: /
${sitemapURL ? `\nSitemap: ${sitemapURL.href}\n` : ""}`;

export const GET: APIRoute = ({ site }) => {
  const sitemapURL =
    site && !isPreview ? new URL("sitemap-index.xml", site) : null;
  return new Response(getRobotsTxt(sitemapURL));
};
