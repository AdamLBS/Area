import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/:provider/redirect', 'SocialAuthentificationsController.redirect')
  Route.get('/:provider/callback', 'SocialAuthentificationsController.callback')
}).prefix('/oauth')
