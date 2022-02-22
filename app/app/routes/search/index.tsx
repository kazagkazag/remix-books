import { Form, LoaderFunction, useLoaderData } from "remix";
import styles from "~/modules/search/searchResults.css";
import { BookSearchResult } from "~/modules/book/BookSearchResult";
import { getAll } from "~/modules/book/getMany";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export const loader: LoaderFunction = ({ request }): BookSearchResult[] => {
  const query = new URL(request.url).searchParams.get("query")?.toLowerCase();

  console.log("Running the loader for search/index");
  console.log("Currently active query:", query);

  const books = getAll().map((b) => ({
    title: b.title,
    authors: b.authors,
    rating: b.rating,
    imageUrl: b.imageUrl,
    price: b.price / 100,
    id: b.id,
    slug: b.slug,
  }));

  return query
    ? books.filter((b) => b.title.toLowerCase().includes(query))
    : books;
};

export default function SearchResults() {
  const books = useLoaderData<BookSearchResult[]>();

  if (!books) {
    return <p>No books?!</p>;
  }

  return (
    <ul className="search-results">
      {books.map((b: BookSearchResult) => (
        // Or <Link /> if you want a better performance, prefetching etc
        <li key={b.title + b.authors}>
          <a href={"/book/" + b.slug} title={"Details about " + b.title}>
            
            <img
              src={b.imageUrl}
              alt={b.title}
              className="search-result-thumbnail"
            />
            
            <header>
              <h2 className="title is-5 mb-2">{b.title}</h2>
              <h3 className="title is-6 mb-4">{b.authors}</h3>
              <p className="is-size-7">
                Rating: <span>{b.rating}</span> / 5
              </p>
            </header>
          </a>
          
          <div>
            <p className="is-size-2">${b.price.toFixed(2)}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
