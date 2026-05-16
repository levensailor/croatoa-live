import type { MetadataRoute } from "next";
import { productionSiteUrl } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  const base = productionSiteUrl.replace(/\/$/, "");
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${base}/sitemap.xml`,
    host: "croatoa.live",
  };
}
