import React from 'react';
import './Book.css';
import PropTypes from 'prop-types';

function Book(props) {
  const { bookId, shelf, imageLink, title, authors, pageCount } = props;
  const onMoveBook = props.onMoveBook;
  return (
    <div className="book">
      <div className="book-thumbnail">
        <img
          src={imageLink ? imageLink : 'https://via.placeholder.com/128x200'}
          alt={title}
        />
        <button
          className="book-button"
          onClick={() => {
            document.getElementById(bookId + '-movebuttons').style.display =
              'flex';
          }}
        >
          <span>▼</span>
        </button>
        <div id={bookId + '-movebuttons'} className="book-movebuttons">
          <button onClick={() => onMoveBook(bookId, shelf, 'currentlyReading')}>
            Currently Reading
          </button>
          <button onClick={() => onMoveBook(bookId, shelf, 'wantToRead')}>
            Want to read
          </button>
          <button onClick={() => onMoveBook(bookId, shelf, 'read')}>
            Read
          </button>
          {shelf !== undefined && (
            <button onClick={() => onMoveBook(bookId, shelf, 'none')}>
              Remove
            </button>
          )}

          <button
            onClick={() => {
              document.getElementById(bookId + '-movebuttons').style.display =
                'none';
            }}
          >
            Close
          </button>
        </div>
      </div>
      <div className="book-detail">
        <h3>{title}</h3>
        <ul className="book-detail-info">
          <h5>Authors</h5>
          {authors !== undefined &&
            authors.map((author) => {
              return (
                <li className="book-detail-author" key={title + '-' + author}>
                  {author}
                </li>
              );
            })}
          <h5>Info</h5>
          <li className="book-detail-page">
            Pages: {pageCount ? pageCount : '-'}
          </li>
        </ul>
      </div>
    </div>
  );
}

Book.propTypes = {
  bookId: PropTypes.string.isRequired,
  imageLink: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  authors: PropTypes.array.isRequired,
  pageCount: PropTypes.number.isRequired,
};

export default Book;
