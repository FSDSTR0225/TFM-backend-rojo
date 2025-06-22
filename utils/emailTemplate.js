function generateWelcomeEmail(name) {
  return `
<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet" />
        <title>Welcome to Codepply</title>
      </head>
      <body style="font-family: 'Inter', sans-serif; background-color: #f4f6f8; margin: 0; padding: 0; color: #000000; -webkit-text-size-adjust: 100%; text-align: center;">
        <div class="wrapper" style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 10px; padding: 0; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); overflow: hidden;">
          <!-- HEADER -->
          <header style="background-color: #000000; padding: 40px 0; text-align: center;">
            <div class="logo-wrapper" style="text-align: center;">
              <img
                src="https://res.cloudinary.com/djxyqh8fx/image/upload/v1750516676/Logo_gradient_y_white_sjozix.png"
                alt="Codepply Icon"
                class="logo"
                style="max-width: 50%; height: auto; display: inline-block;"
              />
            </div>
          </header>

          <!-- CONTENT -->
          <div class="content" style="padding: 30px 70px; background-color: #171717;">
            <h1 style="font-size: 26px; background: linear-gradient(to right, #37c848, #60aaff); background-clip: text; -webkit-background-clip: text; color: transparent; -webkit-text-fill-color: transparent; font-weight: bold; display: inline-block;">
              Welcome ${name}!
            </h1>
            <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px; color: #ffffff;">
              Thanks for joining
              <span style="font-weight: bold; font-size: inherit; background: linear-gradient(to right, #37c848, #60aaff); background-clip: text; -webkit-background-clip: text; color: transparent; -webkit-text-fill-color: transparent;">Codepply</span>
              — the space where developers like you learn, grow and share amazing projects together.
            </p>
            <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px; color: #ffffff;">
              We’re thrilled to have you on board! Dive in, connect with other devs, and bring your ideas to life.
            </p>
            <div class="button" style="margin-top: 35px; margin-bottom: 60px;">
              <a href="https://www.google.com" class="loginbutton" style="color: #ffffff; padding: 8px 14px; border-radius: 12px; text-decoration: none; background: linear-gradient(to right, #37c848, #0077ff); display: inline-block;">
                Login account
              </a>
            </div>
            <div class="help" style="background-image: url('https://res.cloudinary.com/djxyqh8fx/image/upload/v1750518734/help_pn7lc9.png'); background-repeat: no-repeat; background-size: cover; background-position: center; padding: 10px 30px; border-radius: 10px; text-align: left;">
              <h4 style="color: white; font-size: 20px; font-weight: 500; margin-top: 8px; margin-bottom: 14px;">
                Can’t log in? We’ve got you
              </h4>
              <a href="mailto:codeapply.team@gmail.com" class="helpbutton" style="color: #ffffff; padding: 8px 14px; border-radius: 12px; text-decoration: none; background-color: #000000; display: inline-block;">
                Reach out
              </a>
            </div>
          </div>

          <!-- FOOTER -->
          <div class="footer" style="background-color: #cccccc; padding: 20px; text-align: center; font-size: 13px; color: #595959;">
            © ${new Date().getFullYear()} Codepply. All rights reserved.
          </div>
        </div>
      </body>
    </html>
`;
}

function ApplyEmail(position, company, name, avatar, email) {
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
      rel="stylesheet"
    />
    <title>You have applied to a new job offer</title>
  </head>
  <body
    style="
      font-family: 'Inter', sans-serif;
      background-color: #f4f6f8;
      margin: 0;
      padding: 0;
      color: #000000;
      -webkit-text-size-adjust: 100%;
      text-align: left;
    "
  >
    <div
      class="wrapper"
      style="
        max-width: 600px;
        margin: 40px auto;
        background-color: #ffffff;
        border-radius: 10px;
        padding: 0;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        overflow: hidden;
      "
    >
      <!-- HEADER -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #000000; padding: 20px 30px;">
        <tr>
          <td align="left" valign="middle" style="padding: 10px;">
            <img
              src="https://res.cloudinary.com/djxyqh8fx/image/upload/v1750581583/logo_gradient_y_white_2_tswzbs.png"
              alt="Codepply Icon"
              style="max-width: 150px; height: auto; display: block;"
            />
          </td>
          <td align="right" valign="middle" style="padding: 10px;">
            <img
              src="${avatar}"
              alt="User Avatar"
              style="
                height: 60px;
                width: 60px;
                border-radius: 50%;
                object-fit: cover;
                display: block;
              "
            />
          </td>
        </tr>
      </table>


      <!-- CONTENT -->
        <div
        class="content"
        style="padding: 30px 70px; background-color: #171717"
      >
        <h1
          style="
            font-size: 25px;
            background: linear-gradient(to right, #3392ff, #37c848);
            background-clip: text;
            -webkit-background-clip: text;
            color: transparent;
            -webkit-text-fill-color: transparent;
            font-weight: semibold;
            display: inline-block;
            text-align: left;
            width: 100%;
          "
        >
          ${name}, you’ve successfully applied to
          <span
            style="
              font-weight: bold;
              font-size: inherit;
              background-color: #ffffff;
              background-clip: text;
              -webkit-background-clip: text;
              color: transparent;
              -webkit-text-fill-color: transparent;
            "
            >${position}</span
          >

          at
          <span
            style="
              font-weight: bold;
              font-size: inherit;
              background-color: #ffffff;
              background-clip: text;
              -webkit-background-clip: text;
              color: transparent;
              -webkit-text-fill-color: transparent;
            "
            >${company}!</span
          >
        </h1>
        <p
          style="
            font-size: 15px;
            line-height: 1.6;
            margin-bottom: 10px;
            color: #ffffff;
          "
        >
          The hiring team has received your application and will review it
          carefully. If your profile aligns with what they're looking for, you
          may be contacted for the next steps in the process.
        </p>
        <p style="font-size: 15px; margin-bottom: 20px; color: #ffffff">
          Good luck — we’re rooting for you!
        </p>
        <div class="button" style="margin-top: 30px; margin-bottom: 30px">
          <a
            href="https://www.google.com"
            class="loginbutton"
            style="
              color: #ffffff;
              padding: 8px 14px;
              border-radius: 12px;
              text-decoration: none;
              background-color: #0077ff;
              display: inline-block;
            "
          >
            View application
          </a>
        </div>
      </div>

      <!-- FOOTER -->
      <div
        class="footer"
        style="
          background-color: #cccccc;
          padding: 30px 80px;
          text-align: center;
          font-size: 11px;
          color: #595959;
        "
      >
        <div style="margin-bottom: 10px">
          <img
            src="https://res.cloudinary.com/djxyqh8fx/image/upload/v1750581914/isotipo_grey_low_opacity_jtgllr.png"
            alt="Codepply Isotipo"
            class="logo"
            style="max-width: 25px; height: auto; display: inline-block"
          />
        </div>

        This message was sent to ${email} by an automated system. Please do not
        reply directly to this email. For more information, please refer to our
        privacy policy.

        <span style="margin-top: 20px; display: block"
          >© ${new Date().getFullYear()} Codepply. All rights reserved.</span
        >
      </div>
    </div>
  </body>
</html>
`;
}

function StatusOfferEmail(name) {
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

module.exports = { generateWelcomeEmail, ApplyEmail, StatusOfferEmail };
