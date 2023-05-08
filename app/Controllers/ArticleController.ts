import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Article from 'App/Models/Article';

export default class ArticleController {
    public async show({ inertia, params }: HttpContextContract) {
        const slug = params.slug;
        const article = await Article.query().where('slug', slug).first();

        return inertia.render('Article', {
            article
        });
    }
}
