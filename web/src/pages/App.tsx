import "../assets/App.css";
import {
  Box,
  chakra,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import AvailableLotsStats from "../components/AvailableLotsStats";
import { fetchCarParkAvailability } from "../api/carParkAvailabilityAPI";
import { useEffect, useState } from "react";

function App() {
  const [carParkAvailability, setCarParkAvailability] = useState({});
  useEffect(() => {
    fetchCarParkAvailability().then((res) => {
      setCarParkAvailability(res);
      console.log(res);
    });
  });

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <chakra.h1
        textAlign={"center"}
        fontSize={"4xl"}
        py={10}
        fontWeight={"bold"}
      >
        Live Car Park Availability
      </chakra.h1>

      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          {Object.keys(carParkAvailability).map((category) => (
            <Tab>{category}</Tab>
          ))}
        </TabList>
        <TabPanels>
          {Object.keys(carParkAvailability).map((category) => (
            <TabPanel>
              <Box paddingX={20}>
                <SimpleGrid columns={2} spacing={20}>
                  <AvailableLotsStats
                    type={"lowest"}
                    availableLots={2}
                    carParkNumbers={["JE", "JJW"]}
                  />
                </SimpleGrid>
              </Box>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </div>
  );
}

export default App;
