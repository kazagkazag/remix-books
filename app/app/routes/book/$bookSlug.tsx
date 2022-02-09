import {
  ActionFunction,
  Form,
  json,
  useActionData,
  useLoaderData,
  useTransition,
} from "remix";
import styles from "~/modules/book/book.css";
import { cartCookie } from "~/modules/cart/cookies";
import { Book } from "~/modules/book/Book";
import { getBySlug } from "~/modules/book/getOne";
import { Link } from "react-router-dom";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export const loader = ({
  params,
}: {
  params: { bookSlug: string };
}): Book | null => {
  return getBySlug(params.bookSlug) ?? null;
};

export const action: ActionFunction = async ({ request }) => {
  const body = await request.formData();
  const bookId = body.get("id");
  console.log("Adding", bookId, "to the cart");

  const currentCart = await cartCookie.parse(request.headers.get("Cookie"));
  const cartWithNewBook = [...(currentCart || []), bookId];

  console.log("Current cart", currentCart);
  console.log("After update", cartWithNewBook);

  return json(
    {
      success: true,
    },
    {
      headers: {
        "Set-Cookie": await cartCookie.serialize(cartWithNewBook),
      },
    }
  );
};

export default function Book() {
  const book = useLoaderData<Book | null>();
  const addingToCart = useActionData<{ success: boolean }>();
  const addingToCartRequest = useTransition();

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

      <Form className="offer" method="post" replace>
        <p className="price">
          {book?.price ? "$" + (book?.price / 100).toFixed(2) : "unknown"}
        </p>
        <input type="hidden" name="id" value={book?.id} />
        <button type="submit">
          {addingToCartRequest.submission ? "Adding..." : "Add to cart"}
        </button>
        {addingToCart?.success ? (
          <p className="notification">
            Added! Go to <Link to="/cart">the cart</Link>.
          </p>
        ) : null}
      </Form>
    </article>
  );
}
