/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
    },
    images: {
        domains: ['lh3.googleusercontent.com'],
        domains: ['images2.imgbox.com'],
    },
};

module.exports = nextConfig;
