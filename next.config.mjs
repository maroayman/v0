/** @type {import('next').NextConfig} */

// Feature flag: Set to true to enable blog/articles section
const SHOW_BLOG_SECTION = false

const nextConfig = {
  // Static export for Cloudflare Pages
  output: 'export',

  // Disable image optimization (not supported in static export)
  // Images will load directly from source URLs
  images: {
    unoptimized: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  // React Compiler for automatic optimizations
  reactCompiler: true,

  // Compression
  compress: true,

  // Trailing slashes for better static hosting compatibility
  trailingSlash: true,

  // Note: Redirects don't work with static export (output: 'export')
  // The /articles page won't be linked but will still exist as a static file
  // For CF Pages, use _redirects file if needed
}

export default nextConfig
