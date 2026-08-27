# 🚀 PDF Report Generator API

A lightweight and practical **RESTful PDF Report Generator API** built with **Node.js, Express, SQLite, and PDFKit**.

This project generates sales reports from data stored in a SQLite database and provides REST API endpoints to create, retrieve, and download generated PDF reports.

The project demonstrates backend API development, database integration, report generation, PDF creation, and persistent storage.

---

## ✨ Features

- 📊 Generate sales reports from database data
- 📄 Generate PDF reports automatically
- 💾 Persistent SQLite database
- 🗄️ Automatic database and table creation
- 🌱 Seed database with sample order data
- 📈 Calculate total orders
- 💰 Calculate total revenue
- 🏆 Identify top-performing products
- 📅 Calculate orders per day
- 🔍 Retrieve generated reports
- 📥 Download generated PDF reports
- ♻️ Prevent unnecessary duplicate report generation
- ⚡ RESTful API endpoints
- 🧪 Includes test scripts for report generation and PDF generation

---

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **SQLite**
- **PDFKit**
- **JavaScript**
- **REST API**

---

## 📂 Project Structure

```text
pdf-report-generator/
│
├── src/
│   ├── server.js
│   ├── database.js
│   ├── report.js
│   ├── pdf.js
│   ├── seed.js
│   ├── test-report.js
│   └── test-pdf.js
│
├── reports/
│   └── test.pdf
│
├── report.db
├── downloaded-report.pdf
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

### File Description

| File | Description |
|------|-------------|
| `src/server.js` | Main Express server and REST API routes |
| `src/database.js` | SQLite database connection and database operations |
| `src/report.js` | Report data calculation and business logic |
| `src/pdf.js` | PDF report generation |
| `src/seed.js` | Inserts sample order data into the database |
| `src/test-report.js` | Tests report calculations |
| `src/test-pdf.js` | Tests PDF generation |
| `report.db` | SQLite database file |
| `reports/` | Stores generated PDF reports |
| `README.md` | Project documentation |

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/pdf-report-generator.git
cd pdf-report-generator
```

### 2. Install Dependencies

Run:

```bash
npm install
```

This installs all required Node.js packages.

### 3. Seed the Database

The project includes a seed script for inserting sample order data.

Run:

```bash
node src/seed.js
```

This creates/populates the SQLite database with sample sales/order data.

### 4. Start the Server

Run:

```bash
node src/server.js
```

The server will start on:

```
http://localhost:3000
```

---

## 🌐 API URLs

| Service | URL |
|---------|-----|
| API Root | http://localhost:3000/ |
| Reports | http://localhost:3000/reports |
| Single Report | http://localhost:3000/reports/{id} |
| PDF File | http://localhost:3000/reports/{id}/file |

---

## 📌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API information |
| POST | `/reports` | Generate a new PDF report |
| GET | `/reports/:id` | Retrieve report information |
| GET | `/reports/:id/file` | Download/view generated PDF |

---

## 📊 Report Generation

The main endpoint is:

```
POST /reports
```

A report is generated using the sales/order data stored in SQLite.

Example:

```powershell
curl.exe -X POST http://localhost:3000/reports
```

Example response:

```json
{
  "id": 10,
  "file": "/reports/10/file"
}
```

The returned `id` identifies the generated report.

---

## 📄 Force Report Generation

The API also supports forcing a new report generation.

Request body:

```json
{
  "force": true
}
```

**PowerShell:**

```powershell
$body = '{"force":true}'

Invoke-WebRequest `
  -UseBasicParsing `
  -Uri "http://localhost:3000/reports" `
  -Method POST `
  -ContentType "application/json" `
  -Body $body
