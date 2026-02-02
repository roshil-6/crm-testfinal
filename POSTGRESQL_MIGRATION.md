# PostgreSQL Migration Guide

## ✅ Completed Steps

1. ✅ Created PostgreSQL database configuration (`server/config/database.js`)
2. ✅ Created PostgreSQL schema migration script (`server/scripts/initPostgreSQL.js`)
3. ✅ Updated `package.json` to use `pg` instead of `better-sqlite3`
4. ✅ Created `.env.example` with `DATABASE_URL`
5. ✅ Updated `server/index.js` to use async database calls

## ⚠️ Required Updates

All route files need to be updated to use `await` for database calls since all database functions are now async.

### Files That Need Updates:

1. `server/routes/auth.js` - Login and user authentication
2. `server/routes/dashboard.js` - Dashboard data fetching
3. `server/routes/leads.js` - Lead CRUD operations
4. `server/routes/clients.js` - Client CRUD operations
5. `server/routes/users.js` - User management
6. `server/routes/attendance.js` - Attendance tracking
7. `server/routes/notifications.js` - Notifications
8. `server/routes/emailTemplates.js` - Email templates
9. `server/middleware/auth.js` - Authentication middleware

### Migration Pattern:

**Before (SQLite - Synchronous):**
```javascript
const users = db.getUsers({ email });
const user = users[0];
```

**After (PostgreSQL - Async):**
```javascript
const users = await db.getUsers({ email });
const user = users[0];
```

### Key Changes:

1. **All `db.*` calls need `await`**
2. **All route handlers must be `async`**
3. **Remove `db.getDatabase()` calls** - use `db.pool` or `db.query()` directly
4. **Replace SQLite-specific syntax:**
   - `?` placeholders → `$1, $2, $3...`
   - `INTEGER PRIMARY KEY AUTOINCREMENT` → `SERIAL PRIMARY KEY` (handled in schema)
   - `TEXT` for dates → `TIMESTAMP` (handled in schema)
   - `INTEGER` for booleans → `BOOLEAN` (handled in schema)

## Setup Instructions

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Set Environment Variables

Create `server/.env` file:
```env
DATABASE_URL=postgresql://username:password@host:5432/dbname
JWT_SECRET=your-secret-key
NODE_ENV=production
PORT=5001
```

### 3. Initialize Database Schema

```bash
npm run init-db
```

This will create all tables, sequences, indexes, and foreign keys.

### 4. Update All Route Files

Each route file needs async/await updates. See migration pattern above.

### 5. Test the Migration

1. Start the server: `npm start`
2. Test login endpoint
3. Test lead creation
4. Test client creation
5. Verify data persists after server restart

## Important Notes

- **No filesystem storage**: All data is in PostgreSQL
- **Connection pooling**: Uses `pg` Pool for efficient connections
- **Stateless**: Perfect for Vercel serverless
- **Backward compatible API**: Same function names, just async
- **Foreign keys**: All relationships enforced at database level

## Troubleshooting

### Connection Issues
- Verify `DATABASE_URL` is correct
- Check PostgreSQL server is running
- Verify SSL settings for production

### Async/Await Errors
- Ensure all route handlers are `async`
- Ensure all `db.*` calls use `await`
- Check error handling with try/catch

### Migration Issues
- Run `npm run init-db` to create schema
- Check PostgreSQL logs for errors
- Verify sequences are created

## Next Steps

1. Update all route files with async/await
2. Remove any remaining SQLite references
3. Test all endpoints
4. Deploy to Vercel with `DATABASE_URL` environment variable
