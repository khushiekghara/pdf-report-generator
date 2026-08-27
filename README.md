# 🚀 PDF Report Generator with REST API and SQLite

A lightweight and reliable **PDF Report Generator** built with **Node.js**, **Express.js**, and **SQLite**.

This project generates sales reports in PDF format using data stored in a SQLite database. It provides REST API endpoints for creating reports, retrieving report information, and downloading generated PDF files.

---

## ✨ Features

- 📊 Generate sales reports from database data
- 📄 Generate reports in PDF format
- 💾 Persistent SQLite database
- 📈 Calculate total orders
- 💰 Calculate total revenue
- 🏆 Identify top-performing products
- 📅 Calculate orders per day
- 🌱 Seed database with sample order data
- 🔄 Idempotent report generation
- ⚡ Force generation of a new report
- 🔍 Retrieve report information by ID
- 📥 Download generated PDF reports
- ❤️ RESTful API endpoints
- 🧪 Test scripts for report calculation and PDF generation

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- SQLite
- PDFKit
- JavaScript
- REST API

---

## 📂 Project Structure

```text
pdf-report-generator/
│
├── src/
│   ├── database.js       # SQLite database configuration
│   ├── pdf.js            # PDF report generation
│   ├── report.js         # Report calculation logic
│   ├── seed.js           # Sample database data
│   ├── server.js         # Express REST API server
│   ├── test-pdf.js       # PDF generation test
│   └── test-report.js    # Report calculation test
│
├── reports/              # Generated PDF reports
│
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── report.db             # Local SQLite database

🚀 Getting Started
 ## 1. Clone the Repository
git clone https://github.com/<your-username>/pdf-report-generator.git
cd pdf-report-generator
