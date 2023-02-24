export const putAccount = async ({ pk, sk }: { pk: string; sk: string }) => {
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
    }),
  })
}
