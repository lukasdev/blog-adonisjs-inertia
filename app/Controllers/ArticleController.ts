import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Article from 'App/Models/Article';

import AbstractController from './AbstractController';

export default class ArticleController extends AbstractController{
    public async show({ inertia, params }: HttpContextContract) {
        const slug = params.slug;
        const article = await Article.query().preload('comments', (commentQuery) => {
            commentQuery.preload('user', (userQuery) => {
                userQuery.select('id', 'name');
            });
        })
        .where('slug', slug).first();


        return inertia.render('Article', {
            article
        });
    }

    public async comment({ request, response, session, auth }: HttpContextContract) {
        
        await auth.use('web').authenticate();
        const user = auth.use('web').user;

        const article_id = request.input('article_id');
        const comment = request.input('comment');

        try {
            const article = await Article.query().where('id', article_id).firstOrFail();
            await article.related('comments').create({
                userId: user?.id,
                comment: comment,
                votes: 0,
                points: 0
            });
        } catch (e)  {
            
            console.log(e);
            this.setError(session, 'Não foi possivel cadastrar o comentário');
        }
        return response.redirect().back();
    }
}
