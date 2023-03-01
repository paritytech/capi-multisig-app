export const retry = async <T>(
  fn: () => Promise<T> | T,
  { retries, retryIntervalMs }: { retries: number; retryIntervalMs: number },
): Promise<T> => {
  try {
    console.log('Getting accounts...')

    return await fn()
  } catch (error) {
    if (retries <= 0) {
      throw error
    }
    console.log(`Waiting ${retryIntervalMs}ms..`)

    await sleep(retryIntervalMs)
    console.log('Re-trying to get accounts...')

    return retry(fn, { retries: retries - 1, retryIntervalMs })
  }
}

const sleep = (ms = 0) => new Promise((resolve) => setTimeout(resolve, ms))
