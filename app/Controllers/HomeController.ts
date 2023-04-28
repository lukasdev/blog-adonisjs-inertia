import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Article from 'App/Models/Article';
export default class HomeController {
    public async index({ inertia }: HttpContextContract) {
        const lastArticles = await Article.query().select('*').limit(2)
        const limitedRows = lastArticles.map((article) => {
           article.content = article.content.substring(0,30);
           return article;
        });

        return inertia.render('Home', {
            articles: limitedRows
        });
    }
}
