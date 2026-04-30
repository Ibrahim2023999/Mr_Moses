/**
 * GOOGLE APPS SCRIPT BACKEND
 * Mr Moses J. Boston's 100th Birthday RSVP System
 * 
 * INSTRUCTIONS:
 * 1. Create a new Google Spreadsheet
 * 2. Go to Extensions > Apps Script
 * 3. Paste this code into the editor
 * 4. Save and Deploy as Web App
 * 5. Copy the Web App URL and paste into index.html
 */

const SPREADSHEET_NAME = 'Moses Boston 100th Birthday - Guest List';

/**
 * Creates the header row if it doesn't exist
 */
function setupSpreadsheet() {
  const sheet = getOrCreateSheet();
  
  // Set column headers
  const headers = [
    'Timestamp',
    'Full Name',
    'Email',
    'Phone',
    'Attendance',
    'Number of Guests',
    'Dietary Requirements',
    'Message/Wishes',
    'Submission Date',
    'Submission Time'
  ];
  
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // Format header row
  sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#D4AF37').setFontColor('#1a1a1a');
  
  // Auto-resize columns
  sheet.autoResizeColumns(1, headers.length);
  
  return sheet;
}

/**
 * Gets the spreadsheet or creates it if it doesn't exist
 */
function getOrCreateSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet;
  
  try {
    sheet = spreadsheet.getSheetByName('Guests');
    if (!sheet) {
      sheet = spreadsheet.insertSheet('Guests');
    }
  } catch (e) {
    sheet = spreadsheet.insertSheet('Guests');
  }
  
  return sheet;
}

/**
 * Handles POST requests from the form
 */
function doPost(e) {
  try {
    const sheet = getOrCreateSheet();
    
    // Check if this is first submission - setup headers
    if (sheet.getLastRow() === 0) {
      setupSpreadsheet();
    }
    
    // Parse the incoming JSON data
    let postData;
    try {
      postData = JSON.parse(e.postData.contents);
    } catch (parseError) {
      // Try alternative parsing for form data
      postData = e.parameter;
    }
    
    // Validate required fields
    if (!postData.fullName || !postData.email) {
      return ContentService
        .createTextOutput(JSON.stringify({ status: 'error', message: 'Missing required fields' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Parse timestamp
    const timestamp = new Date(postData.timestamp || new Date().toISOString());
    const dateStr = timestamp.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const timeStr = timestamp.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    
    // Prepare row data
    const rowData = [
      timestamp.toISOString(),
      postData.fullName,
      postData.email,
      postData.phone || '',
      postData.attendance,
      postData.guests || '0',
      postData.dietary || '',
      postData.message || '',
      dateStr,
      timeStr
    ];
    
    // Append the data
    sheet.appendRow(rowData);
    
    // Apply conditional formatting based on attendance
    const lastRow = sheet.getLastRow();
    if (postData.attendance === 'Yes') {
      sheet.getRange(lastRow, 1, 1, 10).setBackground('#E8F5E9'); // Light green
    } else {
      sheet.getRange(lastRow, 1, 1, 10).setBackground('#FFEBEE'); // Light red
    }
    
    // Send confirmation email (optional - requires email permissions)
    try {
      sendConfirmationEmail(postData);
    } catch (emailError) {
      // Email sending is optional - continue if it fails
      Logger.log('Email could not be sent: ' + emailError.message);
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success', message: 'RSVP submitted successfully!' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    Logger.log('Error: ' + error.message);
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handles GET requests (for testing)
 */
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ 
      status: 'success', 
      message: 'Mr Moses J. Boston RSVP System is running!',
      event: '100th Birthday Celebration',
      date: '1st August 2026'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Sends a confirmation email to the guest
 */
function sendConfirmationEmail(data) {
  const subject = 'RSVP Confirmation - Mr Moses J. Boston 100th Birthday';
  
  let message = `
Dear ${data.fullName},

Thank you for your response to Mr Moses J. Boston's 100th Birthday Celebration!

YOUR RSVP:
-----------------
Attendance: ${data.attendance === 'Yes' ? 'Joyfully Accepting' : 'Regretfully Declining'}
${data.attendance === 'Yes' ? 'Number of Guests: ' + (parseInt(data.guests) + 1) + '\nDietary Requirements: ' + (data.dietary || 'None') : ''}
${data.message ? 'Your Message: ' + data.message : ''}

EVENT DETAILS:
-----------------
Date: Saturday, 1st August 2026
Time: 3:00 PM - 1:00 AM
Venue: Grand Palladium
Address: 15A Perry Vale, Forest Hill, London SE23 2NE
Dress Code: Professional Outfit (Smart Formal)

We look forward to celebrating this momentous occasion!

With warmest wishes,
Moses J. Boston's Family
  `.trim();
  
  try {
    MailApp.sendEmail({
      to: data.email,
      subject: subject,
      body: message,
      name: 'Moses Boston 100th Birthday'
    });
  } catch (e) {
    Logger.log('Could not send email: ' + e.message);
  }
}

/**
 * Utility function to get guest count statistics
 */
function getGuestStats() {
  const sheet = getOrCreateSheet();
  const lastRow = sheet.getLastRow();
  
  if (lastRow <= 1) {
    return { total: 0, attending: 0, notAttending: 0 };
  }
  
  const data = sheet.getDataRange().getValues();
  let attending = 0;
  let notAttending = 0;
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][4] === 'Yes') {
      attending++;
    } else if (data[i][4] === 'No') {
      notAttending++;
    }
  }
  
  return {
    total: data.length - 1,
    attending: attending,
    notAttending: notAttending
  };
}

/**
 * Custom menu for easy access to functions
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('🎂 Birthday RSVP')
    .addItem('Setup Spreadsheet', 'setupSpreadsheet')
    .addItem('View Guest Stats', 'viewGuestStats')
    .addToSpreadsheet();
}

function viewGuestStats() {
  const stats = getGuestStats();
  SpreadsheetApp.getUi().alert(
    'Guest Statistics\n\n' +
    'Total Responses: ' + stats.total + '\n' +
    'Attending: ' + stats.attending + '\n' +
    'Not Attending: ' + stats.notAttending
  );
}