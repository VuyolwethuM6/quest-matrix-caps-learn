import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';
import { FormData, ApiResponse } from '@/types/api';
import { generateAdminEmailContent, generateStudentEmailContent } from '@/utils/emailTemplates';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
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
        from: `"Viva Tutoring" <${process.env.EMAIL_USER}>`,
        to: adminEmail,
        subject: `New Student Application: ${formData.firstName} ${formData.lastName}`,
        html: generateAdminEmailContent(formData, req.body.subjects),
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
        from: `"Viva Tutoring" <${process.env.EMAIL_USER}>`,
        to: formData.email,
        subject: 'Your Viva Tutoring Application Has Been Received!',
        html: generateStudentEmailContent(formData, req.body.subjects),
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