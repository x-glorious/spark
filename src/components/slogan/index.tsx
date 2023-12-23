import { useIntlFc } from '@/hooks/use-intl-fc'
import { i18nDefine } from '@/i18n/define'
import { Box, BoxProps } from '@chakra-ui/layout'

export interface SloganProps extends BoxProps {
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
  const { color = 'purple.800', size, ...others } = props
  const Slogan = useIntlFc(i18nDefine.basic.slogan)

  return (
    <Box h={size} color={color} {...others}>
      <Slogan />
    </Box>
  )
}
