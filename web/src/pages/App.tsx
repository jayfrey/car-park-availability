import '../assets/App.css'
import { Tab, TabList, TabPanel, TabPanels, Tabs, Tooltip } from '@chakra-ui/react'
import { fetchCarparkAvailability } from '../api/carparkAvailabilityAPI'
import { useEffect, useState } from 'react'
import TabPanelContent from '../components/TabPanelContent'
import Header from '../layouts/Header'

export default function App() {
  const refreshInterval = 60000
  const emptyAvailableLotsObject = {
    lowest: {
      availableLots: 0,
      carparkNumbers: [],
    },
    highest: {
      availableLots: 0,
      carparkNumbers: [],
    },
  }
  const [carparkAvailability, setCarparkAvailability] = useState({
    small: emptyAvailableLotsObject,
    medium: emptyAvailableLotsObject,
    big: emptyAvailableLotsObject,
    large: emptyAvailableLotsObject,
  })
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    fetchCarparkAvailability().then((res) => {
      setCarparkAvailability(res)
      setIsLoaded(true)
    })

    const interval = setInterval(() => {
      fetchCarparkAvailability().then((res) => {
        setCarparkAvailability(res)
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
            <TabPanelContent isLoaded={isLoaded} data={carparkAvailability['small']} />
          </TabPanel>
          <TabPanel key={'tap-panel-medium'}>
            <TabPanelContent isLoaded={isLoaded} data={carparkAvailability['medium']} />
          </TabPanel>
          <TabPanel key={'tap-panel-large'}>
            <TabPanelContent isLoaded={isLoaded} data={carparkAvailability['big']} />
          </TabPanel>
          <TabPanel key={'tap-panel-big'}>
            <TabPanelContent isLoaded={isLoaded} data={carparkAvailability['large']} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  )
}
