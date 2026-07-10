import * as fs from "fs";
import * as path from "path";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  HeadingLevel,
  WidthType,
  BorderStyle,
  AlignmentType,
  ShadingType,
} from "docx";

function createHeader(text: string): Paragraph {
  return new Paragraph({
    text: text,
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 400, after: 200 },
    keepWithNext: true,
  });
}

function createParagraph(text: string, options: { bold?: boolean; color?: string; size?: number } = {}): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({
        text: text,
        font: "Segoe UI",
        bold: options.bold,
        color: options.color,
        size: options.size || 22, // 11pt
      }),
    ],
    spacing: { after: 120 },
  });
}

async function main() {
  console.log("Generating Word Document (tests/test_report.docx)...");

  const borderStyle = {
    style: BorderStyle.SINGLE,
    size: 4,
    color: "E2E8F0",
  };

  const headerShading = {
    fill: "6366F1", // Indigo primary
    type: ShadingType.CLEAR,
  };

  const tableHeaderCell = (text: string) =>
    new TableCell({
      children: [
        new Paragraph({
          children: [
            new TextRun({
              text: text,
              font: "Segoe UI",
              bold: true,
              color: "FFFFFF",
              size: 20, // 10pt
            }),
          ],
          alignment: AlignmentType.LEFT,
        }),
      ],
      shading: headerShading,
      margins: { top: 120, bottom: 120, left: 150, right: 150 },
    });

  const tableBodyCell = (text: string, options: { bold?: boolean; color?: string; align?: AlignmentType } = {}) =>
    new TableCell({
      children: [
        new Paragraph({
          children: [
            new TextRun({
              text: text,
              font: "Segoe UI",
              bold: options.bold,
              color: options.color,
              size: 20, // 10pt
            }),
          ],
          alignment: options.align || AlignmentType.LEFT,
        }),
      ],
      margins: { top: 100, bottom: 100, left: 150, right: 150 },
    });

  const doc = new Document({
    creator: "Antigravity Coding Assistant",
    title: "Software Test Report",
    description: "Test execution report for Souvik Portfolio Next.js Website",
    sections: [
      {
        properties: {},
        children: [
          // Title
          new Paragraph({
            children: [
              new TextRun({
                text: "SOFTWARE TEST REPORT",
                font: "Segoe UI",
                bold: true,
                size: 48, // 24pt
                color: "6366F1",
              }),
            ],
            spacing: { before: 200, after: 100 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Souvik Portfolio Next.js Website",
                font: "Segoe UI",
                size: 28, // 14pt
                color: "475569",
              }),
            ],
            spacing: { after: 400 },
          }),

          // Metadata Card
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: {
              top: borderStyle,
              bottom: borderStyle,
              left: borderStyle,
              right: borderStyle,
              insideHorizontal: borderStyle,
              insideVertical: borderStyle,
            },
            rows: [
              new TableRow({
                children: [
                  tableBodyCell("Date of Execution:", { bold: true }),
                  tableBodyCell("July 10, 2026"),
                  tableBodyCell("Status:", { bold: true }),
                  tableBodyCell("PASSED (100% Success Rate)", { bold: true, color: "10B981" }),
                ],
              }),
              new TableRow({
                children: [
                  tableBodyCell("Runtime Env:", { bold: true }),
                  tableBodyCell("Node.js v24.18.0"),
                  tableBodyCell("Test Port:", { bold: true }),
                  tableBodyCell("3001"),
                ],
              }),
            ],
          }),

          new Paragraph({ text: "", spacing: { after: 300 } }),

          // 1. Executive Summary
          createHeader("1. Executive Summary"),
          createParagraph(
            "This report summarizes the outcome of the software test execution conducted on the Next.js portfolio website. The objective was to verify the robustness of backend contact submission workflows, database integrity, and administrative authentication controls."
          ),
          createParagraph(
            "A total of 10 automated test cases were executed, covering end-to-end integration and API boundaries. All 10 test cases passed successfully with no errors or defects identified."
          ),

          // 2. Test Environment
          createHeader("2. Test Environment"),
          createParagraph("The testing session was carried out under the following configuration:"),
          new Paragraph({
            children: [
              new TextRun({ text: "• Operating System: ", font: "Segoe UI", bold: true }),
              new TextRun({ text: "Windows Local Host\n", font: "Segoe UI" }),
              new TextRun({ text: "• Web Server Framework: ", font: "Segoe UI", bold: true }),
              new TextRun({ text: "Next.js v16.2.9\n", font: "Segoe UI" }),
              new TextRun({ text: "• Database: ", font: "Segoe UI", bold: true }),
              new TextRun({ text: "Local JSON file database (data/submissions.json)", font: "Segoe UI" }),
            ],
            spacing: { after: 200 },
          }),

          // 3. Automated Test Execution Results
          createHeader("3. Automated Test Execution Results"),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: {
              top: borderStyle,
              bottom: borderStyle,
              left: borderStyle,
              right: borderStyle,
              insideHorizontal: borderStyle,
              insideVertical: borderStyle,
            },
            rows: [
              new TableRow({
                children: [
                  tableHeaderCell("Test Case ID"),
                  tableHeaderCell("Test Case Description"),
                  tableHeaderCell("Result"),
                  tableHeaderCell("Details"),
                ],
              }),
              new TableRow({
                children: [
                  tableBodyCell("TC-CONTACT-01", { bold: true }),
                  tableBodyCell("Successful Form Submission"),
                  tableBodyCell("PASS", { bold: true, color: "10B981" }),
                  tableBodyCell("Verified valid submissions write to database correctly."),
                ],
              }),
              new TableRow({
                children: [
                  tableBodyCell("TC-CONTACT-02", { bold: true }),
                  tableBodyCell("Form Submission - Missing Fields"),
                  tableBodyCell("PASS", { bold: true, color: "10B981" }),
                  tableBodyCell("Rejected with 400 Bad Request if name/email/message missing."),
                ],
              }),
              new TableRow({
                children: [
                  tableBodyCell("TC-CONTACT-03", { bold: true }),
                  tableBodyCell("Form Submission - Invalid Email"),
                  tableBodyCell("PASS", { bold: true, color: "10B981" }),
                  tableBodyCell("Rejected with 400 Bad Request on invalid email patterns."),
                ],
              }),
              new TableRow({
                children: [
                  tableBodyCell("TC-SUB-01", { bold: true }),
                  tableBodyCell("Unauthorized Submissions Fetch"),
                  tableBodyCell("PASS", { bold: true, color: "10B981" }),
                  tableBodyCell("Blocked fetch without active admin session cookie (401)."),
                ],
              }),
              new TableRow({
                children: [
                  tableBodyCell("TC-AUTH-01", { bold: true }),
                  tableBodyCell("Successful Admin Login"),
                  tableBodyCell("PASS", { bold: true, color: "10B981" }),
                  tableBodyCell("Valid credentials successfully authenticate and set session cookie."),
                ],
              }),
              new TableRow({
                children: [
                  tableBodyCell("TC-AUTH-02", { bold: true }),
                  tableBodyCell("Admin Login - Invalid Credentials"),
                  tableBodyCell("PASS", { bold: true, color: "10B981" }),
                  tableBodyCell("Failed logins rejected with 401 Unauthorized."),
                ],
              }),
              new TableRow({
                children: [
                  tableBodyCell("TC-SUB-02", { bold: true }),
                  tableBodyCell("Fetch Submissions (Authenticated)"),
                  tableBodyCell("PASS", { bold: true, color: "10B981" }),
                  tableBodyCell("Authenticated admin successfully fetched submissions list."),
                ],
              }),
              new TableRow({
                children: [
                  tableBodyCell("TC-SUB-03", { bold: true }),
                  tableBodyCell("Mark Submission Read/Unread"),
                  tableBodyCell("PASS", { bold: true, color: "10B981" }),
                  tableBodyCell("Toggled read status successfully updated database record."),
                ],
              }),
              new TableRow({
                children: [
                  tableBodyCell("TC-SUB-04", { bold: true }),
                  tableBodyCell("Delete Submission"),
                  tableBodyCell("PASS", { bold: true, color: "10B981" }),
                  tableBodyCell("Deleted submission successfully removed from database record."),
                ],
              }),
              new TableRow({
                children: [
                  tableBodyCell("TC-AUTH-03", { bold: true }),
                  tableBodyCell("Successful Admin Logout"),
                  tableBodyCell("PASS", { bold: true, color: "10B981" }),
                  tableBodyCell("Logout API cleared cookie and terminated the admin session."),
                ],
              }),
            ],
          }),

          new Paragraph({ text: "", spacing: { after: 300 } }),

          // 4. Test Coverage Analysis
          createHeader("4. Test Coverage Analysis"),
          createParagraph(
            "The automated integration test suite verified 100% of the critical backend database modules and API routing services:"
          ),
          new Paragraph({
            children: [
              new TextRun({ text: "• Database Libraries: ", font: "Segoe UI", bold: true }),
              new TextRun({ text: "src/lib/db.ts (save, read, update status, and delete logic)\n", font: "Segoe UI" }),
              new TextRun({ text: "• Auth Libraries: ", font: "Segoe UI", bold: true }),
              new TextRun({ text: "src/lib/auth.ts (login, logout, session signature, and token verification)\n", font: "Segoe UI" }),
              new TextRun({ text: "• API Routes: ", font: "Segoe UI", bold: true }),
              new TextRun({ text: "/api/contact, /api/admin/login, /api/admin/logout, /api/admin/submissions", font: "Segoe UI" }),
            ],
            spacing: { after: 200 },
          }),

          // 5. Conclusions & Recommendations
          createHeader("5. Conclusions & Recommendations"),
          createParagraph(
            "The web application has met all functional criteria successfully. All security parameters (like route protection and parameter validation) functioned correctly during the automated tests."
          ),
          createParagraph(
            "It is highly recommended to integrate this test suite (run_tests.ts) in your CI/CD pipelines to ensure ongoing stability during future feature additions."
          ),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  const outputPath = path.join(process.cwd(), "tests", "test_report.docx");
  await fs.promises.writeFile(outputPath, buffer);
  console.log(`Document successfully saved to ${outputPath}`);
}

main().catch((err) => {
  console.error("Failed to generate document:", err);
  process.exitCode = 1;
});
