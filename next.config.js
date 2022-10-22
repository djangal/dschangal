// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  target: "serverless",
  experimental: {
    images: {
      allowFutureImage: true,
      unoptimized: true,
    },
  },
  i18n: {
    locales: ["en", "de", "fr"],
    defaultLocale: "de",
  },
  /* config options here */
  webpack: (cfg) => {
    cfg.module.rules.push(
      {
        test: /\.md$/,
        loader: "frontmatter-markdown-loader",
        options: { mode: ["react-component"] },
      }
      //   {
      //     test: /\.(scss)$/i,
      //     use: [
      //       {
      //         loader: "url-loader",
      //         options: {
      //           limit: 8192,
      //         },
      //       },
      //     ],
      //   }
      //   {
      //     test: /\.(scss)$/i,
      //     loader: "file-loader",
      //     options: {
      //       name: "[path][name].[ext]",
      //     },
      //   }
    );
    cfg.resolve.fallback = { fs: false, process: false };
    return cfg;
  },
};

module.exports = nextConfig;
