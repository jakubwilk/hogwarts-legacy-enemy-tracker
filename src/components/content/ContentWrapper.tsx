import { Card, Text } from '@mantine/core'
import { IconAward } from '@tabler/icons-react'
import { useMemo } from 'react'
import { EnemyCategoryWrapper } from './enemy'

export default function ContentWrapper() {
  const achievementName = useMemo(() => 'Finishing Touches', [])

  return (
    <div className='container mx-auto'>
      <Card shadow='sm' padding='xl' radius='sm' withBorder className='overflow-visible! mb-16'>
        <div className='flex items-center gap-2'>
          <IconAward color='var(--mantine-color-yellow-5)' />
          <Text fw={500}>{achievementName}</Text>
        </div>
        <EnemyCategoryWrapper />
      </Card>
    </div>
  )
}
