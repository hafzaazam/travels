import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — Travel Links Solution" },
      { name: "description", content: "Private admin dashboard for managing Travel Links Solution contacts, reviews, and subscribers." },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
});
