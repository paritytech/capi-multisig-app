export type Animal = Dog | Cat

export interface Dog extends AnimalBase<"Dog"> {
  bark: "quiet" | "medium" | "loud"
}
export interface Cat extends AnimalBase<"Cat"> {
  claws: "filed" | "sharp" | "why get a cat in the first place?"
}

interface AnimalBase<Kind extends string> {
  id: string
  kind: Kind
}
