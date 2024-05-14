const svgrConfig = {
  loader: '@svgr/webpack',
  options: {
    svgoConfig: {
      plugins: [
        {
          name: 'preset-default',
          params: {
            overrides: {
              removeViewBox: false
            }
          }
        }
      ]
    }
  }
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /.svg$/i,
      issuer: /.[jt]sx?$/,
      use: [svgrConfig]
    });

    return config;
  }
};

module.exports = nextConfig;
