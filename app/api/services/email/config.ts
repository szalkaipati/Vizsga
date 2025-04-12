import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
    }
})

export const sendEmail = async (to: string, subject: string, text: string, html: string) => {
    const mailOptions = {
        from: process.env.SMTP_USER,
        to,
        subject,
        text,
        html
    };

    try{
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    }catch{
        console.error('Error sending email');
    }
}