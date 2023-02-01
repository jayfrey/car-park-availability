import '../assets/App.css'
import {
  Box,
  chakra,
  ScaleFade,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from '@chakra-ui/react'
import AvailableLotsStats from '../components/AvailableLotsStats'
import { fetchCarParkAvailability } from '../api/carParkAvailabilityAPI'
import { useEffect, useState } from 'react'

function App() {
  const [carParkAvailability, setCarParkAvailability] = useState({})

  useEffect(() => {
    fetchCarParkAvailability().then((res) => {
      setCarParkAvailability(res)
    })

    const interval = setInterval(() => {
      console.log('This will run every second!')
      fetchCarParkAvailability().then((res) => {
        setCarParkAvailability(res)
      })
    }, 60000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className='App'>
      <chakra.h1 textAlign={'center'} fontSize={'4xl'} py={10} fontWeight={'bold'}>
        Live Car Park Availability
      </chakra.h1>

      <Tabs variant='soft-rounded' align='center' size='lg'>
        <TabList mb='1em'>
          {Object.keys(carParkAvailability).map((category) => (
            <Tab key={category}>{category}</Tab>
          ))}
        </TabList>
        <TabPanels>
          {Object.keys(carParkAvailability).map((category, catIndex) => (
            <TabPanel key={category + '-' + catIndex}>
              <Box paddingX={20}>
                <SimpleGrid columns={2} spacing={20}>
                  {Object.keys(carParkAvailability[category as keyof object]).map(
                    (type, typeIndex) => (
                      <AvailableLotsStats
                        key={type + '-' + typeIndex}
                        type={type}
                        availableLots={
                          carParkAvailability[category as keyof object][type]['availableLots']
                        }
                        carParkNumbers={
                          carParkAvailability[category as keyof object][type]['carParkNumbers']
                        }
                      />
                    ),
                  )}
                </SimpleGrid>
              </Box>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </div>
  )
}

export default App
