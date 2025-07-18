import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Three.js 호환성을 위한 설정
  webpack: (config) => {
    // Three.js 모듈 처리
    config.resolve.alias = {
      ...config.resolve.alias,
      three: require.resolve("three"),
    };

    // GLTF 파일 처리
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      type: "asset/resource",
    });

    return config;
  },

  // 실험적 기능 비활성화
  experimental: {
    turbo: {
      resolveAlias: {
        three: require.resolve("three"),
      },
    },
  },

  // 소스맵 설정
  productionBrowserSourceMaps: false,
};

export default nextConfig;
