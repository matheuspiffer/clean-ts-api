import { BcryptAdapter } from './../../infra/criptography/bcrypt-adapter'
import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'
import { SignUpController } from './../../presentation/controllers/signup/signup'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'

export const makeSignUpController = (): SignUpController => {
  const salt = 12
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const bcyptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(bcyptAdapter, accountMongoRepository)
  return new SignUpController(emailValidatorAdapter, dbAddAccount)
}
