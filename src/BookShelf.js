import React, { Component } from 'react';
import Book from './Book';

class BookShelf extends Component {
  render() {
    return (
      <section className="BookShelf">
        <h2 className="BookShelf-title">{this.props.shelfName}</h2>
        <ul>
          {this.props.bookList.map((book) => {
            return (
              <li className="BookShelf-book" key={`current-${book.id}`}>
                <Book bookinfo={book} onMoveBook={this.props.onMoveBook} />
              </li>
            );
          })}
        </ul>
      </section>
    );
  }
}

export default BookShelf;
