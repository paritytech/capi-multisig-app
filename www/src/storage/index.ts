import { DbStorageClient } from "./DbStorageClient.js"
import { IStorageClient } from "./IStorageClient.js"

const storageClient: IStorageClient = new DbStorageClient()
export { storageClient }
