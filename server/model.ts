export type Account = Real | Proxy | Multisig

interface Real extends AccountBase<"Real"> {}

interface Proxy extends AccountBase<"Proxy"> {}

interface Multisig extends AccountBase<"Multisig"> {
  signatories: string[]
  threshold: number
}

interface AccountBase<Kind extends string> {
  pk: string
  sk: string
  kind: Kind
}

// interface AccountBase<Kind, UserID extends string> {
//   pk: `USER#${Account}`
//   sk: string
//   kind: Kind
// }

// interface User<UserID extends string = string> {
//   PK: `USER#${UserID}`
//   SK: `#PROFILE#${UserID}`
//   Username: string
//   FullName: string
//   Email: string
//   CreatedAt: Date
//   Address: string
// }

// interface Order<
//   UserID extends string = string,
//   OrderID extends string = string,
// > {
//   PK: `USER#${UserID}`
//   SK: `ORDER#${OrderID}`
//   Username: string
//   OrderID: string
//   Status: "PLACED" | "SHIPPED"
//   CreatedAt: Date
//   Address: string
// }
