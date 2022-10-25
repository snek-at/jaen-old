import {
  Box,
  Stack,
  Heading,
  Progress,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import {JaenLogo} from '../../atoms/index.js'

export interface LoadingAdminPageProps {
  heading?: string
}

export const LoadingAdminPage: React.FC<LoadingAdminPageProps> = props => {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'inherit')}
      minH="100vh"
      py="12"
      px={{base: '4', lg: '8'}}>
      <JaenLogo
        mx={'auto'}
        boxSize={'16'}
        display={'block'}
        mb={{base: '10', md: '15'}}
      />
      <Stack maxW="md" mx="auto" spacing={6}>
        <Heading textAlign="center" size="xl" fontWeight="extrabold">
          {props.heading}
        </Heading>
        <Progress size="xs" isIndeterminate colorScheme="teal" />

        <Text fontSize="sm" textAlign="center">
          Loading...
        </Text>
      </Stack>
    </Box>
  )
}
