# capi_multisig_app_planning

For now: discussion. Soon: a multisig admin app using CAPI under the hood.

# Multisig

Multisig (multiple signatories) is a concept of having several entities sign off a transaction made from the account (wallet). This may be required for several reasons, such as corporate governance, security, spend tracking/management, contractual obligations, decentralization.

# Functionality

The Multisig tool provides functionality for creating/editing/dissolving a multisig set-up, executing multi-sig transactions, and viewing transaction history. Additional complexities involving proxies, multiple thresholds and levels of signatories are discussed later in this document.

## Managing a Multisig

Managing a multisig implies creating a new multisig set-up, editing the settings of an existing multisig, and Dissolving a multisig (housekeeping? Removing the current multiple signatories, transferring remaining funds, deactivating wallet?)

### Mutable vs. Immutable multisig

Due to the nature of the blockchain, it is impossible to make changes to a multisig set-up once it is finalized. Therefore, if a change is required, then a new multisig set-up is created with the updated configuration, and the old multisig is deprecated. Through the use of proxy wallets, it is possible to keep the wallet containing the funds the same and change the association of the proxy wallet from the old multisig set-up to the new one. This allows the multisig tool to provide seamless multisig editing functionality to the user.

### Signatory invitation

Future releases may support an invitation method, but for now creating a multisig will require the user to know addresses of all participating signatories.

### Simple multisig

At its core, a multisig set-up is a single wallet with multiple signatories and a threshold determining how many signatories are required to sign off on any transaction.

### Complex multisig

At its most complex, a multisig set-up is a **proxy** wallet with multiple **groups of proxy** signatories, and **multiple** threshold**s** which determine how many signatories **from each signatory group** are required to sign off on a transaction **of a specific value range, and may include other settings.**

#### Proxy wallet

Using a proxy wallet allows the multisig to be set up as the controlling wallet of the proxy which actually holds funds and transacts, therefore allowing for a new multisig to be created and assigned as the controller of the proxy wallet by the old multisig as its final action.

### The Multisig tool...

... provides the functionality needed for a user to seamlessly create a multisig that is as simple or as complex as they require and to edit the multisig as needed in the future.

### Create a Multisig

#### Simple

A basic setup will have the user add several signatories and select a threshold for the number of signatories required to sign any transaction. In order to make the multisig editable in the future, a pure proxy is created with the rest of the multisig structure attached to it. In the future this will allow the user to create a new multisig structure and assign it to the proxy (following required signatures) thus editing the multisig structure.

#### Complex

In a more complex setup, the user can create multiple groups of signatories and set several thresholds, each requiring a certain number of signatories from each group to sign off on transactions of a certain value range.

### Edit a multisig

A multisig may need to get updated for many reasons. Signatories may change due to organizational restructuring or personal reasons; thresholds may change due to currency fluctuations or financial reorganization.
As mentioned in "Mutable vs. Immutable multisig" above, _"Due to the nature of the blockchain, it is impossible to make changes to a multisig set-up once it is finalized. Therefore if a change is required, then a new multisig set-up is created with the updated configuration, and the old multisig is deprecated. Through the use of proxy wallets, it is possible to keep the wallet containing the funds the same and change the association of the proxy wallet from the old multisig set-up to the new one."_
The multisig tool provides a seamless user experience for making (proposing?) changes to a multisig set-up.

### Dissolve a multisig

All associations are severed, funds transferred to an alternate wallet or redistributed as originally stipulated, and the multisig is dissolved.

## Transacting

### Initiate transaction

Any authorised user can initiate a transaction by selecting a destination address and an amount to send. The user will then sign the transaction and submit it for other signatories to sign.

#### Call hash comm

Asynchronous messaging facility (email, in-app messaging)?

### Signatories sign

Each signatory, once notified, can access the transaction and sign or reject a transaction.

#### Transaction confirmation comm

A message is sent to all signatories confirming the transaction success.

#### Transaction rejection comm

A message is sent to all signatories that the transaction was rejected (including a message from the rejecting signatory).

## Transaction history

A list of historical transactions can be viewed inside the Multisig tool. Each item in the list can be clicked to reveal more detail about the transaction.

# Proxies

Proxy wallets (wallets that cannot transact on their own, but instead are taking instructions from another wallet) are used by the Multisig tool to abstract the process of re-creating the full multisig set-up from the end user into a seamless multisig editing experience.

