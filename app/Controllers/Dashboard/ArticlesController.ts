import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateArticleValidator from 'App/Validators/CreateArticleValidator'
import Application from '@ioc:Adonis/Core/Application'

import Article from 'App/Models/Article';

export default class ArticlesController {
    public async index({ inertia, request }: HttpContextContract) {
        const limit = 2;
        const page = request.input('page', 1)
  
        const articles = await Article.query().orderBy('id', 'desc').paginate(page, limit);
    
        const formatedArticles = articles.toJSON();
        formatedArticles.data = formatedArticles.data.map((obj) => {
            obj.createdAt = obj.createdAt.toFormat('dd/MM/yyyy H:m:ss')
            return obj;
        });

        return inertia.render('Dashboard/Articles/Index', {
            articles: formatedArticles
        });
    }

    public async create({ inertia }: HttpContextContract) {
        return inertia.render('Dashboard/Articles/Create');
    }

    public async store({ request, auth, response }: HttpContextContract) {
        const payload = await request.validate(CreateArticleValidator);
        const file = request.file('image');

        if (file) {
            await file.move(Application.tmpPath('uploads'))
        }

        const fileName = (file?.fileName) ? file.fileName : '';

        const user = auth.use('web').user;
        await user?.related('articles').create({
            cover: fileName,
            title: payload.title,
            content: payload.content
        })
        
        return response.redirect().back();
    }

    public async edit({ inertia, params, response }: HttpContextContract) {
        try {
            const article = Article.findOrFail(params.id);

            return inertia.render('Dashboard/Articles/Edit', {
                article
            });
        } catch {
            return response.redirect().toRoute('home');
        }
    }

    public async update({ request, response, session, params }: HttpContextContract) {
        const payload = await request.validate(CreateArticleValidator);

        try {
            const article = await Article.findOrFail(params.id);
            article.title = payload.title;
            article.content = payload.content;
            (await article).save();
        } catch {
            session.flash('errors', { error: 'Não foi possivel editar o artigo' });
        }
        
        return response.redirect().back();
    }

    public async delete({ params, response }: HttpContextContract) {
        const id = params.id;

        try {
            const article = await Article.query().where('id', id).first();

            if (article) {
                await article.delete();
            }
        } catch {
            session.flash('errors', { error: 'Não foi possivel deletar o artigo' });
        }

        return response.redirect().back();        
    }
}
