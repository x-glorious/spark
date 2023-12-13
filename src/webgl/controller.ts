import * as THREE from 'three'

export interface WebglContext {
  camera: THREE.PerspectiveCamera | THREE.OrthographicCamera
  renderer: THREE.WebGLRenderer
  scene: THREE.Scene
}

export class WebglControllerAbstract {
  stop!: () => void
}

export type ValueOf<T> = T[keyof T]

export class WebglControllerBase {
  protected element: HTMLCanvasElement
  protected context!: WebglContext
  protected requestAnimationHandler!: number

  constructor(element: HTMLCanvasElement) {
    this.element = element
  }

  protected responsive = () => {
    // 环境创建完成后，开始响应尺寸变化
    if (this.context) {
      const canvas = this.context.renderer.domElement
      const canvasSize = {
        width: canvas.clientWidth * window.devicePixelRatio,
        height: canvas.clientHeight * window.devicePixelRatio,
      }

      if (
        canvas.width !== canvasSize.width ||
        canvas.height !== canvasSize.height
      ) {
        this.context.renderer.setSize(
          canvasSize.width,
          canvasSize.height,
          false,
        )
        if (this.context.camera instanceof THREE.PerspectiveCamera) {
          this.context.camera.aspect = canvasSize.width / canvasSize.height
        }

        this.context.camera.updateProjectionMatrix()
      }
    }
  }
}
