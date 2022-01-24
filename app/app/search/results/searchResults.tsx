export interface BookSearchResult {
  title: string;
  authors: string;
  rating: number;
  imageUrl: string;
  price: number;
}

interface SearchResultsProps {
  books: BookSearchResult[];
}

export function SearchResults({ books }: SearchResultsProps) {
  return (
    <ul>
      {books.map((b: BookSearchResult) => (
        <li>
          <div>
            <img src={b.imageUrl} alt={b.title} />
            <header>
              <h2>{b.title}</h2>
              <h3>{b.authors}</h3>
              <p>
                Rating: <span>{b.rating}</span> / 5
              </p>
            </header>
            <div>
              <p>${b.price.toFixed(2)}</p>
              <button type="button">Add to cart</button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
