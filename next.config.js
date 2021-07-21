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
}