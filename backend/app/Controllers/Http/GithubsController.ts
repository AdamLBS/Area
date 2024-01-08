import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Oauth from 'App/Models/Oauth'
import { GithubUser, Repository } from 'App/types/github'
import axios from 'axios'

export default class GithubsController {
  public async getUserRepositories({ response, auth }: HttpContextContract) {
    const user = await auth.authenticate()
    const oauth = await Oauth.query()
      .where('provider', 'github')
      .where('user_uuid', user.uuid)
      .first()
    let repositories: Repository[] = []
    if (!oauth) {
      return response.status(400).json({ message: 'No github oauth found' })
    }
    console.log('oauth', oauth.token)
    try {
      const user = (
        await axios.get('https://api.github.com/user', {
          headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `Bearer ${oauth.token}`,
          },
        })
      ).data as GithubUser
      const githubRepositoriesResponse = await axios.get<Repository[]>(user.repos_url, {
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer ${oauth.token}`,
        },
      })
      repositories = githubRepositoriesResponse.data.map((repo) => ({
        id: repo.id,
        name: repo.name,
        commits_url: repo.commits_url,
      }))
      return response.status(200).json(repositories)
    } catch (error: any) {
      console.error(error)
      return response.status(500).json({ message: 'Something went wrong' })
    }
  }
}
