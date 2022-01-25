import { Outlet } from "remix";
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
        <SearchBox />
        <Outlet />
      </section>
    </main>
  );
}
