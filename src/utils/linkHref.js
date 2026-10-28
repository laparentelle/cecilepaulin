import toUrl from "./toUrl";

/**
 * Resolve a Storyblok multilink field to an href.
 * Returns null when the field is empty or points to nothing, so callers can
 * avoid rendering broken links such as "/undefined".
 */
export default function linkHref(link) {
  if (!link || typeof link !== "object") return null;

  if (link.linktype === "email") {
    return link.email ? `mailto:${link.email}` : null;
  }

  if (link.linktype === "asset") {
    return link.url || null;
  }

  if (link.linktype === "story") {
    const slug = link.story?.full_slug || link.story?.url || link.cached_url;
    if (!slug) return null;
    return slug.startsWith("/") ? slug : `/${slug}`;
  }

  const url = link.url || link.cached_url;
  return url ? toUrl(url) : null;
}
