# Automated Follow-Up Email System

## Overview

The CRM now includes an automated email system that sends follow-up emails to clients based on the `next_follow_up_date` field set on each lead. The system uses customizable email templates with variable substitution.

## Features

✅ **Automated Email Sending**: Emails are sent automatically at 9:00 AM daily  
✅ **Template System**: Create and manage email templates with variable substitution  
✅ **Email Tracking**: All sent emails are logged and tracked  
✅ **Test Emails**: Test your templates before going live  
✅ **Admin Only**: Only admins can manage email templates  

## Setup Instructions

### 1. Configure SMTP Settings

Edit `server/.env` file and add your email credentials:

```env
# Email Configuration (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=your-email@gmail.com
```

### For Gmail Users:

1. Enable 2-Factor Authentication on your Google account
2. Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
3. Generate an app password for "Mail"
4. Use this app password (not your regular password) in `SMTP_PASSWORD`

### For Other Email Providers:

- **Outlook/Hotmail**: `smtp-mail.outlook.com`, port `587`
- **Yahoo**: `smtp.mail.yahoo.com`, port `587`
- **Custom SMTP**: Use your provider's SMTP settings

### 2. Create Email Template

1. Log in as **ADMIN**
2. Navigate to **Email Templates** in the sidebar
3. Click **"Create Template"**
4. Fill in the template details:
   - **Template Name**: A descriptive name (e.g., "Follow-up Email Template")
   - **Email Subject**: Use `{{name}}` to insert client name
   - **Email Body**: Use variables like `{{name}}`, `{{email}}`, `{{phone}}`, `{{program}}`
5. Mark as **Active** (only one active template is used)
6. Click **"Create Template"**

### 3. Set Follow-Up Dates on Leads

1. Go to **Clients (Leads)**
2. Open any lead
3. Set the **Next Follow-Up Date** field
4. Save the lead

The system will automatically send an email on that date at 9:00 AM.

## Template Variables

Use these variables in your email templates (both subject and body):

- `{{name}}` - Client's name
- `{{email}}` - Client's email address
- `{{phone}}` - Client's phone number
- `{{program}}` - Program the client is interested in

### Example Template

**Subject:**
```
Follow-up from Tonio & Senora - {{name}}
```

**Body:**
```html
Dear {{name}},

Thank you for your interest in our programs. We wanted to follow up with you regarding your inquiry about {{program}}.

Please feel free to contact us at your convenience.

Best regards,
Tonio & Senora Team
```

## How It Works

1. **Daily Check**: The system checks every day at 9:00 AM for leads with `next_follow_up_date` matching today's date
2. **Email Sending**: For each matching lead:
   - Checks if email was already sent today (prevents duplicates)
   - Replaces template variables with actual lead data
   - Sends the email via SMTP
   - Logs the email (success or failure)
3. **Email Logs**: All sent emails are tracked in the database

## Managing Templates

### Create Template
- Click **"Create Template"** button
- Fill in name, subject, and body
- Mark as active if you want it to be used
- Save

### Edit Template
- Click the **Edit** icon on any template card
- Make your changes
- Save

### Delete Template
- Click the **Delete** icon on any template card
- Confirm deletion

### Test Template
- Enter a test email address in the template card
- Click **"Send Test Email"**
- Check your inbox to verify the template looks correct

## Email Logs

All sent emails are logged with:
- Lead ID
- Template ID
- Recipient email
- Subject
- Success/Failure status
- Error message (if failed)
- Sent timestamp

## Troubleshooting

### Emails Not Sending

1. **Check SMTP Configuration**: Verify your `.env` file has correct SMTP settings
2. **Check Email Service**: Look for email service initialization message in server logs
3. **Check Scheduler**: Verify scheduler is running (check server startup logs)
4. **Check Follow-Up Dates**: Ensure leads have `next_follow_up_date` set correctly
5. **Check Email Logs**: View email logs to see if there were any errors

### Common Issues

**"Email service not configured"**
- Add SMTP credentials to `server/.env` file
- Restart the server

**"Failed to send email"**
- Check SMTP credentials are correct
- For Gmail, ensure you're using an App Password, not regular password
- Check if your email provider requires special settings

**"No active template found"**
- Create an email template and mark it as "Active"
- Only one active template is used at a time

## API Endpoints

### Get All Templates
```
GET /api/email-templates
Authorization: Bearer <token>
```

### Create Template
```
POST /api/email-templates
Authorization: Bearer <token>
Body: { name, subject, body, type, active }
```

### Update Template
```
PUT /api/email-templates/:id
Authorization: Bearer <token>
Body: { name?, subject?, body?, type?, active? }
```

### Delete Template
```
DELETE /api/email-templates/:id
Authorization: Bearer <token>
```

### Test Template
```
POST /api/email-templates/:id/test
Authorization: Bearer <token>
Body: { testEmail }
```

### Get Email Logs
```
GET /api/email-templates/logs/all
Authorization: Bearer <token>
Query: ?lead_id=1&template_id=1&limit=100
```

## Manual Email Trigger

To manually trigger email sending (for testing), you can call the scheduler function:

```javascript
const { checkAndSendFollowUpEmails } = require('./services/emailScheduler');
checkAndSendFollowUpEmails();
```

Or add this to a test endpoint in your routes.

## Best Practices

1. **Test First**: Always test your template before marking it as active
2. **One Active Template**: Only keep one active template at a time
3. **Clear Subject Lines**: Make subject lines clear and personalized
4. **Professional Content**: Keep email body professional and concise
5. **Monitor Logs**: Regularly check email logs for failures
6. **Update Templates**: Keep templates updated and relevant

## Security Notes

- Email templates are admin-only
- SMTP credentials should be kept secure in `.env` file
- Never commit `.env` file to version control
- Use App Passwords for Gmail (not regular passwords)

## Support

If you encounter issues:
1. Check server logs for error messages
2. Verify SMTP configuration
3. Test email sending manually
4. Check email logs for specific errors
