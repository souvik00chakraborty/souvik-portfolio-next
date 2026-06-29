"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import styles from "./admin.module.css";
import { Submission } from "@/lib/db";

interface DashboardClientProps {
  initialSubmissions: Submission[];
}

export default function DashboardClient({ initialSubmissions }: DashboardClientProps) {
  const [submissions, setSubmissions] = useState<Submission[]>(initialSubmissions);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "unread">("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [dashboardSnackbar, setDashboardSnackbar] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error";
  }>({
    show: false,
    message: "",
    type: "success",
  });

  const router = useRouter();

  // Show a snackbar message
  const showToast = (message: string, type: "success" | "error" = "success") => {
    setDashboardSnackbar({ show: true, message, type });
    setTimeout(() => {
      setDashboardSnackbar((prev) => ({ ...prev, show: false }));
    }, 3000);
  };

  // Stats calculation
  const stats = useMemo(() => {
    const total = submissions.length;
    const unread = submissions.filter((s) => !s.isRead).length;
    const read = total - unread;
    return { total, unread, read };
  }, [submissions]);

  // Filtered submissions based on search and tab selection
  const filteredSubmissions = useMemo(() => {
    return submissions.filter((sub) => {
      const matchesSearch =
        sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.message.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesTab = activeTab === "all" || !sub.isRead;

      return matchesSearch && matchesTab;
    });
  }, [submissions, searchTerm, activeTab]);

  // Handle logout
  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const response = await fetch("/api/admin/logout", {
        method: "POST",
      });
      if (response.ok) {
        router.push("/admin/login");
        router.refresh();
      } else {
        showToast("Failed to logout.", "error");
      }
    } catch {
      showToast("An error occurred during logout.", "error");
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Toggle submission read/unread status
  const toggleReadStatus = async (id: string, currentStatus: boolean, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent expanding the card when clicking the read/unread button
    try {
      const response = await fetch("/api/admin/submissions", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isRead: !currentStatus }),
      });

      if (response.ok) {
        setSubmissions((prev) =>
          prev.map((sub) => (sub.id === id ? { ...sub, isRead: !currentStatus } : sub))
        );
        showToast(
          `Message marked as ${!currentStatus ? "read" : "unread"}.`,
          "success"
        );
      } else {
        showToast("Failed to update status.", "error");
      }
    } catch {
      showToast("Error updating message status.", "error");
    }
  };

  // Delete submission
  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent expanding/collapsing when clicking delete
    if (!confirm("Are you sure you want to delete this submission?")) return;

    try {
      const response = await fetch(`/api/admin/submissions?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setSubmissions((prev) => prev.filter((sub) => sub.id !== id));
        if (expandedId === id) setExpandedId(null);
        showToast("Submission deleted successfully.", "success");
      } else {
        showToast("Failed to delete submission.", "error");
      }
    } catch {
      showToast("Error deleting submission.", "error");
    }
  };

  // Format date to locale string
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className={styles.adminContainer}>
      {/* Header */}
      <header className={styles.dashboardHeader}>
        <h2>Admin Dashboard</h2>
        <div className={styles.headerActions}>
          <span className={styles.headerUser}>Welcome, Admin</span>
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className={styles.logoutBtn}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            {isLoggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className={styles.dashboardMain}>
        {/* Statistics Cards */}
        <section className={styles.statsGrid}>
          <div className={`${styles.statCard} ${styles.statCardTotal}`}>
            <span className={styles.statTitle}>Total Submissions</span>
            <span className={styles.statValue}>{stats.total}</span>
          </div>
          <div className={`${styles.statCard} ${styles.statCardUnread}`}>
            <span className={styles.statTitle}>Unread</span>
            <span className={styles.statValue}>{stats.unread}</span>
          </div>
          <div className={`${styles.statCard} ${styles.statCardRead}`}>
            <span className={styles.statTitle}>Read</span>
            <span className={styles.statValue}>{stats.read}</span>
          </div>
        </section>

        {/* Filters and Search controls */}
        <section className={styles.controlsRow}>
          <div className={styles.searchWrapper}>
            <svg
              className={styles.searchIcon}
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search by name, email, or message..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.filterTabs}>
            <button
              onClick={() => setActiveTab("all")}
              className={`${styles.filterTab} ${activeTab === "all" ? styles.filterTabActive : ""}`}
            >
              All Messages
            </button>
            <button
              onClick={() => setActiveTab("unread")}
              className={`${styles.filterTab} ${activeTab === "unread" ? styles.filterTabActive : ""}`}
            >
              Unread
            </button>
          </div>
        </section>

        {/* Submissions list */}
        <section className={styles.submissionsContainer}>
          {filteredSubmissions.length === 0 ? (
            <div className={styles.noSubmissions}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <p>No submissions found matching your filters.</p>
            </div>
          ) : (
            filteredSubmissions.map((sub) => {
              const isExpanded = expandedId === sub.id;
              return (
                <div
                  key={sub.id}
                  onClick={() => setExpandedId(isExpanded ? null : sub.id)}
                  className={`${styles.submissionCard} ${!sub.isRead ? styles.submissionCardUnread : ""}`}
                >
                  <div className={styles.cardHeader}>
                    <div className={styles.senderMeta}>
                      <div className={styles.senderNameGroup}>
                        <span className={styles.senderName}>{sub.name}</span>
                        {!sub.isRead && (
                          <span className={styles.unreadBadge}>New</span>
                        )}
                      </div>
                      <span className={styles.senderEmail}>{sub.email}</span>
                    </div>

                    <div className={styles.cardRightMeta}>
                      <span className={styles.submissionDate}>
                        {formatDate(sub.createdAt)}
                      </span>

                      <div className={styles.actionButtons}>
                        <button
                          onClick={(e) => toggleReadStatus(sub.id, sub.isRead, e)}
                          title={`Mark as ${sub.isRead ? "unread" : "read"}`}
                          className={styles.actionBtn}
                        >
                          {sub.isRead ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                              <polyline points="22,6 12,13 2,6" />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                              <polyline points="22 4 12 14.01 9 11.01" />
                            </svg>
                          )}
                        </button>
                        <button
                          onClick={(e) => handleDelete(sub.id, e)}
                          title="Delete submission"
                          className={`${styles.actionBtn} ${styles.actionBtnDelete}`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            <line x1="10" y1="11" x2="10" y2="17" />
                            <line x1="14" y1="11" x2="14" y2="17" />
                          </svg>
                        </button>
                        <svg
                          className={`${styles.expandIcon} ${isExpanded ? styles.expandIconRotated : ""}`}
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className={styles.cardExpandedBody}>
                      <div className={styles.messageDivider} />
                      <div>
                        <div className={styles.messageLabel}>Message Details</div>
                        <div className={styles.messageContent}>{sub.message}</div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </section>
      </main>

      {/* Snackbar Feedback */}
      <div
        className={`${styles.snackbar} ${dashboardSnackbar.show ? styles.snackbarActive : ""} ${dashboardSnackbar.type === "success" ? styles.snackbarSuccess : styles.snackbarError}`}
        id="dashboard-snackbar"
      >
        <div className={styles.snackbarIcon}>
          {dashboardSnackbar.type === "success" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          )}
        </div>
        <span>{dashboardSnackbar.message}</span>
      </div>
    </div>
  );
}
