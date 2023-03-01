import { ComponentChildren } from 'preact'
import { TopBar } from '../../components/TopBar'
import polkadotLogo from '../../assets/polkadot.svg'

type Props = {
  children: ComponentChildren
}

function Sidebar() {
  return (
    <div className="basis-1/4 xl:basis-1/5 bg-white">
      <div className="w-32 ml-5 mt-5">
        <img src={polkadotLogo} alt="Polkadot logo" />
        <span className="text-xs uppercase ml-8 relative -top-1">WESTEND</span>
      </div>
    </div>
  )
}

export function Page({ children }: Props) {
  return (
    <div className="min-h-full flex w-full">
      <Sidebar />
      <div className="bg-gray-100 w-full">
        <TopBar />
        {children}
      </div>
    </div>
  )
}
