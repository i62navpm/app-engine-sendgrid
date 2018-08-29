const path = require('path')
const moduleAlias = require('module-alias')

moduleAlias.addAliases({
  '@src': path.join(__dirname, '/src/'),
  '@config': path.join(__dirname, '/config/'),
})

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
