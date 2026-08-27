const db = require("./database");

const customers = [
  "Rahul",
  "Priya",
  "Aman",
  "Neha",
  "Riya",
  "Arjun",
  "Ananya",
  "Vikash"
];

const products = [
  "Laptop",
  "Mouse",
  "Keyboard",
  "Monitor",
  "Headphones",
  "Webcam"
];

// Remove old data so the script is safe to run multiple times
db.exec("DELETE FROM orders");

const insert = db.prepare(`
  INSERT INTO orders (customer, product, amount, created_at)
  VALUES (?, ?, ?, ?)
`);

function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function randomAmount() {
  return Number((Math.random() * 195 + 5).toFixed(2));
}

function randomDate() {
  const date = new Date();
  const daysAgo = Math.floor(Math.random() * 30);

  date.setDate(date.getDate() - daysAgo);

  return date.toISOString().split("T")[0];
}

for (let i = 0; i < 200; i++) {
  insert.run(
    randomItem(customers),
    randomItem(products),
    randomAmount(),
    randomDate()
  );
}

const result = db.prepare("SELECT COUNT(*) AS count FROM orders").get();

console.log(`Seed completed: ${result.count} orders inserted.`);