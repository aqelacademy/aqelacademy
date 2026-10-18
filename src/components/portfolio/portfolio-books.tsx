import { order } from "@/components/profile/order";
import type { Book } from "@/content/doctor-profile";

interface PortfolioBooksProps {
  items: Book[];
  publishedLabel: string;
  inProgressLabel: string;
  /** Printed at the foot of every cover. */
  author: string;
}

/**
 * His books standing on shelves as real volumes (`.book*` in globals.css): a cover turned a little in 3D, with its
 * spine and the page edges showing, that swings to face the reader on hover. Published books are navy with a gold
 * frame; those in progress are cream manuscripts with a stamp. In Arabic the spine is on the right, as in an
 * Arabic book, so the page edges show on the left.
 */
export function PortfolioBooks({ items, publishedLabel, inProgressLabel, author }: PortfolioBooksProps) {
  return (
    <ul className="cv-stagger grid grid-cols-2 gap-x-6 gap-y-16 sm:grid-cols-3 lg:grid-cols-6 lg:gap-x-8">
      {items.map((book, index) => (
        <li key={book.title} style={order(index)}>
          <p className="mb-6 text-center">
            <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${book.published ? "bg-ink text-white" : "bg-white text-body ring-1 ring-line"}`}>
              {book.published ? publishedLabel : inProgressLabel}
            </span>
          </p>
          <div className="book-scene relative">
            <div className={`book ${book.published ? "book-published" : "book-draft"}`}>
              <div className="book-cover flex flex-col items-center justify-between p-4 text-center sm:p-5">
                <span aria-hidden="true" className="book-frame" />
                <span aria-hidden="true" className="mt-1 flex items-center gap-1.5">
                  <span className="h-px w-5 bg-current opacity-50" />
                  <span className="size-1.5 rotate-45 bg-gold" />
                  <span className="h-px w-5 bg-current opacity-50" />
                </span>
                <p className="text-sm leading-relaxed font-bold text-balance sm:text-base sm:leading-relaxed">{book.title}</p>
                <span className="text-[0.65rem] font-bold opacity-75 sm:text-xs">{author}</span>
              </div>
            </div>
            {/* Each book's piece of shelf reaches into the gaps, so a row reads as one shelf. */}
            <span aria-hidden="true" className="book-shelf absolute -inset-x-3 -bottom-3.5 lg:-inset-x-4" />
          </div>
        </li>
      ))}
    </ul>
  );
}
