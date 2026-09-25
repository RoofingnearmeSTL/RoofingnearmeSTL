// Simple Node.js/Express backend for lead generation form
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Lead submission endpoint
app.post('/api/submit-lead', async (req, res) => {
  const { name, email, phone, address, service, message } = req.body;

  // Validation
  if (!name || !email || !phone || !service) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  // Phone validation (basic)
  const phoneRegex = /^[\d\-\+\(\)\s]+$/;
  if (!phoneRegex.test(phone) || phone.replace(/\D/g, '').length < 10) {
    return res.status(400).json({ error: 'Invalid phone number' });
  }

  try {
    // Email to business owner
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || 'admin@roofingnearmestl.com',
      subject: `🔥 New Lead: ${name} - ${service}`,
      html: `
        <h2 style="color: #ff6b00;">New Lead Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>
        <p><strong>Address:</strong> ${address || 'Not provided'}</p>
        <p><strong>Service Requested:</strong> ${service}</p>
        <p><strong>Message:</strong></p>
        <p>${message || 'No additional message'}</p>
        <hr/>
        <p style="color: #999; font-size: 12px;">Submitted: ${new Date().toLocaleString()}</p>
      `
    });

    // Confirmation email to lead
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: '✓ Your Free Inspection Request - RoofingnearmeSTL',
      html: `
        <h2>Thank you, ${name.split(' ')[0]}!</h2>
        <p>We've received your free inspection request. Our team will contact you within 24 hours at:</p>
        <p><strong>${phone}</strong></p>
        <p style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee;">
          <strong>In the meantime:</strong><br/>
          ☎️ Call us immediately for urgent issues: <a href="tel:3145550147" style="color: #ff6b00; font-weight: bold;">(314) 555-0147</a><br/>
          💬 Text us anytime<br/>
          🌐 Visit us: roofingnearmestl.com
        </p>
        <p style="margin-top: 20px; color: #666;">
          Best regards,<br/>
          <strong>RoofingnearmeSTL Team</strong><br/>
          Professional Roofing Services in St. Louis
        </p>
      `
    });

    res.status(200).json({ 
      success: true, 
      message: 'Lead submitted successfully. Check your email for confirmation.' 
    });
  } catch (error) {
    console.error('Lead submission error:', error);
    res.status(500).json({ error: 'Failed to submit lead. Please try again or call directly.' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🏠 RoofingnearmeSTL backend running on port ${PORT}`);
  console.log(`✓ Lead form endpoint: POST /api/submit-lead`);
});
