import { Accordion, Checkbox, Text } from '@mantine/core'
import { memo, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import type { IEnemyCategory, IEnemyEntry } from 'models'

import EnemyItem from './EnemyItem'

interface EnemyCategoryItemProps {
  category: IEnemyCategory
  enemies: IEnemyEntry[]
  checkedEnemies: Set<number>
  checked: boolean
  indeterminate: boolean
  onToggleCategory: (categoryId: number) => void
  onToggleEnemy: (enemyId: number) => void
}

function EnemyCategoryItem({
  category,
  enemies,
  checkedEnemies,
  checked,
  indeterminate,
  onToggleCategory,
  onToggleEnemy,
}: EnemyCategoryItemProps) {
  const { t } = useTranslation()

  const checkedCount = useMemo(
    () => enemies.filter((enemy) => checkedEnemies.has(enemy.id)).length,
    [enemies, checkedEnemies],
  )

  return (
    <Accordion.Item value={category.id.toString()}>
      <Accordion.Control>
        <div className='flex items-center justify-between w-full pr-2'>
          <div className='flex items-center gap-3'>
            <Checkbox
              checked={checked}
              indeterminate={indeterminate}
              onChange={() => onToggleCategory(category.id)}
              onClick={(e) => e.stopPropagation()}
              styles={{ input: { cursor: 'pointer' } }}
            />
            <Text fw={500}>{t(category.name)}</Text>
          </div>
          <Text size='sm' c='dimmed'>
            {checkedCount}/{enemies.length}
          </Text>
        </div>
      </Accordion.Control>
      <Accordion.Panel>
        {enemies.length === 0 ? (
          <Text size='sm' c='dimmed'>
            {t('enemy.noEnemies')}
          </Text>
        ) : (
          <div className='flex flex-col gap-2'>
            {enemies.map((enemy) => (
              <EnemyItem
                key={enemy.id}
                enemy={enemy}
                checked={checkedEnemies.has(enemy.id)}
                onToggle={onToggleEnemy}
              />
            ))}
          </div>
        )}
      </Accordion.Panel>
    </Accordion.Item>
  )
}

export default memo(EnemyCategoryItem)
