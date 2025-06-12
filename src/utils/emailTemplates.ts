import { FormData, Subject } from '@/types/api';

export const generateAdminEmailContent = (formData: FormData, subjects: Subject[]) => {
  return `
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
            const subject = subjects.find(s => s.id === subjectId);
            return `<li style="margin-bottom: 10px;">
              <strong>${subject?.name}:</strong><br>
              Schedule: ${subject?.schedule}<br>
              Current Marks: ${formData.marks[subjectId]?.currentMarks}%<br>
              Target Marks: ${formData.marks[subjectId]?.targetMarks}%
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
  `;
};

export const generateStudentEmailContent = (formData: FormData, subjects: Subject[]) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #4F46E5;">Viva Tutoring Application Received!</h1>
      
      <p>Dear ${formData.firstName},</p>
      
      <p>Thank you for submitting your application to Viva Tutoring. We have successfully received your details and will review your application shortly.</p>

      <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h2 style="color: #4F46E5; margin-top: 0;">Your Application Summary</h2>
        <ul style="list-style: none; padding: 0;">
          ${formData.selectedSubjects.map(subjectId => {
            const subject = subjects.find(s => s.id === subjectId);
            return `<li style="margin-bottom: 10px;">
              <strong>${subject?.name}</strong><br>
              Schedule: ${subject?.schedule}
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
  `;
}; 