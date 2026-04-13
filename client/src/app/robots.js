import { userAgent } from "next/server";
import sitemap from "./sitemap";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `http://localhost:3000/sitemap.xml`,
  };
}
