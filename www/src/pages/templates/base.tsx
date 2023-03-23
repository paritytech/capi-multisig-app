import { clsx } from "clsx"
import { ComponentChildren } from "preact"
import polkadotLogo from "../../assets/polkadot.svg"
import { IconMenuMultisig } from "../../components/icons/IconMenuMultisig.js"
import { Notifications } from "../../components/Notifications.js"
import { TopBar } from "../../components/TopBar.js"

type Props = {
  children: ComponentChildren
}

function Sidebar() {
  return (
    <div className="bg-white border-r border-border">
      <div className="w-64 p-4">
        <img src={polkadotLogo} alt="Polkadot logo" className="h-8" />
      </div>
      <nav className="px-2 space-y-1">
        <a
          href="/"
          className={clsx(
            'bg-menu-bg text-menu-active',
            'group flex items-center rounded-md p-2 text-base font-medium'
          )}
        >
          <IconMenuMultisig
            className='mr-3 h-6 w-6 flex-shrink-0'
            aria-hidden="true"
          />
          Multisig
        </a>
      </nav>
    </div >
  )
}

export function Page({ children }: Props) {
  return (
    <div className="min-h-full flex w-full font-inter">
      <Notifications />
      <Sidebar />
      <div className="bg-gray-100 w-full">
        <TopBar />
        {children}
      </div>
    </div>
  )
}
