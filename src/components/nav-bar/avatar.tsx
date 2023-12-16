import { useDetailStore } from '@/stores/user'
import { LuLogOut, LuSettings } from 'react-icons/lu'
import { useOauthStore } from '@/stores/oauth'
import { useShallow } from 'zustand/react/shallow'
import {
  Avatar as AvatarComponent,
  Box,
  Divider,
  Flex,
  Icon,
  IconButton,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  Tooltip,
} from '@chakra-ui/react'

export const Avatar = () => {
  const user = useDetailStore((state) => state.value)
  const [logout, exiting] = useOauthStore(
    useShallow((state) => [state.logout, state.exiting]),
  )

  return (
    <Popover placement="bottom-end">
      <PopoverTrigger>
        <AvatarComponent
          cursor="pointer"
          size="sm"
          name={user?.name}
          bg="purple.100"
          src={user?.avatar}
        />
      </PopoverTrigger>
      <PopoverContent
        // overwrite blue focus box shadow
        style={{
          boxShadow: 'none',
        }}
        border="none"
        borderRadius="lg"
        outline="none"
        width="320px"
      >
        <PopoverBody
          py={3}
          px={4}
          boxShadow="md"
          borderRadius="lg"
          bgGradient="linear(to-r, purple.50, orange.50)"
        >
          <Box pb={2}>
            <Text as="b" color="purple.500">
              {user?.name}
            </Text>
            <Text fontSize="sm" color="gray.600">
              {user?.email}
            </Text>
          </Box>
          <Divider />
          <Flex pt={3} gap={2}>
            <Tooltip label="settings" hasArrow>
              <IconButton
                aria-label="settings"
                icon={<Icon as={LuSettings} />}
                size="sm"
                colorScheme="purple"
              />
            </Tooltip>
            <Tooltip label="log out" hasArrow>
              <IconButton
                onClick={logout}
                aria-label="log out"
                icon={<Icon as={LuLogOut} />}
                size="sm"
                colorScheme="blackAlpha"
                isLoading={exiting}
              />
            </Tooltip>
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
