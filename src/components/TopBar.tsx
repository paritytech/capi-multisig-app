import AccountSelect from './AccountSelect'
import { Link } from 'react-router-dom'

export function TopBar() {
  return (
    <header className="flex w-full justify-end p-4 bg-white">
      <ul className="flex w-full justify-center p-4">
        <li className="mr-6">
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <span className="text-gray-400 cursor-not-allowed">
            Transaction history
          </span>
        </li>
      </ul>
      <AccountSelect />
    </header>
  )
}
