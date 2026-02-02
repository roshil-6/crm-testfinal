# Meta Ads (Facebook Ads) Import Guide

## Overview
The CRM system now fully supports importing leads directly from Meta Ads (Facebook Ads) exports. No manual formatting or column renaming required!

## Supported Meta Ads Columns

The system automatically recognizes and maps the following Meta Ads export columns:

### Required Columns (at least one must be present)
- **First Name** / **Last Name** → Combined into lead name
- **Phone Number** → Mapped to phone_number

### Optional Columns (automatically recognized)
- **Email** → Mapped to email field
- **Ad Name** → Stored in lead source/comment
- **Campaign Name** → Stored in lead source/comment  
- **Form Name** → Stored in lead source/comment
- **Lead ID** → Stored in comments for reference
- **Created Time** / **Created Date** → Used for follow-up date

## How to Import Meta Ads Leads

### Step 1: Export from Meta Ads Manager
1. Go to Meta Ads Manager
2. Navigate to your leads
3. Export the leads as Excel (.xlsx) or CSV (.csv) format
4. Save the file to your computer

### Step 2: Import to CRM
1. Log in to the CRM application
2. Navigate to **Leads** → **Import & Export Leads**
3. Click **Upload CSV or Excel File**
4. Select your Meta Ads export file
5. Click **Import Leads**

### Step 3: Review Results
- The system will show you:
  - Total leads processed
  - Successfully created leads
  - Skipped duplicates
  - Any errors

## Automatic Field Mapping

The system automatically handles:

| Meta Ads Column | CRM Field | Notes |
|----------------|-----------|-------|
| First Name + Last Name | name | Automatically combined |
| Phone Number | phone_number | Automatically recognized |
| Email | email | Automatically recognized |
| Ad Name | source/comment | Stored in lead metadata |
| Campaign Name | source/comment | Stored in lead metadata |
| Form Name | source/comment | Stored in lead metadata |
| Lead ID | comment | Stored for reference |
| Created Time | follow_up_date | Used for tracking |

## Example Meta Ads Export Format

Your Meta Ads export might look like this:

```
First Name, Last Name, Email, Phone Number, Ad Name, Campaign Name, Form Name, Lead ID, Created Time
John, Doe, john@example.com, +1234567890, Summer Sale Ad, Summer Campaign, Contact Form, 12345, 2024-01-15 10:30:00
Jane, Smith, jane@example.com, +1987654321, Winter Promo, Winter Campaign, Lead Form, 12346, 2024-01-15 11:15:00
```

This format is **fully supported** - no changes needed!

## Tips

1. **Direct Export**: You can export directly from Meta Ads Manager and upload without any modifications
2. **Multiple Formats**: Supports both Excel (.xlsx) and CSV (.csv) formats
3. **Automatic Deduplication**: Duplicate phone numbers or emails are automatically skipped
4. **Source Tracking**: Ad and Campaign names are preserved in the lead comments for tracking
5. **Bulk Import**: Import hundreds or thousands of leads at once

## Troubleshooting

### "Missing required columns" error
- Make sure your file has **First Name** and **Last Name** (or just **Name**)
- Make sure your file has **Phone Number** (or **Phone**)
- Check that the header row is the first row in your file

### Leads not importing
- Check the import results for specific error messages
- Verify phone numbers are in a valid format
- Ensure email addresses are valid (if provided)

### Need Help?
- Check the server console logs for detailed error messages
- Review the import results page for row-by-row error details
- Contact your system administrator

## Notes

- Meta Ads leads are automatically assigned to the user who imports them (unless you're an admin)
- Lead status defaults to "New" if not specified
- All Meta Ads metadata (Ad Name, Campaign Name, etc.) is preserved in the lead comments
- The system automatically extracts country codes from phone numbers if they start with "+"
