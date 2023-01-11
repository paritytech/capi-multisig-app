# capi_multisig_app_planning
For now: discussion. Soon: a multisig admin app using Capi under the hood.

**Please note:** (11/Jan/2023) This document is a rough dreaft at this stage and may change drastically over the next couple of weeks. Some content below is intended to be a reminder/placeholder and will be reworded or edited in the coming days. 

# Multisig
Multisig (multiple signatories) is a concept of having multiple entities sign off a transaction made from a particular account/wallet. This may be required for a number of reasons such as corporate governance, security, spend tracking/management, contractual obligations, decentralisation.


# Functionality
The Multisig tool provides functionality for creating/editing/dissolving a multisig set-up, executing multisig transactions, and viewing transaction history. Additional complexities involving proxies and multiple thresholds and levels of signatories are discussed later in this document.

## Managing a Multisig
Managing a multisig implies Creating a new multisig set-up, Editing the settings of an existing multisig, Dissolving a multisig (housekeeping? removing the current multiple signatories, transfer remaining funds, deactivate wallet?)
### Create a Multisig
#### Simple multisig setup
At it's core a multisig set-up is a single wallet with multiple signatories and a threshold which determines how many signatories are required to sign off on any transaction. 
#### Complex multisig setup
At it's most complex a multisig set-up is an **anonymous** single wallet with multiple **anonymous groups of** signatories and **multiple** threshold (**s**) which determine how many signatories **from each signatory group** are required to sign off on a transaction **of a certain value range**

### Edit a multisig
A multisig may need to get updated for many reasons. Signatories may change due to organisational restructure, or personal reasons, thresholds may change due currency fluctuations or financial reorganisation. The multisig tool provides a seamless user experience for making (proposing?) changes to a multisig set-up. 
### Dissolve a multisig

## Transacting
### Initiate transaction
#### Call hash communication(???)
Asynchronous messaging facility?
### Signatories sign
#### Transaction confirmation comm (???)
## Transaction history

# Proxies

# Other considerations / NFRs
