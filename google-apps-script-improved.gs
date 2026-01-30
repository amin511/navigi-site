/**
 * Google Apps Script for Contact Form Submissions - IMPROVED VERSION
 * This script receives form data, stores it in Google Sheets, and sends automated emails
 * 
 * SETUP INSTRUCTIONS:
 * 1. Create a new Google Sheet
 * 2. Go to Extensions > Apps Script
 * 3. Replace the default code with this script
 * 4. Update the configuration variables below
 * 5. Deploy as Web App (Deploy > New deployment > Web app)
 * 6. Set "Execute as" to your account
 * 7. Set "Who has access" to "Anyone"
 * 8. Copy the deployment URL and use it in your React component
 */

// ==================== CONFIGURATION ====================
// UPDATE THESE VALUES BEFORE DEPLOYING

const CONFIG = {
  // Your email address to receive notifications
  YOUR_EMAIL: 'amindarmouni3@gmail.com',
  
  // Email subject lines
  ADMIN_EMAIL_SUBJECT: 'New Contact Form Submission',
  CLIENT_EMAIL_SUBJECT: 'Thank You for Contacting Us',
  
  // Company/Brand name
  COMPANY_NAME: 'Your Company Name',
  
  // Sheet name where data will be stored
  SHEET_NAME: 'Submissions',
  
  // Timezone for timestamps (e.g., 'GMT', 'EST', 'PST', 'CET')
  TIMEZONE: 'GMT'
}

// ==================== MAIN FUNCTIONS ====================

/**
 * Handle OPTIONS requests for CORS preflight
 */
function doOptions(e) {
  return ContentService
    .createTextOutput('')
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '3600'
    });
}

/**
 * Helper function to create response with CORS headers
 */
function createCorsResponse(content, statusCode = 200) {
  return ContentService
    .createTextOutput(content)
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
}

/**
 * Handle POST requests from the contact form
 */
function doPost(e) {
  try {
    // Log the incoming request for debugging
    Logger.log('=== NEW REQUEST ===');
    Logger.log('PostData contents: ' + e.postData.contents);
    Logger.log('PostData type: ' + e.postData.type);
    Logger.log('Parameters: ' + JSON.stringify(e.parameters));
    
    // Parse the incoming data
    // Handle both JSON and form-encoded data
    let data;
    let rawData = e.postData.contents;
    
    // If data is in parameters (form-encoded), get it from there
    if (e.parameters && e.parameters.data && e.parameters.data.length > 0) {
      rawData = e.parameters.data[0];
    }
    
    try {
      data = JSON.parse(rawData);
      Logger.log('Parsed data: ' + JSON.stringify(data));
    } catch (parseError) {
      Logger.log('JSON Parse Error: ' + parseError.toString());
      Logger.log('Raw data received: ' + rawData);
      
      // Try to parse as URL-encoded form data
      try {
        const params = e.parameters;
        if (params) {
          data = {
            name: params.name ? params.name[0] : '',
            phone: params.phone ? params.phone[0] : '',
            email: params.email ? params.email[0] : '',
            services: params.services ? params.services[0] : '',
            message: params.message ? params.message[0] : '',
            language: params.language ? params.language[0] : 'en',
            timestamp: params.timestamp ? params.timestamp[0] : new Date().toISOString()
          };
          Logger.log('Parsed as form data: ' + JSON.stringify(data));
        } else {
          throw new Error('Could not parse data');
        }
      } catch (formParseError) {
        const errorResponse = {
          'result': 'error',
          'error': 'Invalid data format: ' + parseError.toString(),
          'timestamp': new Date().toISOString()
        };
        return createCorsResponse(JSON.stringify(errorResponse));
      }
    }
    
    // Validate required fields
    if (!data.name || !data.email || !data.phone) {
      const errorResponse = {
        'result': 'error',
        'error': 'Missing required fields: name, email, or phone',
        'timestamp': new Date().toISOString()
      };
      return createCorsResponse(JSON.stringify(errorResponse));
    }
    
    // Store in Google Sheets
    let sheetResult = 'unknown';
    try {
      storeInSheet(data);
      sheetResult = 'success';
      Logger.log('Data stored in sheet successfully');
    } catch (sheetError) {
      sheetResult = 'error: ' + sheetError.toString();
      Logger.log('Sheet storage error: ' + sheetError.toString());
      // Continue even if sheet storage fails, but log it
    }
    
    // Send emails (don't fail the request if emails fail)
    try {
      sendAdminEmail(data);
      Logger.log('Admin email sent successfully');
    } catch (emailError) {
      Logger.log('Admin email error: ' + emailError.toString());
    }
    
    try {
      sendClientEmail(data);
      Logger.log('Client email sent successfully');
    } catch (emailError) {
      Logger.log('Client email error: ' + emailError.toString());
    }
    
    // Return success response with details
    const response = {
      'result': 'success',
      'data': data,
      'sheetResult': sheetResult,
      'timestamp': new Date().toISOString()
    };
    
    Logger.log('Returning success response: ' + JSON.stringify(response));
    
    return createCorsResponse(JSON.stringify(response));
      
  } catch (error) {
    // Log detailed error information
    Logger.log('=== ERROR OCCURRED ===');
    Logger.log('Error message: ' + error.toString());
    Logger.log('Error stack: ' + error.stack);
    
    // Return error response
    const errorResponse = {
      'result': 'error',
      'error': error.toString(),
      'timestamp': new Date().toISOString()
    };
    
    Logger.log('Returning error response: ' + JSON.stringify(errorResponse));
    
    return createCorsResponse(JSON.stringify(errorResponse));
  }
}

