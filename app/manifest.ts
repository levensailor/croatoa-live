import type { MetadataRoute } from "next";
import { artistDisplayName } from "@/lib/site-config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${artistDisplayName} official`,
    short_name: artistDisplayName,
    description: "Rock band from Wilmington, NC",
    start_url: "/",
    display: "standalone",
    background_color: "#A81300",
    theme_color: "#8C0042",
  };
}
