import {
  WebglControllerBase,
  WebglControllerAbstract,
} from '@/webgl/controller'
import * as THREE from 'three'
import { ParametricGeometry } from 'three/addons/geometries/ParametricGeometry.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

export class WebglController
  extends WebglControllerBase
  implements WebglControllerAbstract
{
  private last!: number
  private modal!: THREE.Group
  private total: number = 0
  private readonly circle: THREE.Mesh

  constructor(element: HTMLCanvasElement) {
    super(element)
    this.context = this.createContext()

    const controls = new OrbitControls(this.context.camera, this.element)
    controls.target.set(0, 0, 0)

    this.circle = this.generateCircle()

    this.context.scene.add(this.circle)

    this.addLight()

    this.render()
  }

  private createContext = () => {
    // threejs 环境初始化
    const canvasSize = {
      width: this.element.clientWidth * window.devicePixelRatio,
      height: this.element.clientHeight * window.devicePixelRatio,
    }

    const camera = new THREE.PerspectiveCamera(
      60,
      canvasSize.width / canvasSize.height,
      1,
      1000,
    )
    camera.position.set(-12, 6, 20)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({
      canvas: this.element,
      antialias: true,
      alpha: true,
    })
    renderer.setSize(canvasSize.width, canvasSize.height, false)

    const scene = new THREE.Scene()

    return {
      camera,
      renderer,
      scene,
    }
  }

  private addLight = () => {
    const light = new THREE.DirectionalLight(0xffffff, 4)
    light.position.set(-100, 100, 100)

    this.context.scene.add(light)
  }

  private generateCircle = () => {
    const geometry = new ParametricGeometry(
      (u, v, target) => {
        const angle = v * 2 * Math.PI
        const radius = 10
        const normalizeZ = (u - 0.5) * 2
        const rotateAngle = 6 * v * 2 * Math.PI

        const diff = normalizeZ * Math.sin(rotateAngle)

        target.set(
          Math.sin(angle) * (radius + diff),
          Math.cos(angle) * (radius + diff),
          normalizeZ,
        )
      },
      20,
      200,
    )
    geometry.center()

    const obj = new THREE.Mesh(
      geometry,
      new THREE.MeshPhongMaterial({
        color: 0x805ad5,
        side: THREE.DoubleSide,
        depthTest: true,
        depthWrite: true,
        transparent: true,
        opacity: 1,
        blending: THREE.AdditiveBlending,
      }),
    )
    obj.position.set(0, 0, 0)
    obj.scale.set(1, 1, 1)

    return obj
  }

  private render = () => {
    const now = Date.now()

    // 初始化操作
    if (!this.last) {
      this.last = now
    }

    // 响应式计算
    this.responsive()

    const delta = now - this.last
    this.total += delta
    this.last = now

    this.circle.rotation.z = this.total * 0.0005

    this.context.renderer.render(this.context.scene, this.context.camera)

    this.requestAnimationHandler = requestAnimationFrame(this.render)
  }

  public stop = () => {
    cancelAnimationFrame(this.requestAnimationHandler)
  }
}
