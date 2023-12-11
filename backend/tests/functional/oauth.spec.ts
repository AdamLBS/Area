import { test } from '@japa/runner'

test.group('Oauth', () => {
  test('redirect to spotify', async ({ client }) => {
    const response = await client.get('/oauth/spotify/redirect')

    console.log(response.dumpBody())
    response.assertStatus(200)
  })
})
