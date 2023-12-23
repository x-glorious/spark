import { useEffect, useRef } from 'react'
import { WebglController } from './webgl'
import { Box } from '@chakra-ui/react'

export const MathModel = () => {
  const webglController = useRef<WebglController>()
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    webglController.current = new WebglController(canvasRef.current!)

    return webglController.current.stop
  }, [])

  return (
    <Box width="320px" height="320px">
      <canvas style={{ width: '100%', height: '100%' }} ref={canvasRef} />
    </Box>
  )
}
