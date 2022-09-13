import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: MongoClient,
  async connect(url: string): Promise<void> {
    this.client = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  },
  async disconnect(): Promise<void> {
    this.client.close()
    this.client = null
  },

  getCollection(name: string): Collection {
    return this.client.db().collection(name)
  },
  map(collection: any): any {
    const { _id, ...collectionWithoutId } = collection
    return Object.assign({}, collectionWithoutId, { id: _id })
  }
}
