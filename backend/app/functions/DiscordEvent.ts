import axios from 'axios'
import { APIEventField } from 'App/types/event'

export const discordEvent = async (data: APIEventField<any>[], _responseApiUuid: string) => {
  try {
    await axios.post(`${data.at(1)}`, {
      content: `${data.at(0)}`,
    })
  } catch (error) {
    console.log(error)
  }
}
