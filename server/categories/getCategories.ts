import "server-only";

import { cache } from "react";
import { prisma } from "@/lib/prisma";

export type CategoryOption = {
  id: string;
  slug: string;
  title: string;
  iconName: string;
  color: string;
};

// Server-only loader for the global category taxonomy. Wrapped in React.cache
// so repeated calls in a single render (e.g. multiple forms) share one query.
export const getCategories = cache(async (): Promise<CategoryOption[]> => {
  const rows = await prisma.category.findMany({
    orderBy: { title: "asc" },
  });

  return rows.map((row) => ({
    id: row.id,
    slug: row.slug,
    title: row.title,
    iconName: row.iconName,
    color: row.color,
  }));
});
