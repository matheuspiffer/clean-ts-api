import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: MongoClient,
  async connect(): Promise<void> {
    this.client = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  },
  async disconnect(): Promise<void> {
    this.client.close()
  },

  getCollection(name: string): Collection {
    return this.client.db().collection(name)
  }
}
