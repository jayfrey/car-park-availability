import {
  Tag,
  TagLabel,
  Wrap,
  Skeleton,
  StatLabel,
  StatNumber,
  Stat,
  Card,
  CardBody,
  CardHeader,
  Container,
  Badge,
  Flex,
  Tooltip,
} from '@chakra-ui/react'

interface AvailableLotsStatsProps {
  isLoaded: boolean
  type: string
  availableLots: number
  carparkNumbers: string[]
}

export default function AvailableLotsStats(props: AvailableLotsStatsProps) {
  const { isLoaded, type, availableLots, carparkNumbers } = props
  return (
    <Card>
      <CardHeader>
        <Flex justifyContent='end'>
          <Tooltip label={'Number of car parks'} placement={'left'}>
            <Badge size={'10px'} fontSize='15px' colorScheme='red'>
              {carparkNumbers.length}
            </Badge>
          </Tooltip>
        </Flex>
        <Stat>
          <StatLabel fontSize='20px'>
            {type === 'lowest' ? 'Lowest Available Lots' : 'Highest Available Lots'}
          </StatLabel>
          <StatNumber>{availableLots}</StatNumber>
        </Stat>
      </CardHeader>

      <CardBody>
        <Skeleton isLoaded={isLoaded}>
          <Container borderRadius={'lg'} minHeight={'50vh'} maxHeight={'50vh'} overflowY={'scroll'}>
            <Wrap>
              {carparkNumbers.map((carparkNumber, index) => (
                <Tag size={'lg'} key={'wrap-' + index} variant={'subtle'} colorScheme={'cyan'}>
                  <TagLabel>{carparkNumber}</TagLabel>
                </Tag>
              ))}
            </Wrap>
          </Container>
        </Skeleton>
      </CardBody>
    </Card>
  )
}
