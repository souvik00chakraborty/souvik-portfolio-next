import { isAuthenticated } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getSubmissions } from "@/lib/db";
import DashboardClient from "./DashboardClient";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const auth = await isAuthenticated();
  if (!auth) {
    redirect("/admin/login");
  }

  const submissions = await getSubmissions();
  return <DashboardClient initialSubmissions={submissions} />;
}
