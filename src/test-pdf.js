const { getReportData } = require("./report");
const { generatePdf } = require("./pdf");

async function main() {
  const report = getReportData();

  await generatePdf(report, "reports/test.pdf");

  console.log("PDF generated successfully: reports/test.pdf");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});