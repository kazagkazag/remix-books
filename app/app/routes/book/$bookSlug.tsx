import { useLoaderData } from "remix";
import books from "../../data/books.json";
import styles from "~/book/book.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

interface Book {
  title: string;
  authors: string;
  rating: number;
  imageUrl: string;
  price: number;
  id: string;
  description: string;
}

export const loader = ({
  params,
}: {
  params: { bookSlug: string };
}): Book | null => {
  return books.find((b) => b.slug === params.bookSlug) ?? null;
};

export default function Book() {
  const book = useLoaderData<Book | null>();

  return (
    <article className="book">
      <nav className="breadcrumbs">
        <button
          type="button"
          onClick={() => history.back()}
          className="go-back"
        >
          &laquo; Go to search
        </button>
      </nav>

      <header className="head">
        <h1 className="title">{book?.title}</h1>
        <h2 className="authors">Author(s): {book?.authors}</h2>
        <h3 className="rating">Our rating: {book?.rating} / 5</h3>
      </header>

      <img
        src={book?.imageUrl}
        alt={`Cover of ${book?.title}`}
        className="image"
      />
      
      <p className="description">{book?.description}</p>

      <div className="offer">
        <p className="price">
          {book?.price ? "$" + (book?.price / 100).toFixed(2) : "unknown"}
        </p>
        <button>Add to cart</button>
      </div>
    </article>
  );
}
