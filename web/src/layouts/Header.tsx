import { Flex, Spacer, HStack, Heading, Center, Box } from '@chakra-ui/react'
import ColorModeToggle from '../components/ColorModeToggle'

export default function Header() {
  return (
    <Flex>
      <Box boxSize={70} />
      <Spacer />
      <HStack align={'center'} justify={'center'} spacing={5}>
        <Heading as='h2' size='xl' noOfLines={1} paddingY={10}>
          Live Singapore Car Park Availability
        </Heading>
      </HStack>
      <Spacer />
      <Center boxSize={70}>
        <ColorModeToggle />
      </Center>
    </Flex>
  )
}
