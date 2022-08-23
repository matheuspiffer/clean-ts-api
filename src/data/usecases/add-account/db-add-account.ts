import { AccountModel } from '../../../domain/models/account'
import {
  AddAccount,
  AddAccountModel
} from '../../../domain/usercases/add-account'
import { Encrypter } from '../../protocols/encryter'

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter
  constructor(encrypter: Encrypter) {
    this.encrypter = encrypter
  }

  async add(account: AddAccountModel): Promise<AccountModel> {
    await this.encrypter.encrypt(account.password)
    const result = {
      ...account,
      id: ''
    }
    return await new Promise((resolve) => resolve(result))
  }
}
