import classNames from 'clsx'
import { NavLink } from 'react-router-dom'

export interface Tab {
  name: string
  href: string
}

export function Tabs({ tabs, className }: { tabs: Tab[]; className?: string }) {
  return (
    <nav className={className} aria-label="Tabs">
      <ul className="flex space-x-2">
        {tabs.map((tab) => (
          <li>
            <NavLink
              to={tab.href}
              key={tab.name}
              className={({ isActive }: { isActive: boolean }) =>
                classNames(
                  isActive
                    ? 'border-tabs text-tabs-text'
                    : 'text-tabs-dimmed border-transparent hover:border-tabs hover:text-tabs-text',
                  'block border-b-2 whitespace-nowrap py-4 px-6 font-medium',
                )
              }
              aria-current={({ isActive }: { isActive: boolean }) =>
                isActive ? 'page' : undefined
              }
            >
              {tab.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
