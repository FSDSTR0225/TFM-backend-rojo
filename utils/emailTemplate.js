function generateWelcomeEmail(name) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Welcome to Codepply</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f6f8;
      margin: 0;
      padding: 0;
      -webkit-text-size-adjust: 100%;
    }
    .container {
      max-width: 600px;
      margin: 30px auto;
      background-color: #ffffff;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 2px 6px rgb(0 0 0 / 0.1);
    }
    h1 {
      color: #2c3e50;
      text-align: center;
    }
    p {
      color: #555555;
      font-size: 16px;
      line-height: 1.5;
      margin-bottom: 25px;
    }
    .footer {
      text-align: center;
      font-size: 12px;
      color: #999999;
      margin-top: 20px;
    }
    @media screen and (max-width: 480px) {
      .container {
        margin: 10px;
        padding: 15px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Welcome to Codepply ${name}! 👋</h1>
    <p>Hi there,</p>
    <p>Thanks for joining <strong>Codepply</strong> — the space where developers like you learn, grow and share amazing projects together. 🛠️✨</p>
    <p>We’re thrilled to have you on board! Dive in, connect with other devs, and bring your ideas to life.</p>
    <p>If you have any questions or feedback, we’re just a message away.</p>
    <div class="footer">
      <p>© ${new Date().getFullYear()} Codepply. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`;
}

module.exports = generateWelcomeEmail;