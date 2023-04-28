import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DashboardController {
    public async index({ inertia }: HttpContextContract) {
        //return 'voce esta no painellllllll';
        return inertia.render('Dashboard/Index', {
        });
    }
}
