import { useLoaderData } from "remix";
import {
  BookSearchResult,
  SearchResults,
} from "~/search/results/searchResults";
import {
  SearchBox,
  links as searchBoxLinks,
} from "~/search/searchBox/searchBox";
import books from "../data/books.json";
import styles from "./index.css";

export function links() {
  return [...searchBoxLinks(), { rel: "stylesheet", href: styles }];
}

export const loader = (): BookSearchResult[] => {
  return books.map((b) => ({
    title: b.title,
    authors: b.authors,
    rating: b.rating,
    imageUrl: b.imageUrl,
    price: b.price / 100,
  }));
};

export default function Index() {
  const books = useLoaderData();

  return (
    <main className="index-wrapper">
      <header>
        <h1 className="title">Best Books!</h1>
      </header>
      <form>
        <SearchBox />
        <SearchResults books={books} />
      </form>
    </main>
  );
}
