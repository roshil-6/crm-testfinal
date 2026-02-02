# Registration Completed Workflow - Implementation Summary

## ✅ COMPLETED IMPLEMENTATIONS

### 1. Registration Completed Flow
- ✅ Created new endpoint: `POST /api/leads/:id/complete-registration`
- ✅ Frontend shows registration form modal when "Registration Completed" is selected
- ✅ Form collects: Assessment Authority, Occupation Mapped, Registration Fee Paid
- ✅ Lead status is updated to "Registration Completed"
- ✅ Client is automatically created with all lead data
- ✅ Client is assigned to the staff who converted it (for their dashboard)
- ✅ Notifications sent to Sneha and Kripa (processing team)

### 2. Lead Filtering
- ✅ Leads with "Registration Completed" status are completely hidden from:
  - `GET /api/leads` (list view)
  - `GET /api/leads/:id` (detail view)
- ✅ Leads and Clients are completely separate sections

### 3. Client Visibility
- ✅ All staff can see clients in client section
- ✅ All staff can see which staff the client belongs to
- ✅ Payment details (amount_paid, fee_status, registration_fee_paid) are only visible to:
  - Admin
  - Sneha
  - Kripa
  - Emy (monitoring access)

### 4. Emy's Monitoring Access
- ✅ Emy can monitor dashboards of: Karthika, Jibina, Asna, Shilpa
- ✅ Emy has read-only access to their dashboards
- ✅ Emy can see payment details for monitoring purposes

### 5. Payment Pending Timer
- ✅ When fee_status = "Payment Pending", 10-day timer is set automatically
- ✅ payment_due_date is set to 10 days from now
- ⚠️ Frontend needs to show "Due in X days" warning 2 days before due date

## 🔄 WORKFLOW LOGIC

### Staff Converting Lead to Client:
1. Staff selects "Registration Completed" status
2. System shows registration form:
   - Assessment Authority (required)
   - Occupation Mapped (required)
   - Registration Fee Paid? Yes/No (required)
   - If Yes, amount field (optional)
3. On submit:
   - Lead status → "Registration Completed"
   - Client created with all lead data
   - Client assigned_staff_id = staff who converted it
   - Client appears in:
     - Staff's dashboard (who converted it)
     - Admin's dashboard
     - Sneha's notification/task box
     - Kripa's notification/task box
   - Lead is removed from leads section

### Sneha's Workflow:
1. Receives client in task box (notification)
2. Can edit:
   - amount_paid
   - fee_status (options: "1st Installment Completed", "Payment Pending", "PTE Fee Paid")
3. If "Payment Pending" selected:
   - 10-day timer starts automatically
   - payment_due_date set to 10 days from now
4. After updating fee_status, can manually assign to Kripa:
   - Sets processing_staff_id = Kripa's ID
   - Creates notification for Kripa
   - Client marked as "done" in Sneha's dash (but still accessible)
5. Sneha still has access to see what she did

### Kripa's Workflow:
1. Receives client in processing task section after Sneha assigns
2. Main processing tasks (completed_actions array):
   - "Hand over to Australia"
   - "Confirming pending payment done"
   - "Service agreement submitted"
3. Also has access to Sneha's section (to help if Sneha is on leave)
4. Sneha does NOT have processing section access

## 📋 DATABASE COLUMNS NEEDED

The following columns should exist in the `clients` table:
- `assessment_authority` (TEXT)
- `occupation_mapped` (TEXT)
- `registration_fee_paid` (BOOLEAN)
- `target_country` (TEXT)
- `residing_country` (TEXT)
- `lead_id` (INTEGER) - tracks which lead this came from
- `created_by` (INTEGER) - who created the client
- `completed_actions` (TEXT[] or JSONB) - array of completed processing actions

## ⚠️ TODO - Frontend Implementation Needed

1. **Client Detail View:**
   - Show "Due in X days" warning when payment_due_date is within 2 days
   - Show processing actions for Kripa
   - Show "Assign to Kripa" button for Sneha

2. **Sneha's Dashboard:**
   - Show clients assigned to her (assigned_staff_id = Sneha's ID)
   - Show "Assign to Kripa" option
   - Show "Done" status after assigning to Kripa

3. **Kripa's Dashboard:**
   - Show processing section with clients (processing_staff_id = Kripa's ID)
   - Show processing action checkboxes
   - Show Sneha's section (clients assigned to Sneha)

4. **Staff Dashboard:**
   - Show clients they converted (assigned_staff_id = their ID)
   - Show client count in metrics

5. **Payment Due Warning:**
   - Calculate days until due date
   - Show warning if <= 2 days remaining
   - Highlight in red if overdue

## 🔧 BACKEND ENDPOINTS

### New Endpoint:
- `POST /api/leads/:id/complete-registration`
  - Body: { assessment_authority, occupation_mapped, registration_fee_paid }
  - Returns: { success, client, message }

### Updated Endpoints:
- `PUT /api/clients/:id` - Now handles:
  - fee_status changes (auto-sets payment_due_date for "Payment Pending")
  - processing_staff_id assignment (creates notification for Kripa)
  - completed_actions array updates

## 📝 NOTES

- Client `assigned_staff_id` = staff who converted the lead (for their dashboard)
- Client `processing_staff_id` = Kripa (assigned by Sneha for processing)
- All staff can see clients but not payment details (except Admin/Sneha/Kripa/Emy)
- Emy has monitoring access to Karthika, Jibina, Asna, Shilpa dashboards
- Leads with "Registration Completed" are completely filtered out from leads section
