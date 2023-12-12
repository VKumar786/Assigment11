/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'https://qa2.sunbasedata.com/sunbase/portal/api/:path*'
            }
        ]
    }
}

module.exports = nextConfig
