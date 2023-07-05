import { Link } from "react-router-dom"
import { Button } from "../../Button.js"
import { wizardData } from "./wizardData.js"

export function MultisigSummary() {
  const {
    value: { name, fundingAmount, members },
  } = wizardData

  return (
    <div>
      <h1 className="text-xl leading-8">Summary</h1>
      <hr className="border-t border-gray-300 mt-6 mb-4" />
      <pre className="bg-gray-100 p-4 rounded-lg shadow-md overflow-x-auto space-y-2">
        <div className="flex items-center">
          <span className="font-bold text-gray-800">Multisig name:</span>
          <span className="font-mono text-gray-900">{name}</span>
        </div>
        <div className="items-center">
          <span className="font-bold text-gray-800">Multisig members:</span>
          <ul className="font-mono text-gray-900">
            {members.map((v, i) => (
              <li key={i}>{v?.address}</li>
            ))}
          </ul>
        </div>
        <div className="flex items-center">
          <span className="font-bold text-gray-800">Multisig fund:</span>
          <span className="font-mono text-gray-900">{fundingAmount}</span>
        </div>
      </pre>
      <hr className="divide-x-0 divide-gray-300 mt-4 mb-2" />
      <div className="flex justify-end">
        <Link to="/">
          <Button type="submit" variant="primary">
            Done
          </Button>
        </Link>
      </div>
    </div>
  )
}
