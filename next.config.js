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
    domains: ['13.124.59.8', '13.124.59.8:8001', '13.124.59.8:8715', '13.124.59.8:3000', '13.124.59.8:80'],
  },
}