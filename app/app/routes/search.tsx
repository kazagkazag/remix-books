import { Form, Outlet } from "remix";
import {
  SearchBox,
  links as searchBoxLinks,
} from "~/modules/search/searchBox/searchBox";

import styles from "~/modules/search/index.css";

export function links() {
  return [...searchBoxLinks(), { rel: "stylesheet", href: styles }];
}

export default function Index() {
  return (
    <main className="index-wrapper">
      <header>
        <h1 className="title is-1 mb-4">Best Books!</h1>
      </header>
      <section>
        <Form method="get" action="/search?index">
          <SearchBox />
        </Form>
        <Outlet />
      </section>
    </main>
  );
}
