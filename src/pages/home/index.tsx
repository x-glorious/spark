import { Box, Divider, Flex, Highlight, Text } from '@chakra-ui/react'
import { MathModel } from './math-model'
import { useIntl } from 'react-intl'
import { i18nDefine } from '@/i18n/define'

export const Home = () => {
  const intl = useIntl()

  return (
    <Box px="32px">
      <Flex alignItems="center" gap={2} my="48px">
        <MathModel />
        <Box flex={1} px={8} py={4}>
          <Text as="b" whiteSpace="pre-line" lineHeight="2" fontSize="2xl">
            <Highlight query={['道友', 'bro']} styles={{ color: 'purple.500' }}>
              {intl.formatMessage(i18nDefine.home.vision)}
            </Highlight>
          </Text>
        </Box>
      </Flex>
      <Divider />
    </Box>
  )
}
