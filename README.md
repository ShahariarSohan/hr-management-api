# 🏢 HR Management Backend API

A **professional, production-grade HR Management RESTful API** built with **Node.js, TypeScript, Express, Knex, and PostgreSQL**.

This project demonstrates **enterprise-level backend practices** including authentication, validation, migrations, reporting queries, and clean architecture.

---

## 📌 Features Overview

- HR user authentication using **JWT (Set in cookies)**
- Employee management (CRUD) with photo upload
- Daily attendance tracking (upsert supported)
- Monthly attendance reporting (days present & late count)
- Input validation with **Zod**
- Database migrations & seeds using **Knex**
- PostgreSQL relational design with constraints
- ESLint & Prettier configured
- Fully typed with **TypeScript**

---

## 🛠 Tech Stack

| Category | Technology |
|-------|------------|
| Runtime | Node.js |
| Language | TypeScript |
| Framework | Express.js |
| Database | PostgreSQL |
| Query Builder | Knex.js |
| Auth | JWT |
| Validation | Zod |
| File Upload | Multer |
| Linting | ESLint + Prettier |

---

## 📁 Project Structure

```bash
src/
├── config/
│   ├── env.ts
│   ├── multer.ts
├── modules/
│   ├── auth/
│   ├── employees/
│   ├── attendance/
│   ├── reports/
├── middlewares/
│  
├── db/
├── ├── migrations/
│   ├── seeds/
│   ├── knex.ts
├── utils/
└── types/
└── shared/
├── app.ts
├── server.ts
├── knexfile.ts

```

---

## ⚙️ Environment Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/<your-username>/hr-management-api.git
cd hr-management-api
```

---

### 2️⃣ Install Dependencies

```bash
npm install
```

---

### 3️⃣ Environment Variables

Create a `.env` file at the root and copy from `.env.example`:

```env
# Database and Port
NODE_ENV=development
DATABASE_URL=postgresql://<user>:<password>@localhost:5432/<database_name>?schema=public
PORT=5000

# Bcrypt
BCRYPT_SALT_ROUND=10

# JWT
ACCESS_TOKEN_SECRET=topsecretaccesstoken!
REFRESH_TOKEN_SECRET=topsecretrefreshtoken!
ACCESS_TOKEN_EXPIRES_IN=1d
REFRESH_TOKEN_EXPIRES_IN=1M

# Upload path
UPLOAD_PATH=uploads/
```

> ⚠️ `.env` is **gitignored**. Only `.env.example` is committed.

---

## 🗄 Database Setup

### 4️⃣ Run Migrations

```bash
npm run db:migrate
```

### 5️⃣ Run Seeds (Optional)

```bash
npm run db:seed
```

### Knex Commands Reference

```bash
npm run db:migrate        # Run all migrations
npm run db:rollback       # Rollback last batch
npm run db:make name      # Create a new migration
npm run db:seed:make name # Create seed file
npm run db:seed           # Run seeds
npm run db:status         # Migration status
```

---

## 📐 Database knex migration Schema

### I have already  added all migrations knex schema file in my git repo you don't have to manually create it you only have to  but if you want to create it manually you can use this migration schemas.

### 🧑‍💼 hr_users

```ts
import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("hr_users", (table) => {
    table.increments("id").primary();
    table.string("email").unique().notNullable().index();
    table.string("password_hash").notNullable();
    table.string("name").notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("hr_users");
}

```

### 👨‍👩‍👧 employees

```ts

import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("employees", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.integer("age").notNullable();
    table.string("designation").notNullable();
    table.date("hiring_date").notNullable();
    table.date("date_of_birth").notNullable();
    table.decimal("salary", 12, 2).notNullable();
    table.string("photo_path").nullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("employees");
}

```

### 🕘 attendance

```ts
import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("attendance", (table) => {
    table.increments("id").primary();
    table
      .integer("employee_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("employees")
      .onDelete("CASCADE");
    table.date("date").notNullable();
    table.time("check_in_time").notNullable();
    table.unique(["employee_id", "date"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("attendance");
}

```

---

## 🔐 Authentication

### POST `/auth/login`

**Request Body**
```json
{
  "email": "hr@example.com",
  "password": "password123"
}
```

**Response**
```json
{
  "accessToken": "jwt-token"
}
```

> All `/employees`, `/attendance`, `/reports` routes are protected via **Bearer Token**.

---

## 👥 Employees API

### GET `/employees`
Query params:
- `search` (partial name)
- `page`, `limit`

### GET `/employees/:id`

### POST `/employees`
- `multipart/form-data`
- Supports photo upload

### PUT `/employees/:id`

### DELETE `/employees/:id`

---

## 🕘 Attendance API

### POST `/attendance`
**Upsert behavior** (unique employee + date)

```json
{
  "employee_id": 1,
  "date": "2025-08-12",
  "check_in_time": "09:30:00"
}
```

### GET `/attendance`
Filters:
- `employee_id`
- `from`, `to`

### PUT `/attendance/:id`

### DELETE `/attendance/:id`

---

## 📊 Reports API

### GET `/reports/attendance`

**Query Params**
- `month=YYYY-MM` (required)
- `employee_id` (optional)

**Late Rule**
```text
check_in_time > 09:45:00
```

**Response**
```json
[
  {
    "employee_id": 1,
    "name": "Rahim",
    "days_present": 22,
    "times_late": 3
  }
]
```

---

## ▶️ Running the Server

### Development

```bash
npm run dev
```

### Production

```bash
npm run build
npm start
```

---

## 🧪 Code Quality

- ESLint for static analysis
- Prettier for formatting
- Strict TypeScript typing
- Centralized error handling

---

## 📦 Deliverables Checklist

- ✅ REST API with authentication
- ✅ Knex migrations & seeds
- ✅ PostgreSQL relational design
- ✅ JWT-protected routes
- ✅ Attendance monthly report
- ✅ README with full setup guide
- ✅ `.env.example`

---

## 👨‍💻 Author

**Shahariar Sohan**  
Backend Developer — MERN + PostgreSQL + Prisma mindset

---



