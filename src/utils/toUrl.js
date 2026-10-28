export default function toUrl(input) {
  if (typeof input !== "string") return input;

  const url = input.trim();

  if (url === "") return url;

  // Already absolute (protocol), protocol-relative, root-relative, relative
  // path or in-page anchor: leave untouched.
  if (/^([a-z][a-z0-9+.-]*:|\/|#|\?)/i.test(url)) {
    return url;
  }

  return `https://${url}`;
}
