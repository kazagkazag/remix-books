import { ActionFunction, Form, useLoaderData } from "remix";
import books from "../../data/books.json";
import styles from "~/modules/search/searchResults.css";
import { getCurrentQuery, setQuery } from "~/modules/search/query";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export interface BookSearchResult {
  title: string;
  authors: string;
  rating: number;
  imageUrl: string;
  price: number;
  id: string;
  slug: string;
}

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const query = form.get("query") as string;

  setQuery(query || "");

  console.log(`Query ${query} has been set.`);

  return null;
};

export const loader = (): BookSearchResult[] => {
  console.log("Running the loader for search/index");
  console.log("Currently active query:", getCurrentQuery());
  return books.map((b) => ({
    title: b.title,
    authors: b.authors,
    rating: b.rating,
    imageUrl: b.imageUrl,
    price: b.price / 100,
    id: b.id,
    slug: b.slug,
  }));
};

export default function SearchResults() {
  const books = useLoaderData<BookSearchResult[]>();

  console.log({ books: typeof books });

  if (!books) {
    return <p>ERROR</p>;
  }

  return (
    <ul className="search-results">
      {books.map((b: BookSearchResult) => (
        <li key={b.title + b.authors}>
          <Form method="post">
            <a href={"/book/" + b.slug} title={"Details about " + b.title}>
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
            </a>
            <div>
              <p>${b.price.toFixed(2)}</p>
              <button type="submit" value={b.id} name="product">
                Add to cart
              </button>
            </div>
          </Form>
        </li>
      ))}
    </ul>
  );
}
