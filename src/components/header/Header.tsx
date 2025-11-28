import { Logo, Menu } from 'header'

export default function Header() {
  return (
    <header className='py-8 w-full'>
      <div className='container mx-auto'>
        <div className='flex flex-col md:flex-row items-center justify-between gap-4'>
          <Logo />
          <Menu />
        </div>
      </div>
    </header>
  )
}
