# Software Test Plan: Souvik Portfolio Next.js Website

This document outlines the testing strategy, scope, environment, and methodologies for testing the Souvik Portfolio Next.js website.

## 1. Introduction
This Test Plan defines the framework and strategy to verify that the Next.js portfolio application behaves correctly. It ensures that the contact form works properly, administration login/logout functions are secure, and dashboard submission management works.

## 2. Test Scope
The following components are **In Scope**:
* **Contact Form Functionality**: Submitting messages, data validation (required fields, email format validation), data persistence into `submissions.json`, and SMTP email notification dispatch.
* **Authentication**: Login security, admin session creation (HTTP-only cookie), session validation, session expiry, and logout session termination.
* **Admin Dashboard Services**: Authorized fetching of submissions, marking read/unread state changes, and deletion of submissions.
* **Unauthorized Access Controls**: Ensuring api endpoints `/api/admin/*` reject requests without a valid session cookie.

The following components are **Out of Scope**:
* Testing external email inbox delivery (mocked/validated at SMTP level).
* Third-party package logic (Nodemailer internals, React framework internals).
* Web performance metrics under heavy concurrent load (stress testing).

## 3. Testing Methodology & Levels
We employ a multi-layered testing strategy:
* **Unit Testing**: Testing the standalone modules, particularly database logic `src/lib/db.ts` and token verification logic `src/lib/auth.ts`.
* **API Integration Testing**: Making direct HTTP requests to the Next.js API endpoints (`/api/contact`, `/api/admin/login`, `/api/admin/submissions`, `/api/admin/logout`) and verifying status codes, cookies, and responses.
* **Manual UI Verification**: Reviewing rendering layout, form interaction states, validation warnings, and responsive views.

## 4. Test Environment
* **OS**: Windows (Local Dev Host)
* **Runtime**: Node.js v24.18.0
* **Framework**: Next.js v16.2.9
* **Database**: Local JSON storage (`data/submissions.json`)
* **Test Port**: `3001` (to prevent conflicts with standard Next.js port `3000`)

## 5. Test Tools & Execution Command
* **Automated Runner**: Node.js built-in test runner using standard APIs.
* **Execution Command**:
  ```bash
  node --experimental-strip-types tests/run_tests.ts
  ```

## 6. Test Schedule & Responsibilities
* **Test Design**: AI coding assistant.
* **Execution**: Run automatically before development commits and builds.
* **Reporting**: Automated report generation to `tests/test_report.md`.
