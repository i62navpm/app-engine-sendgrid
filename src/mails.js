const sgMail = require('@sendgrid/mail')
const { templateId } = require('@config')
const logger = require('@src/winston.js')

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY
const SENDGRID_SENDER = process.env.SENDGRID_SENDER

sgMail.setApiKey(SENDGRID_API_KEY)

function sendMails({ users = [], listName = '' }) {
  logger.info(`Sending emails with chanes in: [${listName}]....`)

  const personalizations = users.map(user => ({
    to: user.email,
    dynamic_template_data: {
      name: user.name,
    },
  }))

  const msg = {
    from: { email: SENDGRID_SENDER },
    templateId,
    dynamicTemplateData: {
      listName,
    },
    personalizations,
  }

  return sgMail.sendMultiple(msg)
}

module.exports = { sendMails }
