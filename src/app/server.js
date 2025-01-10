import express from 'express';
import nodemailer from 'nodemailer';

const app = express();

app.use(express.json());

const transporter = nodemailer.createTransport({
service: 'gmail',
auth: {
    user: 'pruebascremona@gmail.com', // Tu correo de gmail
    pass: 'vgsj thqw thbv zvec' // Tu contraseña de gmail
}
});

app.post('/send-recovery-email', (req, res) => {
const { email } = req.body;

if (!email) {
    return res.status(400).json({ error: 'Email is required' });
}

const mailOptions = {
    from: 'pruebascremona@gmail.com',
    to: email,
    subject: 'Recuperación de Contraseña',
    text: 'Haz clic en el siguiente enlace para restablecer tu contraseña: <enlace>'
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
    console.error('Error al enviar el correo:', error);
    return res.status(500).json({ error: 'Error al enviar el correo de recuperación.' });
    }
    console.log('Correo enviado:', info.response);
    res.json({ message: 'Correo de recuperación de contraseña enviado.' });
});
});

app.listen(3000, () => {
console.log('Server running on port 3000');
});
