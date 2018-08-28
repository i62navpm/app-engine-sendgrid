const sgMail = require('@sendgrid/mail')
const { templateId } = require('../config')

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY
const SENDGRID_SENDER = process.env.SENDGRID_SENDER

sgMail.setApiKey(SENDGRID_API_KEY)

function sendMails(req, res) {
  const msg = {
    to: req.body.emails,
    from: { email: SENDGRID_SENDER },
    templateId,
    dynamicTemplateData: req.body.templateData,
  }
  sgMail
    .send(msg)
    .then(
      data => res.send(JSON.stringify({ sent: true, data })),
      err => res.send(JSON.stringify({ sent: false, error: err.toString() }))
    )
}

module.exports = { sendMails }