# Off chain data

Some functionality of the Multisig tool requires off-chain data storage. Details of this will be provided here.

# UI Considerations

## Media Forms

## Screen Transitions

## Transaction state

# Other considerations / NFRs

# Project scope

## Phase 1: Core Multisig - 31 March 2023

The first iteration of the tool will provide the following functionality to the user:

1. Create a multisig (with Stash Proxy and Signatory Proxies)
2. Edit an existing multisig
3. Create/propose a native asset transaction
4. Approve a proposed transaction
5. View pending transactions

## Phase 2: Advanced Multisig - XX XXX 2023

The below list includes features planned for the next release of the tool.

- View transaction history
- Messaging service (allows messages to be sent between signatories during the signing process) - AWS simple messages
  - "New Multisig created" notification
  - "New transaction proposed" message

## Phase 3: Additional improvements and nice to haves - TBC

The below list includes all other features of the multisig tool not currently planned for any release. This is a good area to add desired features for future release planning.

- Multiple threshold levels (2/5 signatories required for transactions of under X, 3 for transactions between X and Y, and 4 for transactions of Y or more).
- Signatory groups
- Reject a proposed transaction (requires a messaging service to send a message to the transaction proposer)

# Glossary

- Multisig - a wallet controlled by multiple signatories
- Multisig configuration - the combined set of rules governing a particular multisig. This would include signatories, thresholds, and any other rules.
- Stash - a wallet containing the funds/assets which the multisig is set-up to control. This is usually a pure proxy that is controlled by a wallet with a multisig set-up attached.

# User stories

## Actors

Alice - in user stories below Alice represents the user who initiates the multisig creation or editing process. As such Alice is also the first signatory in the multisig.
Bob, Charlie - Bob represents signatory 2 and Charlie represent signatory 3. "Bob or Charlie" means any of the other signatories, "Bob and Charlie" means all of the other signatories.
System - in this context system refers to the multisig tool itself. This is used where the system needs to store data temporarily or access stored data.

## Create a simple multisig

1. As Alice, I want to initiate the process of creating a multisig, so that I can learn more about the prerequisites and collect any necessary inputs.
2. As Alice, I want to configure our future multisig by adding Bob and Charlie as signatories and setting a signatory threshold, so that the multisig has valid governance rules.
3. As Alice, I want to see a summary of my multisig configuration, so that I can confirm all the details before committing the configuration and paying the associated fees.
4. As Alice, Bob or Charlie, I want to view the newly created multisig, so that I can transact from it.

## Create a multisig with signatory proxies

1. As Alice, I want to create a new multisig and enforce signatory proxies, so that each individual signatory can be replaced in the future (should the need arrise) without encurring extra costs for re-creating the whole multisig.
2. As System, I want to store all of the multisig configuration data (signed by Alice) on a central server, so that I may update and read it later in the multisig creation process.
3. As Alice, I want to create a pure proxy and add it to the multisig configuration, so that my signatory is set-up correctly.
4. As System, I want to replace Alice's wallet address with the newly created pure proxy address (signed by Alice).
5. As Alice, I want to see a summary of the multisig configuration so that I can verify all of the information I provided and track the progress of any outstanding steps (eg. Bob and Charlie creating pure proxies)
6. As Bob or Charlie, I want to create a pure proxy and add it to the multisig configuration, so that I can participate in the multisig Alice is setting up.
7. As System, I want to replace Bob's or Charlie's wallet address with the newly created pure proxy address in the temporary central data store (signed by Bob or Charlie resspectively).
8. As Alice, I want to see that all required steps (proxy creation) are completed by all signatories and the multisig configuration is ready to be finalised, so that I can confirm the creation of the multisig and pay the applicable fees.
9. As System, I want to read the multisig configuration data stored on the central server, so that I can complete miultisig creation.
10. As Alice, Bob or Charlie, I want to view the newly created multisig, so that I can transact from it.

# References and Links

- [UI3 Components Figma](https://www.figma.com/file/w7tmesabD9ylgQ0RgmB6tK/UI3-components?node-id=722%3A6917&t=H52yPh9xTNJcnb0C-0)
- [GH Discussion](https://github.com/paritytech/capi_multisig_app_planning)
- [UI3 GH Repo](https://github.com/paritytech/ui3)
