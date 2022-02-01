import { ActionFunction, Form, Outlet } from "remix";
import { setQuery } from "~/search/query";
import {
  SearchBox,
  links as searchBoxLinks,
} from "~/search/searchBox/searchBox";

import styles from "../search/index.css";

export function links() {
  return [...searchBoxLinks(), { rel: "stylesheet", href: styles }];
}

export default function Index() {
  return (
    <main className="index-wrapper">
      <header>
        <h1 className="title">Best Books!</h1>
      </header>
      <section>
        <Form method="post" action="/search?index">
          <SearchBox />
        </Form>
        <Outlet />
      </section>
    </main>
  );
}
