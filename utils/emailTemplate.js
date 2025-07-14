function generateWelcomeEmail(name) {
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
    <title>Welcome to Codepply</title>
  </head>
  <body
    style="
      font-family: 'Inter', sans-serif;
      background-color: #f4f6f8;
      margin: 0;
      padding: 0;
      color: #000000;
      -webkit-text-size-adjust: 100%;
      text-align: center;
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
      <header
        style="background-color: #000000; padding: 40px 0; text-align: center"
      >
        <div class="logo-wrapper" style="text-align: center">
          <img
            src="https://res.cloudinary.com/djxyqh8fx/image/upload/v1750516676/Logo_gradient_y_white_sjozix.png"
            alt="Codepply Icon"
            class="logo"
            style="max-width: 50%; height: auto; display: inline-block"
          />
        </div>
      </header>

      <!-- CONTENT -->
      <div
        class="content"
        style="padding: 30px 70px; background-color: #171717; text-align: center; justify-content: center;"
      >
            <h1
              style="
                font-size: 26px;
                background: linear-gradient(to right, #37c848, #60aaff);
                background-clip: text;
                -webkit-background-clip: text;
                color: transparent;
                -webkit-text-fill-color: transparent;
                font-weight: bold;
                line-height: 1;
                margin: 0 0 16px 0;
                width: 100%;
              "
            >
              Welcome ${name}!
            </h1>

         <div style="text-align: center; margin: 0 auto 30px auto;">
          <img src="https://res.cloudinary.com/djxyqh8fx/image/upload/v1750620912/heart_2_ft15ih.png" alt="heart" style="width: 180px; height: 179px; display: inline-block;" />
        </div>


        <p
          style="
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 20px;
            color: #ffffff;
          "
        >
          Thanks for joining
          <span
            style="
              font-weight: bold;
              font-size: inherit;
              background: linear-gradient(to right, #37c848, #60aaff);
              background-clip: text;
              -webkit-background-clip: text;
              color: transparent;
              -webkit-text-fill-color: transparent;
            "
            >Codepply</span
          >
          — the space where developers like you learn, grow and share amazing
          projects together.
        </p>
        <p
          style="
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 20px;
            color: #ffffff;
          "
        >
          We’re thrilled to have you on board! Dive in, connect with other devs,
          and bring your ideas to life.
        </p>
        <div class="button" style="margin-top: 35px; margin-bottom: 60px">
          <a
            href="https://codepply.netlify.app/login"
            class="loginbutton"
            style="
              color: #ffffff;
              padding: 8px 14px;
              border-radius: 12px;
              text-decoration: none;
              background: linear-gradient(to right, #37c848, #0077ff);
              display: inline-block;
            "
          >
            Login account
          </a>
        </div>
        <div
          class="help"
          style="
            background-image: url('https://res.cloudinary.com/djxyqh8fx/image/upload/v1750518734/help_pn7lc9.png');
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
            padding: 10px 30px;
            border-radius: 10px;
            text-align: left;
          "
        >
          <h4
            style="
              color: white;
              font-size: 20px;
              font-weight: 500;
              margin-top: 8px;
              margin-bottom: 14px;
            "
          >
            Can’t log in? We’ve got you
          </h4>
          <a
            href="mailto:codeapply.team@gmail.com"
            class="helpbutton"
            style="
              color: #ffffff;
              padding: 8px 14px;
              border-radius: 12px;
              text-decoration: none;
              background-color: #000000;
              display: inline-block;
            "
          >
            Reach out
          </a>
        </div>
      </div>

      <!-- FOOTER -->
      <div
        class="footer"
        style="
          background-color: #cccccc;
          padding: 20px;
          text-align: center;
          font-size: 13px;
          color: #595959;
        "
      >
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
      <table
        width="100%"
        cellpadding="0"
        cellspacing="0"
        border="0"
        style="background-color: #000000; padding: 20px 30px"
      >
        <tr>
          <td align="left" valign="middle" style="padding: 10px">
            <img
              src="https://res.cloudinary.com/djxyqh8fx/image/upload/v1750581583/logo_gradient_y_white_2_tswzbs.png"
              alt="Codepply Icon"
              style="max-width: 150px; height: auto; display: block"
            />
          </td>
          <td align="right" valign="middle" style="padding: 10px">
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
        <div
          style="
            display: flex;
            align-items: flex-start;
            gap: 20px;
            margin-bottom: 30px;
          "
        >
          <img
            src="https://res.cloudinary.com/djxyqh8fx/image/upload/v1750604069/bell_ozpy2w.png"
            alt="Codepply Isotipo"
            class="logo"
            style="width: 75px; height: 83px; display: inline-block"
          />
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
              margin-top: 0;
              padding-top: 0;
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
        </div>
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
            href="https://codepply.netlify.app/login"
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

function StatusRejectedEmail(position, company, name, avatar, email) {
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
      <table
        width="100%"
        cellpadding="0"
        cellspacing="0"
        border="0"
        style="background-color: #000000; padding: 20px 30px"
      >
        <tr>
          <td align="left" valign="middle" style="padding: 10px">
            <img
              src="https://res.cloudinary.com/djxyqh8fx/image/upload/v1750581583/logo_gradient_y_white_2_tswzbs.png"
              alt="Codepply Icon"
              style="max-width: 150px; height: auto; display: block"
            />
          </td>
          <td align="right" valign="middle" style="padding: 10px">
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
            font-size: 26px;
            background: linear-gradient(to left, #0077ff, #99c9ff);
            background-clip: text;
            -webkit-background-clip: text;
            color: transparent;
            -webkit-text-fill-color: transparent;
            font-weight: bold;
            display: inline-block;
            text-align: center;
            width: 100%;
            margin-bottom: 25px;
          "
        >
          Unfortunately, your application was not selected this time
        </h1>
        <div style="align-items: center">
          <img
            src="https://res.cloudinary.com/djxyqh8fx/image/upload/v1750605965/rejected_izwh6z.png"
            alt="whatch"
            style="
              max-width: 150px;
              height: auto;
              display: block;
              margin: 0px auto;
            "
          />
        </div>
        <div
          style="
            font-size: 15px;
            line-height: 1.6;
            margin-bottom: 10px;
            color: #ffffff;
          "
        >
          <p
            style="
              font-size: 15px;
              line-height: 1.6;
              margin-bottom: 10px;
              color: #ffffff;
            "
          >
            Hi <strong>${name}</strong>,
          </p>
          <p
            style="
              font-size: 15px;
              line-height: 1.6;
              margin-bottom: 10px;
              color: #ffffff;
            "
          >
            The hiring team of ${company} has reviewed your application for
            ${position}. If your profile aligns with what they’re looking for,
            they may reach out in the future — stay tuned!
          </p>

          <hr
            style="
              border: none;
              border-top: 1px solid #262626;
              margin: 30px 0;
              width: 100%;
            "
          />
          <div
            class="help"
            style="
              background-image: url('https://res.cloudinary.com/djxyqh8fx/image/upload/v1750590359/rejected-more-offers_nxhje0.png');
              background-repeat: no-repeat;
              background-size: cover;
              background-position: center;
              padding: 10px 30px;
              border-radius: 10px;
              text-align: left;
            "
          >
            <h4
              style="
                color: white;
                font-size: 18px;
                font-weight: 500;
                margin-top: 8px;
                margin-bottom: 14px;
              "
            >
              Keep going — more opportunities ahead!
            </h4>
            <a
              href="mailto:codeapply.team@gmail.com"
              class="helpbutton"
              style="
                color: #ffffff;
                font-size: 14px;
                padding: 8px 14px;
                border-radius: 12px;
                text-decoration: none;
                background-color: #000000;
                display: inline-block;
                margin-bottom: 10px;
              "
            >
              View more offers
            </a>
          </div>
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

        <span style="margin-top: 20px; display: block; font-size: 12px"
          >© ${new Date().getFullYear()} Codepply. All rights reserved.</span
        >
      </div>
    </div>
  </body>
</html>
`;
}

function StatusReviewedEmail(position, company, name, avatar, email) {
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
    <title>The company was reviewed your</title>
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
      <table
        width="100%"
        cellpadding="0"
        cellspacing="0"
        border="0"
        style="background-color: #000000; padding: 20px 30px"
      >
        <tr>
          <td align="left" valign="middle" style="padding: 10px">
            <img
              src="https://res.cloudinary.com/djxyqh8fx/image/upload/v1750581583/logo_gradient_y_white_2_tswzbs.png"
              alt="Codepply Icon"
              style="max-width: 150px; height: auto; display: block"
            />
          </td>
          <td align="right" valign="middle" style="padding: 10px">
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
        style="
          padding: 20px 70px;
          background-color: #171717;
          text-align: center;
        "
      >
        <h1
          style="
            font-size: 30px;
            background-color: #3392ff;
            background-clip: text;
            -webkit-background-clip: text;
            color: transparent;
            -webkit-text-fill-color: transparent;
            font-weight: semibold;
            display: inline-block;
            text-align: center;
            width: 100%;
            margin-bottom: -5px;
            line-height: 1.6;
          "
        >
          Congratulations ${name},
        </h1>
        <h1
          style="
            font-size: 20px;
            background-color: #fff;
            background-clip: text;
            -webkit-background-clip: text;
            color: transparent;
            -webkit-text-fill-color: transparent;
            font-weight: normal;
            display: inline-block;
            text-align: center;
            width: 100%;
            line-height: 1.6;
            margin-bottom: -10px;
          "
        >
          The hiring team of <strong>${company}</strong> has reviewed your
          application for <strong>${position}</strong> offer
        </h1>
        <div style="align-items: center">
          <img
            src="https://res.cloudinary.com/djxyqh8fx/image/upload/v1750603341/star-final_gepdac.png"
            alt="star"
            style="
              max-width: 170px;
              height: auto;
              display: block;
              margin: 30px auto;
            "
          />
        </div>
        <p
          style="
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 10px;
            color: #ffffff;
          "
        >
          If your profile aligns with what they’re looking for, they may reach
          out in the future — stay tuned!
        </p>
        <div class="button" style="margin-top: 10px; margin-bottom: 15px">
          <a
            href="https://codepply.netlify.app/login"
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

function CreateOfferEmail(position, company, name, avatar, email) {
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
    <title>The company was reviewed your</title>
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
      <table
        width="100%"
        cellpadding="0"
        cellspacing="0"
        border="0"
        style="background-color: #000000; padding: 20px 30px"
      >
        <tr>
          <td align="left" valign="middle" style="padding: 10px">
            <img
              src="https://res.cloudinary.com/djxyqh8fx/image/upload/v1750581583/logo_gradient_y_white_2_tswzbs.png"
              alt="Codepply Icon"
              style="max-width: 150px; height: auto; display: block"
            />
          </td>
          <td align="right" valign="middle" style="padding: 10px">
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
        style="
          background-color: #171717;
          text-align: center;
          position: relative;
          overflow: hidden;
          padding: 30px 70px 30px;
        "
      >
        <!-- Encabezado (fuera del área con imagen) -->
        <h1
          style="
            font-size: 30px;
            background-color: #3392ff;
            background-clip: text;
            -webkit-background-clip: text;
            color: transparent;
            -webkit-text-fill-color: transparent;
            font-weight: semibold;
            display: inline-block;
            text-align: center;
            width: 100%;
            margin-bottom: -5px;
            line-height: 1.6;
            position: relative;
            z-index: 1;
          "
        >
          Your job offer is live!
        </h1>
        <h1
          style="
            font-size: 20px;
            background-color: #fff;
            background-clip: text;
            -webkit-background-clip: text;
            color: transparent;
            -webkit-text-fill-color: transparent;
            font-weight: normal;
            display: inline-block;
            text-align: center;
            width: 100%;
            line-height: 1.6;
            position: relative;
            z-index: 1;
          "
        >
          You’ve successfully created the offer <strong>${position}</strong> for
          <strong>${company}</strong>
        </h1>
        <p style="color: #fff; padding: 0 40px; font-size: 16px">
          Candidates can now view and apply to it through the platform
        </p>
      </div>

      <!-- Texto + botón encima de la imagen -->
      <div
        style="
          background-image: url('https://res.cloudinary.com/djxyqh8fx/image/upload/v1750613731/createoffer_vert_correcta_uhq8zp.png');
          background-repeat: no-repeat;
          background-position: center;
          background-size: cover;
          background-color: #171717;
          min-height: 200px;
          padding: 30px 0;
          text-align: left;
          /* Para email, usar tablas para centrar verticalmente */
        "
      >
        <table
          role="presentation"
          width="100%"
          height="200"
          cellpadding="0"
          cellspacing="0"
          border="0"
        >
          <tr>
            <td
              valign="middle"
              style="padding-left: 15%; padding-right: 50%; max-width: 300px"
            >
              <p style="font-size: 18px; color: #ffffff; margin: 0 0 20px 0">
                Check candidates profile and offer details:
              </p>
              <a
                href="https://codepply.netlify.app/login"
                style="
                  color: #ffffff;
                  padding: 8px 14px;
                  border-radius: 12px;
                  text-decoration: none;
                  background-color: #000;
                  display: inline-block;
                "
              >
                Go to offer panel
              </a>
            </td>
          </tr>
        </table>
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

function UpdatePasswordEmail(avatar, email) {
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
    <title>Welcome to Codepply</title>
  </head>
  <body
    style="
      font-family: 'Inter', sans-serif;
      background-color: #f4f6f8;
      margin: 0;
      padding: 0;
      color: #000000;
      -webkit-text-size-adjust: 100%;
      text-align: center;
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
      <table
        width="100%"
        cellpadding="0"
        cellspacing="0"
        border="0"
        style="background-color: #000000; padding: 20px 30px"
      >
        <tr>
          <td align="left" valign="middle" style="padding: 10px">
            <img
              src="https://res.cloudinary.com/djxyqh8fx/image/upload/v1750581583/logo_gradient_y_white_2_tswzbs.png"
              alt="Codepply Icon"
              style="max-width: 150px; height: auto; display: block"
            />
          </td>
          <td align="right" valign="middle" style="padding: 10px">
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
        style="padding: 30px 70px; background-color: #171717; text-align: center; justify-content: center;"
      >
            <h1
              style="
                font-size: 26px;
                background: linear-gradient(to right, #37c848, #60aaff);
                background-clip: text;
                -webkit-background-clip: text;
                color: transparent;
                -webkit-text-fill-color: transparent;
                font-weight: bold;
                line-height: 1;
                margin: 0 0 16px 0;
                width: 100%;
              "
            >
              Your password has been changed!
            </h1>

         <div style="text-align: center; margin: 0 auto 30px auto;">
          <img src="https://res.cloudinary.com/djxyqh8fx/image/upload/v1750604075/setting_wkbs7l.png" alt="heart" style="width: 180px; height: 179px; display: inline-block;" />
        </div>


        <p
          style="
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 20px;
            color: #ffffff;
          "
        >
          You’ve successfully updated your account password.
          You can now log in securely with your new credentials.
        </p>
        <p
          style="
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 20px;
            color: #ffffff;
          "
        >
          Review your account security settings:
        </p>
        <div class="button" style="margin-top: 35px; margin-bottom: 60px">
          <a
            href="https://codepply.netlify.app/login"
            class="loginbutton"
            style="
              color: #ffffff;
              padding: 8px 14px;
              border-radius: 12px;
              text-decoration: none;
              background: linear-gradient(to right, #37c848, #0077ff);
              display: inline-block;
            "
          >
            Go to your account
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

function DeleteAccount(name, email) {
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
    <title>Welcome to Codepply</title>
  </head>
  <body
    style="
      font-family: 'Inter', sans-serif;
      background-color: #f4f6f8;
      margin: 0;
      padding: 0;
      color: #000000;
      -webkit-text-size-adjust: 100%;
      text-align: center;
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
      <table
        width="100%"
        cellpadding="0"
        cellspacing="0"
        border="0"
        style="background-color: #000000; padding: 20px 30px"
      >
        <tr>
          <td align="left" valign="middle" style="padding: 10px">
            <img
              src="https://res.cloudinary.com/djxyqh8fx/image/upload/v1750581583/logo_gradient_y_white_2_tswzbs.png"
              alt="Codepply Icon"
              style="max-width: 150px; height: auto; display: block"
            />
          </td>
        </tr>
      </table>

      <!-- CONTENT -->
      <div
        class="content"
        style="padding: 30px 70px; background-color: #171717; text-align: center; justify-content: center;"
      >
            <h1
              style="
                font-size: 26px;
                background: linear-gradient(to right, #37c848, #60aaff);
                background-clip: text;
                -webkit-background-clip: text;
                color: transparent;
                -webkit-text-fill-color: transparent;
                font-weight: bold;
                line-height: 1;
                margin: 0 0 16px 0;
                width: 100%;
              "
            >
              Account deleted successfully!
            </h1>

         <div style="text-align: center; margin: 0 auto 30px auto;">
          <img src="https://res.cloudinary.com/djxyqh8fx/image/upload/v1750604075/setting_wkbs7l.png" alt="heart" style="width: 180px; height: 179px; display: inline-block;" />
        </div>


        <p
          style="
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 20px;
            color: #ffffff;
          "
        >
          
            ${name}, your account has been permanently deleted. We're sorry to hear you're leaving, but we respect your decision.
        </p>
        <p
          style="
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 20px;
            color: #ffffff;
          "
        >
          If you change your mind, you can create a new account at any time:
        </p>
        <div class="button" style="margin-top: 35px; margin-bottom: 60px">
          <a
            href="https://codepply.netlify.app/register"
            class="home"
            style="
              color: #ffffff;
              padding: 8px 14px;
              border-radius: 12px;
              text-decoration: none;
              background: linear-gradient(to right, #37c848, #0077ff);
              display: inline-block;
            "
          >
            Go to register
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

module.exports = {
  generateWelcomeEmail,
  ApplyEmail,
  StatusReviewedEmail,
  StatusRejectedEmail,
  CreateOfferEmail,
  UpdatePasswordEmail,
  DeleteAccount
};

