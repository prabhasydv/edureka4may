import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

// Setup nodemailer transporter using environment variables for Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_EMAIL, // Use the SMTP email from the environment variable
    pass: process.env.SMTP_PASSWORD, // Use the SMTP password from the environment variable
  },
});

export const sendEmail = (req, res) => {
  const { name, email, message } = req.body;

  // Prepare email content
  const mailOptions = {
    from: process.env.SMTP_EMAIL,  // Use the SMTP email from the environment variable
    to: process.env.ADMIN_EMAIL,   // Send to the admin email from the environment variable
    subject: 'New Contact Form Submission',
    text: `You have a new contact form submission from ${name} (${email}).\n\nMessage:\n${message}`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ message: 'Error sending email' });
    } else {
      return res.status(200).json({ message: 'Email sent successfully', info });
    }
  });
};


export const submitInstructorApplication = (req, res) => {
  const { name, email, phone, course, message } = req.body;

  if (!name || !email || !phone || !course || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const mailOptions = {
    from: process.env.SMTP_EMAIL,
    to: process.env.ADMIN_EMAIL,
    subject: 'New Instructor Application Submission',
    text: `
📩 New Instructor Application Received

👤 Name: ${name}
📧 Email: ${email}
📱 Phone: ${phone}
🎓 Interested Course: ${course}

📝 Message:
${message}
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Email sending error:', error);
      return res.status(500).json({ message: 'Failed to send email' });
    }
    return res.status(200).json({ message: 'Instructor application submitted successfully', info });
  });
};


export const contactAdvisor = async (req, res) => {
  const { name, phone, email, courseTitle } = req.body;

  // Prepare the email options for contacting advisor
  const mailOptions = {
    from: process.env.SMTP_EMAIL,  // Sender's email
    to: process.env.ADMIN_EMAIL,  // The recipient email (admin is also the advisor)
    subject: `New Advisor Form Submission for ${courseTitle}`,
    text: `
      You have received a new Advisor form submission for the course "${courseTitle}".
      
      Details:
      Name: ${name}
      Phone: ${phone}
      Email: ${email}
      Course Title: ${courseTitle}
    `,
  };

  try {
    // Send the email to the admin (who is also the advisor)
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending email. Please try again later.' });
  }
};
