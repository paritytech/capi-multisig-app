import { accounts, defaultAccount } from "../signals/index.js"
import { AccountSelect } from "./AccountSelect.js"
import { Tabs } from "./Tabs.js"
import type { Tab } from "./Tabs.js"

function setTheme(themeName: string) {
  localStorage.setItem("data-theme", themeName);
  document.documentElement.setAttribute("data-theme", themeName);
}

(function () {
  if (localStorage.getItem("data-theme") === "dark") {
    setTheme("dark");
  } else {
    setTheme("light");
  }
  console.log(localStorage.getItem("data-theme"))
})();

const tabs: Tab[] = [
  { name: "Dashboard", href: "/" },
  { name: "Transaction history", href: "/transaction-history", disabled: true },
]

export function TopBar() {

  const toggleOn = () => {
    let theme = localStorage.getItem("data-theme");
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <header className="flex flex-col md:flex-row items-center w-full h-auto md:h-16 px-3 bg-white border-b border-border">
      <div className="self-end mx-auto flex items-center">
        <Tabs tabs={tabs} />
        <div className="py-2 px-7 bg-menu-bg text-textAndIcons-primary rounded-full">
          Soon
        </div>
        <button className='bg-fill-secondary px-4 py-2 text-foreground-matchBackground rounded-full text-body_2 font-medium' onClick={toggleOn} >Change theme</button>
      </div>

      <div className="w-60 my-2">
        <AccountSelect
          accounts={accounts.value}
          value={defaultAccount.value}
          onChange={(account) => {
            defaultAccount.value = account
          }}
        />
      </div>
    </header>
  )
}
