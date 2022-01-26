import { useLoaderData } from "remix";
import books from "../../data/books.json";

interface Book {
  title: string;
  authors: string;
  rating: number;
  imageUrl: string;
  price: number;
  id: string;
  description: string;
}

export const loader = ({
  params,
}: {
  params: { bookSlug: string };
}): Book | null => {
  return books.find((b) => b.slug === params.bookSlug) ?? null;
};

export default function Book() {
  const book = useLoaderData<Book | null>();

  return <pre>{JSON.stringify(book, null, 2)}</pre>;
}
