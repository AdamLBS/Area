export type GithubUser = {
  login: string
  id: number
  repos_url: string
}

export type Repository = {
  id: number
  name: string
  commits_url: string
}

export type Commit = {
  sha: string
}

export type CICDState = {
  id: number
  name: string
  status: string
  conclusion: string
}
