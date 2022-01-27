import { redirect } from "remix";

export const loader = () => {
  return redirect("/search");
};

export default function () {
  return (
    <a href="/search" title="Search for a book">
      Search for a book
    </a>
  );
}
