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

Route.group(() => {
  Route.get('/redirect', 'SocialAuthentificationsController.redirect').middleware('auth')
  Route.get('/callback', 'SocialAuthentificationsController.callback').middleware('auth')
}).prefix('/oauth/:provider')

Route.group(() => {
  Route.post('/', 'DiscordsController.add').middleware('auth')
}).prefix('/oauth/discord/add-webhook')

Route.group(() => {
  Route.get('/', async () => {
    return { hello: 'world!' }
  })

  Route.post('/event/create', 'EventsController.createEvent').middleware('auth')

  Route.group(() => {
    Route.get('/trigger', 'EventsController.getAvailableTriggerEvents')
    Route.get('/response', 'EventsController.getAvailableResponseEvents')
  }).prefix('/events')

  /* Auth routes */
  Route.group(() => {
    Route.post('/register', 'AuthController.register')
    Route.post('/login', 'AuthController.login')
    Route.post('/logout', 'AuthController.logout')
    Route.post('/register/verify/step/1', 'AuthController.checkIfEmailExists')
  }).prefix('/auth')

  Route.group(() => {
    Route.get('/me', 'AuthController.me')
  })
    .prefix('/user')
    .middleware(['auth:web,api'])
}).prefix('/api')
