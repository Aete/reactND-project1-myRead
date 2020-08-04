import React from 'react';
import Book from './Book';
import './BookShelf.css';

function BookShelf(props) {
  return (
    <section className="BookShelf">
      <h2 className="BookShelf-title">{props.shelfName}</h2>
      <ul>
        {props.bookList.map((book) => {
          const { id, shelf, imageLinks, title, authors, pageCount } = book;
          return (
            <li className="BookShelf-book" key={`current-${book.id}`}>
              <Book
                bookId={id}
                shelf={shelf}
                pageCount={pageCount}
                imageLink={
                  imageLinks
                    ? imageLinks.thumbnail
                    : 'https://via.placeholder.com/128x200'
                }
                title={title}
                authors={authors}
                onMoveBook={props.onMoveBook}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default BookShelf;
