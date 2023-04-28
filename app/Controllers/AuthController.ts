import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
    public async login({ inertia, auth, response }: HttpContextContract) {
        if (await auth.use('web').check()) {
            return response.redirect().toRoute('admin.index');
        }

        return inertia.render('Auth/Login');
    }

    public async logout({ auth, response }: HttpContextContract) {
        await auth.use('web').logout();
        
        return response.redirect().toRoute('login');
    }

    public async auth({ request, auth, response, session }: HttpContextContract) {
        try {
            const email = request.input('email');
            const password = request.input('password');

            await auth.use('web').attempt(email, password);

            return response.redirect().toRoute('admin.index');
        } catch {
            session.flash('errors', { error: 'Não foi possivel efetuar o login' });

            return response.redirect().back();
        }
    }
}
