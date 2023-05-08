import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'HomeController.index').as('home');
Route.get('/login', 'AuthController.login').as('login');
Route.post('/login', 'AuthController.auth');
Route.post('/logout', 'AuthController.logout');


Route.group(() => {
    Route.get('/:slug', 'ArticleController.show').as('show');
}).prefix('/article').as('article');

Route.group(() => {

    Route.get('/', 'Dashboard/DashboardController.index').as('index');

    Route.group(() => {

        Route.get('/','Dashboard/ArticlesController.index').as('index');
        Route.get('/new', 'Dashboard/ArticlesController.create').as('create');
        Route.post('/new', 'Dashboard/ArticlesController.store').as('store');

        Route.get('/:id', 'Dashboard/ArticlesController.edit').as('edit');
        Route.put('/:id', 'Dashboard/ArticlesController.update').as('update');
        Route.delete('/:id', 'Dashboard/ArticlesController.delete').as('delete');

    }).as('articles').prefix('/articles');

}).prefix('/admin').as('admin').middleware('auth');
