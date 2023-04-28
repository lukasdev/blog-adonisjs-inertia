import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler';
import Logger from '@ioc:Adonis/Core/Logger';

export default class ExceptionHandler extends HttpExceptionHandler {
  protected statusPages = {
    '403': 'errors/unauthorized',
    '404': 'errors/not-found',
    '500..599': 'errors/server-error',
  };

  constructor() {
    super(Logger);
  }

  public async handle(error: any, ctx: HttpContextContract) {
    const { session, response } = ctx;

    /**
     * Handle failed authentication attempt
     */
    if (['E_INVALID_AUTH_PASSWORD', 'E_INVALID_AUTH_UID'].includes(error.code)) {
      session.flash('errors', { login: error.message });
      return response.redirect('/login');
    }

    /**
     * Forward rest of the exceptions to the parent class
     */
    return super.handle(error, ctx);
  }
}