# CRM Storage Details

## Database Information

### Primary Database
- **Location**: `server/data/crm.db`
- **Type**: SQLite Database
- **Size**: ~0.11 MB
- **Last Modified**: February 2, 2026

### Database Structure

#### Tables:
1. **leads** - Stores all lead information (11 rows)
2. **clients** - Stores converted clients (3 rows)
3. **users** - Stores user accounts and authentication (14 rows)
4. **comments** - Stores activity comments on leads (0 rows)
5. **attendance** - Stores staff attendance records (3 rows)
6. **notifications** - Stores system notifications (19 rows)
7. **email_templates** - Stores email templates (1 row)
8. **email_logs** - Stores email sending logs (0 rows)
9. **login_logs** - Stores user login attempts (34 rows)
10. **activity_logs** - Stores system activity logs (0 rows)
11. **metadata** - Stores ID counters and metadata (8 rows)
12. **sqlite_sequence** - SQLite internal sequence table (7 rows)

### Current Data Counts (as of February 2, 2026)

- **Total Leads**: 11
- **Total Clients**: 3
- **Total Users**: 14
- **Total Comments**: 0
- **Total Attendance Records**: 3
- **Total Notifications**: 19
- **Total Login Logs**: 34
- **Total Email Templates**: 1

### Leads by Status

- **New**: 8 leads
- **Registration Completed**: 1 lead
- **Not Interested**: 1 lead
- **Not Eligible**: 1 lead

### Users by Role

- **SALES_TEAM**: 5 users
- **ADMIN**: 5 users
- **SALES_TEAM_HEAD**: 2 users (Varsha, Kiran)
- **STAFF**: 1 user
- **PROCESSING**: 1 user

## Storage Files

### Active Files
- `crm.db` - Main SQLite database file (0.113 MB)
- `crm.db-shm` - SQLite shared memory file (0.031 MB) - WAL mode
- `crm.db-wal` - SQLite write-ahead log file (0.350 MB) - WAL mode
- `crm.json` - Legacy JSON backup (0.018 MB)
- `crm.json.backup` - Legacy JSON backup file (0.018 MB)

**Total Active Storage**: ~0.53 MB

### Backup Files
- **Location**: `server/data/backups/`
- **Total Backup Files**: 18 files
- **Total Backup Size**: 0.31 MB
- **Format**: `crm_backup_YYYY-MM-DD_HH-MM.json`
- **Oldest Backup**: crm_backup_2026-02-01_20-41.json
- **Newest Backup**: crm_backup_2026-02-01_01-31.json

## Database Features

### SQLite Configuration
- **Journal Mode**: WAL (Write-Ahead Logging) - Better performance and concurrency
- **Foreign Keys**: Enabled
- **Auto-save**: Enabled (no manual save required)

### Data Persistence
- All data is automatically saved to disk
- No manual save operation required
- Transactions ensure data integrity

## Storage Recommendations

1. **Regular Backups**: Backup files are automatically created
2. **Database Size**: Currently very small (~0.11 MB), can grow as data increases
3. **WAL Files**: `crm.db-shm` and `crm.db-wal` are temporary files used by SQLite WAL mode
4. **Cleanup**: Old backup files can be archived or deleted periodically

## Database Schema Details

### Leads Table Columns
- id, name, phone_number, phone_country_code
- whatsapp_number, whatsapp_country_code
- email, age, occupation, qualification
- year_of_experience, country, program
- status, priority, comment
- follow_up_date, follow_up_status
- assigned_staff_id, source, ielts_score
- created_by, created_at, updated_at

### Clients Table Columns
- All lead fields plus:
- assessment_authority, occupation_mapped
- registration_fee_paid, fee_status
- amount_paid, payment_due_date
- processing_status, processing_staff_id

### Users Table Columns
- id, name, email, password (hashed)
- role, team, managed_by
- created_at, updated_at

## Notes

- SQLite is a file-based database, perfect for small to medium applications
- Database file can be easily backed up by copying `crm.db`
- WAL mode provides better performance and allows concurrent reads
- All data is stored locally on the server machine
