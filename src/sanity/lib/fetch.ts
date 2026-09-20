import "server-only";

import { client } from "./client";

/** Wraps the Sanity client with a cache tag so the Sanity webhook can revalidate it on publish. */
export async function sanityFetch<T>({
  query,
  params = {},
}: {
  query: string;
  params?: Record<string, unknown>;
}): Promise<T> {
  return client.fetch<T>(query, params, {
    next: { tags: ["project"] },
  });
}
