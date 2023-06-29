import { useParams } from "react-router-dom";
import { Setup } from "../components/Setup.js";
import { setups } from "../signals/setups.js";
import { Page } from "./templates/base.js";

export function Multisig() {
  let { multisigId } = useParams();
  const setup = setups.peek().find((s) => s.id === multisigId);

  return (
    <Page>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">{setup && <Setup setup={setup} />}</div>
      </div>
    </Page>
  );
}
