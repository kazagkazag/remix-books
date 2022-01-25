import { Form, useLoaderData } from "remix";
import books from "../../data/books.json";
import styles from "~/search/searchResults.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export interface BookSearchResult {
  title: string;
  authors: string;
  rating: number;
  imageUrl: string;
  price: number;
}

export const action = async ({ request }: { request: any }) => {
  console.log(await request.formData());
  return null;
};

export const loader = (): BookSearchResult[] => {
  return books.map((b) => ({
    title: b.title,
    authors: b.authors,
    rating: b.rating,
    imageUrl: b.imageUrl,
    price: b.price / 100,
  }));
};

export default function SearchResults() {
  const books = useLoaderData<BookSearchResult[]>();

  return (
    <ul className="search-results">
      {books.map((b: BookSearchResult) => (
        <li key={b.title + b.authors}>
          <Form method="post">
            <img
              src={b.imageUrl}
              alt={b.title}
              className="search-result-thumbnail"
            />
            <header>
              <h2>{b.title}</h2>
              <h3>{b.authors}</h3>
              <p>
                Rating: <span>{b.rating}</span> / 5
              </p>
            </header>
            <div>
              <p>${b.price.toFixed(2)}</p>
              <button type="submit" value={b.title} name="product">
                Add to cart
              </button>
            </div>
          </Form>
        </li>
      ))}
    </ul>
  );
}
