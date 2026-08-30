import { Metadata } from "next";
import ResourcesClient from "./ResourcesClient";

export const metadata: Metadata = {
  title: "Resource Vault | eYRC Command Center",
  description: "Access theme-specific resources, documentations, and templates.",
};

export default function ResourcesPage() {
  return <ResourcesClient />;
}
