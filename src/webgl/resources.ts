import * as THREE from 'three'

const WebglResourcesPath = '/resources/webgl'

export enum TextureResources {
  point = 'point',
}

const cache = {
  textures: {
    [TextureResources.point]: WebglResourcesPath + '/particles/point.png',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any,
}

const loadTexture = (
  path: string,
  onProgress?: (percentage: number) => void,
) => {
  const task = new THREE.LoadingManager()
  task.onProgress = (_url, loaded, total) => onProgress?.(loaded / total)

  return new THREE.TextureLoader(task).load(path)
}

export const getTexture = (texture: TextureResources): THREE.Texture => {
  if (typeof cache.textures[texture] === 'string') {
    cache.textures[texture] = loadTexture(cache.textures[texture])
  }

  return cache.textures[texture]
}
