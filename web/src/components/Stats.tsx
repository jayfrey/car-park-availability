import { Stat, StatLabel, StatNumber } from '@chakra-ui/react';

interface StatsProps {
  label: string;
  stats: number;
}

export default function Stats(props: StatsProps) {
  const { label, stats } = props;
  return (
    <Stat>
      <StatLabel>{label}</StatLabel>
      <StatNumber>{stats}</StatNumber>
    </Stat>
  );
}
