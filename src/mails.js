const sgMail = require('@sendgrid/mail')
const { templateId } = require('../config')

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY
const SENDGRID_SENDER = process.env.SENDGRID_SENDER

sgMail.setApiKey(SENDGRID_API_KEY)

function sendMails(req, res) {
  req.body.users = req.body.users || []

  const personalizations = req.body.users.map(user => ({
    to: user.email,
    dynamic_template_data: {
      name: user.name,
    },
  }))

  const msg = {
    from: { email: SENDGRID_SENDER },
    templateId,
    dynamicTemplateData: {
      listName: req.body.listName,
    },
    personalizations,
  }

  sgMail
    .sendMultiple(msg)
    .then(
      data => res.send(JSON.stringify({ sent: true, data })),
      err => res.send(JSON.stringify({ sent: false, error: err.toString() }))
    )
}

module.exports = { sendMails }
