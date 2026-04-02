/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'placehold.co',
            },
        ],
        dangerouslyAllowSVG: true, // Placehold.co returns SVGs
    },
};

module.exports = nextConfig;