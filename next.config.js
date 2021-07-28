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
    domains: ['13.124.59.8', '13.124.59.8:8000', '13.124.59.8:8715'],
  },
}