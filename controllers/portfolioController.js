const nodemailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");

// Transport configuration
const transporter = nodemailer.createTransport(
  sendGridTransport({
    auth: {
      api_key: process.env.API_SENDGRID,
      // Replace with your actual SendGrid API key
    },
  })
);

const sendEmailController = async (req, res) => {
  try {
    const { name, email, msg } = req.body;

    // Validation
    if (!name || !email || !msg) {
      return res.status(400).send({
        success: false,
        message: "Please provide all required fields",
      });
    }

    // Email content
    const emailOptions = {
      to: "faisalmoha023@gmail.com", // Replace with the recipient's email
      from: "dahirabdirizak7@gmail.com", // Replace with your verified sender email
      subject: "Regarding Mern Portfolio App",
      html: `
            <h5>Detail Information</h5>
            <ul>
                <li>Name: ${name}</li>
                <li>Email: ${email}</li>
                <li>Message: ${msg}</li>
            </ul>
        `,
    };

    // Send email
    await transporter.sendMail(emailOptions);

    return res.status(200).send({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).send({
      success: false,
      message: "Send Email API Error",
      error: error.message, // Send error message for debugging
    });
  }
};

module.exports = { sendEmailController };
