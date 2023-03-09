import { clsx } from "clsx"
import { NavLink } from "react-router-dom"

export interface Tab {
  name: string
  href: string
  disabled?: boolean
}

export function Tabs({ tabs, className }: { tabs: Tab[]; className?: string }) {
  return (
    <nav className={className} aria-label="Tabs">
      <ul className="flex space-x-2">
        {tabs.map((tab) =>
          tab.disabled
            ? (
              <span
                className={clsx(
                  "text-tabs-dimmed/75 border-transparent cursor-not-allowed",
                  "block border-b-2 whitespace-nowrap py-4 px-6 font-medium",
                )}
              >
                {tab.name}
              </span>
            )
            : (
              <li>
                <NavLink
                  to={tab.href}
                  key={tab.name}
                  className={({ isActive }: { isActive: boolean }) =>
                    clsx(
                      isActive
                        ? "border-tabs text-tabs-text"
                        : "text-tabs-dimmed border-transparent hover:border-tabs hover:text-tabs-text",
                      "block border-b-2 whitespace-nowrap py-4 px-6 font-medium",
                    )}
                  aria-current={({ isActive }: { isActive: boolean }) =>
                    isActive ? "page" : undefined}
                >
                  {tab.name}
                </NavLink>
              </li>
            )
        )}
      </ul>
    </nav>
  )
}
