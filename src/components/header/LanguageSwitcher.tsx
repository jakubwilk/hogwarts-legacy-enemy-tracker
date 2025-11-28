import { Group, Image, Select, Tooltip } from '@mantine/core'
import { useTranslation } from 'react-i18next'

const languages = [
  { value: 'pl', label: 'Polski', flag: 'PL' },
  { value: 'en', label: 'English', flag: 'GB' },
]

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation()

  const renderOption = ({ option }: { option: { value: string; label: string } }) => {
    const lang = languages.find((l) => l.value === option.value)
    return (
      <Group gap='xs'>
        <Image
          src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${lang?.flag}.svg`}
          alt={option.label}
          w={20}
          h={15}
        />
        <span>{option.label}</span>
      </Group>
    )
  }

  const currentLang = languages.find((l) => l.value === i18n.language)

  return (
    <Tooltip label={t('header.menu.language')} position='top' withArrow withinPortal zIndex={1100}>
      <Select
        data={languages}
        value={i18n.language}
        onChange={(value) => value && i18n.changeLanguage(value)}
        renderOption={renderOption}
        leftSection={
          currentLang && (
            <Image
              src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${currentLang.flag}.svg`}
              alt={currentLang.label}
              w={20}
              h={15}
            />
          )
        }
        styles={{
          input: { cursor: 'pointer' },
          option: { cursor: 'pointer' },
        }}
        classNames={{
          dropdown: 'z-[1050]',
        }}
        allowDeselect={false}
        comboboxProps={{ withinPortal: false }}
      />
    </Tooltip>
  )
}
