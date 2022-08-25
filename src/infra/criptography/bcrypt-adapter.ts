import bcrypt from 'bcrypt'
import { resolve } from 'path'
import { Encrypter } from '../../data/protocols/encryter'

export class BcryptAdapter implements Encrypter {
  private readonly salt: number
  constructor(salt: number) {
    this.salt = salt
  }

  async encrypt(value: string): Promise<string> {
    await bcrypt.hash(value, this.salt)
    return ''
  }
}
