import classNames from "classnames"

export function Tabs({ tabs }: {
  tabs: {
    name: string
    href: string
    current: boolean
  }[]
}) {
  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-pink-500 focus:outline-none focus:ring-pink-500 sm:text-sm"
          defaultValue={tabs.find((tab) => tab.current)!.name}
        >
          {tabs.map((tab) => <option key={tab.name}>{tab.name}</option>)}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <a
                key={tab.name}
                href={tab.href}
                className={classNames(
                  tab.current
                    ? "border-pink-500 text-black"
                    : "border-transparent text-gray-500 hover:border-pink-500 hover:text-gray-700",
                  "whitespace-nowrap border-b-2 py-4 px-6 font-medium",
                )}
                aria-current={tab.current ? "page" : undefined}
              >
                {tab.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}
