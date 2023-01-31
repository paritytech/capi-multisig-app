import classNames from "classnames"
import { PolkadotLogo } from "../PolkadotLogo.tsx"

export const Sidebar = () => {
  return (
    <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
      <div className="flex flex-grow flex-col overflow-y-auto border-r border-gray-200 bg-white pt-5 px-4">
        <div className="w-40">
          <PolkadotLogo />
        </div>
        <div className="mt-4">
          <a
            key="multisig"
            href="#"
            className={classNames(
              "bg-platinum text-gray-900",
              // TODO styles for inactive, e.g
              // 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              "group flex items-center px-2 py-2 text-sm font-medium rounded-md",
            )}
          >
            Multisig
          </a>
        </div>
      </div>
    </div>
  )
}
