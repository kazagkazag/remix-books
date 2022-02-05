import { Form, LoaderFunction, useLoaderData } from "remix";
import { Book } from "~/modules/book/Book";
import { getManyByIDs } from "~/modules/book/getMany";
import styles from "~/modules/cart/cart.css";
import { cartCookie } from "~/modules/cart/cookies";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export const loader: LoaderFunction = async ({ request }) => {
  const bookIDsCurrentlyInCart = await cartCookie.parse(
    request.headers.get("Cookie")
  );
  const booksInCart = getManyByIDs(bookIDsCurrentlyInCart);

  console.log(booksInCart);

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

  return (
    <Form className="cart">
      <header className="header">
        <h1>Cart</h1>
        <h2>Items: {noOfBooks}</h2>
      </header>
      <p className="notification">A title of the book added to the cart</p>
      <section className="items">
        <ul className="items-list">
          {books.map((b) =>
            b ? (
              <li key={b.id} className="item">
                {b.title} (${(b.price / 100).toFixed(2)})
              </li>
            ) : null
          )}
        </ul>
        <footer>
          <h3 className="total-price">Total: ${totalPrice}</h3>
        </footer>
      </section>
      <section className="delivery">
        <h3>Delivery details</h3>
        <label htmlFor="name">
          Name:
          <input type="text" id="name" name="name" />
        </label>
        <label htmlFor="address">
          Address:
          <input type="text" id="address" name="address" />
        </label>
        <label htmlFor="postal">
          Postal:
          <input type="postal" name="postal" id="postal" />
        </label>
        <label htmlFor="city">
          City:
          <input type="city" name="city" id="city" />
        </label>
      </section>
      <footer className="summary">
        <button type="submit">Checkout</button>
      </footer>
    </Form>
  );
}
