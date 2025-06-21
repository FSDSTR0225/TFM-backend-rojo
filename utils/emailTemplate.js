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
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        background-color: #f4f6f8;
        margin: 0;
        padding: 0;
        color: #333;
        -webkit-text-size-adjust: 100%;
      }

      .wrapper {
        max-width: 600px;
        margin: 40px auto;
        background-color: #ffffff;
        border-radius: 10px;
        padding: 0;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        overflow: hidden;
      }

      header {
        background-color: #000;
        padding: 40px 0;
        text-align: center;
      }

      .logo-wrapper {
        text-align: center;
      }

      .logo-wrapper img {
        max-width: 50%;
        height: auto;
        display: inline-block;
      }


      .content {
        padding: 30px;
      }

      h1 {
        color: #2c3e50;
        font-size: 26px;
        margin-bottom: 20px;
        text-align: center;
      }

      p {
        font-size: 16px;
        line-height: 1.6;
        margin-bottom: 20px;
      }

      .footer {
        background-color: #eaeaea;
        padding: 20px;
        text-align: center;
        font-size: 13px;
        color: #666;
      }

      @media (max-width: 480px) {
        .wrapper {
          margin: 20px 15px;
        }

        .content {
          padding: 20px;
        }

        h1 {
          font-size: 22px;
        }

        .logo-wrapper img {
          max-width: 100px !important;
        }
      }
    </style>
  </head>
  <body>
    <div class="wrapper">
      <!-- HEADER -->
      <header>
        <div class="logo-wrapper">
        <img
          src="https://res.cloudinary.com/djxyqh8fx/image/upload/v1750514141/Logo_gradient_png_bdvjnt.png"
          alt="Codepply Icon"
          class="logo"
        />
      </div>
      </header>

      <!-- CONTENT -->
      <div class="content">
        <h1>Welcome to Codepply ${name}! 👋</h1>
        <p>Hi there,</p>
        <p>
          Thanks for joining <strong>Codepply</strong> — the space where
          developers like you learn, grow and share amazing projects together.
          🛠️✨
        </p>
        <a href: "http://www.google.com">Login account</a>
        <p>
          We’re thrilled to have you on board! Dive in, connect with other devs,
          and bring your ideas to life.
        </p>
        <p>If you have any questions or feedback, we’re just a message away.</p>
      </div>

      <!-- FOOTER -->
      <div class="footer">
        © ${new Date().getFullYear()} Codepply. All rights reserved.
      </div>
    </div>
  </body>
</html>
`;
}

function ApplyEmail(position, company, name) {
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Welcome to Codepply</title>
    <style>
    </style>
  </head>
  <body>
    <div class="wrapper">
      <!-- HEADER -->
      <header>
        <div class="logo-wrapper">
        <img
          src="https://res.cloudinary.com/djxyqh8fx/image/upload/v1750514141/Logo_gradient_png_bdvjnt.png"
          alt="Codepply Icon"
          class="logo"
        />
      </div>
      </header>

      <!-- CONTENT -->
      <div class="content">
        <h1>${name}, you applied in offer ${position} of ${company}<h1>

      <!-- FOOTER -->
      <div class="footer">
        © ${new Date().getFullYear()} Codepply. All rights reserved.
      </div>
    </div>
  </body>
</html>
`;
}

function RejectEmail(name) {
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Welcome to Codepply</title>
    <style>
    </style>
  </head>
  <body>
    <div class="wrapper">
      <!-- HEADER -->
      <header>
        <div class="logo-wrapper">
        <img
          src="https://res.cloudinary.com/djxyqh8fx/image/upload/v1750514141/Logo_gradient_png_bdvjnt.png"
          alt="Codepply Icon"
          class="logo"
        />
      </div>
      </header>

      <!-- CONTENT -->
      <div class="content">
        <h1>${name}, you have been rejected in an offer! 👋</h1>

      <!-- FOOTER -->
      <div class="footer">
        © ${new Date().getFullYear()} Codepply. All rights reserved.
      </div>
    </div>
  </body>
</html>
`;
}

module.exports = { generateWelcomeEmail, ApplyEmail, RejectEmail };

