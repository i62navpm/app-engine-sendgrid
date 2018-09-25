const sgMail = require('@sendgrid/mail')
const { templateId, templateNotificationId, listMap } = require('@config')
const logger = require('@src/winston.js')

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY
const SENDGRID_SENDER = process.env.SENDGRID_SENDER

sgMail.setApiKey(SENDGRID_API_KEY)

function sendMails({ users = [], listName = '' }) {
  logger.info(
    `Sending database updates emails with changes in: [${listName}]....`
  )

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

function sendNotificationsMails({ users = [], listName = '' }) {
  logger.info(
    `Sending new lists notifications emails with changes in: [${listName}]....`
  )

  listName = listMap[listName]

  const personalizations = users.map(user => ({
    to: user.email,
    dynamic_template_data: {
      name: user.name,
    },
  }))

  const msg = {
    from: { email: SENDGRID_SENDER },
    templateId: templateNotificationId,
    dynamicTemplateData: {
      listName,
    },
    personalizations,
  }

  return sgMail.sendMultiple(msg)
}

module.exports = { sendMails, sendNotificationsMails }
