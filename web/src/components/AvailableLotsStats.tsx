import {
  StatGroup,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Box,
  Spacer,
  VStack,
  Tag,
  TagLabel,
  Wrap,
} from "@chakra-ui/react";
import Stats from "./Stats";

interface AvailableLotsStatsProps {
  type: string;
  availableLots: number;
  carParkNumbers: string[];
}

export default function AvailableLotsStats(props: AvailableLotsStatsProps) {
  const { type, availableLots, carParkNumbers } = props;
  return (
    <VStack spacing={10} align="stretch">
      <Stats
        label={
          type === "lowest" ? "Lowest Available Lots" : "Highest Available Lots"
        }
        stats={availableLots}
      />

      <Box bg={"tomato"} borderRadius={"lg"} minHeight={"50vh"} padding={5}>
        <Wrap>
          {carParkNumbers.map((carParkNumber: string) => (
            <Tag
              size={"lg"}
              key={carParkNumber}
              variant="subtle"
              colorScheme="cyan"
            >
              <TagLabel>{carParkNumber}</TagLabel>
            </Tag>
          ))}
        </Wrap>
      </Box>
    </VStack>
  );
}
