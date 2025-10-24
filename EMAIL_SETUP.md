# Email Setup Instructions for OwlEye Contact Form

The contact form is configured to send emails using EmailJS, a free service that allows sending emails directly from your website without a backend server.

## Setup Steps:

### 1. Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### 2. Create Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. Note down your **Service ID**

### 3. Create Email Template
1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template content:

**Subject:** New Quote Request from {{from_name}}

**Body:**
```
New quote request from OwlEye website:

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Service: {{service}}

Message:
{{message}}

---
This email was sent from the OwlEye website contact form.
```

4. Save the template and note down your **Template ID**

### 4. Get Your Public Key
1. Go to "Account" → "General"
2. Find your **Public Key**

### 5. Update the Website Code
Open `script.js` and replace these placeholders:

```javascript
// Line 52: Replace with your actual public key
emailjs.init("YOUR_PUBLIC_KEY");

// Line 152: Replace with your actual service and template IDs
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
```

### Example Configuration:
```javascript
// Replace these with your actual values
emailjs.init("user_abc123def456");
emailjs.send('service_gmail123', 'template_xyz789', templateParams)
```

## Testing:
1. After updating the code with your IDs, test the form
2. Check your email (joni.sainio@owleye.fi) for incoming messages
3. Check EmailJS dashboard for delivery status

## Free Tier Limits:
- 200 emails per month
- EmailJS branding in emails
- Basic support

## Alternative: Formspree
If you prefer a different service, you can also use Formspree:
1. Go to [https://formspree.io/](https://formspree.io/)
2. Create an account and get a form endpoint
3. Replace the EmailJS code with a simple form POST to Formspree

## Security Note:
Your EmailJS public key will be visible in the website code. This is normal and safe - EmailJS public keys are designed to be public. The service prevents spam through rate limiting and other security measures.
