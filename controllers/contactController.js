const transporter = require('./emailController');
const { generateContactEmail } = require('../utils/emailTemplate');
require('dotenv').config();

const sendContactEmail = async (req, res) => {
  try {
    console.log('📧 Iniciando envío de email de contacto...');
    console.log('📋 Datos recibidos:', req.body);
    
    const { name, email, category, subject, message } = req.body;

    // Validar que todos los campos requeridos estén presentes
    if (!name || !email || !category || !subject || !message) {
      console.log('❌ Campos faltantes:', { name: !!name, email: !!email, category: !!category, subject: !!subject, message: !!message });
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('❌ Email inválido:', email);
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }

    console.log('🔧 Tipo de transporter:', typeof transporter);

    // Generar el HTML del email
    const emailHTML = generateContactEmail(name, email, category, subject, message);
    console.log('📝 Email HTML generado correctamente');

    // Enviar email usando exactamente la misma configuración que funciona en register
    try {
      const info = await transporter.sendMail({
        from: `"Codepply Contact Form" <codepply.team@gmail.com>`,
        to: 'codepply@protonmail.com',
        subject: `[${category.toUpperCase()}] Contact Form: ${subject}`,
        text: `
          New contact form submission:
          
          Name: ${name}
          Email: ${email}
          Category: ${category}
          Subject: ${subject}
          
          Message:
          ${message}
        `,
        html: emailHTML,
        replyTo: `"${name}" <${email}>`
      });
      
      console.log('✅ Email de contacto enviado correctamente:', info);
      
      res.status(200).json({
        success: true,
        message: 'Contact message sent successfully',
        messageId: info.messageId
      });
      
    } catch (mailError) {
      console.error('❌ Error enviando el correo de contacto:', mailError);
      return res.status(500).json({
        success: false,
        message: 'Error sending contact email',
        error: mailError.message
      });
    }

  } catch (error) {
    console.error('❌ Error general en sendContactEmail:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

module.exports = {
  sendContactEmail
};
