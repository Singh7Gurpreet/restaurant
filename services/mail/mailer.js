const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port:587,
    secure:false,
    auth: {
        user: "sonofwar34@gmail.com",
        pass: "yeoatjssymjwajtb"
    }
});

const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

const validateName = (name) => {
    return String(name)
    .toLowerCase()
    .match(
        /^[A-Za-z\s]+$/
    )
}

async function mailer(information) {
    await transporter.sendMail({
        from: `sonofwar34@gmail.com`,
        to: `gurpreet1000singh51@gmail.com`,
        subject:"Contact From Portfolio",
        text: `Hello`
    }).catch( err => {
        console.log(err.message);
    })
}

module.exports = {mailer,validateEmail};