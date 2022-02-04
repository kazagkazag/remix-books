import { Form, LoaderFunction } from "remix";
import styles from "~/modules/cart/cart.css";
import { cartCookie } from "~/modules/cart/cookies";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export const loader: LoaderFunction = async ({ request }) => {
  const currentCart = await cartCookie.parse(request.headers.get("Cookie"));
  console.log({ currentCart });

  return {
    cart: currentCart,
  };
};

export default function Cart() {
  return (
    <Form className="cart">
      <header className="header">
        <h1>Cart</h1>
        <h2>Items: 2</h2>
      </header>
      <p className="notification">A title of the book added to the cart</p>
      <section className="items">
        <ul className="items-list">
          <li className="item">Title of the book no 1 ($23.40)</li>
          <li className="item">Title of the book no 2 and 3 ($34.40)</li>
        </ul>
        <footer>
          <h3 className="total-price">Total: $44.40</h3>
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
