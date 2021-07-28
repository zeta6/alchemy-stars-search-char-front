module.exports = {
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
    domains: ["13.124.59.83"],
  },
}