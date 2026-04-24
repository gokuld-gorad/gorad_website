/**
 * Gorad Pvt Ltd — Google Apps Script Web App
 *
 * PURPOSE:
 *   Acts as a serverless backend endpoint. When the website's contact
 *   form submits data, this script receives it and writes a new row
 *   into the target Google Sheet.
 *
 * SETUP INSTRUCTIONS:
 *   1. Go to https://sheets.google.com and create a new spreadsheet.
 *      Name it "Gorad Website Leads" (or whatever you prefer).
 *   2. Go to Extensions → Apps Script.
 *   3. Delete any boilerplate code and paste the entire contents of
 *      THIS file into the editor.
 *   4. At the top of this file, replace SPREADSHEET_ID with the actual
 *      ID from your Google Sheet URL:
 *        https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit
 *   5. Click "Save" (Ctrl+S).
 *   6. Click "Deploy" → "New Deployment".
 *   7. Under "Select type", choose "Web app".
 *   8. Set "Execute as" to "Me".
 *   9. Set "Who has access" to "Anyone".
 *  10. Click "Deploy". Authorize the permissions when prompted.
 *  11. Copy the generated "Web app URL" — this is your GOOGLE_SCRIPT_URL.
 *  12. Paste it into src/components/Contact.jsx as the GOOGLE_SCRIPT_URL constant.
 *
 * NOTE: Any time you modify this script, you must create a NEW deployment
 *       (not an update) or use "Deploy" → "Manage deployments" → Edit → New version.
 */

const SPREADSHEET_ID = 'https://docs.google.com/spreadsheets/d/1XZ2wlejT5jZQd1LcRtH21gA3_m_ZmhjunFzAnMmJECg/edit' // ← Paste your Google Sheet ID here

// Sheet names — these will be auto-created if they don't exist.
const ENQUIRY_SHEET = 'General Enquiries'
const DEMO_SHEET = 'Demo Requests'

/**
 * Handles incoming HTTP POST requests from the website contact form.
 */
function doPost(e) {
    try {
        const data = JSON.parse(e.postData.contents)

        const ss = SpreadsheetApp.openById(SPREADSHEET_ID)
        const isDemo = data.formType === 'demo'
        const sheetName = isDemo ? DEMO_SHEET : ENQUIRY_SHEET

        let sheet = ss.getSheetByName(sheetName)

        // Auto-create the sheet with a header row if it doesn't exist yet.
        if (!sheet) {
            sheet = ss.insertSheet(sheetName)
            if (isDemo) {
                sheet.appendRow(['Timestamp', 'Name', 'Email', 'Company', 'Phone', 'Message'])
            } else {
                sheet.appendRow(['Timestamp', 'Name', 'Email', 'Message'])
            }
            // Bold the header row
            sheet.getRange(1, 1, 1, sheet.getLastColumn()).setFontWeight('bold')
        }

        const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })

        if (isDemo) {
            sheet.appendRow([
                timestamp,
                data.name || '',
                data.email || '',
                data.company || '',
                data.phone || '',
                data.message || '',
            ])
        } else {
            sheet.appendRow([
                timestamp,
                data.name || '',
                data.email || '',
                data.message || '',
            ])
        }

        return ContentService
            .createTextOutput(JSON.stringify({ result: 'success' }))
            .setMimeType(ContentService.MimeType.JSON)

    } catch (err) {
        return ContentService
            .createTextOutput(JSON.stringify({ result: 'error', error: err.toString() }))
            .setMimeType(ContentService.MimeType.JSON)
    }
}

/**
 * Handles GET requests — useful for testing that the deployment is live.
 * Visit the Web App URL in a browser to verify it's working.
 */
function doGet() {
    return ContentService
        .createTextOutput(JSON.stringify({ status: 'Gorad Apps Script is running ✓' }))
        .setMimeType(ContentService.MimeType.JSON)
}
