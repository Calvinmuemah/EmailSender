const express = require('express')
const nodemailer = require('nodemailer')
const cors = require('cors')
require('dotenv').config();
const app = express()
const   PORT = 3000

app.use(cors())
app.use(express.json({ limit: '25mb' }))
app.use(express.urlencoded({ limit: '25mb', extended: true }))
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    next();
})

function sendEmail(email, subject, message) {
    return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,//your email
            pass: process.env.EMAIL_PASS//app password
        }
    })

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: subject,
        text: message
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)
            return reject({message: 'Error sending email'})
        } 
        return resolve({message: 'Email sent successfully'})
        // if (error) {
        //     reject(error)
        // } else {
        //     resolve(info.response)
        // }
    })
})
}


app.get('/', (req, res) => {
    res.send('Welcome to the email sender API')
}
)
app.post('/send-email', async (req, res) => {
    try {
        const { email, subject, message } = req.body
        if (!email || !subject || !message) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        await sendEmail(email, subject, message)
        res.send({message: 'Email sent successfully'})
    } catch (error) {
        console.error("Email sending error:", error);
        // console.log(error)
        // res.status(500).send({message: 'Error sending email'})
        res.status(500).send({ message: 'Error sending email', error: error.message });
    }
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
 