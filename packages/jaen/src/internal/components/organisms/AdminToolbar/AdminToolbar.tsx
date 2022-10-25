import {Button, ButtonProps, Flex, Link, Spacer, Text} from '@chakra-ui/react'
import {Link as GatsbyLink} from 'gatsby'
import {JaenLogo} from '../../atoms/index.js'
import {UserMenuButton, UserMenuButtonProps} from '../../molecules/index.js'

export interface AdminToolbarProps {
  logoText: string
  toolbarItems: Array<{
    leftIcon?: ButtonProps['leftIcon']
    rightIcon?: ButtonProps['rightIcon']
    label: string
    to?: string
    onClick: () => void
  }>
  userMenu: UserMenuButtonProps
}

export const AdminToolbar = ({logoText, toolbarItems, userMenu}: AdminToolbarProps) => {
  return (
    <Flex
      zIndex={'banner'}
      w="full"
      bg="gray.900"
      color="white"
      h={'54px'}
      py={{base: 2}}
      px={{base: 4}}
      align={'center'}>
      <Link as={GatsbyLink} to="/admin">
        <Flex w="52" justifyContent="center" alignItems="center">
          <JaenLogo w="32px" h="32px" me="10px" color="white" />
          <Text fontSize="sm" mt="3px" fontWeight="bold">
            {logoText}
          </Text>
        </Flex>
      </Link>
      <Flex gap={3} bg="white" borderRadius="lg" p="1" color="black">
        {toolbarItems.map((item, key) => (
          <Button
            key={key}
            onClick={item.onClick}
            variant={'outline'}
            size="sm"
            fontWeight="normal"
            leftIcon={item.leftIcon}
            rightIcon={item.rightIcon}>
            {item.label}
          </Button>
        ))}
      </Flex>
      <Spacer />
      <Flex gap={5}>
        <UserMenuButton {...userMenu} />
      </Flex>
    </Flex>
  )
}