/**
 * Handle GET requests (for testing)
 */
function doGet(e) {
  return ContentService.createTextOutput('Contact Form API is running. Use POST method to submit data.');
}

// ==================== SHEET FUNCTIONS ====================

/**
 * Store form submission data in Google Sheet
 */
function storeInSheet(data) {
  try {
    const sheet = getOrCreateSheet();
    
    if (!sheet) {
      throw new Error('Could not get or create sheet');
    }
    
    // Format the timestamp
    let timestamp;
    try {
      if (data.timestamp) {
        timestamp = Utilities.formatDate(
          new Date(data.timestamp),
          CONFIG.TIMEZONE,
          'yyyy-MM-dd HH:mm:ss'
        );
      } else {
        timestamp = Utilities.formatDate(
          new Date(),
          CONFIG.TIMEZONE,
          'yyyy-MM-dd HH:mm:ss'
        );
      }
    } catch (dateError) {
      Logger.log('Date formatting error: ' + dateError.toString());
      timestamp = new Date().toISOString();
    }
    
    // Prepare row data with null checks
    const rowData = [
      timestamp || '',
      data.name || '',
      data.phone || '',
      data.email || '',
      data.services || '',
      data.message || '',
      data.language || 'en',
      'Pending', // Status column
      '' // Notes column
    ];
    
    Logger.log('Row data to append: ' + JSON.stringify(rowData));
    
    // Append to sheet
    sheet.appendRow(rowData);
    
    // Format the new row
    const lastRow = sheet.getLastRow();
    if (lastRow > 0) {
      formatRow(sheet, lastRow);
    }
    
    Logger.log('Row appended successfully at row: ' + lastRow);
    
  } catch (error) {
    Logger.log('storeInSheet error: ' + error.toString());
    Logger.log('Error stack: ' + error.stack);
    throw error;
  }
}

/**
 * Get existing sheet or create new one with headers
 */
