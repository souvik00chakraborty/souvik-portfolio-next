# Software Test Report: Souvik Portfolio Next.js Website

This document provides the results of executing the test suite on the Next.js portfolio website.

---

## 1. Executive Summary
The test execution was conducted to ensure the correct functioning of the portfolio website's core backend features, database operations, and admin-authenticated session flows.
* **Total Test Cases**: 10
* **Passed**: 10
* **Failed**: 0
* **Status**: **PASSED (100% Success Rate)**

---

## 2. Test Environment
* **OS**: Windows (Local Dev Host)
* **Runtime**: Node.js v24.18.0
* **Framework**: Next.js v16.2.9
* **Port**: `3001`
* **Date of Execution**: July 10, 2026

---

## 3. Automated Test Execution Results

| Test Case ID | Test Case Name | Result | Details |
|---|---|---|---|
| **TC-CONTACT-01** | Successful Form Submission | `✔ PASS` | Verified that a valid submission persists correctly into `submissions.json` with generated ID and default unread state. |
| **TC-CONTACT-02** | Form Submission - Missing Fields | `✔ PASS` | Verified that submissions with missing required fields are rejected with a `400 Bad Request` error. |
| **TC-CONTACT-03** | Form Submission - Invalid Email | `✔ PASS` | Verified that submissions with invalid email formats are rejected with a `400 Bad Request` error. |
| **TC-SUB-01** | Unauthorized Submissions Fetch | `✔ PASS` | Verified that fetching submissions without a session cookie is blocked with a `401 Unauthorized` response. |
| **TC-AUTH-01** | Successful Admin Login | `✔ PASS` | Verified that valid credentials establish a session cookie (`admin_session`) and return a `200 OK` response. |
| **TC-AUTH-02** | Admin Login - Invalid Credentials | `✔ PASS` | Verified that invalid credentials return `401 Unauthorized` and do not generate a session cookie. |
| **TC-SUB-02** | Fetch Submissions (Authenticated) | `✔ PASS` | Verified that authenticated requests correctly retrieve the list of submissions. |
| **TC-SUB-03** | Mark Submission Read/Unread | `✔ PASS` | Verified that the read status can be toggled via `PATCH` and persists in `submissions.json`. |
| **TC-SUB-04** | Delete Submission | `✔ PASS` | Verified that a submission can be deleted via `DELETE` and is removed from `submissions.json`. |
| **TC-AUTH-03** | Successful Admin Logout | `✔ PASS` | Verified that logging out clears the session cookie and subsequent requests are unauthorized. |

---

## 4. Test Coverage Analysis
The automated integration suite covered the following project modules and API routes:
* **Core Logic Libraries**:
  - `src/lib/db.ts` (tested: `saveSubmission`, `getSubmissions`, `markAsRead`, `deleteSubmission`)
  - `src/lib/auth.ts` (tested: `loginAdmin`, `logoutAdmin`, `verifyToken`)
* **API Route Handlers**:
  - `src/app/api/contact/route.ts` (tested: `POST` with validation and file-db write)
  - `src/app/api/admin/login/route.ts` (tested: `POST` for credential check and session setting)
  - `src/app/api/admin/logout/route.ts` (tested: `POST` to clear cookie)
  - `src/app/api/admin/submissions/route.ts` (tested: `GET`, `PATCH`, `DELETE` operations)

---

## 5. Conclusions & Recommendations
All tests passed successfully, confirming the stability and security of the contact forms, database operations, and admin authentication controls.
* **Recommendations**:
  1. Integrate this test suite in your CI/CD pipeline (e.g. GitHub Actions) to run before builds.
  2. Implement frontend component tests (e.g. Playwright or Cypress) if complex interactive client UI components are added in the future.
