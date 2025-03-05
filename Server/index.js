const express = require('express');
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
const cors = require('cors');
require('dotenv').config();


const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: '25mb', extended: true }));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

// Function to generate a well-structured email using Mailgen
function generateEmailContent(name) {
    const mailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "Kelvin's Email Sender",
            link: "https://yourwebsite.com",
        },
    });

    const emailTemplate = {
        body: {
            name: name || "User",
            intro: "Welcome to my email sender!",
            table: {
                data: [
                    {
                        item: "Item 1",
                        description: "A backend app that sends emails",
                        price: "$100",
                    },
                    {
                        item: "Item 2",
                        description: "A frontend app that sends emails",
                        price: "$200",
                    },
                ],
            },
            outro: "Need help or have questions? Just reply to this email, we'd love to help.",
        },
    };

    return mailGenerator.generate(emailTemplate);
}

// Function to send email
async function sendEmail(email, subject, name) {
    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER, // Your email
                pass: process.env.EMAIL_PASS, // App password
            },
        });

        // Generate structured email content
        const emailContent = generateEmailContent(name);

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: subject,
            html: emailContent, // Using HTML instead of plain text
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending email:", error);
                return reject({ message: 'Error sending email' });
            }
            return resolve({ message: 'Email sent successfully' });
        });
    });
}

// Home route
app.get('/', (req, res) => {
    res.send('Welcome to the Email Sender API');
});

// API to send an email
app.post('/send', async (req, res) => {
    try {
        const { email, subject, name } = req.body;
        if (!email || !subject || !name) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        await sendEmail(email, subject, name);
        res.send({ message: 'Email sent successfully' });
    } catch (error) {
        console.error("Email sending error:", error);
        res.status(500).send({ message: 'Error sending email', error: error.message });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
