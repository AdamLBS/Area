import axios from 'axios'
import Database from '@ioc:Adonis/Lucid/Database'
import { APIEventField } from 'types/events'

export const SendMailEvent = async (data: APIEventField<any>[], responseApiUuid: string) => {
  try {
    const mailOAuth = await Database.query().from('oauths').where('uuid', responseApiUuid).first()
    let message =
      'From: <me>\n' +
      'To: <' +
      data.at(0)?.value +
      '>\n' +
      'Subject: ' +
      data.at(1)?.value +
      '\n\n' +
      data.at(2)?.value +
      '\n'
    const stringToBase64 = (str: string) =>
      Buffer.from(str).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
    const encodedMessage = stringToBase64(message)
    const bearer = `Bearer ${mailOAuth.token}`
    const options = {
      method: 'POST',
      url: 'https://gmail.googleapis.com/gmail/v1/users/me/messages/send',
      params: { '': '' },
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'insomnia/8.4.5',
        'Authorization': bearer,
      },
      data: {
        raw: encodedMessage.toString(),
      },
    }
    await axios.request(options)
  } catch (error) {
    console.log(error)
  }
}
