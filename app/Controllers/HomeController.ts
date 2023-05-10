import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Article from 'App/Models/Article';
import Comment from 'App/Models/Comment';
import User from 'App/Models/User';

export default class HomeController {
    public async index({ inertia, request}: HttpContextContract) {
        
        const limit = 8;
        const page = request.input('page', 1)

        const lastArticles = await Article.query().orderBy('id', 'desc').paginate(page, limit);

        const formatedArticles = lastArticles.toJSON();
        formatedArticles.data = formatedArticles.data.map((article) => {
           article.content = article.content.substring(0,30);
           return article;
        });

        return inertia.render('Home', {
            articles: formatedArticles
        });
    }
}
