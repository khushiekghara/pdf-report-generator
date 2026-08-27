const express = require("express");
const path = require("path");
const fs = require("fs");

const db = require("./database");
const { getReportData } = require("./report");
const { generatePdf } = require("./pdf");

const app = express();

const PORT = 3000;

// Parse JSON request bodies
app.use(express.json());

// Reports folder
const reportsDir = path.join(__dirname, "..", "reports");

if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true });
}

// ========================================
// GET /health
// ========================================
app.get("/health", (req, res) => {
  res.json({
    status: "ok"
  });
});

// ========================================
// POST /reports
// Generate a new report
// ========================================
app.post("/reports", async (req, res) => {
  try {
    const force = req.body?.force === true;

    // ------------------------------------
    // Check for today's existing report
    // ------------------------------------
    if (!force) {
  const today = new Date().toISOString().slice(0, 10);

  const existingReport = db
    .prepare(`
      SELECT id, path, created_at
      FROM reports
      WHERE created_at LIKE ?
      ORDER BY id DESC
      LIMIT 1
    `)
    .get(`${today}%`);

  if (existingReport) {
    console.log(`Today's report already exists: ${existingReport.id}`);

    return res.status(200).json({
      id: existingReport.id,
      file: `/reports/${existingReport.id}/file`
    });
  }
}

    // ------------------------------------
    // Get report data from SQL
    // ------------------------------------
    const reportData = getReportData();

    // ------------------------------------
    // Generate next report ID
    // ------------------------------------
    const result = db
      .prepare(`
        SELECT COALESCE(MAX(id), 0) + 1 AS nextId
        FROM reports
      `)
      .get();

    const id = result.nextId;

    // ------------------------------------
    // PDF file path
    // ------------------------------------
    const filename = `${id}.pdf`;

    const filePath = path.join(
      reportsDir,
      filename
    );

    // ------------------------------------
    // Generate PDF using Playwright
    // ------------------------------------
    await generatePdf(
      reportData,
      filePath
    );

    // ------------------------------------
    // Save report information
    // ------------------------------------
    const createdAt = new Date().toISOString();

    db.prepare(`
      INSERT INTO reports (
        id,
        path,
        created_at
      )
      VALUES (?, ?, ?)
    `).run(
      id,
      filePath,
      createdAt
    );

    // ------------------------------------
    // Return response
    // ------------------------------------
    return res.status(201).json({
      id,
      file: `/reports/${id}/file`
    });

  } catch (error) {
    console.error("Report generation error:", error);

    return res.status(500).json({
      error: "Failed to generate report"
    });
  }
});

// ========================================
// GET /reports/:id
// Get report information
// ========================================
app.get("/reports/:id", (req, res) => {
  const id = Number(req.params.id);

  const report = db
    .prepare(`
      SELECT
        id,
        path,
        created_at
      FROM reports
      WHERE id = ?
    `)
    .get(id);

  if (!report) {
    return res.status(404).json({
      error: "Report not found"
    });
  }

  return res.json({
    id: report.id,
    file: `/reports/${report.id}/file`,
    created_at: report.created_at
  });
});

// ========================================
// GET /reports/:id/file
// Download PDF
// ========================================
app.get("/reports/:id/file", (req, res) => {
  const id = Number(req.params.id);

  const report = db
    .prepare(`
      SELECT path
      FROM reports
      WHERE id = ?
    `)
    .get(id);

  if (!report) {
    return res.status(404).json({
      error: "Report not found"
    });
  }

  // Check whether PDF actually exists
  if (!fs.existsSync(report.path)) {
    return res.status(404).json({
      error: "Report file not found"
    });
  }

  return res.sendFile(
    path.resolve(report.path)
  );
});

// ========================================
// Start server
// ========================================
app.listen(PORT, () => {
  console.log(
    `Server running at http://localhost:${PORT}`
  );
});