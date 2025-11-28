import HogwartsLegacyLogo from 'assets/hero-logo.png'
import { useTranslation } from 'react-i18next'

export default function Logo() {
  const { t } = useTranslation()

  return <img width={300} src={HogwartsLegacyLogo} alt={t('header.logo')} />
}
