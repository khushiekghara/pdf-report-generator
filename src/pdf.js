const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

function buildHtml(report) {
  const today = new Date().toLocaleDateString("en-IN");

  const topProductsRows = report.topProducts
    .map(
      (item) => `
        <tr>
          <td>${item.product}</td>
          <td>₹${item.revenue.toFixed(2)}</td>
        </tr>
      `
    )
    .join("");

  const ordersPerDayRows = report.ordersPerDay
    .map(
      (item) => `
        <tr>
          <td>${item.date}</td>
          <td>${item.orders}</td>
        </tr>
      `
    )
    .join("");

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">

  <style>
    @page {
      size: A4;
      margin: 20mm;
    }

    body {
      font-family: Arial, sans-serif;
      color: #222;
      font-size: 12px;
    }

    h1 {
      text-align: center;
      margin-bottom: 5px;
    }

    .date {
      text-align: center;
      color: #666;
      margin-bottom: 25px;
    }

    .summary {
      display: flex;
      gap: 20px;
      margin-bottom: 30px;
    }

    .card {
      flex: 1;
      border: 1px solid #ddd;
      padding: 15px;
      border-radius: 8px;
    }

    .card-title {
      font-size: 12px;
      color: #666;
    }

    .card-value {
      font-size: 22px;
      font-weight: bold;
      margin-top: 8px;
    }

    h2 {
      margin-top: 25px;
      border-bottom: 1px solid #ddd;
      padding-bottom: 6px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 25px;
    }

    th,
    td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }

    th {
      background: #f3f3f3;
    }

    tr {
      break-inside: avoid;
    }

    thead {
      display: table-header-group;
    }

    .page-break {
      page-break-before: always;
    }
  </style>
</head>

<body>

  <h1>Sales Report</h1>
  <div class="date">Generated on ${today}</div>

  <div class="summary">
    <div class="card">
      <div class="card-title">Total Orders</div>
      <div class="card-value">${report.totalOrders}</div>
    </div>

    <div class="card">
      <div class="card-title">Total Revenue</div>
      <div class="card-value">₹${report.totalRevenue.toFixed(2)}</div>
    </div>
  </div>

  <h2>Top 5 Products by Revenue</h2>

  <table>
    <thead>
      <tr>
        <th>Product</th>
        <th>Revenue</th>
      </tr>
    </thead>

    <tbody>
      ${topProductsRows}
    </tbody>
  </table>

  <h2>Orders Per Day — Last 7 Days</h2>

  <table>
    <thead>
      <tr>
        <th>Date</th>
        <th>Orders</th>
      </tr>
    </thead>

    <tbody>
      ${ordersPerDayRows}
    </tbody>
  </table>

  <div class="page-break"></div>

  <h2>All Orders</h2>

  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Customer</th>
        <th>Product</th>
        <th>Amount</th>
        <th>Date</th>
      </tr>
    </thead>

    <tbody>
      ${generateAllOrdersRows()}
    </tbody>
  </table>

</body>
</html>
  `;
}

function generateAllOrdersRows() {
  const db = require("./database");

  const orders = db
    .prepare(`
      SELECT id, customer, product, amount, created_at
      FROM orders
      ORDER BY created_at DESC, id DESC
    `)
    .all();

  return orders
    .map(
      (order) => `
        <tr>
          <td>${order.id}</td>
          <td>${order.customer}</td>
          <td>${order.product}</td>
          <td>₹${order.amount.toFixed(2)}</td>
          <td>${order.created_at}</td>
        </tr>
      `
    )
    .join("");
}

async function generatePdf(report, outputPath) {
  const browser = await chromium.launch();

  try {
    const page = await browser.newPage();

    const html = buildHtml(report);

    await page.setContent(html);

    await page.pdf({
      path: outputPath,
      format: "A4",
      printBackground: true
    });
  } finally {
    await browser.close();
  }
}

module.exports = {
  buildHtml,
  generatePdf
};