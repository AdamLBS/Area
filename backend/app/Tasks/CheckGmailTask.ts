import { BaseTask, CronTimeV2 } from 'adonis5-scheduler/build/src/Scheduler/Task'
import Config from '@ioc:Adonis/Core/Config'
const axios = require('axios');

export default class CheckGmailTask extends BaseTask {
  public static get schedule() {
    return CronTimeV2.everyTenSeconds()
  }
  public static get useLock() {
    return false
  }


  async getLatestMessageId(accessToken) {
    try {
      const response = await axios.get('https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=1&orderBy=internalDate', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const latestMessageId = response.data.messages[0].id;
      return latestMessageId;
    } catch (error) {
      console.error('Error fetching latest message ID:', error.response ? error.response.data : error.message);
      throw error;
    }
  }

  async getMessageContent(accessToken, messageId) {
    try {
      const response = await axios.get(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        format: 'FULL',
      });
      const message = response.data;
      const fromHeader = message.payload.headers.find(header => header.name === 'From');
      const fromValue = fromHeader.value;
      console.log('Sender Email:', fromValue);
      return message;
    } catch (error) {
      console.error('Error fetching message content:', error.response ? error.response.data : error.message);
      throw error;
    }
  }

  async getSenderEmail(accessToken, messageId) {
  public async handle() {
    const latestMessageId = await this.getLatestMessageId("");
    console.log('Latest Message ID:', latestMessageId);
    const messageContent = await this.getMessageContent("", latestMessageId);
    const snipped = messageContent.snippet;
    console.log('Message Snippet:', snipped);
    this.logger.info('Handled');
    await new Promise((res) => setTimeout(res, 2000));
  }
}
