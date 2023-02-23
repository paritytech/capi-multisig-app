export const putAccount = async ({
  pk,
  sk,
  name = "unknown",
}: {
  pk: string
  sk: string
  name?: string
}) => {
  await fetch("/api/put_account", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-cache",
    credentials: "same-origin",
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({
      pk,
      sk,
      name,
    }),
  })
}
