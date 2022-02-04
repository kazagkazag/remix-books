import books from "../../data/books.json";
import { Book } from "./Book";

export function getAll(): Book[] {
  return books;
}
