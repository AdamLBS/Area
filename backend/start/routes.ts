/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import './routes/AuthentificationRouter'
import './routes/SocialAuthentificationRouter'

Route.group(() => {
  Route.get('/', async () => {
    return { hello: 'world!' }
  })

  Route.get('/oauth/:provider/redirect', 'SocialAuthentificationsController.redirect')

  /* Auth routes */
  Route.group(() => {
    Route.post('/register', 'AuthController.register')
    Route.post('/login', 'AuthController.login')
    Route.post('/logout', 'AuthController.logout')
  }).prefix('/auth')

  Route.group(() => {
    Route.get('/me', 'AuthController.me')
  })
    .prefix('/user')
    .middleware('auth')

  Route.get('/oauth/:provider/callback', 'SocialAuthentificationsController.callback')
}).prefix('/api')
