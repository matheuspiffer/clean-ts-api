import { HttpResponse, HttpRequest } from '../protocols/http'
import { badRequest } from '../helpers/http-helper'
import { MissingParamError } from '../erros/missing-params-erro'
export class SignUpController {
  handle(httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
  }
}
