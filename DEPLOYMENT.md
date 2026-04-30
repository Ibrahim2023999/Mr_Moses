# Mr Moses J. Boston's 100th Birthday Invitation
## Deployment Guide

---

## Quick Start Checklist

- [ ] Set up Google Spreadsheet Backend
- [ ] Deploy Google Apps Script as Web App
- [ ] Update index.html with Web App URL
- [ ] Upload celebrant's photo
- [ ] Host the website

---

## Step 1: Set Up Google Spreadsheet Backend

1. **Create a new Google Spreadsheet:**
   - Go to [sheets.google.com](https://sheets.google.com)
   - Click "New" > "New spreadsheet"
   - Name it: `Moses Boston 100th Birthday - Guest List`

2. **Open Apps Script:**
   - In the spreadsheet, go to **Extensions** > **Apps Script**

3. **Add the backend code:**
   - Delete any existing code
   - Copy all content from `Code.gs` and paste it into the editor
   - Click the disk icon to save (or Ctrl+S)

4. **Initialize the spreadsheet:**
   - In the Apps Script editor, click the "Run" button (▶)
   - When prompted, click "Review Permissions" > Choose your account > Click "Advanced" > Click "Go to (unsafe)"
   - Click "Allow" to grant permissions
   - Wait for "setupSpreadsheet" to appear in the log (execution completed)

5. **Deploy as Web App:**
   - Click the blue **Deploy** button > **New deployment**
   - Click the gear icon > **Web app**
   - Configure:
     - Description: `RSVP Backend`
     - Execute as: `Me`
     - Who has access: `Anyone`
   - Click **Deploy**
   - Copy the **Web app URL** (starts with `https://script.google.com/...`)
   - Click "Done"

---

## Step 2: Update index.html

1. Open `index.html` in a text editor (Notepad, VS Code, etc.)

2. Find this line (around line 650):
   ```javascript
   const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
   ```

3. Replace `'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE'` with your Web App URL
   - Example: `const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfy.../exec';`

4. Save the file

---

## Step 3: Add Celebrant's Photo (Optional)

1. **Add the photo to the project:**
   - Place a photo file named `celebrant.jpg` or `celebrant.png` in the same folder as `index.html`

2. **Update the HTML to display the photo:**
   - Find the Hero Section in index.html
   - Add this inside the `hero-content` div (after the subtitle):
   ```html
   <img src="celebrant.jpg" alt="Mr Moses J. Boston" style="width: 200px; height: 200px; border-radius: 50%; border: 4px solid var(--gold-primary); margin: 20px auto; display: block; box-shadow: 0 0 30px var(--glow-gold);">
   ```

---

## Step 4: Host the Website (Free Options)

### Option A: GitHub Pages (Recommended - Free)
1. Create a GitHub account at [github.com](https://github.com)
2. Create a new repository (e.g., `moses-birthday-invite`)
3. Upload `index.html` and your photo
4. Go to **Settings** > **Pages**
5. Under "Branch", select `main` and click Save
6. Your site will be available at: `https://yourusername.github.io/moses-birthday-invite/`

### Option B: Netlify (Free)
1. Go to [Netlify](https://netlify.com)
2. Drag and drop the folder containing `index.html` onto the dashboard
3. Your site will be deployed instantly
4. Share the URL with guests

### Option C: Vercel (Free)
1. Go to [Vercel](https://vercel.com)
2. Install Vercel CLI: `npm i -g vercel`
3. Run `vercel` in the project folder
4. Follow the prompts

---

## Step 5: Testing

1. Open your hosted website
2. Test the form:
   - Fill in test details
   - Select "Joyfully Accepting"
   - Submit the form
3. Check your Google Spreadsheet:
   - The new entry should appear
4. Test "Regretfully Declining" option

---

## Managing Guests

In your Google Spreadsheet:

| Column | Description |
|--------|-------------|
| A | Timestamp of submission |
| B | Guest's full name |
| C | Email address |
| D | Phone number |
| E | Attendance (Yes/No) |
| F | Number of guests |
| G | Dietary requirements |
| H | Message/wishes |
| I | Submission date |
| J | Submission time |

### Custom Menu
In the spreadsheet, you'll see a new menu item **🎂 Birthday RSVP** with:
- **Setup Spreadsheet** - Reset headers
- **View Guest Stats** - See attendance numbers

---

## Troubleshooting

### Form not submitting?
- Make sure the Web App URL is correct in index.html
- Check that the Apps Script is deployed as "Anyone" access

### Data not appearing in spreadsheet?
- Open the Apps Script dashboard
- Check the "Executions" log for errors

### Website not loading?
- Verify all files are uploaded correctly
- Check console for JavaScript errors

---

## Sending the Invitation

Once everything is working:
1. Generate your invitation link (your hosted website URL)
2. Share via WhatsApp, SMS, Email, or any messaging app
3. Guests will fill the form and data goes directly to your spreadsheet

---

## Features Included

- ✓ Classic gold and white design
- ✓ Elegant floral background decorations
- ✓ Glowing text effects
- ✓ Live countdown timer to the celebration
- ✓ RSVP form with:
  - Full name, email, phone
  - Attendance Yes/No
  - Number of guests (if attending)
  - Dietary requirements
  - Personal message/wishes
- ✓ Google Sheets database integration
- ✓ Mobile responsive design
- ✓ Smooth scrolling navigation
- ✓ Professional outfit / dress code display

---

## Need Help?

If you encounter any issues, check:
1. The Apps Script execution logs
2. The browser developer console (F12)
3. Your Google Sheet for new entries

---

*Created with care for Mr Moses J. Boston's Centenary Celebration*