// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
 const nextConfig = {
    webpack5: true,
    /* config options here */
    webpack: (cfg) => {
        cfg.module.rules.push(
            {
                test: /\.md$/,
                loader: 'frontmatter-markdown-loader',
                options: { mode: ['react-component'] }
            }
        )
        cfg.resolve.fallback = { fs: false };
        return cfg;
    }
  }
  
  module.exports = nextConfig