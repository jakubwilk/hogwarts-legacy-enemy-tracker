import { Checkbox, Text } from '@mantine/core'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'

import type { IEnemyEntry } from 'models'

interface EnemyItemProps {
  enemy: IEnemyEntry
  checked: boolean
  onToggle: (enemyId: number) => void
}

function EnemyItem({ enemy, checked, onToggle }: EnemyItemProps) {
  const { t } = useTranslation()

  return (
    <div className='flex items-center gap-4'>
      <Checkbox
        checked={checked}
        onChange={() => onToggle(enemy.id)}
        styles={{ input: { cursor: 'pointer' } }}
      />
      <div className='flex items-center gap-4 flex-1'>
        <img
          src={enemy.image}
          alt={t(enemy.name)}
          className='w-12 h-12 object-contain'
          onError={(e) => {
            e.currentTarget.src =
              'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="50" height="50"%3E%3Crect fill="%23ccc" width="50" height="50"/%3E%3C/svg%3E'
          }}
        />
        <Text size='sm'>{t(enemy.name)}</Text>
      </div>
    </div>
  )
}

export default memo(EnemyItem)
