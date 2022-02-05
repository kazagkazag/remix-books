import books from "../../data/books.json";
import { Book } from "./Book";
import { getById } from "./getOne";

export function getAll(): Book[] {
  return books;
}

export function getManyByIDs(ids: string[]): Array<Book | undefined> {
  return ids.map(getById);
}
