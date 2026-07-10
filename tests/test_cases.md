# Test Cases: Souvik Portfolio Next.js Website

This document lists the specific test cases designed to verify the correct functioning of the portfolio website.

---

## 1. Contact Form Functionality

### TC-CONTACT-01: Successful Form Submission (Development/Dry-Run Mode)
* **Description**: Verify that the contact form can be submitted successfully when SMTP is not configured (logs to console).
* **Execution**: Automated & Manual
* **Input**:
  - Name: `"Test User"`
  - Email: `"test@example.com"`
  - Message: `"Hello, this is a test message."`
* **Expected Result**:
  - Response status: `200 OK`
  - Response JSON: `{ "success": true, "message": "Message received in development mode (logged to console). Configure SMTP for real delivery." }`
  - A new submission record is added to `submissions.json` with a generated ID, current timestamp, and `isRead: false`.

### TC-CONTACT-02: Form Submission - Missing Fields
* **Description**: Verify that the API returns a 400 Bad Request error if required fields are missing.
* **Execution**: Automated
* **Input**:
  - Name: `""` (empty)
  - Email: `"test@example.com"`
  - Message: `"Hello"`
* **Expected Result**:
  - Response status: `400 Bad Request`
  - Response JSON: `{ "error": "Name, email, and message are required fields." }`
  - No new submission record is added.

### TC-CONTACT-03: Form Submission - Invalid Email Format
* **Description**: Verify that the API returns a 400 Bad Request error if the email format is invalid.
* **Execution**: Automated
* **Input**:
  - Name: `"Test User"`
  - Email: `"invalid-email"` (missing @ and domain)
  - Message: `"Hello"`
* **Expected Result**:
  - Response status: `400 Bad Request`
  - Response JSON: `{ "error": "Please enter a valid email address." }`
  - No new submission record is added.

---

## 2. Admin Authentication

### TC-AUTH-01: Successful Admin Login
* **Description**: Verify that an admin can log in with valid credentials, establishing a session.
* **Execution**: Automated & Manual
* **Input**:
  - Username: `ADMIN_USERNAME` (from env or `"admin"`)
  - Password: `ADMIN_PASSWORD` (from env or `"admin123"`)
* **Expected Result**:
  - Response status: `200 OK`
  - Response JSON: `{ "success": true, "message": "Logged in successfully" }`
  - Cookie `admin_session` is set (HttpOnly, SameSite=Strict).

### TC-AUTH-02: Admin Login - Invalid Credentials
* **Description**: Verify that login is rejected with incorrect credentials.
* **Execution**: Automated & Manual
* **Input**:
  - Username: `"wronguser"`
  - Password: `"wrongpass"`
* **Expected Result**:
  - Response status: `401 Unauthorized`
  - Response JSON: `{ "error": "Invalid username or password" }`
  - Cookie `admin_session` is NOT set.

### TC-AUTH-03: Successful Admin Logout
* **Description**: Verify that an admin can log out, which clears the session cookie.
* **Execution**: Automated & Manual
* **Input**:
  - POST request to `/api/admin/logout` with existing session cookie.
* **Expected Result**:
  - Response status: `200 OK`
  - Response JSON: `{ "success": true, "message": "Logged out successfully" }`
  - Cookie `admin_session` is deleted.

---

## 3. Submissions Management

### TC-SUB-01: Unauthorized Submissions Fetch
* **Description**: Verify that fetching submissions is blocked for unauthenticated requests.
* **Execution**: Automated
* **Input**:
  - GET request to `/api/admin/submissions` without session cookie.
* **Expected Result**:
  - Response status: `401 Unauthorized`
  - Response JSON: `{ "error": "Unauthorized access" }`

### TC-SUB-02: Fetch Submissions (Authenticated)
* **Description**: Verify that authenticated admins can fetch the list of submissions, sorted by date descending.
* **Execution**: Automated & Manual
* **Input**:
  - GET request to `/api/admin/submissions` with a valid session cookie.
* **Expected Result**:
  - Response status: `200 OK`
  - Response JSON contains `{ "success": true, "submissions": [...] }`
  - Submissions are returned sorted with the newest first.

### TC-SUB-03: Mark Submission Read/Unread
* **Description**: Verify that an admin can update the `isRead` status of a submission.
* **Execution**: Automated & Manual
* **Input**:
  - PATCH request to `/api/admin/submissions` with valid session cookie.
  - JSON Body: `{ "id": "<existing-id>", "isRead": true }`
* **Expected Result**:
  - Response status: `200 OK`
  - Response JSON: `{ "success": true }`
  - Database reflects the updated `isRead` value.

### TC-SUB-04: Delete Submission
* **Description**: Verify that an admin can delete a submission.
* **Execution**: Automated & Manual
* **Input**:
  - DELETE request to `/api/admin/submissions?id=<existing-id>` with valid session cookie.
* **Expected Result**:
  - Response status: `200 OK`
  - Response JSON: `{ "success": true }`
  - The submission is removed from `submissions.json`.
