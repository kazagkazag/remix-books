import styles from "./searchBox.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export function SearchBox() {
  return (
    <input
      name="query"
      className="search-box"
      type="text"
      placeholder="Type book title..."
    />
  );
}
