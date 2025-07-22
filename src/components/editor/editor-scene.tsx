import { installPointerHandlers } from "@/modules/editor/utils/input-handler"
import { withMetadata, withSelectable } from "@/modules/objects/pipeline"
import {
  AmbientLight,
  AxesHelper,
  Color,
  DirectionalLight,
  GridHelper,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer,
} from "three"
import { OrbitControls } from "three/addons/controls/OrbitControls.js"
import { BoxObject } from "../object/3d"
export interface EditorSceneInitOpts {
  container: HTMLElement
  width?: number
  height?: number
}

export class EditorScene {
  scene: Scene
  camera: PerspectiveCamera
  renderer: WebGLRenderer
  constrols: OrbitControls
  disposeInput?: () => void

  constructor(opts: EditorSceneInitOpts) {
    const { container } = opts

    this.scene = new Scene()
    this.scene.background = new Color("#1a1a1a")

    this.camera = new PerspectiveCamera(60, 1, 0.1, 1000)
    this.camera.position.set(5, 5, 5)
    this.camera.lookAt(0, 0, 0)

    this.constrols = new OrbitControls(this.camera, container)

    this.renderer = new WebGLRenderer({ antialias: true })
    container.appendChild(this.renderer.domElement)

    // 초기 사이즈 계산
    this.resize(opts.width ?? container.clientWidth, opts.height ?? container.clientHeight)

    // 헬퍼
    this.scene.add(new GridHelper(10, 10))
    this.scene.add(new AxesHelper(5))

    // 조명
    this.scene.add(new AmbientLight(0xffffff, 0.5))
    const dir = new DirectionalLight(0xffffff, 1)
    dir.position.set(3, 5, 2)
    this.scene.add(dir)

    // 오브젝트 샘플 추가 ----------------------------------------
    const box = withMetadata(withSelectable(new BoxObject("Sample Box")), {
      tags: ["sample", "box"],
      category: "geometry",
      description: "A sample box object",
    })
    const vec3 = new Vector3(1, 1, 1)
    box.setPosition(vec3)
    this.scene.add(box)

    // 포인터 선택 핸들러 설치 ----------------------------------
    this.disposeInput = installPointerHandlers(this.renderer.domElement, this.camera, this.scene)
  }

  resize(width: number, height: number) {
    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(width, height)
  }

  render() {
    this.renderer.render(this.scene, this.camera)
  }

  dispose() {
    this.disposeInput?.()
    this.renderer.dispose()
    // geometry/material 수동 dispose 필요 시 순회하며 정리
  }
}
