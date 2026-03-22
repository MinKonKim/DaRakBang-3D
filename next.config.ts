import type { NextConfig } from "next"
import path from "path"

const nextConfig: NextConfig = {
  // three뿐만 아니라 에러를 일으키는 postprocessing 관련 라이브러리들도 트랜스파일 대상에 넣습니다.
  transpilePackages: ['three', 'postprocessing', 'n8ao'], 

  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      three: require.resolve("three"),
      // 일부 라이브러리는 여전히 'three/examples/jsm' 경로를 직접 참조하므로 
      // addons와 examples/jsm 두 경로 모두에 대한 별칭을 잡아두는 것이 가장 안전합니다.
      "three/addons": path.resolve(__dirname, "node_modules/three/examples/jsm"),
      "three/examples/jsm": path.resolve(__dirname, "node_modules/three/examples/jsm"),
    }

    // GLTF/GLB 파일 로더 설정
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      type: "asset/resource",
    })

    return config
  },

  turbopack: {
    resolveAlias: {
      three: "three",
      "three/addons": "three/examples/jsm",
      "three/examples/jsm": "three/examples/jsm",
    },
  },
  // 개발 편의를 위해 소스맵은 프로젝트 규모가 커지기 전까지 켜두는 것을 권장하지만, 
  // 빌드 속도가 중요하다면 유지하셔도 됩니다.
  productionBrowserSourceMaps: false,
}

export default nextConfig