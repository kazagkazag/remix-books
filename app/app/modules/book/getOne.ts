import { Book } from "./Book";
import { getAll } from "./getMany";

export function getBySlug(slug: string): Book | undefined {
  return getAll().find((b) => b.slug.toLowerCase() === slug.toLowerCase());
}

export function getById(id: string): Book | undefined {
  return getAll().find((b) => b.id.toLowerCase() === id.toLowerCase());
}
