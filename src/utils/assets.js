// Helper chuẩn hóa đường dẫn ảnh tương thích cả Localhost, GitHub Pages (/vote/) và Vercel
export function getAssetUrl(path) {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("data:")) {
    return path;
  }

  const base = import.meta.env.BASE_URL || "./";
  const cleanBase = base.endsWith("/") ? base : base + "/";
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;

  return cleanBase + cleanPath;
}
