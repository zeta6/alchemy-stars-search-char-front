module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/SearchAurorian',
        permanent: true,
      },
    ]
  },
  images: {
    domains: ['127.0.0.1:8000', '127.0.0.1'],
  },
}