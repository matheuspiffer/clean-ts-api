import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: MongoClient,
  url: String,

  async connect(url: string): Promise<void> {
    this.url = url
    this.client = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  },
  async disconnect(): Promise<void> {
    this.client.close()
    this.client = null
  },

  async getCollection(name: string): Collection {
    if (!this.client?.isConnected()) {
      await this.connect(this.url)
    }
    return this.client.db().collection(name)
  },
  map(collection: any): any {
    const { _id, ...collectionWithoutId } = collection
    return Object.assign({}, collectionWithoutId, { id: _id })
  }
}
