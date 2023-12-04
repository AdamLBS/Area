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

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.get('/google/redirect', async ({ ally }) => {
  return ally.use('google').redirect()
})

Route.get('/google/callback', async ({ ally }) => {
  const google = ally.use('google')
  if (google.accessDenied()) {
    return 'Access was denied'
  }
  if (google.stateMisMatch()) {
    return 'Request expired. Retry again'
  }
  if (google.hasError()) {
    return google.getError()
  }
  const user = await google.user()
  return user.token
})

Route.get('/github/redirect', async ({ ally }) => {
  return ally.use('github').redirect()
})

Route.get('/github/callback', async ({ ally }) => {
  const github = ally.use('github')
  if (github.accessDenied()) {
    return 'Access was denied'
  }
  if (github.stateMisMatch()) {
    return 'Request expired. Retry again'
  }
  if (github.hasError()) {
    return github.getError()
  }
  const user = await github.user()
  return user.email
})
