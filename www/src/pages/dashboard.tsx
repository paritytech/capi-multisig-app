import { Link } from "react-router-dom";
import { Button } from "../components/Button.js";
import { CenteredCard } from "../components/CenteredCard.js";
import { IconPlus } from "../components/icons/IconPlus.js";
import { Page } from "./templates/base.js";

export function Dashboard() {
  return (
    <Page>
      <CenteredCard>
        <div className="flex flex-col gap-6 text-foreground-contrast">
          <div className="flex flex-col gap-2">
            <span className="text-h4 font-inter font-semibold">Create a multisig</span>
            <p className="text-body font-inter">
              Multi-signature wallets require authorization of transactions through multiple
              keys.&nbsp;
              <a
                href="https://wiki.polkadot.network/docs/learn-account-multisig"
                target="_blank"
                className="text-link hover:text-link/80 underline"
              >
                Learn more about multisigs.
              </a>
            </p>
          </div>
          <div>
            <div className="my-24 flex justify-center">
              <Link to="/create-multisig">
                <Button iconLeft={<IconPlus className="w-6 h-6" />} size="xl">
                  New multisig
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </CenteredCard>
    </Page>
  );
}
