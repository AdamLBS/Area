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

Route.get('/about.json', 'AboutController.info')

Route.group(() => {
  Route.get('/redirect', 'SocialAuthentificationsController.redirect')
  Route.get('/callback', 'SocialAuthentificationsController.callback')
  Route.post('/save', 'SocialAuthentificationsController.save').middleware(['auth:api'])
  Route.delete('/delete', 'SocialAuthentificationsController.delete').middleware(['auth:api'])
}).prefix('/oauth/:provider')

Route.group(() => {
  Route.post('/', 'DiscordsController.add').middleware(['auth:api'])
}).prefix('/oauth/discord/add-webhook')

Route.group(() => {
  Route.get('/', async () => {
    return { hello: 'world!' }
  })

  Route.group(() => {
    Route.post('/create', 'EventsController.createEvent')
    Route.patch('/:uuid/update', 'EventsController.updateEventSettings')
  })
    .prefix('/event')
    .middleware(['auth:api'])

  Route.group(() => {
    Route.get('/trigger', 'EventsController.getAvailableTriggerEvents')
    Route.get('/response', 'EventsController.getAvailableResponseEvents')
    Route.get('/:uuid', 'EventsController.getEvent')
    Route.delete('/delete/:uuid', 'EventsController.deleteEvent').middleware(['auth:api'])
    Route.patch('/activate/:uuid', 'EventsController.activateEvent').middleware(['auth:api'])
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
    Route.patch('/me/update', 'AuthController.update')
    Route.get('/me/services', 'AuthController.getServices')
    Route.get('/events', 'EventsController.getMyEvents')
  })
    .prefix('/user')
    .middleware(['auth:api'])
}).prefix('/api')
