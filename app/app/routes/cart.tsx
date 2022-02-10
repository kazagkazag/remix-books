import { Link } from "react-router-dom";
import {
  ActionFunction,
  Form,
  json,
  LoaderFunction,
  redirect,
  useActionData,
  useLoaderData,
  useTransition,
} from "remix";
import { Book } from "~/modules/book/Book";
import { getManyByIDs } from "~/modules/book/getMany";
import styles from "~/modules/cart/cart.css";
import { cartCookie } from "~/modules/cart/cookies";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export const action: ActionFunction = async ({ request }) => {
  const data = await request.formData();
  const task = data.get("task");

  if (task === "delete") {
    const bookIdToDelete = data.get("id");
    const oldCookieValue = await cartCookie.parse(
      request.headers.get("Cookie")
    );
    const newCookieValue = oldCookieValue.filter(
      (b: string) => b !== bookIdToDelete
    );
    return json(
      {
        success: true,
      },
      {
        headers: { "Set-Cookie": await cartCookie.serialize(newCookieValue) },
      }
    );
  }

  if (task === "checkout") {
    const name = data.get("name");
    const address = data.get("address");
    const postal = data.get("postal");
    const city = data.get("city");

    console.log({
      name,
      address,
      postal,
      city,
    });

    if (name && address && postal && city) {
      return redirect("/thank-you");
    }

    return json({
      success: false,
      error: "Please fill out the form!",
    });
  }

  return json({ success: true });
};

export const loader: LoaderFunction = async ({ request }) => {
  const bookIDsCurrentlyInCart = await cartCookie.parse(
    request.headers.get("Cookie")
  );
  const booksInCart = getManyByIDs(bookIDsCurrentlyInCart);

  return booksInCart;
};

export default function Cart() {
  const books = useLoaderData<Array<Book | undefined>>();
  const totalPrice = (
    books.reduce((acc, current) => {
      return acc + (current?.price ?? 0);
    }, 0) / 100
  ).toFixed(2);
  const noOfBooks = books.length;

  const submission = useActionData<{ success: boolean; error?: string }>();
  const transition = useTransition();

  console.log({ submission, transition });

  const submissionError = submission?.error;
  const isCheckoutFormBeingSubmitted =
    transition?.submission?.formData?.get?.("task") === "checkout" &&
    transition?.state === "submitting";

  return (
    <main className="cart">
      <header className="header">
        <h1 className="title is-1">Cart</h1>
        <h2 className="title is-2">Items: {noOfBooks}</h2>
      </header>
      {noOfBooks === 0 ? (
        <p className="notification is-primary">
          No books in your cart! <Link to="/search">Search for a book!</Link>
        </p>
      ) : null}

      <section className="items">
        <ul className="panel">
          {books.map((b) =>
            b ? (
              <li key={b.id} className="panel-block has-icon-right">
                {b.title}{" "}
                <span className="tag is-info is-light ml-4">
                  (${(b.price / 100).toFixed(2)})
                </span>
                <Form method="post" action="/cart">
                  <input type="hidden" value={b.id} name="id" />
                  <button
                    type="submit"
                    name="task"
                    value="delete"
                    className="delete ml-4"
                  >
                    &times;
                  </button>
                </Form>
              </li>
            ) : null
          )}
        </ul>
        <footer>
          <h3 className="title is-3">Total: ${totalPrice}</h3>
        </footer>
      </section>
      <Form method="post" action="/cart" className="delivery">
        {submissionError ? (
          <p className="notification is-danger">{submissionError}</p>
        ) : null}

        <h3 className="title is-3">Delivery details</h3>

        <label htmlFor="name" className="label">
          Name:
          <input type="text" id="name" name="name" className="input" />
        </label>
        <label htmlFor="address" className="label">
          Address:
          <input type="text" id="address" name="address" className="input" />
        </label>
        <label htmlFor="postal" className="label">
          Postal:
          <input type="postal" name="postal" id="postal" className="input" />
        </label>
        <label htmlFor="city" className="label">
          City:
          <input type="city" name="city" id="city" className="input" />
        </label>
        <footer className="summary">
          <button
            type="submit"
            name="task"
            value="checkout"
            className={`button is-primary is-large ${
              isCheckoutFormBeingSubmitted ? "is-loading" : ""
            }`}
          >
            Checkout
          </button>
        </footer>
      </Form>
    </main>
  );
}
