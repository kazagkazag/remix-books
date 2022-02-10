import styles from "./searchBox.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export function SearchBox() {
  return (
    <p className="control has-icons-left">
      <input
        name="query"
        className="input"
        type="text"
        placeholder="Type book title..."
      />
      <span class="icon is-left">
        <i class="fas fa-search" aria-hidden="true"></i>
      </span>
    </p>
  );
}
