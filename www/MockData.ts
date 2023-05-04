import { Setup as SetupType } from "common"
export const MockSetup = {
  type: "setup",
  id: "idString",
  genesisHash: "genesisHash",
  name: "Name",
  members: [
    [
      "15oF4uVJwmo4TdGW7VfQxNLavjCXviqxT9S1MgbjMNHr6Sp5",
      "aliceProxy",
    ],
    [
      "15oF4uVJwmo4TdGW7VfQxNLavjCXviqxT9S1MgbjMNHr6Sp5",
      "aliceProxy",
    ],
  ],
  threshold: 2,
  multisig: "5FWHrrv8pfNYRCBWW3jLC24kFY2F2sVVWusdxAcmzkCEnfek",
  stash: "stashAccId",
  history: [{
    callData: "callDataString",
    timePoint: [123, 4],
    approvals: [{
      blockHash: "blockHashString",
      member: "accountId",
    }],
    cancelled: "cancelledString",
  }],
} as SetupType
