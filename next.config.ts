import type { NextConfig } from "next"
import path from "path"

const nextConfig: NextConfig = {
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      // three 패키지 경로는 보통 자동 인식하지만 명확히 지정해도 무방
      three: require.resolve("three"),

      // examples/jsm 경로 별칭 설정 (원하는 이름으로 지정 가능)
      "three/addons/": path.resolve(__dirname, "node_modules/three/examples/jsm"),
    }

    // GLTF 파일 처리
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      type: "asset/resource",
    })

    return config
  },

  experimental: {
    turbo: {
      resolveAlias: {
        three: require.resolve("three"),
      },
    },
  },

  productionBrowserSourceMaps: false,
}

export default nextConfig