function getOrCreateSheet() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    
    if (!ss) {
      throw new Error('No active spreadsheet found. Make sure the script is bound to a Google Sheet.');
    }
    
    let sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
    
    // Create sheet if it doesn't exist
    if (!sheet) {
      Logger.log('Sheet "' + CONFIG.SHEET_NAME + '" not found. Creating new sheet...');
      sheet = ss.insertSheet(CONFIG.SHEET_NAME);
      
      // Add headers
      const headers = [
        'Timestamp',
        'Name',
        'Phone',
        'Email',
        'Services',
        'Message',
        'Language',
        'Status',
        'Notes'
      ];
      
      sheet.appendRow(headers);
      
      // Format header row
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground('#8C52FE');
      headerRange.setFontColor('#FFFFFF');
      headerRange.setFontWeight('bold');
      headerRange.setHorizontalAlignment('center');
      
      // Set column widths
      sheet.setColumnWidth(1, 150); // Timestamp
      sheet.setColumnWidth(2, 150); // Name
      sheet.setColumnWidth(3, 120); // Phone
      sheet.setColumnWidth(4, 200); // Email
      sheet.setColumnWidth(5, 250); // Services
      sheet.setColumnWidth(6, 300); // Message
      sheet.setColumnWidth(7, 80);  // Language
      sheet.setColumnWidth(8, 100); // Status
      sheet.setColumnWidth(9, 200); // Notes
      
      // Freeze header row
      sheet.setFrozenRows(1);
      
      Logger.log('New sheet created with headers');
    } else {
      Logger.log('Using existing sheet: ' + CONFIG.SHEET_NAME);
    }
    
    return sheet;
    
  } catch (error) {
    Logger.log('getOrCreateSheet error: ' + error.toString());
    Logger.log('Error stack: ' + error.stack);
    throw error;
  }
}

/**
 * Format a row with alternating colors and wrapping
 */
function formatRow(sheet, rowNumber) {
  try {
    const range = sheet.getRange(rowNumber, 1, 1, 9);
    
    // Alternating row colors
    if (rowNumber % 2 === 0) {
      range.setBackground('#F8FAFC');
    } else {
      range.setBackground('#FFFFFF');
    }
    
    // Enable text wrapping for message column
    sheet.getRange(rowNumber, 6).setWrap(true);
    
    // Add border
    range.setBorder(true, true, true, true, false, false);
  } catch (error) {
    Logger.log('formatRow error: ' + error.toString());
    // Don't throw - formatting is not critical
  }
}

// ==================== EMAIL FUNCTIONS ====================

/**
 * Send email notification to admin
 */
