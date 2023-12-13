import React, { useEffect, useRef } from 'react'
import { WebglController } from './webgl'
import { Box } from '@chakra-ui/react'
import Style from './index.module.scss'

export interface AppIconProps {
  size?: number
}

export const AppIcon = (props: AppIconProps) => {
  const { size = 12 } = props
  const webglController = useRef<WebglController>()
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    webglController.current = new WebglController(canvasRef.current!)

    return webglController.current.stop
  }, [])

  return (
    <Box width={size} height={size}>
      <canvas className={Style.canvas} ref={canvasRef} />
    </Box>
  )
}
