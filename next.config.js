/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: ["./src/app/*.scss"],
    prependData: '@use "@/styles/colors" as *;\n\r',
  },
};

module.exports = nextConfig;
