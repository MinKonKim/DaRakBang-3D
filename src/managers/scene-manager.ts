import { Object3DInfo } from "@/shared/types/editor-type"
import * as THREE from "three"
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js"
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass.js"

export class SceneManager {
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  renderer: THREE.WebGLRenderer
  raycaster: THREE.Raycaster
  mouse: THREE.Vector2
  objectMeshes: Map<string, THREE.Mesh>
  onObjectClick: (id: string | null) => void
  composer: EffectComposer
  outlinePass: OutlinePass

  constructor(canvas: HTMLCanvasElement, onObjectClick: (id: string | null) => void) {
    this.objectMeshes = new Map()
    this.raycaster = new THREE.Raycaster()
    this.mouse = new THREE.Vector2()
    this.onObjectClick = onObjectClick

    // Scene setup
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0x1a1a1a)

    // Camera setup
    this.camera = new THREE.PerspectiveCamera(
      75,
      canvas.offsetWidth / canvas.offsetHeight,
      0.1,
      1000,
    )
    this.camera.position.set(5, 5, 5)
    this.camera.lookAt(0, 0, 0)

    // Renderer setup
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
    this.renderer.setSize(canvas.offsetWidth, canvas.offsetHeight)
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap

    // Post-processing setup
    this.composer = new EffectComposer(this.renderer)

    // 1. Render Pass (Basic Scene)
    const renderPass = new RenderPass(this.scene, this.camera)
    this.composer.addPass(renderPass)

    // 2. Outline Pass
    this.outlinePass = new OutlinePass(
      new THREE.Vector2(canvas.offsetWidth, canvas.offsetHeight),
      this.scene,
      this.camera,
    )
    this.outlinePass.visibleEdgeColor.setHex(0xffffff) // White visible edges
    this.outlinePass.hiddenEdgeColor.setHex(0xffffff)  // White hidden edges (optional, can be different)
    this.outlinePass.edgeStrength = 5
    this.outlinePass.edgeGlow = 0
    this.outlinePass.edgeThickness = 1
    this.composer.addPass(this.outlinePass)

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
    this.scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(10, 10, 5)
    directionalLight.castShadow = true
    directionalLight.shadow.mapSize.width = 2048
    directionalLight.shadow.mapSize.height = 2048
    this.scene.add(directionalLight)

    // Grid helper
    const gridHelper = new THREE.GridHelper(10, 10, 0x444444, 0x444444)
    this.scene.add(gridHelper)

    // Event listeners
    canvas.addEventListener("click", this.onCanvasClick.bind(this))
    window.addEventListener("resize", this.onWindowResize.bind(this))

    this.animate()
  }

  createGeometry(type: string): THREE.BufferGeometry {
    switch (type) {
    case "cube":
      return new THREE.BoxGeometry(1, 1, 1)
    case "sphere":
      return new THREE.SphereGeometry(0.5, 32, 32)
    case "cylinder":
      return new THREE.CylinderGeometry(0.5, 0.5, 1, 32)
    default:
      return new THREE.BoxGeometry(1, 1, 1)
    }
  }

  addObject(objectInfo: Object3DInfo) {
    const geometry = this.createGeometry(objectInfo.type)
    const material = new THREE.MeshLambertMaterial({ color: objectInfo.color })
    const mesh = new THREE.Mesh(geometry, material)

    mesh.position.set(objectInfo.position.x, objectInfo.position.y, objectInfo.position.z)
    mesh.rotation.set(objectInfo.rotation.x, objectInfo.rotation.y, objectInfo.rotation.z)
    mesh.scale.set(objectInfo.scale.x, objectInfo.scale.y, objectInfo.scale.z)
    mesh.visible = objectInfo.visible
    mesh.castShadow = true
    mesh.receiveShadow = true
    mesh.userData = { id: objectInfo.id }

    this.objectMeshes.set(objectInfo.id, mesh)
    this.scene.add(mesh)
  }

  updateObject(objectInfo: Object3DInfo) {
    const mesh = this.objectMeshes.get(objectInfo.id)
    if (mesh) {
      mesh.position.set(objectInfo.position.x, objectInfo.position.y, objectInfo.position.z)
      mesh.rotation.set(objectInfo.rotation.x, objectInfo.rotation.y, objectInfo.rotation.z)
      mesh.scale.set(objectInfo.scale.x, objectInfo.scale.y, objectInfo.scale.z)
      mesh.visible = objectInfo.visible
      ;(mesh.material as THREE.MeshLambertMaterial).color.setHex(
        parseInt(objectInfo.color.replace("#", ""), 16),
      )
    }
  }

  removeObject(id: string) {
    const mesh = this.objectMeshes.get(id)
    if (mesh) {
      this.scene.remove(mesh)
      mesh.geometry.dispose()
      ;(mesh.material as THREE.Material).dispose()
      this.objectMeshes.delete(id)
    }
  }

  highlightObject(id: string | null) {
    // Clear previous selection in OutlinePass
    this.outlinePass.selectedObjects = []

    //   // Reset all object materials (optional if we don't want emissive anymore)
    //   this.objectMeshes.forEach(mesh => {
    //     ;(mesh.material as THREE.MeshLambertMaterial).emissive.setHex(0x000000)
    //   })

    // Highlight selected object
    if (id) {
      const mesh = this.objectMeshes.get(id)
      if (mesh) {
        //   // Emissive (optional, keep or remove depending on preference)
        //   ;(mesh.material as THREE.MeshLambertMaterial).emissive.setHex(0x333333)

        // Add to OutlinePass
        this.outlinePass.selectedObjects = [mesh]
      }
    }
  }

  onCanvasClick(event: MouseEvent) {
    const canvas = this.renderer.domElement
    const rect = canvas.getBoundingClientRect()

    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

    this.raycaster.setFromCamera(this.mouse, this.camera)
    const intersects = this.raycaster.intersectObjects(Array.from(this.objectMeshes.values()))

    if (intersects.length > 0) {
      const selectedObject = intersects[0].object
      this.onObjectClick(selectedObject.userData.id)
    } else {
      this.onObjectClick(null)
    }
  }

  onWindowResize() {
    const canvas = this.renderer.domElement
    this.camera.aspect = canvas.offsetWidth / canvas.offsetHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(canvas.offsetWidth, canvas.offsetHeight)
    this.composer.setSize(canvas.offsetWidth, canvas.offsetHeight) // Update composer size
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this))
    // Replace renderer.render with composer.render
    this.composer.render()
  }
}


