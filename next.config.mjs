/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "127.0.0.1",
                port: "8000",
                pathname: "/media/**",
            },
            {
                protocol: "http",
                hostname: "127.0.0.1",
                port: "8000",
                pathname: "/api/**",
            },
            {
                protocol: "https",
                hostname: "6215pxg3-8000.euw.devtunnels.ms",
                port: "8000",
                pathname: "/api/**",
            },
        ],
    },
    // async rewrites() {
    //     return [
    //         {
    //             source: "/api",
    //             destination: "https://6215pxg3-8000.euw.devtunnels.ms",
    //         },
    //     ];
    // },
};

export default nextConfig;
