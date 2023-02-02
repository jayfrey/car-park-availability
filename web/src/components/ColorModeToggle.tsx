import { useColorMode, IconButton } from '@chakra-ui/react'
import { Moon, Sun } from 'phosphor-react'

export default function ColorModeToggle() {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <IconButton
      variant='link'
      aria-label='Color mode'
      onClick={toggleColorMode}
      icon={colorMode === 'light' ? <Moon size={40} /> : <Sun size={40} />}
    />
  )
}
