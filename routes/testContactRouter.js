const express = require('express');
const router = express.Router();
const transporter = require('../controllers/emailController');
const { generateContactEmail } = require('../utils/emailTemplate');
require('dotenv').config();

// Endpoint de prueba para diagnosticar problemas de email
router.post('/test', async (req, res) => {
  try {
    console.log('🧪 Iniciando prueba de email...');
    
    // Datos de prueba
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      category: 'support',
      subject: 'Test Contact Form',
      message: 'This is a test message from the contact form.'
    };
    
    console.log('🔧 Tipo de transporter:', typeof transporter);
    
    // Generar HTML del email
    const emailHTML = generateContactEmail(
      testData.name,
      testData.email,
      testData.category,
      testData.subject,
      testData.message
    );
    
    // Usar EXACTAMENTE la misma configuración que funciona en register
    try {
      const info = await transporter.sendMail({
        from: `"Codepply Contact Form - TEST" <codepply.team@gmail.com>`,
        to: 'codepply@protonmail.com',
        subject: `[TEST] Contact Form: ${testData.subject}`,
        text: `
          TEST - New contact form submission:
          
          Name: ${testData.name}
          Email: ${testData.email}
          Category: ${testData.category}
          Subject: ${testData.subject}
          
          Message:
          ${testData.message}
        `,
        html: emailHTML,
        replyTo: `"${testData.name}" <${testData.email}>`
      });
      
      console.log('✅ Email de prueba enviado correctamente:', info);
      
      res.json({
        success: true,
        message: 'Test email sent successfully',
        messageId: info.messageId,
        testData: testData
      });
      
    } catch (mailError) {
      console.error('❌ Error enviando el correo de prueba:', mailError);
      return res.status(500).json({
        success: false,
        message: 'Error sending test email',
        error: mailError.message
      });
    }
    
  } catch (error) {
    console.error('❌ Error general en prueba de email:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

// Endpoint para testear registro (comparación directa)
router.post('/test-register', async (req, res) => {
  try {
    console.log('🧪 Probando envio de email como en register...');
    
    const testName = 'Test User';
    const testEmail = 'test@example.com';
    
    console.log('🔧 Tipo de transporter:', typeof transporter);
    
    // Usar la función generateWelcomeEmail (como en register)
    const { generateWelcomeEmail } = require('../utils/emailTemplate');
    
    // Enviar email usando exactamente la misma configuración que funciona en register
    try {
      const info = await transporter.sendMail({
        from: `"Codepply" <codepply.team@gmail.com>`,
        to: 'codepply@protonmail.com', // Cambiar aquí para probar
        subject: "Welcome to Codepply!",
        text: `Hey ${testName}, thanks to join Codepply!`,
        html: generateWelcomeEmail(testName),
      });
      
      console.log('✅ Email de prueba (como register) enviado correctamente:', info);
      
      res.json({
        success: true,
        message: 'Test email (register style) sent successfully',
        messageId: info.messageId,
        testData: { name: testName, email: testEmail }
      });
      
    } catch (mailError) {
      console.error('❌ Error enviando el correo de prueba (register style):', mailError);
      return res.status(500).json({
        success: false,
        message: 'Error sending test email (register style)',
        error: mailError.message
      });
    }
    
  } catch (error) {
    console.error('❌ Error general en prueba de email (register style):', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

module.exports = router;
