import {
  HttpResponse,
  HttpRequest,
  EmailValidator,
  Controller
} from '../protocols'
import { badRequest, serverError } from '../helpers/http-helper'
import { InvalidParamError, MissingParamError } from '../erros'
import { AddAccount } from '../../domain/usercases/add-account'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccount

  constructor(emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
  }

  handle(httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = [
        'name',
        'email',
        'password',
        'passwordConfirmation'
      ]
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { name, password, passwordConfirmation, email } = httpRequest.body
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      this.addAccount.add({
        name,
        email,
        password
      })
      return { statusCode: 400, body: 'name' }
    } catch (error) {
      return serverError()
    }
  }
}
