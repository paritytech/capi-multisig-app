import WalletConnect from "../../islands/WalletConnect.tsx"
import { PolkadotLogo } from "../PolkadotLogo.tsx"

export function Header() {
  return (
    <header className="bg-white py-2 px-6 rounded-t border border-nebula">
      <div className="flex flex-row flex-nowrap items-center justify-between gap-4">
        <div className="w-40">
          <PolkadotLogo />
        </div>
        <div className="flex items-center gap-4">
          <WalletConnect />
        </div>
      </div>
    </header>
  )
}
