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
    domains: ["54.180.126.198"],
  },
}