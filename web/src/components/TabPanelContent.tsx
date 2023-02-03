import { Box, SimpleGrid } from '@chakra-ui/react'
import AvailableLotsStats from './AvailableLotsStats'

interface TabPanelContentProps {
  isLoaded: boolean
  data: {
    lowest: {
      availableLots: number
      carparkNumbers: string[]
    }
    highest: {
      availableLots: number
      carparkNumbers: string[]
    }
  }
}

export default function TabPanelContent(props: TabPanelContentProps) {
  const { isLoaded, data } = props
  return (
    <Box paddingX={20}>
      <SimpleGrid columns={2} spacing={20}>
        <AvailableLotsStats
          key={'lowest-available-lots-stats'}
          type={'lowest'}
          isLoaded={isLoaded}
          availableLots={data['lowest']['availableLots']}
          carparkNumbers={data['lowest']['carparkNumbers']}
        />
        <AvailableLotsStats
          key={'highest-available-lots-stats'}
          type={'highest'}
          isLoaded={isLoaded}
          availableLots={data['highest']['availableLots']}
          carparkNumbers={data['highest']['carparkNumbers']}
        />
      </SimpleGrid>
    </Box>
  )
}
