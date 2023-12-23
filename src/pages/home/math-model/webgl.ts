import {
  WebglControllerBase,
  WebglControllerAbstract,
} from '@/webgl/controller'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { TextureResources, getTexture } from '@/webgl/resources'
import * as THREE from 'three'

export class WebglController
  extends WebglControllerBase
  implements WebglControllerAbstract
{
  private last!: number
  private total: number = 0
  private particleGeometry: THREE.BufferGeometry | undefined
  private particles: THREE.Points | undefined
  private readonly particleNumber = 960

  constructor(element: HTMLCanvasElement) {
    super(element)
    this.context = this.createContext()

    const controls = new OrbitControls(this.context.camera, this.element)
    controls.target.set(0, 0, 0)
    controls.screenSpacePanning = true
    controls.update()

    this.addParticles()
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
    camera.position.set(0, 0, 12)
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

  private addParticles = () => {
    // 创建粒子几何体
    this.particleGeometry = new THREE.BufferGeometry()

    const position = new Float32Array(this.particleNumber * 3)
    const colors = new Float32Array(this.particleNumber * 3)

    // 配置粒子材质
    const particlesMaterial = new THREE.PointsMaterial()
    particlesMaterial.size = 0.5
    particlesMaterial.transparent = true
    particlesMaterial.depthWrite = false
    particlesMaterial.alphaMap = getTexture(TextureResources.point)
    particlesMaterial.vertexColors = true
    particlesMaterial.opacity = 1

    const colorList = [new THREE.Color('#000000')]

    for (let counter = 0; counter < this.particleNumber; counter++) {
      const randomColor = colorList[counter % colorList.length]
      const index = counter * 3
      position[index] = 0
      position[index + 1] = 0
      position[index + 2] = 0

      colors[index] = randomColor.r
      colors[index + 1] = randomColor.g
      colors[index + 2] = randomColor.b
    }

    // 设置 Attribute
    this.particleGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(position, 3),
    )
    this.particleGeometry.setAttribute(
      'color',
      new THREE.BufferAttribute(colors, 3),
    )

    this.particles = new THREE.Points(this.particleGeometry, particlesMaterial)
    this.particles.position.set(0, 0, 0)

    this.context.scene.add(this.particles)
  }

  /**
   * 3D Rose Curve
   * @param time 经过的时间
   */
  private particleAnimation = (time: number) => {
    const n = 6
    time = time * 0.0006
    const scale = 4
    if (this.particles) {
      for (let counter = 0; counter < this.particleNumber; counter++) {
        const index = counter * 3

        const nodeTime = time + counter * 0.002

        this.particleGeometry!.attributes.position.array[index + 0] =
          scale * Math.cos(n * nodeTime) * Math.cos(nodeTime)
        this.particleGeometry!.attributes.position.array[index + 1] =
          scale * Math.cos(n * nodeTime) * Math.sin(nodeTime)
        this.particleGeometry!.attributes.position.array[index + 2] =
          scale * Math.sin(nodeTime)
      }

      // 几何体位置需要更新
      this.particleGeometry!.attributes.position.needsUpdate = true
    }
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

    this.particleAnimation(this.total)
    this.context.renderer.render(this.context.scene, this.context.camera)

    this.requestAnimationHandler = requestAnimationFrame(this.render)
  }

  public stop = () => {
    cancelAnimationFrame(this.requestAnimationHandler)
  }
}