function sendAdminEmail(data) {
  try {
    const subject = CONFIG.ADMIN_EMAIL_SUBJECT;
    
    const htmlBody = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #8C52FE 0%, #B794FF 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; }
          .field { margin-bottom: 20px; }
          .label { font-weight: bold; color: #8C52FE; display: block; margin-bottom: 5px; }
          .value { background: white; padding: 12px; border-radius: 5px; border-left: 3px solid #8C52FE; }
          .services { background: white; padding: 12px; border-radius: 5px; }
          .service-tag { display: inline-block; background: #8C52FE; color: white; padding: 5px 12px; margin: 3px; border-radius: 15px; font-size: 12px; }
          .footer { text-align: center; margin-top: 30px; color: #64748b; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔔 New Contact Form Submission</h1>
          </div>
          <div class="content">
            <div class="field">
              <span class="label">📅 Submission Time:</span>
              <div class="value">${Utilities.formatDate(new Date(data.timestamp || new Date()), CONFIG.TIMEZONE, 'MMMM dd, yyyy \'at\' hh:mm a')}</div>
            </div>
            
            <div class="field">
              <span class="label">👤 Name:</span>
              <div class="value">${data.name || 'N/A'}</div>
            </div>
            
            <div class="field">
              <span class="label">📞 Phone:</span>
              <div class="value">${data.phone || 'N/A'}</div>
            </div>
            
            <div class="field">
              <span class="label">📧 Email:</span>
              <div class="value"><a href="mailto:${data.email || ''}">${data.email || 'N/A'}</a></div>
            </div>
            
            <div class="field">
              <span class="label">💼 Services Requested:</span>
              <div class="services">
                ${(data.services || '').split(', ').map(service => `<span class="service-tag">${service}</span>`).join('')}
              </div>
            </div>
            
            <div class="field">
              <span class="label">💬 Message:</span>
              <div class="value">${(data.message || '').replace(/\n/g, '<br>')}</div>
            </div>
            
            <div class="field">
              <span class="label">🌐 Language:</span>
              <div class="value">${(data.language || 'en').toUpperCase()}</div>
            </div>
          </div>
          <div class="footer">
            <p>This is an automated notification from your contact form.</p>
          </div>
        </div>
      </body>
      </html>
    `;
    
    const plainBody = `
New Contact Form Submission

Submission Time: ${Utilities.formatDate(new Date(data.timestamp || new Date()), CONFIG.TIMEZONE, 'MMMM dd, yyyy \'at\' hh:mm a')}
Name: ${data.name || 'N/A'}
Phone: ${data.phone || 'N/A'}
Email: ${data.email || 'N/A'}
Services: ${data.services || 'N/A'}
Message: ${data.message || 'N/A'}
Language: ${data.language || 'en'}
    `;
    
    MailApp.sendEmail({
      to: CONFIG.YOUR_EMAIL,
      subject: subject,
      body: plainBody,
      htmlBody: htmlBody
    });
  } catch (error) {
    Logger.log('sendAdminEmail error: ' + error.toString());
    throw error;
  }
}

/**
 * Send confirmation email to client
 */
function sendClientEmail(data) {
  try {
    // Get email content based on language
    const emailContent = getClientEmailContent(data.language || 'en', data.name || 'Client');
    
    const htmlBody = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #8C52FE 0%, #B794FF 100%); color: white; padding: 40px; text-align: center; border-radius: 10px 10px 0 0; }
          .header h1 { margin: 0; font-size: 28px; }
          .content { background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; }
          .message { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #8C52FE; }
          .summary { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .summary-title { color: #8C52FE; font-weight: bold; margin-bottom: 10px; }
          .services { margin-top: 10px; }
          .service-tag { display: inline-block; background: #e9d5ff; color: #7e22ce; padding: 5px 12px; margin: 3px; border-radius: 15px; font-size: 12px; }
          .footer { text-align: center; margin-top: 30px; color: #64748b; font-size: 12px; }
          .button { display: inline-block; background: #8C52FE; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>${emailContent.header}</h1>
          </div>
          <div class="content">
            <div class="message">
              <p>${emailContent.greeting}</p>
              <p>${emailContent.message}</p>
            </div>
            
            <div class="summary">
              <div class="summary-title">${emailContent.summaryTitle}</div>
              <p><strong>${emailContent.servicesLabel}:</strong></p>
              <div class="services">
                ${(data.services || '').split(', ').map(service => `<span class="service-tag">${service}</span>`).join('')}
              </div>
            </div>
            
            <div class="message">
              <p>${emailContent.nextSteps}</p>
              <p>${emailContent.thankYou}</p>
              <p>${emailContent.signature}<br><strong>${CONFIG.COMPANY_NAME}</strong></p>
            </div>
          </div>
          <div class="footer">
            <p>${emailContent.footer}</p>
          </div>
        </div>
      </body>
      </html>
    `;
    
    const plainBody = emailContent.plainText(data);
    
    MailApp.sendEmail({
      to: data.email,
      subject: emailContent.subject,
      body: plainBody,
      htmlBody: htmlBody
    });
  } catch (error) {
    Logger.log('sendClientEmail error: ' + error.toString());
    throw error;
  }
}

/**
 * Get email content based on language
 */
function getClientEmailContent(language, name) {
  const content = {
    en: {
      subject: `Thank You for Contacting ${CONFIG.COMPANY_NAME}`,
      header: '✅ Message Received!',
      greeting: `Dear ${name},`,
      message: 'Thank you for reaching out to us! We have received your inquiry and our team will review it carefully.',
      summaryTitle: '📋 Your Request Summary:',
      servicesLabel: 'Services Requested',
      nextSteps: 'We will contact you within 24-48 hours to discuss your project in detail and provide you with a customized solution.',
      thankYou: 'We appreciate your interest in our services!',
      signature: 'Best regards,',
      footer: `This is an automated confirmation email from ${CONFIG.COMPANY_NAME}`,
      plainText: (data) => `
Dear ${name},

Thank you for reaching out to us! We have received your inquiry and our team will review it carefully.

Your Request Summary:
Services Requested: ${data.services || 'N/A'}

We will contact you within 24-48 hours to discuss your project in detail and provide you with a customized solution.

We appreciate your interest in our services!

Best regards,
${CONFIG.COMPANY_NAME}
      `
    },
    fr: {
      subject: `Merci de Contacter ${CONFIG.COMPANY_NAME}`,
      header: '✅ Message Reçu !',
      greeting: `Cher(e) ${name},`,
      message: 'Merci de nous avoir contactés ! Nous avons bien reçu votre demande et notre équipe l\'examinera attentivement.',
      summaryTitle: '📋 Résumé de Votre Demande :',
      servicesLabel: 'Services Demandés',
      nextSteps: 'Nous vous contacterons dans les 24 à 48 heures pour discuter de votre projet en détail et vous proposer une solution personnalisée.',
      thankYou: 'Nous apprécions votre intérêt pour nos services !',
      signature: 'Cordialement,',
      footer: `Ceci est un email de confirmation automatique de ${CONFIG.COMPANY_NAME}`,
      plainText: (data) => `
Cher(e) ${name},

Merci de nous avoir contactés ! Nous avons bien reçu votre demande et notre équipe l'examinera attentivement.

Résumé de Votre Demande :
Services Demandés : ${data.services || 'N/A'}

Nous vous contacterons dans les 24 à 48 heures pour discuter de votre projet en détail et vous proposer une solution personnalisée.

Nous apprécions votre intérêt pour nos services !

Cordialement,
${CONFIG.COMPANY_NAME}
      `
    },
    ar: {
      subject: `شكراً للتواصل مع ${CONFIG.COMPANY_NAME}`,
      header: '✅ تم استلام رسالتك!',
      greeting: `عزيزي/عزيزتي ${name}،`,
      message: 'شكراً لتواصلك معنا! لقد استلمنا استفسارك وسيقوم فريقنا بمراجعته بعناية.',
      summaryTitle: '📋 ملخص طلبك:',
      servicesLabel: 'الخدمات المطلوبة',
      nextSteps: 'سنتواصل معك خلال 24-48 ساعة لمناقشة مشروعك بالتفصيل وتقديم حل مخصص لك.',
      thankYou: 'نقدر اهتمامك بخدماتنا!',
      signature: 'مع أطيب التحيات،',
      footer: `هذا بريد إلكتروني تلقائي للتأكيد من ${CONFIG.COMPANY_NAME}`,
      plainText: (data) => `
عزيزي/عزيزتي ${name}،

شكراً لتواصلك معنا! لقد استلمنا استفسارك وسيقوم فريقنا بمراجعته بعناية.

ملخص طلبك:
الخدمات المطلوبة: ${data.services || 'N/A'}

سنتواصل معك خلال 24-48 ساعة لمناقشة مشروعك بالتفصيل وتقديم حل مخصص لك.

نقدر اهتمامك بخدماتنا!

مع أطيب التحيات،
${CONFIG.COMPANY_NAME}
      `
    }
  };
  
  return content[language] || content.en;
}

// ==================== TEST FUNCTION ====================

/**
 * Test function to simulate a form submission
 * Run this from the Apps Script editor to test your setup
 */
function testContactFormSubmission() {
  const testData = {
    name: "Test User",
    phone: "+1234567890",
    email: "testuser@example.com",
    services: "Logo Design, E-commerce Site",
    message: "This is a test message for the contact form.",
    language: "en",
    timestamp: new Date().toISOString()
  };

  // Simulate the POST request
  const e = {
    postData: {
      contents: JSON.stringify(testData),
      type: 'application/json'
    }
  };

  const result = doPost(e);
  Logger.log('Test result: ' + result.getContent());
  
  // Check the sheet
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.SHEET_NAME);
  if (sheet) {
    const lastRow = sheet.getLastRow();
    Logger.log('Last row in sheet: ' + lastRow);
    if (lastRow > 1) {
      const lastRowData = sheet.getRange(lastRow, 1, 1, 9).getValues()[0];
      Logger.log('Last row data: ' + JSON.stringify(lastRowData));
    }
  }
}
