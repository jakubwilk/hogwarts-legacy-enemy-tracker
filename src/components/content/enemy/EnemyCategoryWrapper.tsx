import { Accordion, Loader, Text, useMantineColorScheme } from '@mantine/core'
import { useGetCategoriesQuery, useGetEnemiesQuery } from 'api'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import EnemyCategoryItem from './EnemyCategoryItem'

const STORAGE_KEY_OPENED = 'hogwarts-enemy-tracker-opened-categories'
const STORAGE_KEY_CHECKED = 'hogwarts-enemy-tracker-checked-enemies'

export default function EnemyCategoryWrapper() {
  const { t } = useTranslation()
  const { colorScheme } = useMantineColorScheme()

  const { data: categories, isLoading: isLoadingCategories } = useGetCategoriesQuery()
  const { data: enemies, isLoading: isLoadingEnemies } = useGetEnemiesQuery()

  const [openedCategories, setOpenedCategories] = useState<string[]>([])
  const [checkedEnemies, setCheckedEnemies] = useState<number[]>([])

  const isLoading = useMemo(
    () => isLoadingCategories || isLoadingEnemies,
    [isLoadingCategories, isLoadingEnemies],
  )

  const enemiesByCategory = useMemo(() => {
    if (!enemies?.data) return {}

    return enemies.data.reduce(
      (acc, enemy) => {
        if (!acc[enemy.category]) {
          acc[enemy.category] = []
        }
        acc[enemy.category].push(enemy)
        return acc
      },
      {} as Record<number, typeof enemies.data>,
    )
  }, [enemies])

  useEffect(() => {
    if (categories?.data) {
      const savedState = localStorage.getItem(STORAGE_KEY_OPENED)

      if (savedState) {
        try {
          const parsed = JSON.parse(savedState)
          setOpenedCategories(parsed)
        } catch (error) {
          console.error('Failed to parse saved categories state:', error)
          setOpenedCategories(categories.data.map((category) => category.id.toString()))
        }
      } else {
        setOpenedCategories(categories.data.map((category) => category.id.toString()))
      }
    }
  }, [categories])

  useEffect(() => {
    const savedChecked = localStorage.getItem(STORAGE_KEY_CHECKED)
    if (savedChecked) {
      try {
        const parsed = JSON.parse(savedChecked)
        setCheckedEnemies(parsed)
      } catch (error) {
        console.error('Failed to parse saved checked enemies:', error)
      }
    }
  }, [])

  useEffect(() => {
    if (openedCategories.length > 0) {
      localStorage.setItem(STORAGE_KEY_OPENED, JSON.stringify(openedCategories))
    }
  }, [openedCategories])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_CHECKED, JSON.stringify(checkedEnemies))
  }, [checkedEnemies])

  const accordionStyles = useMemo(
    () => ({
      item: {
        backgroundColor:
          colorScheme === 'dark' ? 'var(--mantine-color-dark-7)' : 'var(--mantine-color-gray-1)',
        border: colorScheme === 'dark' ? '1px solid var(--mantine-color-dark-4)' : undefined,
      },
    }),
    [colorScheme],
  )

  const toggleEnemy = (enemyId: number) => {
    setCheckedEnemies((prev) => {
      if (prev.includes(enemyId)) {
        return prev.filter((id) => id !== enemyId)
      } else {
        return [...prev, enemyId]
      }
    })
  }

  const toggleCategory = (categoryId: number) => {
    const categoryEnemies = enemiesByCategory[categoryId] || []
    const allChecked = categoryEnemies.every((enemy) => checkedEnemies.includes(enemy.id))

    setCheckedEnemies((prev) => {
      if (allChecked) {
        return prev.filter((id) => !categoryEnemies.some((enemy) => enemy.id === id))
      } else {
        const newIds = categoryEnemies.map((enemy) => enemy.id)
        const existingIds = prev.filter((id) => !newIds.includes(id))
        return [...existingIds, ...newIds]
      }
    })
  }

  const getCategoryCheckState = (categoryId: number) => {
    const categoryEnemies = enemiesByCategory[categoryId] || []
    if (categoryEnemies.length === 0) return { checked: false, indeterminate: false }

    const checkedCount = categoryEnemies.filter((enemy) => checkedEnemies.includes(enemy.id)).length
    return {
      checked: checkedCount === categoryEnemies.length,
      indeterminate: checkedCount > 0 && checkedCount < categoryEnemies.length,
    }
  }

  if (isLoading) {
    return (
      <div className='flex flex-col items-center gap-2 justify-center h-full min-h-40'>
        <Loader color='var(--mantine-color-gray-5)' />
        <Text>{t('enemy.loading')}</Text>
      </div>
    )
  }

  if (!categories?.data || categories.data.length === 0) {
    return (
      <div className='flex items-center justify-center h-full min-h-40'>
        <Text c='dimmed'>No categories found</Text>
      </div>
    )
  }

  return (
    <div className='mt-8'>
      <Accordion
        multiple
        variant='separated'
        radius='sm'
        chevronPosition='right'
        value={openedCategories}
        onChange={setOpenedCategories}
        styles={accordionStyles}
      >
        {categories.data.map((category) => {
          const categoryEnemies = enemiesByCategory[category.id] || []
          const { checked, indeterminate } = getCategoryCheckState(category.id)
          const checkedCount = categoryEnemies.filter((enemy) =>
            checkedEnemies.includes(enemy.id),
          ).length

          return (
            <EnemyCategoryItem
              key={category.id}
              category={category}
              enemies={categoryEnemies}
              checkedEnemies={checkedEnemies}
              checkedCount={checkedCount}
              checked={checked}
              indeterminate={indeterminate}
              onToggleCategory={toggleCategory}
              onToggleEnemy={toggleEnemy}
            />
          )
        })}
      </Accordion>
    </div>
  )
}
