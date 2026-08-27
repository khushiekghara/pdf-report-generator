const db = require("./database");

function getReportData() {
  // 1. Total number of orders
  const totalOrders = db
    .prepare("SELECT COUNT(*) AS total FROM orders")
    .get();

  // 2. Total revenue
  const totalRevenue = db
    .prepare("SELECT ROUND(SUM(amount), 2) AS total FROM orders")
    .get();

  // 3. Top 5 products by revenue
  const topProducts = db
    .prepare(`
      SELECT
        product,
        ROUND(SUM(amount), 2) AS revenue
      FROM orders
      GROUP BY product
      ORDER BY revenue DESC
      LIMIT 5
    `)
    .all();

  // 4. Orders per day for the last 7 days
  const ordersPerDay = db
    .prepare(`
      SELECT
        created_at AS date,
        COUNT(*) AS orders
      FROM orders
      WHERE created_at >= date('now', '-6 days')
      GROUP BY created_at
      ORDER BY created_at ASC
    `)
    .all();

  return {
    totalOrders: totalOrders.total,
    totalRevenue: totalRevenue.total || 0,
    topProducts,
    ordersPerDay
  };
}

module.exports = {
  getReportData
};