# capi_multisig_app_planning
For now: discussion. Soon: a multisig admin app using Capi under the hood.

**Please note:** (11/Jan/2023) This document is a rough draft and may change drastically over the next couple of weeks. Some content below is intended as a reminder/placeholder and will be reworded or edited in the coming days. 

# Multisig
Multisig (multiple signatories) is a concept of having various entities sign off a transaction made from a particular account/wallet. This may be required for several reasons, such as corporate governance, security, spend tracking/management, contractual obligations, decentralization.


# Functionality
The Multisig tool provides functionality for creating/editing/dissolving a multisig set-up, executing multi-sig transactions, and viewing transaction history. Additional complexities involving proxies, multiple thresholds and levels of signatories are discussed later in this document.

## Managing a Multisig
Managing a multisig implies Creating a new multisig set-up, Editing the settings of an existing multisig, and Dissolving a multisig (housekeeping? removing the current multiple signatories, transferring remaining funds, deactivating wallet?)

### Mutable vs. Immutable multisig
Due to the nature of the blockchain, it is impossible to make changes to a multisig set-up once it is finalized. Therefore if a change is required, then a new mutisig set-up is created with the updated configuration, and the old multisig is deprecated. Through the use of proxy wallets, it is possible to keep the wallet containing the funds the same and change the association of the proxy wallet from the old multisig set-up to the new one. This allows the multisig tool to provide seamless multisig editing functionality to the user.

### Signatory invitation
What if the user does not have the exact addresses of the other signatories (or a signatory may want to select a wallet to use for this particular multisig, is there a way to "invite" signatories to a multisig instead of just adding them?

#### Simple multisig
At its core, a multisig set-up is a single wallet with multiple signatories and a threshold determining how many signatories are required to sign off on any transaction. 

#### Complex multisig
At its most complex, a multisig set-up is a **proxy** wallet with multiple **groups of proxy** signatories and **multiple** threshold**s** which determine how many signatories **from each signatory group** are required to sign off on a transaction **of a specific value range, and may include other settings.**
##### Proxy wallet
Using a proxy wallet allows the multisig to be set up as the controlling wallet of the proxy, therefore allowing for a new multisig to be created and assigned as the controller of the proxy wallet by the old multisig as its final action.

#### The Multisig tool...
... provides the functionality needed for a user to seamlessly create a multisig that is as simple or as complex as they require.

### Create a Multisig
#### Simple
To create a multisig the user would first select whether they want the multisig to be editable in the future. This will determine whether a Proxy is required for the mutisig wallet. A basic setup will have the user add several signatories and select a threshold for the number of signatories (out of the ones added) required to sign any transaction. 
#### Complex
In a more complex setup, the user can create multiple groups of signatories and set several thresholds, each requiring a certain number of signatories from each group to sign off on transactions of a certain value range. 

### Edit a multisig
A multisig may need to get updated for many reasons. Signatories may change due to organizational restructuring or personal reasons; thresholds may change due to currency fluctuations or financial reorganization. The multisig tool provides a seamless user experience for making (proposing?) changes to a multisig set-up. 

### Dissolve a multisig

## Transacting

### Initiate transaction
#### Call hash communication(???)
Asynchronous messaging facility?

### Signatories sign
#### Transaction confirmation comm (???)

## Transaction history

# Proxies

# Offchain data


# Other considerations / NFRs
