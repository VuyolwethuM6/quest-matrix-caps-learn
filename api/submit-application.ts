import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  school: string;
  guardianName: string;
  guardianContact: string;
  selectedSubjects: string[];
  marks: { [key: string]: { currentMarks: string; targetMarks: string } };
  paymentDate: string;
}

interface Subject {
  id: string;
  name: string;
  schedule: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).json({});
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Validate environment variables
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('Missing email configuration');
    return res.status(500).json({ 
      error: 'Server configuration error',
      details: 'Email credentials are not properly configured'
    });
  }

  try {
    const formData = req.body as FormData;
    const adminEmail = process.env.ADMIN_EMAIL || 'vmableka@gmail.com';

    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'school', 'selectedSubjects', 'paymentDate'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        error: 'Missing required fields',
        details: `The following fields are required: ${missingFields.join(', ')}`
      });
    }

    // Email configuration
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Verify transporter configuration
    try {
      await transporter.verify();
    } catch (error) {
      console.error('Email transporter verification failed:', error);
      return res.status(500).json({
        error: 'Email service configuration error',
        details: 'Failed to verify email service configuration'
      });
    }

    // Send admin email
    try {
      await transporter.sendMail({
        from: {
          name: 'Viva Tutoring',
          address: process.env.EMAIL_USER
        },
        to: adminEmail,
        subject: `New Student Application: ${formData.firstName} ${formData.lastName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #4F46E5;">New Student Application Received</h1>
            <p>A new student application has been submitted:</p>
            
            <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="color: #4F46E5; margin-top: 0;">Student Information</h2>
              <ul style="list-style: none; padding: 0;">
                <li style="margin-bottom: 10px;"><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</li>
                <li style="margin-bottom: 10px;"><strong>Email:</strong> ${formData.email}</li>
                <li style="margin-bottom: 10px;"><strong>Phone:</strong> ${formData.phone}</li>
                <li style="margin-bottom: 10px;"><strong>School:</strong> ${formData.school}</li>
                <li style="margin-bottom: 10px;"><strong>Guardian Name:</strong> ${formData.guardianName}</li>
                <li style="margin-bottom: 10px;"><strong>Guardian Contact:</strong> ${formData.guardianContact}</li>
              </ul>
            </div>

            <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="color: #4F46E5; margin-top: 0;">Selected Subjects</h2>
              <ul style="list-style: none; padding: 0;">
                ${formData.selectedSubjects.map(subjectId => {
                  const subject = req.body.subjects?.find((s: Subject) => s.id === subjectId);
                  return `<li style="margin-bottom: 10px;">
                    <strong>${subject?.name || subjectId}:</strong><br>
                    Schedule: ${subject?.schedule || 'Not specified'}<br>
                    Current Marks: ${formData.marks[subjectId]?.currentMarks || 'Not specified'}%<br>
                    Target Marks: ${formData.marks[subjectId]?.targetMarks || 'Not specified'}%
                  </li>`;
                }).join('')}
              </ul>
            </div>

            <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="color: #4F46E5; margin-top: 0;">Payment Information</h2>
              <ul style="list-style: none; padding: 0;">
                <li style="margin-bottom: 10px;"><strong>Payment Date:</strong> ${formData.paymentDate}</li>
                <li style="margin-bottom: 10px;"><strong>Total Cost:</strong> R${formData.selectedSubjects.length * 400}</li>
              </ul>
            </div>

            <p style="color: #6B7280; font-size: 14px;">Please review the application and contact the student.</p>
          </div>
        `,
      });
    } catch (error) {
      console.error('Failed to send admin email:', error);
      return res.status(500).json({
        error: 'Failed to send admin notification',
        details: 'Could not send email to admin'
      });
    }

    // Send student confirmation email
    try {
      await transporter.sendMail({
        from: {
          name: 'Viva Tutoring',
          address: process.env.EMAIL_USER
        },
        to: formData.email,
        subject: 'Your Viva Tutoring Application Has Been Received!',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #4F46E5;">Viva Tutoring Application Received!</h1>
            
            <p>Dear ${formData.firstName},</p>
            
            <p>Thank you for submitting your application to Viva Tutoring. We have successfully received your details and will review your application shortly.</p>

            <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="color: #4F46E5; margin-top: 0;">Your Application Summary</h2>
              <ul style="list-style: none; padding: 0;">
                ${formData.selectedSubjects.map(subjectId => {
                  const subject = req.body.subjects?.find((s: Subject) => s.id === subjectId);
                  return `<li style="margin-bottom: 10px;">
                    <strong>${subject?.name || subjectId}</strong><br>
                    Schedule: ${subject?.schedule || 'Not specified'}
                  </li>`;
                }).join('')}
              </ul>
            </div>

            <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="color: #4F46E5; margin-top: 0;">Payment Information</h2>
              <ul style="list-style: none; padding: 0;">
                <li style="margin-bottom: 10px;"><strong>Payment Date:</strong> ${formData.paymentDate}</li>
                <li style="margin-bottom: 10px;"><strong>Total Cost:</strong> R${formData.selectedSubjects.length * 400}</li>
              </ul>
            </div>

            <p>If you have any questions, please do not hesitate to contact us.</p>
            
            <p>Best regards,<br>The Viva Tutoring Team</p>
          </div>
        `,
      });
    } catch (error) {
      console.error('Failed to send student confirmation email:', error);
      // Don't return error here, as admin email was sent successfully
      // Just log the error and continue
    }

    return res.status(200).json({
      message: 'Application submitted successfully',
      details: 'Both admin notification and student confirmation emails have been sent'
    });
  } catch (error) {
    console.error('Unexpected error in submit-application:', error);
    return res.status(500).json({
      error: 'Internal server error',
      details: 'An unexpected error occurred while processing your request'
    });
  }
} 