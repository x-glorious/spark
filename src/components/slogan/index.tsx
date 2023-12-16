// import { SloganCn } from '@/assets/texts/slogan-cn'
import { SloganEn } from '@/assets/texts/slogan-en'
import { Box } from '@chakra-ui/layout'

export interface SloganProps {
  /**
   * as root height
   */
  size: number
  /**
   * @default 'purple.800'
   */
  color?: string
}

export const Slogan = (props: SloganProps) => {
  const { color = 'purple.800', size } = props
  return (
    <Box h={size} color={color}>
      <SloganEn />
      {/* <SloganCn /> */}
    </Box>
  )
}
