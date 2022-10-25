import {
  Box,
  ButtonProps,
  Circle,
  Flex,
  HStack,
  Menu,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  useMenuButton
} from '@chakra-ui/react'
import {HiSelector} from 'react-icons/hi'
import React from 'react'

export interface UserMenuButtonProps {
  user: {
    name: string
    email: string
    imageSrc: string
  }
  showNotification: boolean
  menuItems: Array<{
    label: string
    onClick: () => void
    divider?: boolean
  }>
}

const MenuButton: React.FC<
  ButtonProps & {
    showNotification: boolean
    user: UserMenuButtonProps['user']
  }
> = ({showNotification, user, ...props}) => {
  const menuButtonProps = useMenuButton(props)

  return (
    <Flex
      as="button"
      {...menuButtonProps}
      w="full"
      display="flex"
      alignItems="center"
      rounded="lg"
      bg="white"
      color="black"
      px="3"
      py="2"
      fontSize="sm"
      userSelect="none"
      cursor="pointer"
      outline="0"
      transition="all 0.2s"
      _hover={{
        bg: 'gray.200'
      }}
      _active={{
        bg: 'gray.200'
      }}
      _focus={{
        shadow: 'outline'
      }}>
      <HStack flex="1" spacing="4">
        <Box textAlign="start">
          <Box noOfLines={1}>{user.name}</Box>
        </Box>

        <Box fontSize="lg" color="gray.400">
          <HiSelector />
        </Box>
        {showNotification && (
          <Box mx="2">
            <Circle size="2" bg="orange.300" />
          </Box>
        )}
      </HStack>
    </Flex>
  )
}

export const UserMenuButton: React.FC<UserMenuButtonProps> = ({
  user,
  showNotification,
  menuItems
}) => {
  return (
    <Menu>
      <MenuButton user={user} showNotification={showNotification} />

      <MenuList
        fontSize={'sm'}
        shadow="md"
        py="4"
        color={useColorModeValue('gray.600', 'gray.200')}
        px="3">
        <Text fontWeight="medium" mb="2">
          {user.email}
        </Text>
        <MenuDivider />
        {menuItems.map((item, index) => (
          <React.Fragment key={index}>
            <MenuItem rounded="md" onClick={item.onClick}>
              {item.label}
            </MenuItem>
            {item.divider && <MenuDivider />}
          </React.Fragment>
        ))}
      </MenuList>
    </Menu>
  )
}
