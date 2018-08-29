require('module-alias/register')
const { sendMails } = require('@src/mails.js')
const logger = require('@src/winston.js')

async function bulkSendEmail(data) {
  logger.info('**** Starting to send the emails ****')
  try {
    const response = await sendMails(data)
    return response
  } catch (err) {
    logger.error(err.message)
    return err
  } finally {
    logger.info('**** Finish to send the emails ****')
  }
}

module.exports = { bulkSendEmail }
