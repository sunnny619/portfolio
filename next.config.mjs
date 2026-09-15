/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Next 16 부터 quality 는 허용 목록에 있는 값만 쓸 수 있다.
    // 목록에 없는 값을 주면 가장 가까운 값으로 내려간다.
    qualities: [75, 95],
  },
};

export default nextConfig;
