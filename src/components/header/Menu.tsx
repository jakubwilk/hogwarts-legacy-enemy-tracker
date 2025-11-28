import { Card, Group } from '@mantine/core'
import { LanguageSwitcher, ThemeSwitcher } from 'header'

export default function Menu() {
  return (
    <Card shadow='sm' padding='xs' radius='sm' withBorder className='!overflow-visible'>
      <Group gap='md'>
        <LanguageSwitcher />
        <ThemeSwitcher />
      </Group>
    </Card>
  )
}
