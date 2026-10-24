/**
 * Gorad Pvt Ltd — Website contact-form backend
 *
 * Receives website submissions, stores them in Google Sheets, and sends
 * a notification email. Deploy this project as a Web App:
 *
 *   Execute as: Me
 *   Who has access: Anyone
 *
 * After changing this file, create a new deployment version. If you create
 * an entirely new deployment, update GOOGLE_SCRIPT_URL in Contact.jsx.
 */

const SPREADSHEET_ID = '1XZ2wlejT5jZQd1LcRtH21gA3_m_ZmhjunFzAnMmJECg'
const ENQUIRY_SHEET = 'General Enquiries'
const DEMO_SHEET = 'Demo Requests'
const NOTIFICATION_EMAIL = 'sales@gorad.in'

/**
 * Handles POST requests from the website contact form.
 */
function doPost(e) {
    try {
        if (!e || !e.postData || !e.postData.contents) {
            throw new Error('Request body is missing.')
        }

        const data = JSON.parse(e.postData.contents)
        const isDemo = data.formType === 'demo'
        const name = cleanValue(data.name, 150)
        const email = cleanValue(data.email, 254)
        const company = cleanValue(data.company, 200)
        const phone = cleanValue(data.phone, 50)
        const message = cleanValue(data.message, 5000)

        if (!name || !email || !message) {
            throw new Error('Name, email and message are required.')
        }

        if (!isValidEmail(email)) {
            throw new Error('Invalid email address.')
        }

        const timestamp = Utilities.formatDate(
            new Date(),
            'Asia/Kolkata',
            'dd/MM/yyyy HH:mm:ss'
        )

        saveLead({
            isDemo,
            timestamp,
            name,
            email,
            company,
            phone,
            message,
        })

        // A mail failure must not invalidate a lead already saved to the sheet.
        let emailSent = true

        try {
            sendLeadNotification({
                isDemo,
                timestamp,
                name,
                email,
                company,
                phone,
                message,
            })
        } catch (mailError) {
            emailSent = false
            console.error('Lead saved, but notification email failed:', mailError)
        }

        return jsonResponse({
            result: 'success',
            emailSent,
        })
    } catch (error) {
        console.error('Contact-form submission failed:', error)

        return jsonResponse({
            result: 'error',
            message: error.message || 'Unable to process submission.',
        })
    }
}

/**
 * Saves one lead while preventing simultaneous submissions from colliding.
 */
function saveLead(lead) {
    const lock = LockService.getScriptLock()
    lock.waitLock(10000)

    try {
        const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID)
        const sheetName = lead.isDemo ? DEMO_SHEET : ENQUIRY_SHEET
        let sheet = spreadsheet.getSheetByName(sheetName)

        if (!sheet) {
            sheet = spreadsheet.insertSheet(sheetName)

            const headers = lead.isDemo
                ? ['Timestamp', 'Name', 'Email', 'Company', 'Phone', 'Message']
                : ['Timestamp', 'Name', 'Email', 'Message']

            sheet.appendRow(headers)
            sheet
                .getRange(1, 1, 1, headers.length)
                .setFontWeight('bold')
                .setBackground('#00f0ff')
                .setFontColor('#050505')
            sheet.setFrozenRows(1)
        }

        const row = lead.isDemo
            ? [
                lead.timestamp,
                safeSheetValue(lead.name),
                safeSheetValue(lead.email),
                safeSheetValue(lead.company),
                safeSheetValue(lead.phone),
                safeSheetValue(lead.message),
            ]
            : [
                lead.timestamp,
                safeSheetValue(lead.name),
                safeSheetValue(lead.email),
                safeSheetValue(lead.message),
            ]

        sheet.appendRow(row)
        SpreadsheetApp.flush()
    } finally {
        lock.releaseLock()
    }
}

/**
 * Emails the lead details to the sales inbox.
 */
function sendLeadNotification(lead) {
    const subject = lead.isDemo
        ? 'New Demo / POC Request — Gorad Website'
        : 'New General Enquiry — Gorad Website'

    const lines = [
        'A new website lead has been received.',
        '',
        'Type: ' + (lead.isDemo ? 'Demo / POC Request' : 'General Enquiry'),
        'Received: ' + lead.timestamp,
        'Name: ' + lead.name,
        'Email: ' + lead.email,
    ]

    if (lead.isDemo) {
        lines.push('Company: ' + (lead.company || 'Not provided'))
        lines.push('Phone: ' + (lead.phone || 'Not provided'))
    }

    lines.push('')
    lines.push('Message:')
    lines.push(lead.message)
    lines.push('')
    lines.push('This submission has also been saved to Google Sheets.')

    MailApp.sendEmail({
        to: NOTIFICATION_EMAIL,
        subject,
        body: lines.join('\n'),
        replyTo: lead.email,
        name: 'Gorad Website',
    })
}

/**
 * Normalizes user input and limits payload size.
 */
function cleanValue(value, maxLength) {
    return String(value || '').trim().substring(0, maxLength)
}

/**
 * Prevents spreadsheet-formula injection in cells populated by visitors.
 */
function safeSheetValue(value) {
    return /^[=+\-@]/.test(value) ? "'" + value : value
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function jsonResponse(data) {
    return ContentService
        .createTextOutput(JSON.stringify(data))
        .setMimeType(ContentService.MimeType.JSON)
}

/**
 * Visit the Web App URL in a browser to confirm the deployment is live.
 */
function doGet() {
    return jsonResponse({
        status: 'Gorad Apps Script is running',
    })
}
