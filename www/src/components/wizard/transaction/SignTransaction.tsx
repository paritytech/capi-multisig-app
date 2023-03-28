import { Button } from "../../Button.js";

export function SignTransaction() {
  // TODO styles
  return <div className="flex flex-col divide-y divide-divider">
    <div class="py-4">
      <h2 className="text-black text-xl">Sign transaction</h2>
    </div>
    <div class="py-4">
      <p>Ox34ea3dd4a7751b666ad44d11aa64603b11a85a56c00f7b36b1a4bc27fdd71f0f</p>
    </div>
    <div class="py-4">
      <p>Existing approvals: 0/2</p>
    </div>
    <div class="py-4">
      <p>Sending 10.00 DOT from</p>
      <p>to</p>
    </div>
    <div class="py-4">
      Creator
    </div>
    <div class="py-4">
      Signing as:
    </div>
    <div class="py-4 flex gap-6 justify-end">
      <Button variant="danger">Discard</Button>
      <Button>Sign</Button>
    </div>
  </div>
}
