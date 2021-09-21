const nodemailer = require('nodemailer')

const creds = require("../../config/creds")

const { verifyEmailTemplate } = require('./templates/verify/verify')

const {
  resetPasswordEmail
} = require('./templates/reset-password/reset-password')

const {
  doctorProfileCreationEmail
} = require('./templates/profile-creation/doctor-profile')

const {
  callingAgentProfileCreationEmail
} = require('./templates/profile-creation/callingAgent-profile')

const {
  sponsorProfileCreationEmail
} = require('./templates/profile-creation/sponsor-profile')

const mail = async (purpose, data) => {

  // create reusable transporter object using the default SMTP transport
  console.log(purpose, data, "purpose, data")

  let transporter = nodemailer.createTransport(creds().mailingCreds)

  switch (purpose) {
    case 'verify':
      let verifyEmailResult = await transporter.sendMail({
        from: 'akumosolutions@gmail.com',
        to: data.email,
        subject: 'Akumo-Solutions - Verification',
        text: 'ACCOUNT VERIFICATION',
        html: verifyEmailTemplate(data)
      })

      return verifyEmailResult?.accepted?.length
        ? 'success'
        : 'failed'

    case 'resetPasswordLink':
      let resetPasswordResult = await transporter
        .sendMail({
          from: 'akumosolutions@gmail.com',
          to: data.email,
          subject: 'RESET PASSWORD',
          text: 'reset your account password',
          html: resetPasswordEmail(data)
        })

      return resetPasswordResult?.accepted?.length ? 'success' : 'failed'

    case 'profile-creation-callingAgent':
      let callingAgentProfileConfirmationEmailResult = await transporter
        .sendMail({
          from: creds().mailingCreds.user,
          to: data.email,
          subject: 'Profile Creation',
          text: 'credentials allotment to use the web panel',
          html: callingAgentProfileCreationEmail(data)
        })

      return callingAgentProfileConfirmationEmailResult?.accepted?.length ? 'success' : 'failed'

    case 'profile-creation-doctor':
      let doctorProfileConfirmationEmailResult = await transporter
        .sendMail({
          from: creds().mailingCreds.user,
          to: data.email,
          subject: 'Profile Creation',
          text: 'credentials allotment to use the mobile app',
          html: doctorProfileCreationEmail(data)
        })

      return doctorProfileConfirmationEmailResult?.accepted?.length ? 'success' : 'failed'

    case 'profile-creation-sponsor':
      let sponsorProfileConfirmationEmailResult = await transporter
        .sendMail({
          from: creds().mailingCreds.user,
          to: data.email,
          subject: 'Profile Creation',
          text: 'credentials allotment to use the mobile app',
          html: sponsorProfileCreationEmail(data)
        })

      return sponsorProfileConfirmationEmailResult?.accepted?.length ? 'success' : 'failed'

    default:
      break
  }
}

module.exports = { mail }
