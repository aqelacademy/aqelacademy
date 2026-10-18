import { order } from "@/components/profile/order";
import type { Book } from "@/content/doctor-profile";

interface PortfolioBooksProps {
  items: Book[];
  publishedLabel: string;
  inProgressLabel: string;
}

/** Books as covers with a spine: published ones in navy with a gold spine, those in progress as outlined drafts. Each lifts a little on hover. */
export function PortfolioBooks({ items, publishedLabel, inProgressLabel }: PortfolioBooksProps) {
  return (
    <ul className="cv-stagger grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((book, index) => (
        <li
          key={book.title}
          style={order(index)}
          className={`flex aspect-[5/4] flex-col justify-between rounded-s-md rounded-e-2xl border-s-[10px] p-7 transition-transform duration-500 hover:-translate-y-1.5 ${
            book.published ? "border-gold bg-ink-dark text-white shadow-pop" : "border-y border-e border-dashed border-line bg-white text-ink [border-inline-start-style:solid]"
          }`}
        >
          <span className={`self-start rounded-full px-3 py-1 text-xs font-bold ${book.published ? "bg-gold text-ink" : "bg-canvas text-body"}`}>
            {book.published ? publishedLabel : inProgressLabel}
          </span>
          <p className="text-xl leading-snug font-bold text-balance">{book.title}</p>
        </li>
      ))}
    </ul>
  );
}
