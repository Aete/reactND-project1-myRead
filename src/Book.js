import React from 'react';

function Book(props) {
  const { id, shelf, imageLinks, title, authors } = props.bookinfo;
  const onMoveBook = props.onMoveBook;
  return (
    <div>
      <div className="book-thumbnail">
        <img src={imageLinks.thumbnail} alt={title} />
        <button>▼</button>
        <div className="book-movebuttons">
          <button onClick={() => onMoveBook(id, shelf, 'currentlyReading')}>
            Currently Reading
          </button>
          <button onClick={() => onMoveBook(id, shelf, 'wantToRead')}>
            Want to read
          </button>
          <button onClick={() => onMoveBook(id, shelf, 'read')}>Read</button>
          <button>None</button>
        </div>
      </div>
      <div className="book-detail">
        <h3>{title}</h3>
        <ul>
          {authors.map((author) => {
            return <li key={title + '-' + author}>{author}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}

export default Book;
