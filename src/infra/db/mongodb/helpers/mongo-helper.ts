import { MongoClient } from 'mongodb'

export const MongoHelper = {
  client: MongoClient,
  url: 'mongodb://localhost:27017',
  async connect(): Promise<void> {
    this.client = await MongoClient.connect(this.url)
  },
  async disconnect(): Promise<void> {
    this.client.close()
  }
}
