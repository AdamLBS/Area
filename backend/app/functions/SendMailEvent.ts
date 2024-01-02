import axios from 'axios'
import Database from '@ioc:Adonis/Lucid/Database'

export const SendMailEvent = async (data: any, responseApiUuid: string) => {
  try {
    const mailOAuth = await Database.from('oauths').where('uuid', responseApiUuid).first()
    let message =
      'From: <me>\n' +
      'To: <' +
      data.fields.email +
      '>\n' +
      'Subject: ' +
      'Stratos Notification' +
      '\n\n' +
      'The user has changed his music' +
      '\n' //todo: ajouter la customisation du message
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
