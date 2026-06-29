import fs from "fs/promises";
import path from "path";

export interface Submission {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

const DB_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DB_DIR, "submissions.json");

async function ensureDbExists() {
  try {
    await fs.mkdir(DB_DIR, { recursive: true });
    try {
      await fs.access(DB_FILE);
    } catch {
      await fs.writeFile(DB_FILE, JSON.stringify([], null, 2), "utf-8");
    }
  } catch (error) {
    console.error("Database initialization failed:", error);
  }
}

export async function getSubmissions(): Promise<Submission[]> {
  await ensureDbExists();
  try {
    const data = await fs.readFile(DB_FILE, "utf-8");
    const submissions: Submission[] = JSON.parse(data);
    // Sort by date descending (latest first)
    return submissions.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } catch (error) {
    console.error("Failed to read submissions:", error);
    return [];
  }
}

export async function saveSubmission(
  name: string,
  email: string,
  message: string
): Promise<Submission> {
  await ensureDbExists();
  const submissions = await getSubmissions();

  const newSubmission: Submission = {
    id: Math.random().toString(36).substring(2, 9) + Date.now().toString(36),
    name,
    email,
    message,
    createdAt: new Date().toISOString(),
    isRead: false,
  };

  submissions.push(newSubmission);
  await fs.writeFile(DB_FILE, JSON.stringify(submissions, null, 2), "utf-8");
  return newSubmission;
}

export async function markAsRead(id: string, isRead: boolean): Promise<boolean> {
  await ensureDbExists();
  const submissions = await getSubmissions();
  const index = submissions.findIndex((s) => s.id === id);

  if (index !== -1) {
    submissions[index].isRead = isRead;
    await fs.writeFile(DB_FILE, JSON.stringify(submissions, null, 2), "utf-8");
    return true;
  }
  return false;
}

export async function deleteSubmission(id: string): Promise<boolean> {
  await ensureDbExists();
  const submissions = await getSubmissions();
  const filtered = submissions.filter((s) => s.id !== id);

  if (filtered.length !== submissions.length) {
    await fs.writeFile(DB_FILE, JSON.stringify(filtered, null, 2), "utf-8");
    return true;
  }
  return false;
}
