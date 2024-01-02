import axios from 'axios'
import { Content } from './EventHandler'
import Database from '@ioc:Adonis/Lucid/Database'

export const discordEvent = async (content: Content, responseApiUuid: string) => {
  const discordWebhook = await Database.from('oauths')
    .select('webhook')
    .where('uuid', responseApiUuid)
    .first()
  try {
    await axios.post(`${discordWebhook.webhook}`, {
      content: `@everyone ${content.message}`,
    })
  } catch (error) {
    console.log(error)
  }
}
