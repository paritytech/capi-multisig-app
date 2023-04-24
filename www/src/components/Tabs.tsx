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
      <ul className="flex space-x-2 text-body_2 font-medium font-inter">
        {tabs.map((tab) =>
          tab.disabled
            ? (
              <span
                className={clsx(
                  "text-foreground-disabled border-transparent cursor-not-allowed",
                  "block border-b-2 whitespace-nowrap py-2 px-6 font-medium",
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
                        ? "border-fill-secondary text-foreground-contrast"
                        : "text-foreground-contrast border-transparent hover:border-tabs hover:text-tabs-text",
                      "block border-b-2 whitespace-nowrap py-2 font-medium",
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