```

Example response:

```json
{
  "id": 12,
  "file": "/reports/12/file"
}
```

The `force` option can be used when a fresh report needs to be generated.

---

## 🔍 Retrieve a Report

To retrieve information about a particular report:

```powershell
curl.exe http://localhost:3000/reports/10
```

Example response:

```json
{
  "id": 10,
  "file": "/reports/10/file",
  "created_at": "2026-08-27T04:27:38.000Z"
}
```

---

## 📥 Download/View PDF Report

Every generated report has a file endpoint:

```
GET /reports/{id}/file
```

For example:

```
http://localhost:3000/reports/10/file
```

This endpoint returns the generated PDF report.

---

## 📈 Report Data

The generated report calculates useful sales statistics.

The report includes:

### Total Orders

The total number of orders stored in the database.

Example:

```json
{
  "totalOrders": 200
}
```

### Total Revenue

The total revenue calculated from all orders.

Example:

```json
{
  "totalRevenue": 19497.87
}
```

### Top Products

The report identifies products based on their generated revenue.

Example:

```json
{
  "topProducts": [
    {
      "product": "Keyboard",
      "revenue": 4346.64
    },
    {
      "product": "Laptop",
      "revenue": 4114.86
    },
    {
      "product": "Mouse",
      "revenue": 2992.95
    }
  ]
}
```

### Orders Per Day

The report also calculates the number of orders for each date.

Example:

```json
{
  "ordersPerDay": [
    {
      "date": "2026-08-20",
      "orders": 9
    },
    {
      "date": "2026-08-21",
      "orders": 9
    },
    {
      "date": "2026-08-22",
      "orders": 6
    }
  ]
}
```

---

## 🗃️ Database

This project uses SQLite for persistent data storage.

Database file:

```
report.db
```

The database stores the order and report information used by the application.

### Advantages of SQLite in this project

- Lightweight
- No separate database server required
- Easy to configure
- Persistent storage
- Suitable for a small backend project
- Simple to test locally

---

## 🌱 Seed Data

The project contains:

```
src/seed.js
```

The seed script inserts sample order data into the SQLite database.

Run:

```bash
node src/seed.js
```

After seeding, the report generator can use the stored order data to calculate:

- Total orders
- Total revenue
- Top products
- Orders per day

---

## 🧪 Testing

The project includes separate scripts to test the report functionality.

### Test Report Calculation

Run:

```bash
node src/test-report.js
```

Example output:

```json
{
  "totalOrders": 200,
  "totalRevenue": 19497.87,
  "topProducts": [
    {
      "product": "Keyboard",
      "revenue": 4346.64
    },
    {
      "product": "Laptop",
      "revenue": 4114.86
    }
  ],
  "ordersPerDay": [
    {
      "date": "2026-08-20",
      "orders": 9
    }
  ]
}
```

This confirms that the report calculation logic is working correctly.

### Test PDF Generation

Run:

```bash
node src/test-pdf.js
```

Expected output:

```
PDF generated successfully: reports/test.pdf
```

The generated PDF can be found inside:

```
reports/test.pdf
```

---

## ▶️ Run the Complete Project

Follow these commands in order:

**Step 1 — Install packages**
```bash
npm install
```

**Step 2 — Seed database**
```bash
node src/seed.js
```

**Step 3 — Test report calculation**
```bash
node src/test-report.js
```

**Step 4 — Test PDF generation**
```bash
node src/test-pdf.js
```

**Step 5 — Start API server**
```bash
node src/server.js
```

**Step 6 — Generate report**

Open another PowerShell terminal:

```powershell
curl.exe -X POST http://localhost:3000/reports
```

**Step 7 — Get report information**
```powershell
curl.exe http://localhost:3000/reports/1
```

**Step 8 — Open generated PDF**

Use:

```
http://localhost:3000/reports/1/file
```

Replace `1` with the report ID returned by the API.

---

## 🔄 Complete Application Flow

```
              ┌──────────────────┐
              │   Client/User    │
              └────────┬─────────┘
                       │
                       │ POST /reports
                       ▼
              ┌──────────────────┐
              │   Express API    │
              │    server.js     │
              └────────┬─────────┘
                       │
                       ▼
              ┌──────────────────┐
              │  Report Logic    │
              │   report.js      │
              └────────┬─────────┘
                       │
                       ▼
              ┌──────────────────┐
              │ SQLite Database  │
              │    report.db     │
              └────────┬─────────┘
                       │
                       │ Sales Data
                       ▼
              ┌──────────────────┐
              │ PDF Generator    │
              │     pdf.js       │
              └────────┬─────────┘
                       │
                       ▼
              ┌──────────────────┐
              │   PDF Report     │
              │   /reports/...   │
              └──────────────────┘
```

---

## 🧠 How the Project Works

1. The application starts an Express server.
2. SQLite stores the order and report data.
3. The `/reports` endpoint receives a report generation request.
4. The application retrieves order data from SQLite.
5. Report logic calculates important statistics.
6. PDFKit generates a PDF report.
7. The generated report is stored in the `reports` directory.
8. The API returns the report ID and file endpoint.
9. The user can retrieve the report information or access the PDF file.

---

## 📦 Dependencies

The project uses Node.js packages including:

- Express
- PDFKit
- SQLite-related packages

Install all dependencies using:

```bash
npm install
```

Dependencies are defined in:

```
package.json
```

---

## 🔐 Git & GitHub

The project should not commit unnecessary generated or dependency files.

The `.gitignore` file is used to exclude files such as:

```
node_modules/
```

and other local/generated files as appropriate.

Before committing the project, check:

```bash
git status
```

Then:

```bash
git add .
```

Commit the project:

```bash
git commit -m "Complete PDF report generator"
```

Push to GitHub:

```bash
git push -u origin master
```

If your GitHub repository uses `main` instead of `master`, use:

```bash
git branch -M main
git push -u origin main
```

---

## 📌 Important Notes

- The project uses SQLite, so no separate database server is required.
- The database file is created locally.
- Sample data can be inserted using the seed script.
- PDF reports are generated dynamically.
- The API runs on port 3000.
- Generated reports can be accessed through the report file endpoint.
- `node_modules` should not be uploaded to GitHub.
- The project can be run locally using Node.js.

---

## 🎯 Project Objective

The main objective of this project is to build a backend service that can:

> Generate downloadable PDF reports from structured database data through a RESTful API.

The project demonstrates practical implementation of:

- REST API development
- SQLite database integration
- Data aggregation
- Backend business logic
- Dynamic PDF generation
- File handling
- API testing
- Git/GitHub version control

---

## 🚀 Future Improvements

Possible improvements include:

- 📊 Add charts and graphs to PDF reports
- 🔐 Add authentication and authorization
- 📅 Allow custom date ranges
- 🔎 Add report filtering
- 📧 Send generated reports by email
- ☁️ Store reports in cloud storage
- 🖥️ Build a frontend dashboard
- 📈 Add more advanced analytics
- 🗂️ Add report history and management
- 🧪 Add automated API tests

---

## 👩‍💻 Author

**Your Name**

Built as a backend project demonstrating REST API development, SQLite database integration, data processing, and dynamic PDF report generation.

---

## ⭐ Project Status

**Status: Completed ✅**

The project currently supports:

- SQLite database
- Sample data seeding
- Sales report calculation
- PDF generation
- REST API
- Report retrieval
- PDF file access
- Basic testing
