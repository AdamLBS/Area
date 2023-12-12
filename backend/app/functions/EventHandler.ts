import axios from 'axios'
import Database from '@ioc:Adonis/Lucid/Database'

export const eventHandler = async () => {
  const users = await Database.query().from('users').select('*')
  const oauth = await Database.query().from('oauths').select('*')
  console.log(users)
  console.log(oauth)
}
