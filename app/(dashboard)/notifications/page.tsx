import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import NotificationsClient from "./NotificationsClient";

export const metadata = {
  title: "Notifications & Alerts | eYRC Command Center",
  description: "View important competition announcements, task updates, and team alerts.",
};

export default async function NotificationsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return <NotificationsClient user={session.user} />;
}
