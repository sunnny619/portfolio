/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Next 16 부터 quality 는 허용 목록에 있는 값만 쓸 수 있다.
    // 목록에 없는 값을 주면 가장 가까운 값으로 내려간다.
    qualities: [75, 85, 95],
  },
  // 블로그 목록이 메인(/)으로 옮겨졌다. 예전 /blog 주소는 쿼리(?category=)째 메인으로 보낸다.
  async redirects() {
    return [{ source: "/blog", destination: "/", permanent: true }];
  },
};

export default nextConfig;
