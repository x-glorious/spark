import {
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Image,
  Button,
  Text,
  Tooltip,
} from '@chakra-ui/react'
import { FaGithub, FaGoogle } from 'react-icons/fa'
import Bg from '@/assets/backgrounds/login-modal-bg.png'
import { Slogan } from '@/components/slogan'
import { forwardRef, useCallback, useImperativeHandle, useState } from 'react'
import { useOauthStore } from '@/stores/oauth'
import { OauthPlatform } from '@/services/oauth'

export interface LoginModalRef {
  open: () => void
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const LoginModal = forwardRef<LoginModalRef>((_p, ref) => {
  const [isOpen, setIsOpen] = useState(false)
  const login = useOauthStore((state) => state.login)
  const [disposingPlatform, setDisposingPlatform] = useState<
    OauthPlatform | undefined
  >(undefined)

  useImperativeHandle(
    ref,
    () => ({
      open: () => setIsOpen(true),
    }),
    [],
  )

  const onClose = useCallback(() => {
    if (!disposingPlatform) {
      setIsOpen(false)
    }
  }, [disposingPlatform])

  // 聚沙成堆，聚灵成海
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onOverlayClick={onClose}
      isCentered
      size="xl"
    >
      <ModalOverlay bg="blackAlpha.300" />
      <ModalContent overflow="hidden" borderRadius="lg">
        <ModalBody p={0}>
          <Flex height="260px" gap={4} pr={4}>
            <Image
              opacity={0.9}
              src={Bg}
              borderRadius="lg"
              height="100%"
              width="240px"
              objectFit="cover"
              boxShadow="sm"
            />
            <Flex flex={1} flexDir="column" alignItems="center" py={4}>
              <Slogan size={12} />
              <Text fontSize="xs" color="gray.600" mt={2}>
                Gather sand into piles, gather spirits to form a sea
              </Text>
              <Flex
                w="100%"
                flex={1}
                flexDir="column"
                justifyContent="flex-end"
                gap={2}
              >
                <Tooltip
                  label="google oauth not support now"
                  hasArrow
                  placement="top"
                >
                  <Button
                    w="100%"
                    isDisabled
                    leftIcon={<FaGoogle />}
                    colorScheme="pink"
                  >
                    Google
                  </Button>
                </Tooltip>
                <Button
                  w="100%"
                  isLoading={disposingPlatform === OauthPlatform.github}
                  leftIcon={<FaGithub />}
                  onClick={() => {
                    setDisposingPlatform(OauthPlatform.github)
                    login(OauthPlatform.github)
                  }}
                >
                  Github
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
})
