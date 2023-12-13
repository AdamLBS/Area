import axios from 'axios'

export enum ResponseInteraction {
  SEND_EMAIL = 'send_email',
  SEND_DISCORD_MESSAGE = 'send_discord_message',
}

export type Content = {
  title: string
  message: string
  url?: string
}

export const eventHandler = async (eventTrigger: ResponseInteraction, content: Content) => {
  console.log(`[EventHandler] ${eventTrigger} triggered`)
  if (eventTrigger === ResponseInteraction.SEND_DISCORD_MESSAGE) {
    try {
      await axios.post(
        `https://discord.com/api/webhooks/1184108920436953098/HpXo-M737CvNJxvY3Y-pqnxddgXnw1JhiIQS1YHYURXPiDgB7SddR9qTkMj6aCD290Xm?wait=true`,
        {
          content: `@everyone ${content.message}`,
        }
      )
    } catch (error) {
      console.log(error)
    }
  }
}
