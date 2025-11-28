import { Logo, Menu } from 'header'

export default function Header() {
  return (
    <header className='py-8 w-full relative z-1000'>
      <div className='container mx-auto'>
        <div className='flex items-center justify-between gap-4'>
          <Logo />
          <Menu />
        </div>
      </div>
    </header>
  )
}
