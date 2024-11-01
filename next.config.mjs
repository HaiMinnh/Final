/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'fiverrnew.cybersoft.edu.vn',
                port: '',
            },
        ],
    },
};

export default nextConfig;
