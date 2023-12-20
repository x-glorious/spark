import { Slogan } from '@/components/slogan'
import { i18nDefine } from '@/i18n/define'
import { Box, Button, Flex, Image, Text, Tooltip } from '@chakra-ui/react'
import { useIntl } from 'react-intl'
import { FaGoogle, FaGithub } from 'react-icons/fa'
import { OauthPlatform } from '@/services/oauth'
import { useEffect, useState } from 'react'
import { useOauthStore } from '@/stores/oauth'
import LoginIllustration from '@/assets/backgrounds/oauth/login/illustration.png'
import { useNavigate } from 'react-router-dom'
import { useDetailStore } from '@/stores/user'

export const OauthLogin = () => {
  const intl = useIntl()
  const user = useDetailStore((state) => state.value)
  const login = useOauthStore((state) => state.login)
  const navigate = useNavigate()

  const [disposingPlatform, setDisposingPlatform] = useState<
    OauthPlatform | undefined
  >(undefined)

  // if user info valid, can not enter this page
  useEffect(() => {
    if (user) {
      navigate('/', {
        replace: true,
      })
    }
  }, [user, navigate])

  return (
    <Flex height="100vh" gap={4} pr={4}>
      <Image
        flex={2}
        src={LoginIllustration}
        height="100%"
        width="720px"
        objectFit="cover"
      />
      <Flex
        flex={1.2}
        flexDir="column"
        alignItems="center"
        justifyContent="center"
        py={4}
      >
        <Slogan size={16} />
        <Text fontSize="md" color="gray.600" mt={2} mb="100px">
          {intl.formatMessage(i18nDefine.basic.aphorisms)}
        </Text>
        <Box maxW="400px" w="100%">
          <Tooltip
            label="google oauth not support now"
            hasArrow
            placement="top"
          >
            <Button
              w="100%"
              size="lg"
              isDisabled
              leftIcon={<FaGoogle />}
              colorScheme="blackAlpha"
              borderRadius="xl"
            >
              Google
            </Button>
          </Tooltip>
          <Button
            w="100%"
            size="lg"
            mt={4}
            isLoading={disposingPlatform === OauthPlatform.github}
            leftIcon={<FaGithub />}
            borderRadius="xl"
            onClick={() => {
              setDisposingPlatform(OauthPlatform.github)
              login(OauthPlatform.github)
            }}
          >
            Github
          </Button>
        </Box>
      </Flex>
    </Flex>
  )
}
