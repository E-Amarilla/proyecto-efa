import nodemailer from "nodemailer";

export async function POST(req) {
try {
    const { email } = await req.json();

    if (!email) {
    return new Response(JSON.stringify({ error: "Email is required." }), {
        status: 400,
    });
    }

    // Configuración de Nodemailer con credenciales embebidas
    const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "pruebascremona@gmail.com",
        pass: "vgsj thqw thbv zvec", // Contraseña SMTP o App Password
    },
    });

    // Configuración del correo
    const mailOptions = {
    from: "pruebascremona@gmail.com",
    to: "joaquinivanledesmasedran@gmail.com",
    subject: "Solicitud de recuperación de contraseña",
    text: `El usuario ${email} ha solicitado un cambio de contraseña.`,
    };

    // Enviar el correo
    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ message: "Correo enviado con éxito." }), {
    status: 200,
    });
} catch (error) {
    return new Response(
    JSON.stringify({ error: "Hubo un error al enviar el correo." }),
    { status: 500 }
    );
}
}
