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

Route.get('/spotify/redirect', async ({ ally }) => {
  return ally.use('spotify').stateless().redirect()
})

Route.get('/google/callback', async ({ ally }) => {
  const google = ally.use('google')

  /**
   * User has explicitly denied the login request
   */
  if (google.accessDenied()) {
    return 'Access was denied'
  }

  /**
   * Unable to verify the CSRF state
   */
  if (google.stateMisMatch()) {
    return 'Request expired. Retry again'
  }

  /**
   * There was an unknown error during the redirect
   */
  if (google.hasError()) {
    return google.getError()
  }

  /**
   * Finally, access the user
   */
  const user = await google.user()
  return user.token
})

Route.get('/spotify/callback', async ({ ally }) => {
  const spotify = ally.use('spotify')
  if (spotify.accessDenied()) {
    return 'Access was denied'
  }

  if (spotify.stateMisMatch()) {
    return 'Request expired. Retry again'
  }

  if (spotify.hasError()) {
    return spotify.getError()
  }

  const user = await spotify.user()
  return user.token
})
