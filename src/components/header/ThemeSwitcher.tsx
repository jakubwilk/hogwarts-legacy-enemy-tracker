import { Box, Switch, Tooltip, useMantineColorScheme } from '@mantine/core'
import { IconMoon, IconSun } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'

export default function ThemeSwitcher() {
  const { colorScheme, setColorScheme } = useMantineColorScheme()
  const { t } = useTranslation()

  return (
    <Tooltip label={t('header.menu.theme')} position='top' withArrow withinPortal zIndex={1100}>
      <Box>
        <Switch
          styles={{
            root: { cursor: 'pointer' },
            track: { cursor: 'pointer' },
            thumb: { cursor: 'pointer' },
          }}
          size='lg'
          color='var(--mantine-color-gray-1)'
          onLabel={<IconSun color='var(--mantine-color-yellow-5)' />}
          offLabel={<IconMoon color='var(--mantine-color-gray-1)' />}
          checked={colorScheme === 'light'}
          onChange={() => setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')}
        />
      </Box>
    </Tooltip>
  )
}
