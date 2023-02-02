import '../assets/App.css'
import { Tab, TabList, TabPanel, TabPanels, Tabs, Tooltip } from '@chakra-ui/react'
import { fetchCarParkAvailability } from '../api/carParkAvailabilityAPI'
import { useEffect, useState } from 'react'
import TabPanelContent from '../components/TabPanelContent'
import Header from '../layouts/Header'

export default function App() {
  const refreshInterval = 60000
  const emptyCarParkAvailabilityObject = {
    lowest: {
      availableLots: 0,
      carParkNumbers: [],
    },
    highest: {
      availableLots: 0,
      carParkNumbers: [],
    },
  }
  const [carParkAvailability, setCarParkAvailability] = useState({
    small: emptyCarParkAvailabilityObject,
    medium: emptyCarParkAvailabilityObject,
    big: emptyCarParkAvailabilityObject,
    large: emptyCarParkAvailabilityObject,
  })
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    fetchCarParkAvailability().then((res) => {
      setCarParkAvailability(res)
      setIsLoaded(true)
    })

    const interval = setInterval(() => {
      fetchCarParkAvailability().then((res) => {
        setCarParkAvailability(res)
      })
    }, refreshInterval)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <Header />

      <Tabs variant={'soft-rounded'} align={'center'} size={'lg'} colorScheme={'cyan'}>
        <TabList mb={'1em'}>
          <Tooltip label={'Less than 100 lots'} placement={'top'}>
            <Tab key={'tab-small'} isDisabled={!isLoaded}>
              Small
            </Tab>
          </Tooltip>
          <Tooltip label={'Between 100 and 299 lots'} placement={'top'}>
            <Tab key={'tab-medium'} isDisabled={!isLoaded}>
              Medium
            </Tab>
          </Tooltip>
          <Tooltip label={'Between 300 and 399 lots'} placement={'top'}>
            <Tab key={'tab-big'} isDisabled={!isLoaded}>
              Big
            </Tab>
          </Tooltip>
          <Tooltip label={'More than 400 lots'} placement={'top'}>
            <Tab key={'tab-large'} isDisabled={!isLoaded}>
              Large
            </Tab>
          </Tooltip>
        </TabList>
        <TabPanels>
          <TabPanel key={'tap-panel-small'}>
            <TabPanelContent isLoaded={isLoaded} data={carParkAvailability['small']} />
          </TabPanel>
          <TabPanel key={'tap-panel-medium'}>
            <TabPanelContent isLoaded={isLoaded} data={carParkAvailability['medium']} />
          </TabPanel>
          <TabPanel key={'tap-panel-large'}>
            <TabPanelContent isLoaded={isLoaded} data={carParkAvailability['big']} />
          </TabPanel>
          <TabPanel key={'tap-panel-big'}>
            <TabPanelContent isLoaded={isLoaded} data={carParkAvailability['large']} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  )
}
