Migration notes - server/migrations

Purpose
- Creates the initial tables used by the backend Sequelize models: `users`, `subscriptions`, and `transactions`.

Environment
- The project uses `.env` values. Confirm `DB_NAME`, `DB_USER`, `DB_PASS`, and `DB_HOST` are set in the repository root `.env` (example already present).

Running the SQL migration (PowerShell / Windows)

# If your MySQL user has no password (common for XAMPP):
mysql -u root -h localhost -e "CREATE DATABASE IF NOT EXISTS node_insocialvise CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
mysql -u root -h localhost node_insocialvise < server/migrations/001_create_tables.sql

# If your MySQL user requires a password, use `-p` and you'll be prompted:
mysql -u root -p -h localhost -e "CREATE DATABASE IF NOT EXISTS node_insocialvise CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
mysql -u root -p -h localhost node_insocialvise < server/migrations/001_create_tables.sql

Notes
- The SQL file creates the database and the three tables with types and defaults matching the Sequelize models in `server/models`.
- The `transactions.subscription_id` column includes a foreign key constraint pointing to `subscriptions.id`.
- `users.uuid` is not declared UNIQUE in the SQL to avoid accidental constraint issues; app logic should keep UUIDs unique. If you'd like, I can add a `UNIQUE` constraint on `users.uuid`.

Alternative: create tables from models (Sequelize)
- If you prefer Sequelize to create/update tables, you can add a small script that imports the models and calls `sequelize.sync({ alter: true })`.
- I can add that script if you'd like to manage schema through the models instead of raw SQL.
