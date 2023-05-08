/*
|--------------------------------------------------------------------------
| Inertia Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/

import Inertia from '@ioc:EidelLev/Inertia';

Inertia.share({
  errors: (ctx) => {
    return ctx.session.flashMessages.get('errors');
  },
  user: async (ctx) => {
    if(!(await ctx.auth.use('web').check())) {
      return null;
    }

    await ctx.auth.use('web').authenticate();
    return ctx.auth.use('web').user;
  }
}).version(() => Inertia.manifestFile('public/assets/manifest.json'));
